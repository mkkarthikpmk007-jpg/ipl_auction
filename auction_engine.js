let autoTriggered = false;

// 🚩 RESET AUCTION
async function resetAuction() {
    if (!confirm("Are you sure you want to reset the auction? All team squads will be deleted!")) return;
    
    // 1. Reset auction state
    const { error: stateError } = await _supabase.from('auction_state').update({ 
        active_player: "READY", 
        current_bid: 0, 
        high_bidder: "NONE", 
        timer_ends_at: null 
    }).match({id: 1});

    // 2. Clear squads for this room
    const { error: squadError } = await _supabase.from('squads').delete().eq('room_code', roomCode);

    if (stateError || squadError) {
        alert("Reset failed! Check console.");
        console.error(stateError, squadError);
    } else {
        location.reload();
    }
}

// 🚩 TOGGLE PAUSE/RESUME
async function togglePause() {
    const { data: d } = await _supabase.from('auction_state').select('*').match({id: 1}).single();
    if (!d) return;

    if (d.timer_ends_at) {
        // Currently running -> PAUSE
        await _supabase.from('auction_state').update({ timer_ends_at: null }).match({id: 1});
    } else if (d.active_player !== "READY") {
        // Paused -> RESUME
        const endAt = new Date(Date.now() + 10000).toISOString();
        await _supabase.from('auction_state').update({ timer_ends_at: endAt }).match({id: 1});
    }
}

// 🚩 NEXT PLAYER - Force Skip Logic
async function moveToNextPlayerAuto() {
    // 1. Fetch current sold players once
    const { data: squads } = await _supabase.from('squads').select('players').eq('room_code', roomCode);
    let soldNames = new Set();
    if(squads) {
        squads.forEach(t => (t.players || []).forEach(p => {
            const parsed = typeof p === 'string' ? JSON.parse(p) : p;
            soldNames.add(parsed.name);
        }));
    }

    // 2. Fetch current active player to find index
    const { data: currentS } = await _supabase.from('auction_state').select('active_player').match({id: 1}).single();
    const currentName = currentS?.active_player;
    const currentIndex = CRICKET_PLAYERS.findIndex(p => p.name === currentName);

    // 3. Find next available player in sequence
    const nextP = CRICKET_PLAYERS.slice(currentIndex + 1).find(p => !soldNames.has(p.name));
    
    if (!nextP) return alert("Auction Over! All players sold or presented.");
    
    const endAt = new Date(Date.now() + 10500).toISOString(); 

    // 4. Force Atomic Update to Database
    const { error } = await _supabase.from('auction_state').update({ 
        active_player: nextP.name, 
        current_bid: nextP.base * 100, 
        high_bidder: "NONE", 
        timer_ends_at: endAt 
    }).match({id: 1});

    if(error) console.error("Skip Error:", error);
}

// 🚩 AUTOMATIC HANDLING (SOLD/UNSOLD)
async function processEndOfTimer() {
    if (autoTriggered) return;
    autoTriggered = true;

    // 1. Fetch current state
    const { data: d } = await _supabase.from('auction_state').select('*').match({id: 1}).single();
    
    // 2. Early return if already processed or invalid
    if (!d || d.active_player === "READY" || !d.timer_ends_at) { 
        autoTriggered = false; 
        return; 
    }

    // 3. IMMEDIATE LOCK: Set timer_ends_at to null in DB to prevent other clients/refreshes from re-triggering
    await _supabase.from('auction_state').update({ timer_ends_at: null }).match({id: 1});

    const overlay = document.getElementById('status-overlay');
    const pObj = CRICKET_PLAYERS.find(x => x.name === d.active_player);
    
    if (overlay) {
        document.getElementById('status-player').innerText = d.active_player + (pObj?.is_overseas ? " (OS)" : "");
    }

    if (!d.high_bidder || d.high_bidder === "NONE") {
        if (overlay) {
            document.getElementById('status-title').innerText = "UNSOLD";
            document.getElementById('status-title').style.color = "var(--red)";
            document.getElementById('status-details').innerText = "SKIPPING...";
        }
        
        const entry = { name: d.active_player, role: pObj?.role, price: 0, isOS: pObj?.is_overseas };
        const { data: unsoldTeam } = await _supabase.from('squads').select('*').eq('team_name', 'UNSOLD').eq('room_code', roomCode).single();
        if (unsoldTeam) {
            await _supabase.from('squads').update({ players: [...(unsoldTeam.players || []), entry] }).eq('id', unsoldTeam.id);
        } else {
            await _supabase.from('squads').insert({ room_code: roomCode, team_name: 'UNSOLD', purse: 0, players: [entry] });
        }
    } else {
        if (overlay) {
            document.getElementById('status-title').innerText = "SOLD";
            document.getElementById('status-title').style.color = "var(--theme)";
            const price = d.current_bid / 100;
            document.getElementById('status-details').innerText = `${d.high_bidder} • ₹${price.toFixed(2)} CR`;
        }

        const { data: team } = await _supabase.from('squads').select('*').eq('team_name', d.high_bidder).eq('room_code', roomCode).single();
        if (team) {
            const price = d.current_bid / 100;
            const entry = { name: d.active_player, role: pObj.role, price: price, isOS: pObj.is_overseas };
            const updatedPlayers = [...(team.players || []), entry];
            await _supabase.from('squads').update({ purse: team.purse - price, players: updatedPlayers }).eq('id', team.id);
        }
    }

    if (overlay) overlay.style.display = "flex";
    
    setTimeout(async () => {
        if (overlay) overlay.style.display = "none";
        autoTriggered = false;
        await moveToNextPlayerAuto(); 
    }, 2500);
}
