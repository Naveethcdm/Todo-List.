// Load from LocalStorage

  var Arr = JSON.parse(localStorage.getItem("Arr")) || [];

// Add Todo

function addTodo() {
  var input = document.getElementById("todoInput");
  var task = input.value.trim();

  if (task === "") {
    alert("Please enter the task");
    return;
  }

  // Duplicate check

  var isDuplicate = Arr.some(
    todo => todo.text.toLowerCase() === task.toLowerCase()
  );

  if (isDuplicate) {
    alert("Task already exists!");
    input.value = "";
    return;
  }

  Arr.push({
    text: task,
    Completed:false
  });

  input.value = "";
  saveArr();
  renderArr();
}

  //toggle function

function strike(index) {
  Arr[index].completed = !Arr[index].completed;
  saveArr();
  renderArr();
}

// Delete todo

function deleteTodo(index) {
  Arr.splice(index, 1);
  saveArr();
  renderArr();
}

// Save LocalStorage

function saveArr() {
  localStorage.setItem("Arr", JSON.stringify(Arr));
}
  // render function

  function renderArr() {
  var ul = document.getElementById("todoList");

  ul.innerHTML = Arr.map((todo, index) => `
      <li class="li">

 <span class="${todo.completed ?"done":""} "onclick="strike(${index})"> ${todo.text} </span>

        <button onclick="deleteTodo(${index})">x</button>
      </li>
    `)
    .join("");
}

// Enter key add

  var enter=document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTodo();
  });

// First render
renderArr();