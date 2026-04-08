const CRICKET_PLAYERS = [
    // 🏆 SET 1 (Legendary – 2 Cr FIXED)
    { name: "MS Dhoni", role: "WK", base: 2.00, is_overseas: false },
    { name: "Virat Kohli", role: "BAT", base: 2.00, is_overseas: false },
    { name: "Rohit Sharma", role: "BAT", base: 2.00, is_overseas: false },
    { name: "KL Rahul", role: "BAT", base: 2.00, is_overseas: false },
    { name: "Jos Buttler", role: "BAT", base: 2.00, is_overseas: true },
    { name: "Jasprit Bumrah", role: "BOWL", base: 2.00, is_overseas: false },
    { name: "Mitchell Starc", role: "BOWL", base: 2.00, is_overseas: true },
    { name: "Rashid Khan", role: "AR", base: 2.00, is_overseas: true },
    { name: "Ravindra Jadeja", role: "AR", base: 2.00, is_overseas: false },
    { name: "Sunil Narine", role: "AR", base: 2.00, is_overseas: true },

    // ⚡ SET 2 (1.75 Cr)
    { name: "Sanju Samson", role: "BAT", base: 1.75, is_overseas: false },
    { name: "Rishabh Pant", role: "BAT", base: 1.75, is_overseas: false },
    { name: "Shubman Gill", role: "BAT", base: 1.75, is_overseas: false },
    { name: "Suryakumar Yadav", role: "BAT", base: 1.75, is_overseas: false },
    { name: "Heinrich Klaasen", role: "BAT", base: 1.75, is_overseas: true },
    { name: "Mohammed Shami", role: "BOWL", base: 1.75, is_overseas: false },
    { name: "Kagiso Rabada", role: "BOWL", base: 1.75, is_overseas: true },
    { name: "Kuldeep Yadav", role: "BOWL", base: 1.75, is_overseas: false },
    { name: "Hardik Pandya", role: "AR", base: 1.75, is_overseas: false },
    { name: "Glenn Maxwell", role: "AR", base: 1.75, is_overseas: true },

    // 🚀 SET 3 (1.50 Cr)
    { name: "Ishan Kishan", role: "BAT", base: 1.50, is_overseas: false },
    { name: "Phil Salt", role: "BAT", base: 1.50, is_overseas: true },
    { name: "Ruturaj Gaikwad", role: "BAT", base: 1.50, is_overseas: false },
    { name: "Yashasvi Jaiswal", role: "BAT", base: 1.50, is_overseas: false },
    { name: "Nicholas Pooran", role: "BAT", base: 1.50, is_overseas: true },
    { name: "Trent Boult", role: "BOWL", base: 1.50, is_overseas: true },
    { name: "Arshdeep Singh", role: "BOWL", base: 1.50, is_overseas: false },
    { name: "T Natarajan", role: "BOWL", base: 1.50, is_overseas: false },
    { name: "Andre Russell", role: "AR", base: 1.50, is_overseas: true },
    { name: "Axar Patel", role: "AR", base: 1.50, is_overseas: false },

    // 🔥 SET 4 (1.25 Cr)
    { name: "Devon Conway", role: "BAT", base: 1.25, is_overseas: true },
    { name: "Aiden Markram", role: "BAT", base: 1.25, is_overseas: true },
    { name: "Rinku Singh", role: "BAT", base: 1.25, is_overseas: false },
    { name: "Tilak Varma", role: "BAT", base: 1.25, is_overseas: false },
    { name: "Shimron Hetmyer", role: "BAT", base: 1.25, is_overseas: true },
    { name: "Bhuvneshwar Kumar", role: "BOWL", base: 1.25, is_overseas: false },
    { name: "Yuzvendra Chahal", role: "BOWL", base: 1.25, is_overseas: false },
    { name: "Varun Chakravarthy", role: "BOWL", base: 1.25, is_overseas: false },
    { name: "Marcus Stoinis", role: "AR", base: 1.25, is_overseas: true },
    { name: "Washington Sundar", role: "AR", base: 1.25, is_overseas: false },

    // 💪 SET 5 (1.00 Cr)
    { name: "Liam Livingstone", role: "BAT", base: 1.00, is_overseas: true },
    { name: "Tim David", role: "BAT", base: 1.00, is_overseas: true },
    { name: "Rahul Tripathi", role: "BAT", base: 1.00, is_overseas: false },
    { name: "Harry Brook", role: "BAT", base: 1.00, is_overseas: true },
    { name: "Mohammed Siraj", role: "BOWL", base: 1.00, is_overseas: false },
    { name: "Avesh Khan", role: "BOWL", base: 1.00, is_overseas: false },
    { name: "Prasidh Krishna", role: "BOWL", base: 1.00, is_overseas: false },
    { name: "Cameron Green", role: "AR", base: 1.00, is_overseas: true },
    { name: "Sam Curran", role: "AR", base: 1.00, is_overseas: true },
    { name: "Wanindu Hasaranga", role: "AR", base: 1.00, is_overseas: true },

    // ⚔️ SET 6 (0.90 Cr)
    { name: "Devdutt Padikkal", role: "BAT", base: 0.90, is_overseas: false },
    { name: "Nitish Rana", role: "BAT", base: 0.90, is_overseas: false },
    { name: "Rahmanullah Gurbaz", role: "BAT", base: 0.90, is_overseas: true },
    { name: "Quinton de Kock", role: "BAT", base: 0.90, is_overseas: true },
    { name: "Jitesh Sharma", role: "WK", base: 0.90, is_overseas: false },
    { name: "Deepak Chahar", role: "BOWL", base: 0.90, is_overseas: false },
    { name: "Mukesh Kumar", role: "BOWL", base: 0.90, is_overseas: false },
    { name: "Noor Ahmad", role: "BOWL", base: 0.90, is_overseas: true },
    { name: "Ravichandran Ashwin", role: "AR", base: 0.90, is_overseas: false },
    { name: "Mitchell Marsh", role: "AR", base: 0.90, is_overseas: true },

    // 🌟 SET 7 (0.75 Cr)
    { name: "Abhishek Sharma", role: "AR", base: 0.75, is_overseas: false },
    { name: "Yash Dayal", role: "BOWL", base: 0.75, is_overseas: false },
    { name: "Akash Madhwal", role: "BOWL", base: 0.75, is_overseas: false },
    { name: "Kuldeep Sen", role: "BOWL", base: 0.75, is_overseas: false },
    { name: "Gerald Coetzee", role: "AR", base: 0.75, is_overseas: true },
    { name: "Rachin Ravindra", role: "AR", base: 0.75, is_overseas: true },
    { name: "Azmatullah Omarzai", role: "AR", base: 0.75, is_overseas: true },
    { name: "Matheesha Pathirana", role: "BOWL", base: 0.75, is_overseas: true },
    { name: "Pat Cummins", role: "BOWL", base: 0.75, is_overseas: true },
    { name: "Travis Head", role: "BAT", base: 0.75, is_overseas: true },

    // 🔥 SET 8 (0.50 Cr)
    { name: "Ayush Badoni", role: "AR", base: 0.50, is_overseas: false },
    { name: "Shahrukh Khan", role: "AR", base: 0.50, is_overseas: false },
    { name: "Nandre Burger", role: "BOWL", base: 0.50, is_overseas: true },
    { name: "Spencer Johnson", role: "BOWL", base: 0.50, is_overseas: true },
    { name: "Maheesh Theekshana", role: "BOWL", base: 0.50, is_overseas: true },
    { name: "Adam Zampa", role: "BOWL", base: 0.50, is_overseas: true },
    { name: "David Warner", role: "BAT", base: 0.50, is_overseas: true },
    { name: "Faf du Plessis", role: "BAT", base: 0.50, is_overseas: true },
    { name: "Mohit Sharma", role: "BOWL", base: 0.50, is_overseas: false },
    { name: "Khaleel Ahmed", role: "BOWL", base: 0.50, is_overseas: false },

    // 🚀 SET 9 (0.50 Cr)
    { name: "KS Bharat", role: "WK", base: 0.50, is_overseas: false },
    { name: "Prithvi Shaw", role: "BAT", base: 0.50, is_overseas: false },
    { name: "Angkrish Raghuvanshi", role: "BAT", base: 0.50, is_overseas: false },
    { name: "Sameer Rizvi", role: "BAT", base: 0.50, is_overseas: false },
    { name: "Tristan Stubbs", role: "BAT", base: 0.50, is_overseas: true },
    { name: "Harshit Rana", role: "BOWL", base: 0.50, is_overseas: false },
    { name: "Yash Thakur", role: "BOWL", base: 0.50, is_overseas: false },
    { name: "Arzan Nagwaswalla", role: "BOWL", base: 0.50, is_overseas: false },
    { name: "Shivam Dube", role: "AR", base: 0.50, is_overseas: false },
    { name: "Romario Shepherd", role: "AR", base: 0.50, is_overseas: true },

    // ⚡ SET 10 (0.40 Cr)
    { name: "Donovan Ferreira", role: "WK", base: 0.40, is_overseas: true },
    { name: "Vishnu Vinod", role: "WK", base: 0.40, is_overseas: false },
    { name: "Ricky Bhui", role: "BAT", base: 0.40, is_overseas: false },
    { name: "Priyam Garg", role: "BAT", base: 0.40, is_overseas: false },
    { name: "Dewald Brevis", role: "BAT", base: 0.40, is_overseas: true },
    { name: "Mohsin Khan", role: "BOWL", base: 0.40, is_overseas: false },
    { name: "Kartik Tyagi", role: "BOWL", base: 0.40, is_overseas: false },
    { name: "Chetan Sakariya", role: "BOWL", base: 0.40, is_overseas: false },
    { name: "Rahul Tewatia", role: "AR", base: 0.40, is_overseas: false },
    { name: "Jason Holder", role: "AR", base: 0.40, is_overseas: true },

    // 🔥 SET 11 (0.40 Cr)
    { name: "Urvil Patel", role: "WK", base: 0.40, is_overseas: false },
    { name: "Avanish Aravelly", role: "WK", base: 0.40, is_overseas: false },
    { name: "Shaik Rasheed", role: "BAT", base: 0.40, is_overseas: false },
    { name: "Samarth Vyas", role: "BAT", base: 0.40, is_overseas: false },
    { name: "Finn Allen", role: "BAT", base: 0.40, is_overseas: true },
    { name: "Vyshak Vijaykumar", role: "BOWL", base: 0.40, is_overseas: false },
    { name: "Prince Yadav", role: "BOWL", base: 0.40, is_overseas: false },
    { name: "Venkatesh Iyer", role: "AR", base: 0.40, is_overseas: false },
    { name: "Marco Jansen", role: "AR", base: 0.40, is_overseas: true },
    { name: "Noor Ahmad", role: "BOWL", base: 0.40, is_overseas: true },

    // 💪 SET 12 (UPDATED – 0.30 Cr)
    { name: "Luvnith Sisodia", role: "WK", base: 0.30, is_overseas: false },
    { name: "Kumar Kushagra", role: "WK", base: 0.30, is_overseas: false },
    { name: "Nehal Wadhera", role: "BAT", base: 0.30, is_overseas: false },
    { name: "Abhinav Manohar", role: "BAT", base: 0.30, is_overseas: false },
    { name: "Shashank Singh", role: "BAT", base: 0.30, is_overseas: false },
    { name: "Sandeep Sharma", role: "BOWL", base: 0.30, is_overseas: false },
    { name: "Yudhvir Singh", role: "BOWL", base: 0.30, is_overseas: false },
    { name: "Rasikh Dar", role: "BOWL", base: 0.30, is_overseas: false },
    { name: "Shahbaz Ahmed", role: "AR", base: 0.30, is_overseas: false },
    { name: "Odean Smith", role: "AR", base: 0.30, is_overseas: true },

    // ⚔️ SET 13 (UPDATED – 0.30 Cr)
    { name: "Anuj Rawat", role: "WK", base: 0.30, is_overseas: false },
    { name: "Dhruv Jurel", role: "WK", base: 0.30, is_overseas: false },
    { name: "Rajat Patidar", role: "BAT", base: 0.30, is_overseas: false },
    { name: "Manish Pandey", role: "BAT", base: 0.30, is_overseas: false },
    { name: "Swastik Chikara", role: "BAT", base: 0.30, is_overseas: false },
    { name: "Tushar Deshpande", role: "BOWL", base: 0.30, is_overseas: false },
    { name: "Suyash Sharma", role: "BOWL", base: 0.30, is_overseas: false },
    { name: "Mayank Yadav", role: "BOWL", base: 0.30, is_overseas: false },
    { name: "Ramandeep Singh", role: "AR", base: 0.30, is_overseas: false },
    { name: "Daryl Mitchell", role: "AR", base: 0.30, is_overseas: true },

    // 🌟 SET 14 (UPDATED – 0.20 Cr)
    { name: "Prabhsimran Singh", role: "WK", base: 0.20, is_overseas: false },
    { name: "Aryan Juyal", role: "WK", base: 0.20, is_overseas: false },
    { name: "Sai Sudharsan", role: "BAT", base: 0.20, is_overseas: false },
    { name: "Naman Dhir", role: "BAT", base: 0.20, is_overseas: false },
    { name: "Riyan Parag", role: "AR", base: 0.20, is_overseas: false },
    { name: "Kulwant Khejroliya", role: "BOWL", base: 0.20, is_overseas: false },
    { name: "Manav Suthar", role: "BOWL", base: 0.20, is_overseas: false },
    { name: "Saurabh Kumar", role: "AR", base: 0.20, is_overseas: false },
    { name: "Fazalhaq Farooqi", role: "BOWL", base: 0.20, is_overseas: true },
    { name: "Reece Topley", role: "BOWL", base: 0.20, is_overseas: true }
];

// ---------- Player order randomisation ----------
// Shuffle players within each price set (base value) to ensure varied auction order.
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Group players by their base price (set)
const _playerGroups = {};
CRICKET_PLAYERS.forEach(p => {
  const key = p.base;
  if (!_playerGroups[key]) _playerGroups[key] = [];
  _playerGroups[key].push(p);
});

// Shuffle each group individually
Object.values(_playerGroups).forEach(group => shuffleArray(group));

// Rebuild CRICKET_PLAYERS preserving the original set order (high to low)
CRICKET_PLAYERS.length = 0;
[2.00, 1.75, 1.50, 1.25, 1.00, 0.90, 0.75, 0.50, 0.40, 0.30, 0.20].forEach(base => {
  if (_playerGroups[base]) CRICKET_PLAYERS.push(..._playerGroups[base]);
});
// ---------------------------------------------------