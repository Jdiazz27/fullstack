//js: lenguaje interpretado, dinamico, multiparadigma
// ==============================
// 📌 CONCEPTOS GENERALES DE JAVASCRIPT
// ==============================

// JavaScript es un lenguaje interpretado, dinámico y multiparadigma

// ==============================
// 📌 VARIABLES Y TIPOS DE DATOS (NO FORMAN PARTE DEL DOM)
// ==============================
// Estas variables solo existen en memoria y no interactúan con el HTML
var nombre = "Juan"; // String
var edad = 15; // Número
var estatura = 1.80; // Número decimal
var estudiante = true; // Booleano

// ==============================
// 📌 CONDICIONALES (NO FORMAN PARTE DEL DOM)
// ==============================
// Solo evalúan valores y ejecutan código en memoria o consola
if (edad >= 18) {
    console.log("Es mayor de edad"); // Se imprime en la consola, NO en el DOM
} else {
    console.log("Es menor de edad"); // Se imprime en la consola, NO en el DOM
}

// ==============================
// 📌 OBJETOS EN MEMORIA (NO FORMAN PARTE DEL DOM)
// ==============================
// Este objeto existe en memoria, pero no se muestra en la página hasta que lo usemos en el DOM
let tarea = {
    id: 1,
    nombre: "Tarea 1",
    completada: false
};

// ✅ Esto se imprime en la consola, pero NO modifica el DOM
console.log(tarea);
console.log(tarea.nombre);

// ==============================
// 📌 VARIABLES Y LISTAS DE TAREAS (NO FORMAN PARTE DEL DOM DIRECTAMENTE)
// ==============================
// Manejan los datos en memoria, pero se usarán luego para actualizar el DOM
let tareas = [];
let idCounter = 0;

// ==============================
// 📌 FUNCIÓN PARA AGREGAR UNA NUEVA TAREA (INTERACTÚA CON EL DOM)
// ==============================
function agregarTarea() {
    // ✅ SELECCIÓN DE ELEMENTO DEL DOM
    const input = document.querySelector(".input-section input"); // Obtiene el input donde el usuario escribe la tarea
    const nombre = input.value.trim(); // Obtiene el texto ingresado y elimina espacios extra

    // Si el usuario escribió algo
    if (nombre !== "") {
        idCounter++; // Incrementa el ID único de la tarea
        const tarea = {
            id: idCounter,
            nombre: nombre,
            completada: false
        };

        // Agrega la tarea al array en memoria
        tareas.push(tarea);

        // ✅ MODIFICACIÓN DEL DOM: Se borra el input después de agregar la tarea
        input.value = "";

        // ✅ MODIFICACIÓN DEL DOM: Se actualiza la lista de tareas en la página
        mostrarTareas();
    }
}

// ==============================
// 📌 FUNCIÓN PARA ELIMINAR UNA TAREA (MODIFICA EL DOM)
// ==============================
function eliminarTarea(id) {
    // Filtra la tarea eliminada del array en memoria
    tareas = tareas.filter(tarea => tarea.id !== id);

    // ✅ MODIFICACIÓN DEL DOM: Se actualiza la lista sin la tarea eliminada
    mostrarTareas();
}

// ==============================
// 📌 FUNCIÓN PARA MARCAR UNA TAREA COMO COMPLETADA (MODIFICA EL DOM)
// ==============================
function completarTarea(id) {
    // Busca la tarea en la lista de memoria
    const tarea = tareas.find(tarea => tarea.id === id);
    
    // Si la tarea existe, cambia su estado
    if (tarea) {
        tarea.completada = !tarea.completada;

        // ✅ MODIFICACIÓN DEL DOM: Se actualiza la interfaz para reflejar el cambio
        mostrarTareas();
    }
}

// ==============================
// 📌 FUNCIÓN PARA MOSTRAR LAS TAREAS (ACTUALIZA EL DOM)
// ==============================
function mostrarTareas(filtro = "todas") {
    // ✅ SELECCIÓN DEL DOM
    const todoList = document.getElementById("todoList");
    const itemsCounter = document.querySelector(".footer span");

    // ✅ MODIFICACIÓN DEL DOM: Borra la lista anterior para actualizarla
    todoList.innerHTML = "";

    // Filtra las tareas según el estado
    let tareasFiltradas = tareas;
    if (filtro === "completed") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada);
    } else if (filtro === "active") {
        tareasFiltradas = tareas.filter(tarea => !tarea.completada);
    }

    // ✅ MODIFICACIÓN DEL DOM: Crea elementos y los añade a la lista
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

    // ✅ MODIFICACIÓN DEL DOM: Mensaje cuando no hay tareas
    if (tareasFiltradas.length === 0) {
        const li = document.createElement("li");
        li.innerHTML = "No hay tareas";
        todoList.appendChild(li);
    }

    // ✅ MODIFICACIÓN DEL DOM: Actualiza el contador de tareas
    itemsCounter.textContent = `${tareas.length} items`;
}

// ==============================
// 📌 EVENTOS DEL DOM
// ==============================
// ✅ SELECCIÓN Y MODIFICACIÓN DEL DOM: Agregar tareas cuando se presiona el botón
document.getElementById("agregarBtn").addEventListener("click", agregarTarea);

// ✅ SELECCIÓN Y MODIFICACIÓN DEL DOM: Filtros de tareas
document.querySelectorAll(".filterBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        // Quita la clase "active" de todos los botones
        document.querySelectorAll(".filterBtn").forEach(b => b.classList.remove("active"));
        // Agrega la clase "active" al botón seleccionado
        btn.classList.add("active");

        // Aplica el filtro seleccionado
        const filtro = btn.textContent.trim().toLowerCase();
        mostrarTareas(filtro === "all" ? "todas" : filtro);
    });
});

// ✅ SELECCIÓN Y MODIFICACIÓN DEL DOM: Botón para eliminar tareas completadas
document.getElementById("clear-completed").addEventListener("click", () => {
    // Elimina las tareas completadas de la lista en memoria
    tareas = tareas.filter(tarea => !tarea.completada);

    // ✅ MODIFICACIÓN DEL DOM: Se actualiza la lista de tareas
    mostrarTareas();
});
