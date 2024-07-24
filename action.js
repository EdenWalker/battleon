document.addEventListener('DOMContentLoaded', function() {
  const monsterFile = 'monster.json';

  // Fetch data from monster.json
  function fetchMonsterData(callback) {
      fetch(monsterFile)
          .then(response => response.json())
          .then(data => callback(data))
          .catch(error => console.error('Error fetching monster data:', error));
  }

  // Function to get a random monster from the data array
  function getRandomMonster(monsters) {
      const randomIndex = Math.floor(Math.random() * monsters.length);
      return monsters[randomIndex];
  }

  // Function to render monster information in #monsterbox
  function renderMonsterInfo(monsterData) {
      const monsterBox = document.getElementById('monsterbox');

      // Get a random monster
      const randomMonster = getRandomMonster(monsterData);

      // Construct HTML based on random monster
      monsterBox.innerHTML = `
          <h2>${randomMonster.monster}</h2>
          <p><strong>Type:</strong> ${randomMonster.type}</p>
          <p><strong>Element:</strong> ${randomMonster.element}</p>
          <p><strong>Level:</strong> ${randomMonster.level}</p>
          <p><strong>Rarity:</strong> ${randomMonster.rarity}</p>
          <p><strong>Weakness:</strong> ${randomMonster.weakness.multiplier.join(', ')}</p>
          <p><strong>Location:</strong> ${randomMonster.location.landmark.join(', ')}</p>
          <p><strong>Hitpoints:</strong> ${randomMonster.hitpoint}</p>
          <p><strong>Attack:</strong> ${randomMonster.attack}</p>
          <p><strong>Defence:</strong> ${randomMonster.defence}</p>
      `;
  }

  // Event listener for #hunt button click
  document.getElementById('hunt').addEventListener('click', function() {
      fetchMonsterData(renderMonsterInfo);
  });
});
