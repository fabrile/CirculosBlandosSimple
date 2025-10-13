class Semilla{
    constructor(x, y, tx, ty) {
      this.pos = createVector(x, y);
      this.target = createVector(tx, ty);
      let angle = random(TWO_PI);  //le da un poco de azar al movimiento
      let magnitud = random(0, .2);

      this.vel = createVector(sin(angle)*magnitud, cos(angle)*magnitud);
      this.acc = createVector(0, 0.0);
      this.mass = 3;
      this.carga = random(-1,0)
      this.maxVel = 5;
      this.vacia = true
      this.maxForce = 0.05
    }
  
    repele(objetivo) {
      let fuerza = p5.Vector.sub(this.pos, objetivo.pos);
      let distancia = fuerza.mag();
      if(distancia<=10){
        distancia = constrain(distancia, 1, 100); // Limita la distancia para evitar fuerzas extremas
        fuerza.normalize();
        let magnitud = (10 * this.carga * objetivo.carga) / (distancia * distancia);
        magnitud = constrain(magnitud, -2, 2)
        fuerza.mult(magnitud);
        objetivo.aplicarFuerza(fuerza);
      }
    }
  
  
    actualizar() {
        let distThreshold = 600;
        let ajuste = new p5.Vector(this.target.x, this.target.y);
        let distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        if (distance > 0.5) {
            ajuste.sub(this.pos);
            ajuste.normalize();
            ajuste.mult(map(min(distance, distThreshold), 0, distThreshold, 0, this.maxForce));
            this.acc.add(ajuste);
        }


      this.acc.add(createVector(0, gravity))
      this.vel.add(this.acc);
      //this.vel.mult(0.99)  //Agrega resistencia    
      this.pos.add(this.vel);
      this.limitarVelocidad();
      this.rebotarEnParedes();
      this.acc.mult(0)
    }
  
    mostrar() {
      let relleno = noir?  220 :20
      let borde = noir? 220 : 20

      fill(relleno)
      if(this.vacia){
        noFill()
      }

      stroke(borde)
      ellipse(this.pos.x, this.pos.y, this.mass);
      strokeWeight(0.3)
      line(this.pos.x,this.pos.y,this.target.x,this.target.y)
      fill(255,255,0)
      ellipse(this.target.x, this.target.y, this.mass)
    }
  
    aplicarFuerza(fuerza) {
      this.acc.add(fuerza);
    }
  
    limitarVelocidad() {
      if (this.vel.mag() > this.maxVel) {
        this.vel.setMag(this.maxVel);
      }
    }
  
    setPosicion(x, y) {
      this.target.x = x;
      this.target.y = y;
    }
  
    rebotarEnParedes() {
      if (this.pos.x <= 10 || this.pos.x >= width - 10) {
        this.vel.x *= -1 * random(0.7, 0.9);
        this.pos.add(this.vel);
      }
      if (this.pos.y <= 10 || this.pos.y >= height - 10) {
        this.vel.y *= -1 * random(0.7, .9);
        this.pos.add(this.vel);
      }

    }
  
    cambiarSemilla(){
      this.vacia = !this.vacia //vacía o llena una semilla
    }

    germinar() {
      let nuevoCirculoBlando = new CirculoBlando(this.pos.x, this.pos.y, this.mass);
      circulosBlandos.push(nuevoCirculoBlando);
      // Elimina la semilla actual del arreglo Granero
      for (let i = 0; i < Granero.length; i++) {
        let semillas = Granero[i];
        let index = semillas.indexOf(this);
        if (index !== -1) {
          semillas.splice(index, 1);
          break; // Termina el bucle una vez que se elimina la semilla
        }
      }
    }

}

function initBolsas(vivas){
    let semillas = []
    let points = random(100, 600);
    let angle = 0;
    let radius = random (0,10)
    let rotationSpeed = 6;
    let deltaRadius = 6;
  
    let xcenter = random (width/4, width*3/4);
    let ycenter = random (height/4, height*3/4);
  
    for (let i = 0; i < points; i++) {
      let x = cos(angle) * radius + xcenter;
      let y = sin(angle) * radius + ycenter;
      let semilla = new Semilla(x, y, x, y)
      semilla.vacia = !vivas
      semillas.push(semilla);
  
      angle += rotationSpeed/radius;
      radius += deltaRadius/radius;
    }
    let ve= random(-2,2)
    for(let semilla of semillas){
      semilla.vel.add(createVector(random(-1,1),ve))
    }
    return semillas
}
  
function initGranero(bolsas){
   for (let i = 0; i < bolsas; i++) {
    let vivas = random() < 0.5
    Granero.push(initBolsas(vivas))
    } 
}

function germinarSemilla(){
    /*
  let elegido = random(0,puntos.length);
  let puntoElegido = puntos[elegido]
  //let xCB = puntoElegido.pos.x;
  //let yCB = puntoElegido.pos.y;
  if( elegido > (puntos.length*0.99)){
    //circulosBlandos.push(new CirculoBlando(random(width), random(height), random(10,30)));
    //circulosBlandos.push(new CirculoBlando(xCB, yCB, random(10,30)));
  }
  */
}
