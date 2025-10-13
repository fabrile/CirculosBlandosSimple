class CirculoBlando{
  constructor(x, y, ri){
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.angle = 0;
    this.radius = ri;
    this.deltaRadius = 9;
    this.rotationSpeed = 10*((random(1) < 0.5) ? -1 : 1)
    this.noisyness = 0.012 ;
    this.maxPoints = random(500,1000);
    this.points = 0;
    this.time = random(1,10000);
    this.def1 = 2;
    
        
    //this.color = color;
  }
  
  aplicarFuerza(fuerza) {
    this.acc.add(fuerza);
  }
  
  limitarVelocidad(maxVel) {
    let velMag = this.vel.mag();
    if (velMag > maxVel) {
      this.vel.setMag(maxVel);
    }
  }
  
  setPosicion(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  
  actualizar(){
    this.time += 0.003;
    this.angle = 0 + this.time*1;
    if (this.points <= this.maxPoints){
      this.points += 5;
    }

  }
     
  mostrar(){
  let radio = this.radius ;
  let diff = radio * this.noisyness;
  let xp = 0;
  let yp = 0;
  //this.points += 1
  //this.def1 += 0.001
  if (noir){
    stroke(220);
    fill(220)
    
  } else {
    stroke(20)
    fill(20)
  }
  
  push();
  translate(this.pos.x, this.pos.y);
    beginShape();
      for (let i = 0; i < this.points; i++) {
        diff = radio * this.noisyness;
        const n =
          noise(
            (sin(this.angle)-2) * 0.4 * diff,
            (cos(this.angle)+2) * 0.4 * diff,
            this.time
          ) * 100 -50;

        xp = cos(this.angle) * (radio + n);
        yp = sin(this.angle) * (radio + n);

        curveVertex(xp, yp);

        //ellipse(xp, yp, 2);
        noFill()

        this.angle += this.rotationSpeed/radio;
        radio += this.deltaRadius/radio;
      }
    endShape();
  pop();
    
  //ellipse(this.pos.x, this.pos.y, this.radius)
  }
  
}


function initCirculosBlandos(cantidad){
  for (let i = 0; i < cantidad; i++) {
    circulosBlandos.push(new CirculoBlando(random(width), random(height), random(5,10)));
  } 
}



//---------------Clases ---------------



