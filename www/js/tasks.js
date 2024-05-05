document.addEventListener("DOMContentLoaded", onDeviceReady);

function onDeviceReady() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    showTasks(tasks);
}


function showTasks(tasks) {
    var list = document.getElementById('list_tasks');

    if (tasks != undefined && tasks != null && tasks.length > 0) {
        tasks.forEach(function(task) {
            var newElement = document.createElement("ons-list-item");
            console.log(task);
            newElement.textContent = task.name;
            list.appendChild(newElement);
        });
    } else {
        // Si no hay tareas, mostrar el mensaje 'No tienes tareas'
        var noTasksElement = document.createElement("ons-list-item");
        noTasksElement.textContent = 'No tienes tareas';
        list.appendChild(noTasksElement);
    }
}
document
        .getElementById("button-task-new")
        .addEventListener("click", showModal);
        

function showModal() {
    var modal = document.querySelector('ons-modal');
    modal.show();
}
function createTask({name, description, date}) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name, description, date});
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleCreateTask(){
    const name = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const date = document.getElementById("task-date").value;
    if(name.trim() !== '' && description.trim() !== '' && date.trim() !== ''){
        createTask({name, description, date});
        alert("Task created successfully");
        window.location.reload();
    }else{
        alert("All fields are required");
    }

}

document.getElementById("button-add-task").addEventListener("click",  handleCreateTask)
