let monsterlist = [];
// monsterlist.push({ Id: 1, Name: "Buy groceries", Urgency: 3 }, { Id: 2, Name: "Call dad", Urgency: 2 }, { Id: 3, Name: "Finish project report", Urgency: 5 }
// );


// const compendium = [
//   {
//     "monster id": "0000",
//     "monster": "dire wolf",
//     "type": "wolf",
//     "element": "normal",
//     "level": "5",
//     "rarity": "common",
//     "weakness": { "multiplier": ["eyes", "belly"] },
//     "location": { "landmark": ["forest", "plains"] },
//     "hitpoint": 25,
//     "attack": "2-5",
//     "defence": 1
//   }
// ];

// function addmon() {
//   compendium.push({
//     "monster id": "0001",
//     "monster": "new monster",
//     "type": "beast",
//     "element": "fire",
//     "level": "3",
//     "rarity": "rare",
//     "weakness": { "multiplier": ["back", "tail"] },
//     "location": { "landmark": ["mountain", "cave"] },
//     "hitpoint": 30,
//     "attack": "3-7",
//     "defence": 2
//   });
// }

function addmon() {
  // Define the new monster data
  const newMonster = {
    "monster id": document.getElementById('monster_id').value,
    "monster": document.getElementById('monster').value,
    "type": document.getElementById('type').value,
    "element": document.getElementById('element').value,
    "level": document.getElementById('level').value,
    "rarity": document.getElementById('rarity').value,
    "weakness": { "multiplier": document.getElementById('weakness').value.split(',') },
    "location": { "landmark": document.getElementById('location').value.split(',') },
    "hitpoint": parseInt(document.getElementById('hitpoint').value),
    "attack": document.getElementById('attack').value,
    "defence": parseInt(document.getElementById('defence').value)
};
  };

  // Convert the new monster data to JSON format
  const jsonData = JSON.stringify(newMonster);

  // Update monster.json with the new monster data
  // You can use AJAX, Node.js, or other server-side technologies to handle file writing
  // For simplicity, this example demonstrates the client-side approach
  const fs = require('fs');
  fs.writeFileSync('../json/monster.json', jsonData);

  alert('Monster data pushed to monster.json successfully!');

// Adding a new monster entry to the compendium
document.getElementById('submit').addEventListener('click', addmon)

// Output the updated compendium
console.log(addmon);
