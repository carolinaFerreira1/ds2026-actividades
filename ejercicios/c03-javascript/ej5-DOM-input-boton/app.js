const inputAltura = document.querySelector('#alturaInput');
const botonGenerar = document.querySelector('#btnGenerar');
const contenedorArbol = document.querySelector('#contenedorArbol');
const mensajeError = document.querySelector('#mensajeError');

botonGenerar.addEventListener('click', () => {
    contenedorArbol.textContent = "";
    mensajeError.textContent = "";

    const altura = parseInt(inputAltura.value);

    if (isNaN(altura) || altura < 1) {
        mensajeError.textContent = "Error: Por favor, ingresa un número válido mayor a 0.";
        return; 
    }

    let arbolCompleto = "";
    for (let i = 1; i <= altura; i++) {
        let linea = "";
        for (let j = 0; j < i; j++) {
            linea += "*";
        }
        arbolCompleto += linea + "\n"; 
    }

    contenedorArbol.textContent = arbolCompleto;
});