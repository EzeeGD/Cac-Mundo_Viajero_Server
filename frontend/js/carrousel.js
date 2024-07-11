const carrusel = document.querySelector(".carousel");

// Calcula el ancho de una sola imagen en el carrusel
let imageWidth = carrusel.firstElementChild.clientWidth;

// Calcula el máximo desplazamiento permitido para que solo pase una imagen a la vez
let maxScrollLeft = carrusel.scrollWidth - imageWidth;
let intervalo = null;
let step = 1; // Pasa una imagen a la vez

const start = () => {
  intervalo = setInterval(function () {
    carrusel.scrollLeft += step;
    // Si alcanza el final, vuelve al principio
    if (carrusel.scrollLeft >= maxScrollLeft) {
      carrusel.scrollLeft = 0;
    }
  }, 10 ); // Intervalo para cambiar la imagen, 2000 milisegundos (2 segundos)
};

const stop = () => {
  clearInterval(intervalo);
};

start();