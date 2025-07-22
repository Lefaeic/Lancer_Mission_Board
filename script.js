fetch('https://raw.githubusercontent.com/Lefaeic/Project_RRI/refs/heads/main/missions/missions_phase_1.json')
  .then(response => response.json())
  .then(missions => {
    const board = document.getElementById('mission-board');
    missions.forEach(mission => {
      const card = document.createElement('div');
      card.className = 'mission-card';
      card.innerHTML = `
        <h2>${mission.title}</h2>
        <p><strong>Faction:</strong> ${mission.faction}</p>
        <p><strong>Brief:</strong> ${mission.brief}</p>
        <p><strong>Encryption:</strong> ${mission.encryption}</p>
        <p><strong>Assigned:</strong> ${mission.players.join(', ')}</p>
      `;

      card.addEventListener('click', () => {
        showDetails(mission);
      });

      board.appendChild(card);
      board.height = '90%';

      const detail = document.getElementById('mission-detail')
      detail.innerHTML = '<p>Select a mission to view its details.</p>'
    });
  });
const bgm = document.getElementById("background-music");

function showDetails(mission) {
  const detail = document.getElementById('mission-detail');
  detail.innerHTML = '';
  const content = document.createElement('div');
  content.className = 'mission-detail-wrapper';
  var audio = document.getElementById('typingSFX');

  if (audio.paused) {
    audio.play();
  }else{
    audio.currentTime = 0
  }

  document.getElementById('typingSFX').play();

  content.innerHTML = `
    <h2>${mission.title}</h2>
    <p class="typewriter"><strong>Faction:</strong> ${mission.faction}</p>
    <p class="typewriter"><strong>Priority:</strong> ${mission.priority}</p>
    <p class="typewriter"><strong>Tags:</strong> ${mission.tags.join(', ')}</p>
    <p class="typewriter">${mission.details}</p>
    <button class="textinput" onclick="sendMissionAction('${mission.title}', 'join')">Join</button>
  `;
  detail.appendChild(content);
  detail.style.display = 'block';
}

function login() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert("Enter your name.");
    return;
  }

  localStorage.setItem("horus_username", username);

  if (bgm) bgm.play();

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('boot-screen').style.display = 'block';
  printNextLine();
  document.getElementById('greet').textContent = `Welcome, ${username}.`;



  const musicToggle = document.getElementById('music-toggle');

  musicToggle.addEventListener('click', () => {
    if (bgm.paused) {
      bgm.play();
      musicToggle.textContent = 'BGM: 🔊';
    } else {
      bgm.pause();
      musicToggle.textContent = 'BGM: 🔇';
    }
})};

const bootLines = [
  "[INIT] Injecting v4 kernel package...done",
  "[INIT] H0R_OS kernel verified. Liturgicode leak: ACCEPTABLE. Booting...",
  "",
  "[KERNEL] HOR_OS v4.0 (Pfhoraphoubia Distro)",
  "[KERNEL] Bootloader initialized...",
  "[KERNEL] Mounting primary cortex...",
  "[KERNEL] Verifying synapse matrix... OK",
  "[KERNEL] Loading HORUS Runtime Environment... done",
  "[SYSTEM] Omni daemon launching... done",
  "[SYSTEM] Pinging Rubicon database... done",
  "[SYSTEM] Establishing uplink to OP_NET...",
  "[WARNING] Encryption detected: Hathor/Aleph...",
  "[SYSTEM] Decrypting mission payload...",
  "[STATUS] Reconstructing entropy profile for user...",
  "[ERROR] >> bootlog.rec#@!% — cannot decode source",
  "[MONITOR] /veil/gatewatch.d: status RED",
  "[PATHFINDER] ∆ve locators aligned. Predictive stability: 37%",
  "[NEURAL BRIDGE] Uplink: RAVEN/HELA terminated ∵ signal echo exceeded safe bounds",
  "[LOG] ∴ Compiling memories... done",
  "[W/R MODE] Recursive containment initiated",
  "[REDACTED] :: and then they became the garden.",
  "",
  "Welcome, Lancer."
];

const bootLog = document.getElementById('boot-log');
const bootScreen = document.getElementById('boot-screen');
const missionScreen = document.getElementById('mission-screen');
let index = 0;

function printNextLine() {
  if (index < bootLines.length) {
    bootLog.textContent += bootLines[index] + "\n";
    index++;
    bootLog.scrollTop = bootLog.scrollHeight;
    setTimeout(printNextLine, 150);
  } else {
    bootScreen.classList.add('fade-out');
    setTimeout(() => {
      bootScreen.style.display = 'none';
      missionScreen.style.display = 'block';
    }, 2000);
  }
}
;

function sendMissionAction(missionName, action) {
  const playerName = localStorage.getItem('horus-username') || 'Unknown Player';
  const payload = {
    playerName,
    missionName,
    action
  };

  fetch('https://script.google.com/macros/s/AKfycbyXQIA89XZWAo8zwhKmT8K0_yS18Ji7v9qWGCs8zh8JF8XfV0vzn__faYxmDWXZK541-w/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      alert(`✅ ${action} request sent for "${missionName}".`);
    } else {
      alert(`❌ Error: ${data.message}`);
    }
  })
  .catch(err => {
    alert(`❌ Failed to send request: ${err}`);
  });
}
