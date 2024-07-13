document.addEventListener('DOMContentLoaded', () => {
    const getListButton = document.getElementById('getList');
    const createPaqueteForm = document.getElementById('createPaqueteForm');
    const container = document.getElementById('cardContainer');

    // Función para crear el HTML de cada tarjeta de paquete
    function createCardHTML(paquete) {
        let estrellasHtml = '';
        for (let i = 0; i < paquete.estrellas; i++) {
            estrellasHtml += '⭐';
        }

        return `
        <figure class="card">
            <img src="${paquete.imagen}" alt="${paquete.nombreDestino}">
            <div class="card-nombre">
                <figcaption>${paquete.nameDestino}</figcaption>
            </div>
            <div class="card-description">
                <p>${paquete.descripcionDestino}</p>
            </div>
            <div class="card-dias">
                <p>${paquete.cantDias}</p>
            </div>
            <div class="card-hotel">
                <p>${paquete.nombreHoteles}</p>
                <p>${estrellasHtml}</p>
            </div>
            <div class="card-price">
                <p>$${paquete.precioPaquete} ARS</p>
            </div>
        </figure>
        `;
    }

    // Función para cargar los paquetes desde el servidor y mostrarlos en la interfaz
    function loadPaquetes() {
        fetch('http://localhost:3000/api/paquetes/list')
            .then(response => response.json())
            .then(data => {
                container.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos elementos
                data.forEach(paquete => {
                    container.innerHTML += createCardHTML(paquete);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Solicitud GET al cargar la página
    loadPaquetes();

    // Solicitud POST al enviar el formulario
    // createPaqueteForm.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const imagen = document.getElementById('imagen').value;
    //     const nombreDestino = document.getElementById('nombreDestino').value;
    //     const descripcionDestino = document.getElementById('descripcionDestino').value;
    //     const precioPaquete = document.getElementById('precioPaquete').value;
    //     const nombreHotel = document.getElementById('nombreHotel').value;
    //     const estrellas = document.getElementById('estrellas').value;
    //     const cantDias = document.getElementById('cantDias').value;

    //     fetch('http://localhost:3000/api/paquetes', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             nombreDestino,
    //             descripcionDestino,
    //             imagen,
    //             precioPaquete,
    //             nombreHotel,
    //             estrellas,
    //             cantDias
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         alert('Paquete creado correctamente');
    //         createPaqueteForm.reset(); // Limpiar el formulario
    //         loadPaquetes(); // Volver a cargar los paquetes después de agregar uno nuevo
    //     })
    //     .catch(error => console.error('Error:', error));
    // });
});