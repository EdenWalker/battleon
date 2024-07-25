// let monsterlist = [];


// function addmon() {
//   // Define the new monster data
//   const newMonster = {
//     "monster id": document.getElementById('monster_id').value,
//     "monster": document.getElementById('monster').value,
//     "type": document.getElementById('type').value,
//     "element": document.getElementById('element').value,
//     "level": document.getElementById('level').value,
//     "rarity": document.getElementById('rarity').value,
//     "weakness": { "multiplier": document.getElementById('weakness').value.split(',') },
//     "location": { "landmark": document.getElementById('location').value.split(',') },
//     "hitpoint": parseInt(document.getElementById('hitpoint').value),
//     "attack": document.getElementById('attack').value,
//     "defence": parseInt(document.getElementById('defence').value)
// };
//   };

//   // Convert the new monster data to JSON format
//   const jsonData = JSON.stringify(newMonster);

//   // Update monster.json with the new monster data
//   // You can use AJAX, Node.js, or other server-side technologies to handle file writing
//   // For simplicity, this example demonstrates the client-side approach
//   const fs = require('fs');
//   fs.writeFileSync('../json/monster.json', jsonData);

//   alert('Monster data pushed to monster.json successfully!');

// // Adding a new monster entry to the compendium
// document.getElementById('submit').addEventListener('click', addmon)

// // Output the updated compendium
// console.log(addmon);
let monstersData = [];
let currentIndex = 0;

// Function to fetch JSON data asynchronously
async function fetchMonsters() {
 
    const response = await fetch('../json/monster.json'); 
    const data = await response.json();
    return data;

}

// Function to fetch element data based on element_id
async function fetchElementData(elementId) {

    const response = await fetch('../json/element.json');
    const data = await response.json();
    return data[elementId] || {};

}

// Function to fetch landmark data based on landmark_id
async function fetchLandmarkData(landmarkId) {

    const response = await fetch('../json/landmark.json'); 
    const data = await response.json();
    const landmark = data.landmarks.find(item => item.landmark_id === landmarkId);
    return landmark || {};
}

// Function to fetch multiplier data based on multiplier_id
async function fetchMultiplierData(multiplierId) {

    const response = await fetch('../json/multiplier.json'); 
    const data = await response.json();
    const multiplier = data.multipliers.find(item => item.multiplier_id === multiplierId);

    return multiplier || {};

}

function createFormItem(labelText, inputId, inputType = 'text', readOnly = true) {
  const li = document.createElement('li');
  li.classList.add('form-row');

  const label = document.createElement('label');
  label.setAttribute('for', inputId);
  label.textContent = labelText;
  li.appendChild(label);

  const input = document.createElement('input');
  input.setAttribute('type', inputType);
  input.setAttribute('id', inputId);
  input.setAttribute('class', 'paper2');
  input.setAttribute('name', inputId);
  input.setAttribute('readonly', readOnly);
  li.appendChild(input);

  return li;
}

// Function to populate form fields with current monster data
async function populateForm(index) {
  const currentMonster = monstersData[index];
  const formList2 = document.getElementById('monsterList');
  formList2.innerHTML = ''; 

  formList2.appendChild(createFormItem('Monster ID:', 'monster_id2'));
  formList2.appendChild(createFormItem('Monster:', 'monster2'));
  formList2.appendChild(createFormItem('Type:', 'type2'));
  formList2.appendChild(createFormItem('Element ID:', 'element_id2'));
  formList2.appendChild(createFormItem('Level:', 'level2'));
  formList2.appendChild(createFormItem('Rarity:', 'rarity2'));
  formList2.appendChild(createFormItem('Weakness :', 'weakness2'));
  formList2.appendChild(createFormItem('Location :', 'location2'));
  formList2.appendChild(createFormItem('Hitpoints:', 'hitpoint2'));
  formList2.appendChild(createFormItem('Attack:', 'attack2'));
  formList2.appendChild(createFormItem('Defense:', 'defence2'));


  // Set values for each input directly from currentMonster data
  document.getElementById('monster_id2').value = currentMonster.monster_id;
  document.getElementById('monster2').value = currentMonster.monster;
  document.getElementById('type2').value = currentMonster.type;
  document.getElementById('element_id2').value = currentMonster.element_id;
  document.getElementById('level2').value = currentMonster.level;
  document.getElementById('rarity2').value = currentMonster.rarity;
  document.getElementById('weakness2').value = currentMonster.weakness.multiplier_id.join(', ');
  document.getElementById('location2').value = currentMonster.location.landmark_id.join(', ');
  document.getElementById('hitpoint2').value = currentMonster.hitpoint;
  document.getElementById('attack2').value = currentMonster.attack;
  document.getElementById('defence2').value = currentMonster.defence;

  const [elementData, weaknessData, locationData] = await Promise.all([
    fetchElementData(currentMonster.element_id),
    Promise.all(currentMonster.weakness.multiplier_id.map(id => fetchMultiplierData(id))),
    Promise.all(currentMonster.location.landmark_id.map(id => fetchLandmarkData(id)))
  ]);

  document.getElementById('element_id2').value = elementData.element;

  document.getElementById('weakness2').value = weaknessData.map(item => item.name).join(', ');

  document.getElementById('location2').value = locationData.map(item => item.name).join(', ');

  }


// Event listeners for navigation buttons
document.querySelector('#prevButton').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + monstersData.length) % monstersData.length;
  populateForm(currentIndex);
});

document.getElementById('nextButton').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % monstersData.length;
  populateForm(currentIndex);
});

document.getElementById('randomButton').addEventListener('click', function() {
  currentIndex = Math.floor(Math.random() * monstersData.length);
  populateForm(currentIndex);
});

// Function to initialize the application
async function initialize() {
  try {
    monstersData = await fetchMonsters();
    if (monstersData.length > 0) {
      populateForm(currentIndex); // Initial population of form with first monster data
    } else {
      console.log('No monsters data found.');
    }
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Initialize the application
initialize();