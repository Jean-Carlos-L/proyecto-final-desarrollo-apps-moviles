document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para los botones dentro del segmento
    document.getElementById('tasksButton').addEventListener('click', function() {
        clearTaskList()
      // Mostrar tareas incompletas al hacer clic en "Tasks"
      showTasks(1); // 1 para tareas incompletas

    });
  
    document.getElementById('tasksCompleteButton').addEventListener('click', function() {
      // Mostrar tareas completadas al hacer clic en "Tasks Complete"
      clearTaskList()
      showTasks(2); // 2 para tareas completadas
    });
  
    // Mostrar las tareas incompletas por defecto al cargar la página
    showTasks(1);
  });

async function showTasks(type) {
    try {
        const url = 'http://localhost:3050/api/v1/tasks';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqdWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoianVhbml0bzIiLCJwYXNzd29yZCI6IiQyYSQxMCR4cDhlLjN5cEtObjExM1k0Z0YvLjd1ZUR2R3QxckMvenB2cVY5b3pISWtsRTJDMmxDYklJeSIsInN0YXRlIjoxLCJpYXQiOjE3MTU0MzgyMjB9.WdseGLkZNOhppWrj23Mcd5hRxlayAGdmxJIcgtOeJtI'
            }
        });
        const data = await response.json();
        console.log(data);
        createElementsTasks(data,type);
    } catch (error) {
        console.error(error);
    }
}

function createElementsTasks(data,type) {
    
    var list = document.getElementById('list_tasks');

    if (data.data != undefined && data.data != null && data.data.length > 0) {
        //filtramos para que solo muestre las tareas que no estan completadas

        data.data.filter(task => task.state == type).forEach(function(task) {
            var newElement = document.createElement("ons-list-item");

            console.log(task);

            var newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'left');
            newDiv.textContent = task.title + ' - ' + task.description;
            newElement.appendChild(newDiv);

            var newDiv2 = document.createElement('div');
            newDiv2.setAttribute('class', 'right');

            // Crear un contenedor para los iconos
            var iconContainer = document.createElement('div');
            iconContainer.style.display = 'flex'; // Para que los iconos estén en línea
            iconContainer.style.width= "25%"; // Para que los iconos estén en línea
            iconContainer.style.justifyContent = 'space-between'; // Para alinear los iconos a la derecha
            iconContainer.style.alignItems = 'center'; // Para centrar verticalmente los iconos

            //crear el boton para completar la tarea 
            var stateButton = document.createElement('ons-icon');
            stateButton.setAttribute('icon', 'fa-check');
            stateButton.style.color = 'green';
            stateButton.style.marginRight = '10px'; // Para separar los botones
            stateButton.onclick = function() {
                handleCompletTask(task.id);
            };

            // Crear el botón de modificar
            var updateButton = document.createElement('ons-icon');
            updateButton.setAttribute('icon', 'fa-cog');
            updateButton.style.color = 'blue';
            updateButton.onclick = function() {
                // mandamos los campos de titulo y descripcion a la ventana modal

                //traemos el id
                id = task.id;
                console.log(id);
                document.getElementById("task-title").value = task.title;
                document.getElementById("task-description").value = task.description;
                document.getElementById("task-date").value = task.date;

                
                //le cambiamos el nombre al boton
                document.getElementById("button-add-task").textContent = "Modificar";
                // mostramos la ventana modal
                showEditModal(id);
            };

            // Crear el botón de eliminar
            var delbutton = document.createElement('ons-icon');
            delbutton.setAttribute('icon', 'fa-trash'); 
            delbutton.style.color = 'red';
            delbutton.style.marginLeft = '10px'; // Para separar los botones
            delbutton.onclick = function() {
                handleDeleteTask(task.id);
            };

            // Agregar los botones al contenedor
            iconContainer.appendChild(stateButton);
            iconContainer.appendChild(updateButton);
            iconContainer.appendChild(delbutton);


            //queda muy junto y le meto un margin de 10px y deja de listar 
            // Agregar el contenedor al elemento de lista
            newDiv2.appendChild(iconContainer);
            newElement.appendChild(newDiv2);
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
        .addEventListener("click", showCreateModal);
        

function showCreateModal() {
    var modal = document.querySelector('ons-modal');
    modalMode = 'create';
    modal.show();
}
function showEditModal()  {
    var modal = document.querySelector('ons-modal');
    modalMode = 'edit';
    modal.show();
}
function handleTaskAction() {
    if (modalMode === 'create') {
        handleCreateTask();
    } else if (modalMode === 'edit') {

        handleEditTask(id);
    }
}
async function createTask({ name, description, date, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp }) {
    try {
        const url = 'http://localhost:3050/api/v1/tasks';
        const body = JSON.stringify({
            title: name,
            description: description,
            latitude: latitude,
            logitude: longitude,
            altitude: altitude,
            accuracy: accuracy,
            altitude_accuracy: altitudeAccuracy,
            heading: heading,
            speed: speed,
            timestamp: timestamp
        });
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqdWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoianVhbml0bzIiLCJwYXNzd29yZCI6IiQyYSQxMCR4cDhlLjN5cEtObjExM1k0Z0YvLjd1ZUR2R3QxckMvenB2cVY5b3pISWtsRTJDMmxDYklJeSIsInN0YXRlIjoxLCJpYXQiOjE3MTU0MzgyMjB9.WdseGLkZNOhppWrj23Mcd5hRxlayAGdmxJIcgtOeJtI'
            },
            body: body
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function handleCreateTask() {
    const name = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const date = document.getElementById("task-date").value;

    if (name.trim() !== '' && description.trim() !== '' && date.trim() !== '') {
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('textSpinner').style.display = 'block';
        getLocation(function(error, ubicacion) {
            if (error) {
                console.error('Error al obtener la ubicación:', error);
                // Aquí puedes manejar el error si ocurriera al obtener la ubicación
            } else {
                const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp } = ubicacion;
                createTask({ name, description, date, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp });
                alert("Tarea creada exitosamente");
                window.location.reload();
            }
        });
    } else {
        alert("Todos los campos son requeridos");
    }
}



document.getElementById("button-add-task").addEventListener("click",  handleTaskAction);

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var coords = position.coords;
            var latitude = coords.latitude;
            var longitude = coords.longitude;
            var altitude = coords.altitude;
            var accuracy = coords.accuracy;
            var altitudeAccuracy = coords.altitudeAccuracy;
            var heading = coords.heading;
            var speed = coords.speed;
            var timestamp = position.timestamp;

            // Crear un objeto con los datos de ubicación
            var ubicacion = {
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
                accuracy: accuracy,
                altitudeAccuracy: altitudeAccuracy,
                heading: heading,
                speed: speed,
                timestamp: timestamp
            };

            // Llamar a la devolución de llamada con los datos de ubicación
            callback(null, ubicacion);
        }, function(error) {
            console.error('Error al obtener la ubicación:', error);
            callback(error, null);
        });
    } else {
        console.error('El navegador no admite la geolocalización.');
        callback('Geolocalización no compatible.', null);
    }
}

