// El principal objetivo de este desafío es fortalecer mis habilidades en lógica de programación

// Variable para almacenar los nombres de los amigos en un array
    let listaAmigos = [];

// Función para mostrar mensajes en la página
    function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `mensaje ${tipo}`; // Aplicar clase según el tipo de mensaje
    mensajeDiv.style.display = 'block';

    // Ocultar los  mensaje  después de 3 segundos
       setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

// Función para cargar nombres desde el almacenamiento local
    function cargarNombres() {
    const nombresGuardados = localStorage.getItem('nombres');
    if (nombresGuardados) {
        listaAmigos = JSON.parse(nombresGuardados); // Convertir de JSON a array
        actualizarListaDOM(); // Actualizar la lista en el DOM
    }
}

// Función para guardar nombres en el almacenamiento local
   function guardarNombres() {
    localStorage.setItem('nombres', JSON.stringify(listaAmigos)); // Convertir a JSON
}

// Función para actualizar la lista en el DOM
function actualizarListaDOM() {
    const listaAmigosDOM = document.getElementById('listaAmigos');
    listaAmigosDOM.innerHTML = ''; // Limpiar la lista actual

    // Recorrer el array y agregar cada nombre al DOM
    listaAmigos.forEach(nombre => {
        const nuevoAmigo = document.createElement('li');
        nuevoAmigo.textContent = nombre;
        listaAmigosDOM.appendChild(nuevoAmigo);
    });
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    // Obtener el valor del campo de texto
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    // Verificar si el campo está vacío
    if (nombre === '') {
        mostrarMensaje('Por favor ingrese un nombre', 'error');
        return; // Salir de la función si el campo está vacío
    }

    // Verificar si el nombre ya existe en la lista
    if (listaAmigos.includes(nombre)) {
        mostrarMensaje('Este nombre ya está en la lista. Por favor, ingrese un nombre diferente.', 'error');
        return; // Salir de la función si el nombre ya existe
    }

    // Agregar el nombre al array
    listaAmigos.push(nombre);

    // Actualizar la lista en el DOM
    actualizarListaDOM();

    // Limpiar el campo de texto después de agregar el nombre
    input.value = '';

    // Guardar la lista en el almacenamiento local
    guardarNombres();
}

// Función para sortear un amigo al azar
function sortearAmigo() {
    // Verificar si hay nombres en la lista
    if (listaAmigos.length === 0) {
        mostrarMensaje('No hay nombres en la lista. Por favor, agregue algunos nombres primero.', 'error');
        return; // Salir de la función si no hay nombres
    }

    // Seleccionar un nombre al azar
    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const amigoSorteado = listaAmigos[indiceAleatorio];

    // Mostrar el resultado en la página
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>El amigo secreto  es: ${amigoSorteado}</li>`;

    // Eliminar el nombre seleccionado del array
    listaAmigos.splice(indiceAleatorio, 1);

    // Actualizar la lista en el DOM
    actualizarListaDOM();

    // Guardar la lista actualizada en el almacenamiento local
    guardarNombres();

    // Verificar si la lista está vacía después de eliminar el nombre
    if (listaAmigos.length === 0) {
        mostrarMensaje('¡Todos los nombres han sido sorteados! La lista está vacía. Puede ingresar nuevos nombres.', 'info');
        resultado.innerHTML = ''; // Limpiar el resultado anterior
    }
}

// Función para reiniciar la lista
function reiniciarLista() {
    listaAmigos = []; // Vaciar el array
    actualizarListaDOM(); // Actualizar la lista en el DOM
    localStorage.removeItem('nombres'); // Eliminar los nombres guardados
    mostrarMensaje('La lista ha sido reiniciada. Puede ingresar nuevos nombres.', 'info');
}

// Cargar nombres al iniciar la página
document.addEventListener('DOMContentLoaded', cargarNombres);