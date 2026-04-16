function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado"; 
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";    
    } else if (nota >= 8) {
        return "Promocionado"; 
    }
}

function diaDeLaSemana(numero) {
    switch (numero) {
        case 1: return "Lunes";
        case 2: return "Martes";
        case 3: return "Miércoles";
        case 4: return "Jueves";
        case 5: return "Viernes";
        case 6: return "Sábado (fin de semana)"; 
        case 7: return "Domingo (fin de semana)"; 
        default: return "Día inválido"; 
    }
}


console.log("--- Prueba clasificarNota ---");
console.log(`Nota 2: ${clasificarNota(2)}`);
console.log(`Nota 6: ${clasificarNota(6)}`);
console.log(`Nota 10: ${clasificarNota(10)}`);

console.log("--- Prueba diaDeLaSemana ---");
console.log(`Día 1: ${diaDeLaSemana(1)}`);
console.log(`Día 6: ${diaDeLaSemana(6)}`);
console.log(`Día 9: ${diaDeLaSemana(9)}`);