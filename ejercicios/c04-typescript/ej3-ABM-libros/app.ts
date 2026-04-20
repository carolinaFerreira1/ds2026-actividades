export {}; 
interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
}

let catalogo: Libro[] = [
    { isbn: "111", titulo: "El Aleph", autor: "Borges", precio: 5000, disponible: true },
    { isbn: "222", titulo: "Rayuela", autor: "Cortázar", precio: 7000, disponible: false }
];

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
    const autor = (document.getElementById("autor") as HTMLInputElement).value;
    const precio = parseFloat((document.getElementById("precio") as HTMLInputElement).value);
    const disponible = (document.getElementById("disponible") as HTMLInputElement).checked;

    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        return null;
    }

    return {
        isbn: "AUTO-" + Date.now(), // ISBN Random sugerido
        titulo,
        autor,
        precio,
        disponible
    };
}

function renderizar(libros: Libro[]): void {
    const listaUI = document.getElementById("listado") as HTMLUListElement;
    listaUI.innerHTML = "";
    
    libros.forEach(l => {
        const li = document.createElement("li");
        li.innerHTML = `${l.titulo} (${l.autor}) - $${l.precio} `;
        
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarLibro(l.isbn);
        
        li.appendChild(btnEliminar);
        listaUI.appendChild(li);
    });

    const statsUI = document.getElementById("stats") as HTMLElement;
    const total = libros.length;
    const promedio = total > 0 ? libros.reduce((acc, b) => acc + b.precio, 0) / total : 0;
    statsUI.innerText = `Libros: ${total} | Promedio: $${promedio.toFixed(2)}`;
}

document.getElementById("btnAgregar")?.addEventListener("click", () => {
    const errorDiv = document.getElementById("errorForm") as HTMLElement;
    const nuevoLibro = validarFormulario();

    if (nuevoLibro) {
        agregarLibro(nuevoLibro);
        errorDiv.innerText = ""; 
        (document.getElementById("titulo") as HTMLInputElement).value = "";
        (document.getElementById("autor") as HTMLInputElement).value = "";
        (document.getElementById("precio") as HTMLInputElement).value = "";
    } else {
        errorDiv.innerText = "Error: Todos los campos son obligatorios y el precio debe ser mayor a 0.";
    }
});

renderizar(catalogo);