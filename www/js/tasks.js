document.addEventListener("DOMContentLoaded", onDeviceReady);

function onDeviceReady() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    showTasks(tasks);
}


async function showTasks(tasks) {
    try {
        const url= 'http://localhost:3050/api/v1/tasks'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqdWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoianVhbml0bzIiLCJwYXNzd29yZCI6IiQyYSQxMCR4cDhlLjN5cEtObjExM1k0Z0YvLjd1ZUR2R3QxckMvenB2cVY5b3pISWtsRTJDMmxDYklJeSIsInN0YXRlIjoxLCJpYXQiOjE3MTU0MzgyMjB9.WdseGLkZNOhppWrj23Mcd5hRxlayAGdmxJIcgtOeJtI'
            }
        });
        const data = await response.json();
        console.log(data);

        var list = document.getElementById('list_tasks');

        if (tasks != undefined && tasks != null && tasks.length > 0) {
            data.data.forEach(function(task) {
                var newElement = document.createElement("ons-list-item");
                console.log(task);
                newElement.textContent = task.title;
                // Crear el botón de modificar
                var editButton = document.createElement('ons-icon');
                editButton.setAttribute('icon', 'create-outline'); 
                editButton.onclick = function() {
                    // Aquí puedes agregar la lógica para modificar la tarea
                    console.log('Modificando tarea:', task);
                };
                // Agregar el botón al elemento de lista
                newElement.appendChild(editButton);
                list.appendChild(newElement);
            });
        } else {
            // Si no hay tareas, mostrar el mensaje 'No tienes tareas'
            var noTasksElement = document.createElement("ons-list-item");
            noTasksElement.textContent = 'No tienes tareas';
            list.appendChild(noTasksElement);
        }
    } catch (error) {
        console.error(error);
    }
   
}
document
        .getElementById("button-task-new")
        .addEventListener("click", showModal);
        

function showModal() {
    var modal = document.querySelector('ons-modal');
    modal.show();
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
        getLocation(function(error, ubicacion) {
            if (error) {
                console.error('Error al obtener la ubicación:', error);
                // Aquí puedes manejar el error si ocurriera al obtener la ubicación
            } else {
                console.log('Ubicación obtenida:', ubicacion);
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

document.getElementById("button-add-task").addEventListener("click",  handleCreateTask)

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


