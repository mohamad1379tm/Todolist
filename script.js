let addBtn = document.querySelector("button");
let input = document.querySelector("input");
let todosContainer = document.querySelector(".todos-wrapper");
let filterBtn = document.getElementById("select-box");
let allTodos = [];

function addNewTodo() {
  let inputValue = input.value;

  let newTodo = {
    id: allTodos.length + 1,
    title: inputValue,
    isDone: false
  };

  allTodos.push(newTodo);
  setLocal(allTodos);
  generateTodo(allTodos);
  clearInputs();
}

function clearInputs() {
  input.value = "";
}

function setLocal(allTodos) {
  localStorage.setItem("todos", JSON.stringify(allTodos));
  generateTodo(allTodos);
}

function generateTodo(allTodos) {
  let newTodoDiv, newTodoP, actionsWrapper, newTodoCheckbox, removeBtn;
  todosContainer.innerHTML = "";

  allTodos.forEach((todo) => {
    newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo");

    newTodoP = document.createElement("p");
    newTodoP.innerHTML = todo.title;

    actionsWrapper = document.createElement("div");
    actionsWrapper.style.display = "flex";

    removeBtn = document.createElement("button");
    removeBtn.innerHTML = "*";
    removeBtn.classList.add("removeButton");
    removeBtn.addEventListener("click", () => removeTodo(todo.id));

    newTodoCheckbox = document.createElement("input");
    newTodoCheckbox.setAttribute("type", "checkbox");
    newTodoCheckbox.addEventListener("click", () => statusToggler(todo));
    todo.isDone
      ? newTodoCheckbox.setAttribute("checked", "")
      : newTodoCheckbox.removeAttribute("checked");

    actionsWrapper.append(newTodoCheckbox, removeBtn);
    newTodoDiv.append(newTodoP, actionsWrapper);
    todosContainer.append(newTodoDiv);
  });
}

function getLocal() {
  let allData = JSON.parse(localStorage.getItem("todos"));

  if (allData) {
    allTodos = allData;
  } else {
    allTodos = [];
  }

  generateTodo(allTodos);
}

function statusToggler(todo) {
  todo.isDone = !todo.isDone;

  setLocal(allTodos);
}

function removeTodo(todoID) {
  let removedTodoIndex = allTodos.findIndex((todo) => {
    return todo.id === todoID;
  });

  allTodos.splice(removedTodoIndex, 1);
  setLocal(allTodos);
}

function filterHandler() {
  let filterValue = filterBtn.value;

  if (filterValue === "all") {
    setLocal(allTodos);
  } else if (filterValue === "completed") {
    let completedTodos = allTodos.filter((todo) => {
      return todo.isDone === true;
    });

    setLocal(completedTodos);
  } else {
    let incompleteTodos = allTodos.filter((todo) => {
      return todo.isDone === false;
    });
    setLocal(incompleteTodos);
  }
}

addBtn.addEventListener("click", addNewTodo);
window.addEventListener("load", getLocal);
filterBtn.addEventListener("change", filterHandler);
