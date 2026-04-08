const SB_URL = "https://egwsnptrjcyavfnnanti.supabase.co"; 
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnd3NucHRyamN5YXZmbm5hbnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDg1NTQsImV4cCI6MjA5MDI4NDU1NH0.ZY9MbJDOaBCjyaWKtm0tiM2s_QzRAU3OXFTCauopaBA";
const _supabase = supabase.createClient(SB_URL, SB_KEY);

let myTeam = ""; 
let teamData = {}; 
let roomCode = new URLSearchParams(window.location.search).get('room') || "";
let currentPlayerIndex = 0; 
let isPaused = false;
window.currentPlayerData = null;

// --- 🔄 SYNC ENGINE ---
window.initSync = async function(isHost) {
    await fetchTeams();
    _supabase.channel('auction_state').on('postgres_changes', { event: 'UPDATE', table: 'auction_state' }, p => {
        updateAuctionUI(p.new, isHost);
    }).subscribe();
    _supabase.channel('squads_sync').on('postgres_changes', { event: '*', table: 'squads' }, () => fetchTeams()).subscribe();
};

async function fetchTeams() {
    if (!roomCode) return;
    const { data } = await _supabase.from('squads').select('*').eq('room_code', roomCode);
    if (data) {
        teamData = {};
        data.forEach(d => { teamData[d.team_name] = { purse: parseFloat(d.purse), players: d.players || [] }; });
        if (typeof renderSidebar === 'function') renderSidebar();
    }
}

function updateAuctionUI(d, isHost) {
    const nameEle = isHost ? 'p-name' : 'live-p-name';
    const priceEle = isHost ? 'p-price' : 'live-p-price';
    const bidderEle = isHost ? 'p-bidder' : 'live-p-bidder';
    if (document.getElementById(nameEle)) document.getElementById(nameEle).innerText = d.active_player;
    if (document.getElementById(priceEle)) document.getElementById(priceEle).innerText = (d.current_bid / 100).toFixed(2);
    if (document.getElementById(bidderEle)) document.getElementById(bidderEle).innerText = d.high_bidder || "NONE";
    window.windowTimerEnds = d.timer_ends_at ? new Date(d.timer_ends_at).getTime() : null;
}

// --- 🚀 START / NEXT PLAYER ---
window.startAuction = async function() {
    if (typeof CRICKET_PLAYERS === 'undefined') return alert("players_list.js load aagala mapla!");
    if (currentPlayerIndex >= CRICKET_PLAYERS.length) return alert("All players done!");

    const p = CRICKET_PLAYERS[currentPlayerIndex];
    window.currentPlayerData = p;
    const endAt = new Date(Date.now() + 10000).toISOString();

    const { error } = await _supabase.from('auction_state').update({
        active_player: p.name,
        current_bid: p.base * 100,
        high_bidder: 'NONE',
        timer_ends_at: endAt
    }).eq('id', 1);

    if (!error) currentPlayerIndex++;
    else alert("Supabase Error: Check if Row ID 1 exists!");
};

// --- ⚔️ BIDDING (Alternating) ---
window.handleBid = async function() {
    const { data } = await _supabase.from('auction_state').select('*').eq('id', 1).single();
    if (data.high_bidder === myTeam) return alert("Wait for another team!");
    if (isPaused) return alert("Auction is Paused!");

    let timeLeft = (new Date(data.timer_ends_at).getTime() - Date.now()) / 1000;
    let endAt = new Date(Date.now() + (Math.min(timeLeft + 3, 10) * 1000)).toISOString();

    await _supabase.from('auction_state').update({ 
        current_bid: data.current_bid + 20, 
        high_bidder: myTeam, 
        timer_ends_at: endAt 
    }).eq('id', 1);
};

// --- ⏹️ PAUSE / RESUME ---
window.togglePause = async function() {
    isPaused = !isPaused;
    const btn = document.getElementById('pause-btn');
    if (isPaused) {
        btn.innerText = "NEXT PLAY (RESUME)";
        btn.style.background = "#00f2ff"; btn.style.color = "#000";
        await _supabase.from('auction_state').update({ timer_ends_at: null }).eq('id', 1);
    } else {
        btn.innerText = "PAUSE";
        btn.style.background = "transparent"; btn.style.color = "#facc15";
        const endAt = new Date(Date.now() + 10000).toISOString();
        await _supabase.from('auction_state').update({ timer_ends_at: endAt }).eq('id', 1);
    }
};

window.markSold = async function() {
    const bidder = document.getElementById('p-bidder').innerText;
    const price = parseFloat(document.getElementById('p-price').innerText);
    const pName = document.getElementById('p-name').innerText;

    if (bidder !== "NONE" && bidder !== "") {
        const pInfo = window.currentPlayerData || { role: "BAT", os: false };
        const currentTeam = teamData[bidder];
        const newPlayers = [...(currentTeam.players || []), { name: pName, role: pInfo.role, os: pInfo.os, price: price }];

        await _supabase.from('squads').update({ 
            purse: currentTeam.purse - price, players: newPlayers 
        }).eq('team_name', bidder).eq('room_code', roomCode);
    }
    window.startAuction(); 
};

window.resetAuction = async function() {
    if(confirm("Reset?")) location.reload();
};
