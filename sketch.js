//let bolas = [];
let Granero = []
let circulosBlandos = [];
let noir = false;
let gravity = 0.0





// Tamaño lógico del sketch
const LOGICAL_WIDTH = 800;
let logicalHeight;

// Variables para el escalado
let canvas;
let displayWidth, displayHeight;
let pixelDensityValue;

function calculateCanvasSize() {
  // Calcular la altura lógica basada en la relación de aspecto de la ventana
  const windowAspectRatio = windowHeight / windowWidth;
  logicalHeight = Math.round(LOGICAL_WIDTH * windowAspectRatio);
  
  // Calcular el factor de escala para pantallas más anchas que 800px
  const isWideScreen = windowWidth > LOGICAL_WIDTH;
  
  // Si la pantalla es más ancha que 800px, usamos escala 1 y dejamos que el CSS haga el escalado
  if (isWideScreen) {
    return {
      width: LOGICAL_WIDTH,
      height: logicalHeight,
      scale: windowWidth / LOGICAL_WIDTH,
      isWideScreen: true
    };
  }
  
  // Para pantallas más angostas que 800px, escalamos para que quepa
  const scale = windowWidth / LOGICAL_WIDTH;
  return {
    width: windowWidth,
    height: Math.round(logicalHeight * scale),
    scale: scale,
    isWideScreen: false
  };
}

function setup() {
  // Configurar la densidad de píxeles para pantallas de alta resolución
  pixelDensity(1);
  
  // Calcular dimensiones lógicas
  const windowAspectRatio = windowHeight / windowWidth;
  logicalHeight = Math.round(LOGICAL_WIDTH * windowAspectRatio);
  
  // Crear el canvas con el tamaño lógico
  canvas = createCanvas(LOGICAL_WIDTH, logicalHeight);
  canvas.parent('sketch-container');
  
  // Configurar el contenedor
  const container = document.getElementById('sketch-container');
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  
  // Configurar el canvas para escalado suave
  const canvasElement = canvas.elt;
  canvasElement.style.width = '100%';
  canvasElement.style.height = 'auto';
  canvasElement.style.maxWidth = '100%';
  canvasElement.style.maxHeight = '100%';
  canvasElement.style.objectFit = 'contain';
  canvasElement.style.imageRendering = 'crisp-edges';
  
  // Inicializar elementos del sketch
  let cantGranero = Math.floor(Math.random() * 3) + 1;
  initGranero(cantGranero);
  
  let cantCirculosBlandos = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
  initCirculosBlandos(5);
  
  setTimeout(doubleClicked, 60000);
  noir = false;
  gravity = 0.0;
}

function draw() {
  
  if(random(1000)>995){
      noir = !noir
  }  
  if(noir){
    background(20);
  } else {
    background(220);
  }
  

  funcion11()

  

  //grabarFotograma();

  
}


//--------------Funciones de Trabajo

function doubleClicked() {
    Granero = [];
    circulosBlandos = [];
    noir = false;
  
    setup();
}
  
function mouseReleased() {
  //save("sketch-" + Date.now() + ".svg");
  noir = !noir

}

function windowResized() {
  // Calcular nueva altura lógica basada en el ancho de la ventana
  const windowAspectRatio = windowHeight / windowWidth;
  logicalHeight = Math.round(LOGICAL_WIDTH * windowAspectRatio);
  
  // Redimensionar el canvas manteniendo el tamaño lógico
  resizeCanvas(LOGICAL_WIDTH, logicalHeight);
  
  // Configurar el canvas para escalado suave
  const canvasElement = canvas.elt;
  if (windowWidth > LOGICAL_WIDTH) {
    // Para pantallas anchas, limitamos el ancho a 800px
    canvasElement.style.width = `${LOGICAL_WIDTH}px`;
    canvasElement.style.height = 'auto';
  } else {
    // Para pantallas angostas, escalamos proporcionalmente
    const scale = windowWidth / LOGICAL_WIDTH;
    canvasElement.style.width = '100%';
    canvasElement.style.height = 'auto';
  }
  
  // Reajustar la posición de los elementos si es necesario
  for (let circulo of circulosBlandos) {
    circulo.pos.x = constrain(circulo.pos.x, 0, width);
    circulo.pos.y = constrain(circulo.pos.y, 0, height);
  }
}


function funcion11(){

  // Suponiendo que Granero es tu arreglo de arreglos de semillas
  for (let i = 0; i < Granero.length; i++) { 
    let semillas = Granero[i];

    for (let semilla of semillas) {
      semilla.mostrar();
      semilla.actualizar();

      // Si estamos en el primer elemento de Granero
      if (i === 0) {
        for (let k = 0; k < Granero.length; k++) {
          // Evita la interacción con el mismo elemento de Granero
          if (k !== i) {
            let otrasSemillas = Granero[k];
            for (let otraSemilla of otrasSemillas) {
              semilla.repele(otraSemilla);
            }
          }
        }
      } 
    }
  }

  
  for(let circuloBlando of circulosBlandos){
      circuloBlando.actualizar();
      circuloBlando.mostrar();
  }
}


// Funciones para interactividad
function keyPressed() {
  if (key === ' ') {
    Granero = [];
    circulosBlandos = [];
    noir = false;
  
    setup();
  } else if (key === 's' || key === 'S') {
    exportSVG();
  } else if (key === 'e' || key === 'E') {
    // Guardar el contenido del canvas actual en formato SVG
    let svgCanvas = createGraphics(ancho, alto, SVG);

    // Dibujar en el canvas SVG temporal
    svgCanvas.noFill();
    svgCanvas.background(255); // Fondo negro
      // Dibujar contornos
    for (let i = 0; i < contourLevels.length; i++) {
      let level = contourLevels[i];
      // Color basado en el nivel (HSB)
      let hue = map(level, 0, 1, 0, 360);
      svgCanvas.stroke(hue, 80, 80);
      svgCanvas.noFill();
      
      // Dibujar cada camino para este nivel
      for (let j = 0; j < contourPaths[i].length; j++) {
        let path = contourPaths[i][j];
        svgCanvas.beginShape();
        svgCanvas.curveVertex(path[0].x, path[0].y);

        for (let k = 0; k < path.length; k++) {
          svgCanvas.curveVertex(path[k].x, path[k].y);
        }
        svgCanvas.curveVertex(path[path.length-1].x, path[path.length-1].y);

        svgCanvas.endShape();
      }
    }
   
    // Graba el archivo con el nombre del atractor y la fecha
    const now = new Date();
    const formattedDate = 
      now.getFullYear() + '-' + 
      String(now.getMonth() + 1).padStart(2, '0') + '-' + 
      String(now.getDate()).padStart(2, '0') + '_' + 
      String(now.getHours()).padStart(2, '0') + '-' + 
      String(now.getMinutes()).padStart(2, '0') + '-' + 
      String(now.getSeconds()).padStart(2, '0');
    
    // Crear nombre de archivo dinámico
    const filename = `drawing_${formattedDate}.svg`;

    // Guardar el contenido del SVG en un archivo
    save(svgCanvas, filename); // Guardar el SVG correctamente

  }
}