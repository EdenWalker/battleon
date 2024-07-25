// function submitForm() {
//   // Collect form data
//   const formData = {
//     name: document.getElementById('name').value,
//     race: document.getElementById('race').value,
//     class: document.getElementById('class').value,
//     level: document.getElementById('level').value,
//     healthPoints: document.getElementById('healthPoints').value,
//     strength: document.getElementById('strength').value,
//     dexterity: document.getElementById('dexterity').value,
//     constitution: document.getElementById('constitution').value,
//     intelligence: document.getElementById('intelligence').value,
//     wisdom: document.getElementById('wisdom').value,
//     charisma: document.getElementById('charisma').value,
//     skills: document.getElementById('skills').value,
//     inventory: document.getElementById('inventory').value
//   };

//   // Convert JSON object to string
//   const jsonData = JSON.stringify(formData, null, 2);

//   // Write JSON string to a file named player.json
//   const fs = require('fs');
//   fs.writeFileSync('../json/player.json', jsonData);

//   alert('Form data saved successfully!');
// }
async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error('Failed to fetch JSON');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
}

async function constructSaveState() {
  try {
    const character = {
      name: document.getElementById('name').value,
      race: (await loadJSON('../json/race.json')).name,
      class: (await loadJSON('../json/class.json')).name,
      level: parseInt(document.getElementById('level').value),
      healthPoints: parseInt(document.getElementById('healthPoints').value),
      strength: parseInt(document.getElementById('strength').value),
      dexterity: parseInt(document.getElementById('dexterity').value),
      constitution: parseInt(document.getElementById('constitution').value),
      intelligence: parseInt(document.getElementById('intelligence').value),
      wisdom: parseInt(document.getElementById('wisdom').value),
      charisma: parseInt(document.getElementById('charisma').value),
      skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
      inventory: document.getElementById('inventory').value.split(',').map(item => item.trim())
    };

    return character;
  } catch (error) {
    console.error('Error constructing save state:', error);
    return null;
  }
}
async function generateSaveFile() {
  try {
    // Get form values from displayed elements
    const name2 = document.getElementById('name2').innerText;
    const race2 = document.getElementById('race2').innerText;
    const class2 = document.getElementById('class2').innerText;
    const level2 = document.getElementById('level2').innerText;
    const healthPoints2 = document.getElementById('healthPoints2').innerText;
    const strength2 = document.getElementById('strength2').innerText;
    const dexterity2 = document.getElementById('dexterity2').innerText;
    const constitution2 = document.getElementById('constitution2').innerText;
    const intelligence2 = document.getElementById('intelligence2').innerText;
    const wisdom2 = document.getElementById('wisdom2').innerText;
    const charisma2 = document.getElementById('charisma2').innerText;
    const skills2 = document.getElementById('skills').value; 
    const inventory2 = document.getElementById('inventory').value; 
    const playerData = [
      name2, race2, class2, level2, healthPoints2,
      strength2, dexterity2, constitution2, intelligence2,
      wisdom2, charisma2, skills2, inventory2
    ].join(',');

    
    const saveouttext = document.getElementById('saveouttext');
    saveouttext.value = playerData;
  } catch (error) {
    console.error('Error generating save file:', error);
    alert('Failed to generate save file. Please check console for errors.');
  }
}