async function updateTask({ id, name, description, date, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp }){
    try {
        const url = 'http://localhost:3050/api/v1/tasks/' + id;
        const body = JSON.stringify({
            title: name,
            description: description,
            latitude: latitude,
            logitude: longitude,
            altitude: altitude,
            accuracy: accuracy,
            altitude_accuracy: altitudeAccuracy,
            heading: heading,
            speed: speed,
            timestamp: timestamp
        });
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqdWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoianVhbml0bzIiLCJwYXNzd29yZCI6IiQyYSQxMCR4cDhlLjN5cEtObjExM1k0Z0YvLjd1ZUR2R3QxckMvenB2cVY5b3pISWtsRTJDMmxDYklJeSIsInN0YXRlIjoxLCJpYXQiOjE3MTU0MzgyMjB9.WdseGLkZNOhppWrj23Mcd5hRxlayAGdmxJIcgtOeJtI'
            },
            body: body
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function handleEditTask(id){

    const name = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const date = document.getElementById("task-date").value;

    if (name.trim() !== '' && description.trim() !== '' && date.trim() !== '') {
        getLocation(function(error, ubicacion) {
            if (error) {
                console.error('Error al obtener la ubicación:', error);
                // Aquí puedes manejar el error si ocurriera al obtener la ubicación
            } else {
                const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp } = ubicacion;
                updateTask({ id, name, description, date, latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp });
                alert("Tarea modificada exitosamente");
                window.location.reload();
            }
        });
    } else {
        alert("Todos los campos son requeridos");
    }
    
}
async function deleteTask(id){
    try {
        const url = 'http://localhost:3050/api/v1/tasks/' + id;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqdWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoianVhbml0bzIiLCJwYXNzd29yZCI6IiQyYSQxMCR4cDhlLjN5cEtObjExM1k0Z0YvLjd1ZUR2R3QxckMvenB2cVY5b3pISWtsRTJDMmxDYklJeSIsInN0YXRlIjoxLCJpYXQiOjE3MTU0MzgyMjB9.WdseGLkZNOhppWrj23Mcd5hRxlayAGdmxJIcgtOeJtI'
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
async function handleDeleteTask(id){

    if(confirm("¿Estás seguro de eliminar la tarea?")){
        deleteTask(id);
        alert("Tarea eliminada exitosamente");
        window.location.reload();
    }
}

async function completTask(id){
    try {
        const url = 'http://localhost:3050/api/v1/tasks/complete/' + id;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqdWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoianVhbml0bzIiLCJwYXNzd29yZCI6IiQyYSQxMCR4cDhlLjN5cEtObjExM1k0Z0YvLjd1ZUR2R3QxckMvenB2cVY5b3pISWtsRTJDMmxDYklJeSIsInN0YXRlIjoxLCJpYXQiOjE3MTU0MzgyMjB9.WdseGLkZNOhppWrj23Mcd5hRxlayAGdmxJIcgtOeJtI'
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
async function handleCompletTask(id){
   if(confirm("¿La tarea está completada?")){
        completTask(id);
        alert("Tarea completada exitosamente");
        window.location.reload();
    }
}
function clearTaskList() {
    // Obtener la lista de tareas
    var list = document.getElementById('list_tasks');
    // Limpiar la lista eliminando todos los elementos hijos
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

