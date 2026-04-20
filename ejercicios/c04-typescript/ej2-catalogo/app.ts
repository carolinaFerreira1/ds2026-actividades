interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libro[] = [
    { isbn: "111", titulo: "El Aleph", autor: "Borges", precio: 5000, disponible: true },
    { isbn: "222", titulo: "Rayuela", autor: "Cortázar", precio: 7000, disponible: false },
    { isbn: "333", titulo: "Ficciones", autor: "Borges", precio: 4500, disponible: true },
    { isbn: "444", titulo: "Cien años de soledad", autor: "García Márquez", precio: 8500, disponible: true }
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(l => l.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const total = libros.reduce((acc, l) => acc + l.precio, 0);
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listaUI = document.getElementById("listado") as HTMLUListElement;
    const statsUI = document.getElementById("stats") as HTMLElement;

    listaUI.innerHTML = ""; 
    
    libros.forEach(l => {
        const li = document.createElement("li");
        li.textContent = `${l.titulo} - ${l.autor} ($${l.precio}) ${l.disponible ? "[Disponible]" : "[No hay stock]"}`;
        listaUI.appendChild(li);
    });

    const promedio = precioPromedio(libros);
    statsUI.innerText = `Cantidad: ${libros.length} | Precio Promedio: $${promedio.toFixed(2)}`;
}

const inputAutor = document.getElementById("filtroAutor") as HTMLInputElement;

document.getElementById("filtrar")?.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputAutor.value));
});

document.getElementById("mostrarDisponibles")?.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

document.getElementById("mostrarTodos")?.addEventListener("click", () => {
    renderizar(catalogo);
});

renderizar(catalogo);