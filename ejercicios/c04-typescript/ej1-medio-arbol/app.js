"use strict";
function generarAsteriscos(filas) {
    let arbol = "";
    for (let i = 1; i <= filas; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}
const input = document.getElementById("inputFilas");
const boton = document.getElementById("btnGenerar");
const contenedor = document.getElementById("resultado");
boton.addEventListener("click", () => {
    const cantidad = parseInt(input.value);
    if (!isNaN(cantidad)) {
        contenedor.innerText = generarAsteriscos(cantidad);
    }
    else {
        contenedor.innerText = "Por favor, ingrese un número válido.";
    }
});
