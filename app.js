let addButton = document.querySelector("#add-btn");
let todoInput = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");


if (localStorage.getItem("todos")) {
  todoList.innerHTML = localStorage.getItem("todos");
}

addButton.addEventListener("click", addTodo);

function addTodo(events) {
  let todoText = todoInput.value;
  events.preventDefault();
  if (todoText.trim() === "") {
    return;
  }

  let todoItems = document.createElement("li");

  todoItems.innerHTML = `
    <input type="checkbox" id="check">
    <span>${todoText}</span>
    <button class="edit-btn">Modifier</button>
    <button class="delete-btn">Supprimer</button>
  `;

  todoList.appendChild(todoItems);


  localStorage.setItem("todos", todoList.innerHTML);

  let edit = todoItems.querySelector(".edit-btn");
  edit.addEventListener("click", editTodo);

  let check = todoItems.querySelector("#check");
  let supprimer = todoItems.querySelector(".delete-btn");
  supprimer.addEventListener("click", removeTodo);
  check.addEventListener("change", checkTodo);

  todoInput.value = "";
}

function removeTodo(e) {
  let supp = e.target;
  if (supp.classList.contains("delete-btn")) {
    let getParent = supp.parentNode;
    getParent.remove();


    localStorage.setItem("todos", todoList.innerHTML);
  }
}

function checkTodo(params) {
  let verification = params.target;
  if (verification.checked) {
    verification.classList.add("checked");
  } else {
    verification.classList.remove("checked");
  }


  localStorage.setItem("todos", todoList.innerHTML);
}

function editTodo(ev) {
  let edit = ev.target;
  let parent = edit.parentNode;
  todoInput.value = parent.children[1].innerText;
  parent.remove();

  localStorage.setItem("todos", todoList.innerHTML);
}


let resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", resetTodos);

function resetTodos(e) {
  if (window.confirm("voulez vous renitialiser tous les données seront effacer ?")) {
    localStorage.clear();
    todoList.innerHTML = "";
  }
  else{
    e.preventDefault();
  }
}