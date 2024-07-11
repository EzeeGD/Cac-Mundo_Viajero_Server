// Función para abrir la ventana emergente de sesion
document.getElementById('sesion').addEventListener('click', function() {
    document.getElementById('login').style.display = 'block';
})

function closeSesion() {
    document.getElementById('login').style.display = 'none'
}