//get input and task elements
const addTask= document.getElementById("addBtn");
const taskInput= document.getElementById("taskInput");
const  taskList= document.getElementById("taskList");

/**creates an empty array
 * listens to the click event of the button
 *  and adds a  new task to the array by calling the addTodo function with the value of the input element
 */
let tasks =[];
addTask.addEventListener('click',
function (event){
  event.preventDefault();
  addTodo(taskInput.value);
});

/*function takes on the function parameter and adds a new task to the array
checks if 'item' is not an empty string 
if it's not; creates anobject 'todo' and set it's properties
pushes the object to the tasks array and saves it on the local storage
clears the input field to allow the user enter a new task*/
function addTodo (item){
  if (item !== "") {
    const todo ={
      id: Date.now(),
      name: item,
      completed: false,
    };
    tasks.push(todo);
   addToLocalStorage();
    taskInput.value= "";
  }
} 
/*Generates a HTML representation of the tasks stored in the 'tasks ' array
and appends them to the Html element with the "taskList' id.*/
function renderToDos(){
  taskList.innerHTML="";
  /*iteraates over the task array and for ach task;
  it creates a variable set to the string 'checked' that checks the 'completed' property of the task
  And it creates a new 'li' element and sets two attributes 'class' and 'data-key' */
  tasks.forEach(function(item) {
    const checked =item.completed? 'checked': null;
    const  li= document.createElement("li");
    li.setAttribute("class", "item")
    li.setAttribute("data-key", item.id);

    if(item.completed=== true) {//if the 'completed' property is true it adds the 'checked class to the 'li'
      li.classList.add('checked');
    }
    li.innerHTML=//sets the innerHTML property of the'li' to a string using templet literals.
   `<input type="checkbox" class="checkbox" ${checked}> 
   ${item.name}
   <button class= "delete-button">x</button>`;
   taskList.append(li);// appends the 'li' element to the taskList element
  });
}

/*saves the 'tasks' array to the browsers local storage and updates the HTML display of the tasks */
function addToLocalStorage(toDos) {
  localStorage.setItem("toDos", JSON.stringify(tasks)/*converts the array to string */);
  renderToDos();
}
/*function retrives tasks from local storage and updates the 'tasks array and the HTML
called when the page is loaded to restore tasks from  a previous session  */
function getFromLocalStorage(){
  const reference =localStorage.getItem("tasks");
  if(reference){// checks if the refernce variable is true.
    tasks=JSON.parse(reference);
    renderToDos(tasks);
  }
}
getFromLocalStorage();

taskList.addEventListener("click", function(event){
  if(event.target.type==="checkbox") {// calls toggle function and checks the task
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
  if(event.target.classList.contains("delete-button")){// calls the deleteTodo function
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }

function toggle(id) {// rupdates the ToDo list in response to the users action by clicking the check bok to find if the task is completed or uncompleted
  tasks.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
addToLocalStorage(tasks);
}

function deleteTodo(id) {// deletes an item from the tasks array if the user clicks the deletebutton
  tasks= tasks.filter(function(item) {// filter method filters out the selected item
    return item.id != id;
  });
  addToLocalStorage(tasks);
}
});