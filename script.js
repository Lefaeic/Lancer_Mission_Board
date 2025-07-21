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
        <p><strong>Encryption:</strong> ${mission.status}</p>
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
  `;
  detail.appendChild(content);
  detail.style.display = 'block';
}
