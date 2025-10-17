// Función para solicitar pantalla completa
function requestFullScreen() {
  const element = document.documentElement;
  
  // Verificar si el navegador soporta la API de pantalla completa
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari y Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
}

// Intentar entrar en pantalla completa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Esperar un momento antes de intentar pantalla completa
  setTimeout(requestFullScreen, 1000);
});

// Intentar pantalla completa después de cualquier interacción del usuario
window.addEventListener('click', requestFullScreen, { once: true });
window.addEventListener('touchstart', requestFullScreen, { once: true });
window.addEventListener('keydown', requestFullScreen, { once: true });

// Manejar cambios en el estado de pantalla completa
function handleFullScreenChange() {
  if (!document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement) {
    // Volver a intentar pantalla completa si se sale de ella
    setTimeout(requestFullScreen, 100);
  }
}

document.addEventListener('fullscreenchange', handleFullScreenChange);
document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
document.addEventListener('mozfullscreenchange', handleFullScreenChange);
document.addEventListener('MSFullscreenChange', handleFullScreenChange);
