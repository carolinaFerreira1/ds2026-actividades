const numeros = [1, 4-7];


let sumaTotal = 0;
let numeroMayor = numeros; 
let numeroMenor = numeros;


for (const num of numeros) {
    
    sumaTotal += num;

    if (num > numeroMayor) {
        numeroMayor = num;
    }

    if (num < numeroMenor) {
        numeroMenor = num;
    }
}

const promedio = sumaTotal / numeros.length;

console.log("--- Resultados del Array ---");
console.log(`Suma total: ${sumaTotal}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${numeroMayor}`);
console.log(`Número menor: ${numeroMenor}`);

function generarAsteriscos(n) {
    let cadenaAsteriscos = "";
    
    for (let i = 0; i < n; i++) {
        cadenaAsteriscos += "*"; 
    
    return cadenaAsteriscos;
    }
}
console.log("--- Prueba de función asteriscos ---");
console.log(`generarAsteriscos(5): ${generarAsteriscos(5)}`);
console.log(`generarAsteriscos(10): ${generarAsteriscos(10)}`);