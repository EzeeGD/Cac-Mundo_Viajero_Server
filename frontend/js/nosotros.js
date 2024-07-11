function redireccionar() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    var logo = document.querySelector('.logo img');
    logo.addEventListener('click', redireccionar);
  });