function loadSaveFile() {
  try {
    // Get the value from savetext input
    const savetext = document.getElementById('savetext').value.trim();
    
    // Split the saved data into individual components
    const [
      name2, race2, class2, level2, healthPoints2,
      strength2, dexterity2, constitution2, intelligence2,
      wisdom2, charisma2, skills2, inventory2
    ] = savetext.split(',');

 // Update the displayed elements with loaded data
 document.getElementById('name2').innerText = name2;
 document.getElementById('race2').innerText = race2;
 document.getElementById('class2').innerText = class2;
 document.getElementById('level2').innerText = level2;
 document.getElementById('healthPoints2').innerText = healthPoints2;
 document.getElementById('strength2').innerText = strength2;
 document.getElementById('dexterity2').innerText = dexterity2;
 document.getElementById('constitution2').innerText = constitution2;
 document.getElementById('intelligence2').innerText = intelligence2;
 document.getElementById('wisdom2').innerText = wisdom2;
 document.getElementById('charisma2').innerText = charisma2;
 document.getElementById('skills').value = skills2;
 document.getElementById('inventory').value = inventory2;
 
 // Optionally, update any other display elements for skills and inventory lists
 updateSkillsDisplay(skills2); // Function to update skills display
 updateInventoryDisplay(inventory2); // Function to update inventory display

 alert('Save file loaded successfully!');
} catch (error) {
 console.error('Error loading save file:', error);
 alert('Failed to load save file. Please check console for errors.');
}
}

// Function to update skills display based on skills2 data
function updateSkillsDisplay(skillsData) {
const skillsList = skillsData.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
document.getElementById('skills2').innerHTML = skillsList;
}

// Function to update inventory display based on inventory2 data
function updateInventoryDisplay(inventoryData) {
const inventoryList = inventoryData.split(',').map(item => `<li>${item.trim()}</li>`).join('');
document.getElementById('inventory2').innerHTML = inventoryList;
}

// Attach event listeners
document.getElementById('loadsavefile').addEventListener('click', loadSaveFile);

function submitForm() {
  // Update display based on form data
  updateDisplay();
  
  // Optionally, generate save file
  generateSaveFile();
}

function updateDisplay() {
  // Update HTML display based on form data
  document.getElementById('name2').innerText = document.getElementById('name').value;
  document.getElementById('race2').innerText = document.getElementById('race').value;
  document.getElementById('class2').innerText = document.getElementById('class').value;
  document.getElementById('level2').innerText = document.getElementById('level').value;
  document.getElementById('healthPoints2').innerText = document.getElementById('healthPoints').value;
  document.getElementById('strength2').innerText = document.getElementById('strength').value;
  document.getElementById('dexterity2').innerText = document.getElementById('dexterity').value;
  document.getElementById('constitution2').innerText = document.getElementById('constitution').value;
  document.getElementById('intelligence2').innerText = document.getElementById('intelligence').value;
  document.getElementById('wisdom2').innerText = document.getElementById('wisdom').value;
  document.getElementById('charisma2').innerText = document.getElementById('charisma').value;

  const skillsList = document.getElementById('skills').value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
  document.getElementById('skills2').innerHTML = skillsList; 

  const inventoryList = document.getElementById('inventory').value.split(',').map(item => `<li>${item.trim()}</li>`).join('');
  document.getElementById('inventory2').innerHTML = inventoryList;
}

async function fetchInventoryData() {

    const response = await fetch('../json/inventory.json');
    if (!response.ok) {
      throw new Error('Failed to fetch inventory data');
    }
    return await response.json();

}

async function generateRandomItemsUnderCostLimit(limit) {
  try {
    const inventoryData = await fetchInventoryData();
    
    let items = inventoryData.map(item => ({
      item_name: item.item_name,
      quantity: item.quantity,
      description: item.description,
      cost: item.cost
    }));

    let selectedItems = [];
    let totalCost = 0;

    // Shuffle items array randomly
    items.sort(() => Math.random() - 0.5);

    // Iterate through items to select those under the cost limit
    for (let item of items) {
      if (totalCost + item.cost <= limit) {
        selectedItems.push(item);
        totalCost += item.cost;
      } else {
        break; // Stop once the limit is reached
      }
    }

    return selectedItems;
  } catch (error) {
    console.error('Error generating random items:', error);
    return [];
  }
}

async function updateInventoryTextarea(limit) {
  const selectedItems = await generateRandomItemsUnderCostLimit(limit);

  const fullList = selectedItems.map(item => `${item.item_name} x${item.quantity}`).join(', ');
  document.querySelector('#inventory').value = fullList;

  // Optionally, update display after updating inventory
  updateDisplay();
}

// Initialize display and inventory
updateInventoryTextarea(800);