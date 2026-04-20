function generarAsteriscos(filas: number): string {
    let arbol: string = "";
    for (let i: number = 1; i <= filas; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}

const input = document.getElementById("inputFilas") as HTMLInputElement;
const boton = document.getElementById("btnGenerar") as HTMLButtonElement;
const contenedor = document.getElementById("resultado") as HTMLElement;

boton.addEventListener("click", () => {
    const cantidad: number = parseInt(input.value);
    
    if (!isNaN(cantidad)) {
        contenedor.innerText = generarAsteriscos(cantidad);
    } else {
        contenedor.innerText = "Por favor, ingrese un número válido.";
    }
});