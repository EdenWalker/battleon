function submitForm() {
  // Collect form data
  const formData = {
    name: document.getElementById('name').value,
    race: document.getElementById('race').value,
    class: document.getElementById('class').value,
    level: document.getElementById('level').value,
    healthPoints: document.getElementById('healthPoints').value,
    strength: document.getElementById('strength').value,
    dexterity: document.getElementById('dexterity').value,
    constitution: document.getElementById('constitution').value,
    intelligence: document.getElementById('intelligence').value,
    wisdom: document.getElementById('wisdom').value,
    charisma: document.getElementById('charisma').value,
    skills: document.getElementById('skills').value,
    inventory: document.getElementById('inventory').value
  };

  // Convert JSON object to string
  const jsonData = JSON.stringify(formData, null, 2);

  // Write JSON string to a file named player.json
  const fs = require('fs');
  fs.writeFileSync('player.json', jsonData);

  alert('Form data saved successfully!');
}
function updateDisplay() {
  // Update HTML display based on form data
  document.getElementById('name2').textContent = document.getElementById('name').value;
  document.getElementById('race2').textContent = document.getElementById('race').value;
  document.getElementById('class2').textContent = document.getElementById('class').value;
  document.getElementById('level2').textContent = document.getElementById('level').value;
  document.getElementById('healthPoints2').textContent = document.getElementById('healthPoints').value;
  document.getElementById('strength2').textContent = document.getElementById('strength').value;
  document.getElementById('dexterity2').textContent = document.getElementById('dexterity').value;
  document.getElementById('constitution2').textContent = document.getElementById('constitution').value;
  document.getElementById('intelligence2').textContent = document.getElementById('intelligence').value;
  document.getElementById('wisdom2').textContent = document.getElementById('wisdom').value;
  document.getElementById('charisma2').textContent = document.getElementById('charisma').value;
  const skillsList = document.getElementById('skills').value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
  document.getElementById('skills2').innerHTML = skillsList;

  const inventoryList = document.getElementById('inventory').value.split(',').map(item => `<li>${item.trim()}</li>`).join('');
  document.getElementById('inventory2').innerHTML = inventoryList;

  // Alert message for demo purpose
  alert('Display updated successfully!');
  }

function constructSaveState() {
  const character = {
    name: "Eden Walker", // Assuming this is hardcoded or obtained from somewhere else
    race: loadJSON('race.json').name,
    class: loadJSON('class.json').name,
    level: 1, // Example value, adjust as needed
    healthPoints: 20, // Example value, adjust as needed
    strength: 15, // Example value, adjust as needed
    dexterity: 12, // Example value, adjust as needed
    constitution: 14, // Example value, adjust as needed
    intelligence: 10, // Example value, adjust as needed
    wisdom: 8, // Example value, adjust as needed
    charisma: 11, // Example value, adjust as needed
    skills: loadJSON('skills.json').skills,
    inventory: loadJSON('inventory.json').items
  };

  // Convert skills object to array of skill objects
  const skillsArray = Object.keys(character.skills).map(skill => ({
    name: skill,
    proficiency: character.skills[skill]
  }));

  // Construct savestate array
  const savestate = [
    character.name,
    character.race,
    character.class,
    character.level,
    character.healthPoints,
    character.strength,
    character.dexterity,
    character.constitution,
    character.intelligence,
    character.wisdom,
    character.charisma,
    skillsArray,
    character.inventory
  ];

  return savestate;
}

// Example usage:
const savestate = constructSaveState();
console.log(savestate);