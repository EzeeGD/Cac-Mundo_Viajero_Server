document.addEventListener('DOMContentLoaded', () => {
    const getListButton = document.getElementById('getList');
    const destinoList = document.getElementById('destinoList');
    const createDestinoForm = document.getElementById('createDestinoForm');

    // Solicitud GET
    getListButton.addEventListener('click', () => {
        fetch('http://localhost:3000/api/destinos/list')
            .then(response => response.json())
            .then(data => {
                destinoList.innerHTML = ''; // Limpiar la lista antes de añadir nuevos elementos
                data.forEach(destino => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${destino.nombre} - ${destino.descripcion}`;
                    destinoList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error:', error));
    });

    // Solicitud POST
    createDestinoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const imagen = document.getElementById('imagen').value;
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const hotel = document.getElementById('hotel').value;
        const estrellas = document.getElementById('estrellas').value;

        fetch('http://localhost:3000/api/destinos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imagen,
                nombre,
                descripcion,
                precio,
                hotel,
                estrellas
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Destino creado correctamente');
            createDestinoForm.reset(); // Limpiar el formulario
        })
        .catch(error => console.error('Error:', error));
    });
});
