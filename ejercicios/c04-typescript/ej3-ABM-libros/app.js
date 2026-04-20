let catalogo = [
    { isbn: "111", titulo: "El Aleph", autor: "Borges", precio: 5000, disponible: true },
    { isbn: "222", titulo: "Rayuela", autor: "Cortázar", precio: 7000, disponible: false }
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const disponible = document.getElementById("disponible").checked;
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
function renderizar(libros) {
    const listaUI = document.getElementById("listado");
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
    const statsUI = document.getElementById("stats");
    const total = libros.length;
    const promedio = total > 0 ? libros.reduce((acc, b) => acc + b.precio, 0) / total : 0;
    statsUI.innerText = `Libros: ${total} | Promedio: $${promedio.toFixed(2)}`;
}
document.getElementById("btnAgregar")?.addEventListener("click", () => {
    const errorDiv = document.getElementById("errorForm");
    const nuevoLibro = validarFormulario();
    if (nuevoLibro) {
        agregarLibro(nuevoLibro);
        errorDiv.innerText = "";
        document.getElementById("titulo").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("precio").value = "";
    }
    else {
        errorDiv.innerText = "Error: Todos los campos son obligatorios y el precio debe ser mayor a 0.";
    }
});
renderizar(catalogo);
export {};
