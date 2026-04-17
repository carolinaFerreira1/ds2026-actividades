const inputProducto = document.querySelector('#productoInput');
const botonAgregar = document.querySelector('#btnAgregar');
const listaUl = document.querySelector('#listaProductos');
const contadorTexto = document.querySelector('#contadorProductos');

let cantidadProductos = 0;

const actualizarContador = () => {
    contadorTexto.textContent = `${cantidadProductos} productos en la lista`;
};

botonAgregar.addEventListener('click', () => {
    const nombreProducto = inputProducto.value.trim();

    if (nombreProducto === "") {
        alert("Por favor, ingresa un nombre de producto.");
        return;
    }

    const nuevoItem = document.createElement('li');
    
    nuevoItem.innerHTML = `
        <span>${nombreProducto}</span>
        <button class="btn-eliminar">Eliminar</button>
    `;

    const botonEliminar = nuevoItem.querySelector('.btn-eliminar');
    botonEliminar.addEventListener('click', () => {
        nuevoItem.remove(); 
        cantidadProductos--; 
        actualizarContador();
    });

    listaUl.appendChild(nuevoItem);
    cantidadProductos++;
    actualizarContador();

    inputProducto.value = "";
    inputProducto.focus();
});