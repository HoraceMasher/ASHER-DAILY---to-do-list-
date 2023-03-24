//get input and task elements
const addTask= document.getElementById("addBtn");
const taskInput= document.getElementById("taskInput");
const  taskList= document.getElementById("taskList");


let tasks =[];
addTask.addEventListener('click',
function (event){
  event.preventDefault();
  addTodo(taskInput.value);
});

function addTodo (item){
  if (item !== "") {
    const todo ={
      id: Date.now(),
      name: item,
      completed: false,
    };
    tasks.push(todo);
    renderToDos();
    taskInput.value= "";
  }
} 

function renderToDos(){
  taskList.innerHTML="";
  tasks.forEach(function(item) {
    const checked =item.completed? 'checked': null;
    const  li= document.createElement("li");
    li.setAttribute("class", "item")
    li.setAttribute("data-key", item.id);

    if(item.completed=== true) {
      li.classList.add('checked');
    }
    li.innerHTML=
   `<input type="checkbox" class="checkbox" ${checked}>
   ${item.name}
   <button class= "delete-button">x</button>`;
   taskList.append(li);
  });
}


function addToLocalStorage(toDos) {
  localStorage.setItem("toDos", JSON.stringify(tasks));
  renderToDos();
}

