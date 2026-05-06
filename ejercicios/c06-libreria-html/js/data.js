const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const contenedorResultados = document.getElementById('resultados');

btnBuscar.addEventListener('click', () => {
    const query = inputBusqueda.value;
    if (query.trim() !== "") {
        buscarLibros(query);
    }
});

async function buscarLibros(termino) {
    contenedorResultados.innerHTML = '<div class="text-center w-100"><div class="spinner-border text-primary" role="status"></div><p>Buscando libros...</p></div>';

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${termino}`);
        const data = await response.json();
        renderizarCards(data.docs.slice(0, 12));
    } catch (error) {
        contenedorResultados.innerHTML = '<p class="text-danger text-center">Hubo un error en la búsqueda. Intenta de nuevo.</p>';
    }
}

function renderizarCards(libros) {
    contenedorResultados.innerHTML = "";

    if (libros.length === 0) {
        contenedorResultados.innerHTML = '<p class="text-center">No se encontraron libros para esa búsqueda.</p>';
        return;
    }

    libros.forEach(libro => {
        const imgUrl = libro.cover_i 
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` 
            : 'https://via.placeholder.com/200x300?text=Sin+Portada';

        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${imgUrl}" class="card-img-top" alt="${libro.title}" style="height: 250px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate">${libro.title}</h5>
                        <p class="card-text text-muted">${libro.author_name ? libro.author_name : 'Autor desconocido'}</p>
                        <a href="libro.html" class="btn btn-outline-primary mt-auto">Ver más</a>
                    </div>
                </div>
            </div>
        `;
        contenedorResultados.innerHTML += cardHTML;
    });
}