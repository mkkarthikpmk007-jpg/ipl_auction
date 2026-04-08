const SB_URL = "https://egwsnptrjcyavfnnanti.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnd3NucHRyamN5YXZmbm5hbnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDg1NTQsImV4cCI6MjA5MDI4NDU1NH0.ZY9MbJDOaBCjyaWKtm0tiM2s_QzRAU3OXFTCauopaBA";
const _supabase = supabase.createClient(SB_URL, SB_KEY);

let teamData = {}, roomCode = new URLSearchParams(window.location.search).get('room')?.toUpperCase() || "OX1RL";
let currentPlayerIndex = 0, isPaused = false, autoTriggered = false, timerInt;

async function init() {
    await fetchTeams();
    document.getElementById('room-display').innerText = "ROOM: " + roomCode;

    _supabase.channel('auc').on('postgres_changes', { event: 'UPDATE', table: 'auction_state' }, p => {
        const d = p.new;
        document.getElementById('p-name').innerText = d.active_player;
        document.getElementById('p-price').innerText = (d.current_bid/100).toFixed(2);
        document.getElementById('p-bidder').innerText = d.high_bidder || "NONE";
        
        if (d.timer_ends_at && !isPaused) {
            autoTriggered = false;
            startTimer(new Date(d.timer_ends_at).getTime());
        } else if (!d.timer_ends_at) {
            clearInterval(timerInt);
            document.getElementById('t-display').innerText = "00";
        }
    }).subscribe();

    _supabase.channel('sq').on('postgres_changes', { event: '*', table: 'squads' }, () => fetchTeams()).subscribe();
}

async function startAuction() {
    if (currentPlayerIndex >= CRICKET_PLAYERS.length) return alert("Auction Over!");
    const p = CRICKET_PLAYERS[currentPlayerIndex];
    const endAt = new Date(Date.now() + 10000).toISOString();
    await _supabase.from('auction_state').update({
        active_player: p.name, current_bid: p.base*100, high_bidder: 'NONE', timer_ends_at: endAt
    }).match({id:1});
    currentPlayerIndex++;
}

async function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('pause-btn');
    if (isPaused) {
        btn.innerText = "RESUME";
        btn.style.background = "#facc15"; btn.style.color = "#000";
        clearInterval(timerInt);
        await _supabase.from('auction_state').update({ timer_ends_at: null }).match({id:1});
    } else {
        btn.innerText = "PAUSE";
        btn.style.background = "transparent"; btn.style.color = "#facc15";
        const endAt = new Date(Date.now() + 10000).toISOString();
        await _supabase.from('auction_state').update({ timer_ends_at: endAt }).match({id:1});
    }
}

function startTimer(end) {
    clearInterval(timerInt);
    timerInt = setInterval(() => {
        const diff = Math.ceil((end - Date.now())/1000);
        const tDisp = document.getElementById('t-display');
        
        if(diff <= 0) {
            tDisp.innerText = "00"; clearInterval(timerInt);
            if(!autoTriggered) { autoTriggered = true; markSold(); }
        } else {
            tDisp.innerText = diff.toString().padStart(2,'0');
            // 🚩 Timer Color Logic
            if (diff > 6) tDisp.style.color = "#00f2ff";
            else if (diff > 3) tDisp.style.color = "#facc15";
            else tDisp.style.color = "#ff4d4d";
        }
    }, 1000);
}

async function markSold() {
    const bidder = document.getElementById('p-bidder').innerText;
    const price = parseFloat(document.getElementById('p-price').innerText);
    if(bidder !== "NONE" && bidder !== "") {
        const overlay = document.getElementById('sold-overlay');
        document.getElementById('sold-team-box').innerText = bidder;
        document.getElementById('sold-price-box').innerText = "₹" + price.toFixed(2) + " Cr";
        overlay.style.display = "flex";
        setTimeout(() => { overlay.style.display = "none"; }, 2000);

        const team = teamData[bidder];
        const playerEntry = JSON.stringify({ name: document.getElementById('p-name').innerText, role: "BAT", price: price });
        await _supabase.from('squads').update({ purse: team.purse-price, players: [...(team.players || []), playerEntry] }).eq('team_name', bidder).eq('room_code', roomCode);
    }
    setTimeout(startAuction, 3000);
}

async function fetchTeams() {
    const { data } = await _supabase.from('squads').select('*').eq('room_code', roomCode);
    if(data) {
        teamData = {}; const list = document.getElementById('teams-list'); list.innerHTML = "";
        data.forEach(d => {
            teamData[d.team_name] = { purse: parseFloat(d.purse), players: d.players || [] };
            list.innerHTML += `<div class="team-card"><b>${d.team_name}</b><br><span style="color:#22c55e;">₹${d.purse.toFixed(2)} Cr</span></div>`;
        });
    }
}

function copyInvite() {
    const link = window.location.origin + "/player.html?room=" + roomCode;
    navigator.clipboard.writeText(link).then(() => {
        const btn = document.getElementById('share-btn');
        const oldText = btn.innerText;
        btn.innerText = "COPIED!";
        btn.style.color = "#00f2ff";
        setTimeout(() => { btn.innerText = oldText; btn.style.color = "#fff"; }, 2000);
    });
}

// 🚩 Trigger initialization
init();
