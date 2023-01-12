// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");



eventListeners();



function eventListeners (){ // Tüm Event Listenerlar
  form.addEventListener("submit",addTodo);
  // Döküman tamamen yüklendikten sonra oluşuyor
  document.addEventListener("DOMContentLoaded",loadAallTodosToUI);
  secondCardBody.addEventListener("click",deleteTodo);
  filter.addEventListener("keyup",filterTodos);
  clearButton.addEventListener("click",clearAllTodos);
}


function clearAllTodos (e){
  const listItems = document.querySelectorAll(".list-group-item");
  // const todos = getTodosFromStorage();  // Benim yöntemim için gerekli
  if(confirm("Tümünü silmek istediğinize emin misiniz?")){
    // Arayüzden Todoları Temizleme
    // todoList.innerHTML = "" Yavaş yöntem 
    for (let i = 0; i < listItems.length; i++){
      if (todoList.firstElementChild === null){
        showAlert("success","Todo Başarı ile silindi!");
      }
      else {
        todoList.removeChild(todoList.firstElementChild);
      }
      // todos.forEach(function(){todos.splice(i)}); Benim yöntemim için gerekli
    }
    // localStorage.setItem("todos",JSON.stringify(todos)); Benim yöntemim için gerekli
    localStorage.removeItem("todos");
  }
}


function filterTodos(e){
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function(listItem){
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1){
      // Bulamadı
      listItem.setAttribute("style","display:none !important");
    }else {
      listItem.setAttribute("style","display:block");
    }
  });

}

function deleteTodo(e){
  if(e.target.className === "fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo Başarı ile silindi!");
  }
}

function deleteTodoFromStorage (deleteTodo){
  let todos = getTodosFromStorage();

  todos.forEach(function(todo,index){
    if(todo === deleteTodo){
      todos.splice(index,1); //Arrayden değeri silme
    }
  });

  localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAallTodosToUI (){
  let todos = getTodosFromStorage();

  todos.forEach(function (todo){
    addTodoToUI(todo);
  });
}

function addTodo (e){

  const newTodo = todoInput.value.trim();
  let todos = getTodosFromStorage();

  
  if(newTodo === ""){
    /* 
      <div class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
      </div>
    */
    showAlert("danger","Lütfen bir todo girin!");
  }else if(sameTodo(newTodo)){
    showAlert("danger","Aynı item tekrar eklenemez!");
  }
  else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","Todo Başarı ile Eklendi");
  }
  
  e.preventDefault();
}

// My Function 
function sameTodo(newTodo){
  let todos = getTodosFromStorage();
  for(let i = 0; i < todos.length; i++){
    if(todos[i] === newTodo){
      return true;
    }
  };
}

function getTodosFromStorage (){
  // Storagedan Todoları Alma
  let todos;
  if (localStorage.getItem("todos") === null){
    todos = [];
  }
  else {
    // todos'u array olarak almak için JSON.parse kullanıldı
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function addTodoToStorage(newTodo){
  let todos = getTodosFromStorage();

  todos.push(newTodo);
  //todos'u array formundan dönüştürmek için JSON.stringify kullanıldı
  localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert (type,message){

  // My Solution
  // const div = document.createElement("div");
  // const myMessage = document.createTextNode(message);

  // div.className = "alert alert-danger";
  // div.appendChild(myMessage);
  // firstCardBody.appendChild(div);

  // Course Solution
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function(){
    alert.remove();
  },2000);
}

function addTodoToUI(newTodo){ // String Değeri list item olarak UI'a Ekleyecek
  // List Item Oluşturma
  const listItem = document.createElement("li");
  // Link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  
  listItem.className = "list-group-item d-flex justify-content-between";
  // Text Node ekleme

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // Todo Liste List Item ı ekleme

  todoList.appendChild(listItem);
  todoInput.value = "";
}


















