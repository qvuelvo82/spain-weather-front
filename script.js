const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxdnVlbHZvODJAZ21haWwuY29tIiwianRpIjoiZmRlNzI5NmEtYTc3YS00YzU0LTkyODAtYzdiYTQ3MjNlYjExIiwiZXhwIjoxNzk5NjQ3NzM4LCJpc3MiOiJBRU1FVCIsImlhdCI6MTc5MTAwNzczOCwidXNlcklkIjoiZmRlNzI5NmEtYTc3YS00YzU0LTkyODAtYzdiYTQ3MjNlYjExIiwicm9sZSI6IiJ9.8eCnpYOSrsp6PVuX7owf7ZKZs6RJHEEHTJ9rORZsqlg'; // Reemplaza con tu clave de OpenWeatherMap
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
var page;
let datos;

searchBtn.addEventListener('click', () => {
    const lista = document.getElementById('municipios-list');
    lista.innerHTML = '';
    cargarMunicipios();
});

async function cargarMunicipios() {
    const lista = document.getElementById('municipios-list');
    let response;
    if (typeof page == 'undefined') {
        page = 1;
    }
    try {
        response = await fetch(
            'http://localhost:8080/municipios/population/sort?pageNumber=' + page + '&size=10',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + apiKey
                }
            }
        )
        datos = await response.json();
    } catch (error) {
        console.error(error);
        lista.innerHTML =
            '<li>Error al cargar los municipios.</li>';
    }

    lista.innerHTML = '';
    datos.forEach(municipio => {
        const li = document.createElement('li');

        li.textContent =
            `${municipio.nombre} - ${municipio.num_hab} habitantes`;

        lista.appendChild(li);
    });

}

document.getElementById('prev-btn').addEventListener('click', () => {
    page--;
    cargarMunicipios();
});

document.getElementById('next-btn').addEventListener('click', () => {
    page++;
    cargarMunicipios();
});

