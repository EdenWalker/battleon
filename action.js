let todos = [];
todos.push({ Id: 1, Name: "Buy groceries", Urgency: 3 }, { Id: 2, Name: "Call dad", Urgency: 2 }, { Id: 3, Name: "Finish project report", Urgency: 5 }
);
let submitButton = document.querySelector("#submitBtn");
submitButton.addEventListener("click", function(){
  let firstNameInput = document.querySelector("#firstName");
  let firstName = firstNameInput.value;

  // we can do the querySelector and getting the value in one line
  let phoneNumber = document.querySelector("#phoneNumber").value;

  // extract which role has been selected
  let roleCheckbox = document.querySelector(".role:checked");
  let role = roleCheckbox.value;

  // by contrast, getElementById or getElementsByClassName is more limited
  // you cannot use pesudo class. You can only indicate the name of the Id or class
  // let roleCheckboxes = document.getElementsByClassName("role");
  // let checked = null;
  // for (let c of roleCheckboxes) {
  //   if (c.checked == true) {
  //     checked = c;
  //     break;
  //   }
  // }

  // get all the checkboxes that have been checked
  let selectedCheckboxes = document.querySelectorAll('.tasks:checked');
  let tasks = []; //<-- represent the result or answer (aka accumulator)
  for (let checkbox of selectedCheckboxes) {
    tasks.push(checkbox.value);
  }


  let industry = document.querySelector("#industry").value;
  

  console.log(firstName, phoneNumber, role, tasks, industry);})