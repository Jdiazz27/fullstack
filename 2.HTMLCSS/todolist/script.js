//js: lenguaje interpretado, dinamico, multiparadigma

//variables y tipos
var nombre = "Juan"
var edad = 15
var estatura = 1.80
var estudiante = true

//condicionales
if (edad >= 18) {
    console.log("Es mayor de edad")
} else {
    console.log("Es menor de edad")
}

//objetos
let tarea = {
    id: 1, 
    nombre: "Tarea 1",
  completada: false
}
console.log(tarea)
console.log(tarea.nombre)
//fin practica 

let tareas = [];
let idCounter = 0;

// Función para agregar una nueva tarea
function agregarTarea() {
    const input = document.querySelector(".input-section input");
    const nombre = input.value.trim();

    if (nombre !== "") {
        idCounter++;
        const tarea = {
            id: idCounter,
            nombre: nombre,
            completada: false
        };
        tareas.push(tarea);
        input.value = "";
        mostrarTareas();
    }
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    mostrarTareas();
}

// Función para completar una tarea
function completarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        mostrarTareas();
    }
}

// Función para mostrar las tareas
function mostrarTareas(filtro = "todas") {
    const todoList = document.getElementById("todoList");
    const itemsCounter = document.querySelector(".footer span");
    todoList.innerHTML = "";

    let tareasFiltradas = tareas;
    if (filtro === "completed") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada);
    } else if (filtro === "active") {
        tareasFiltradas = tareas.filter(tarea => !tarea.completada);
    }

    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todoItem">
                <input type="checkbox" ${tarea.completada ? "checked" : ""} onclick="completarTarea(${tarea.id})">
                <span style="text-decoration: ${tarea.completada ? 'line-through' : 'none'}">${tarea.nombre}</span>
                <button onclick="eliminarTarea(${tarea.id})">X</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    if (tareasFiltradas.length === 0) {
        const li = document.createElement("li");
        li.innerHTML = "No hay tareas";
        todoList.appendChild(li);
    }

    itemsCounter.textContent = `${tareas.length} items`;
}

// Evento para el botón de agregar tarea
document.getElementById("agregarBtn").addEventListener("click", agregarTarea);

// Filtros para las tareas
document.querySelectorAll(".filterBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filterBtn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filtro = btn.textContent.trim().toLowerCase();
        mostrarTareas(filtro === "all" ? "todas" : filtro);
    });
});

// Botón para limpiar tareas completadas
document.getElementById("clear-completed").addEventListener("click", () => {
    tareas = tareas.filter(tarea => !tarea.completada);
    mostrarTareas();
});