var fondo;
var imgNube;
var nube;
var imgfig1;
var piso;
var fig1; //declaro una variable para mi grupo
var obstaculos;
var b;
var barras;
var animation;
var subir = false;
var nubepasando = false;
var click = false;
var herramientas;
var x1, y1;
var tamW1;
var tamH1;
var EncimaCuad1 = false;



function preload() {
  fondo = loadImage("imagenes/imgFondo.png");
  imgNube = loadImage("imagenes/nube2.png");
  imgfig1 = loadImage("imagenes/small_circle0001.png");
  herramientas = new Herramientas();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = 0.8 * width;
  y1 = 0;
  tamW1 = width;
  tamH1 = 0.15 * height;
  start();

}

function draw() {
  background(0);
  image(fondo, 0, 0, width, height);

  NubeMueve();
  fig1.bounce(obstaculos); // el que va a dentro de los parentesis es el que va a detener al otro objeto
  fig1.bounce(fig1);
  nube.collide(obstaculos);
  nube.overlap(fig1, collect);

  //nube absorbe bolas//
  for (var i = 0; i < fig1.size(); i++) {
    if (fig1.get(i).position.x > nube.position.x - 30 && fig1.get(i).position.x < nube.position.x + 30) {
      fig1.get(i).velocity.y = random(-12, -18);
    } else {
      fig1.get(i).velocity.y = 0;
    }
  }
  drawSprites();
  herramientas.menu();
  print(EncimaCuad1);
}

function NubeMueve() {

  nube.position.x += 1;
  if (nube.position.x > width + 45) {
    nube.position.x = -95;
  }

}

function start() {
  nube = createSprite(random(width), 0.2 * height);
  nube.addImage(imgNube);
  nube.setCollider("rectangle", 0, 27, 70, 20);
  nube.debug = true;

  piso = createSprite(width / 2, 0.98 * height, width, 20);
  piso.shapeColor = color(255);
  piso.setCollider("rectangle", 0, 0, width, 20);
  piso.debug = true;

  obstaculos = new Group();
  fig1 = new Group();

  barras = createSprite(random(0.8 * width), random(0.35 * height, 0.8 * height), 100, 20);
  barras.shapeColor = color(255);
  barras.immovable = true;
  obstaculos.add(barras);


  //puntos//
  for (var i = 0; i < 50; i++) {
    var dot = createSprite(random(width), 0.94 * height);
    dot.addImage(imgfig1);
    dot.setSpeed(random(-0.1, 0.2), random(0, 15));
    dot.scale = random(0.8, 1);
    dot.mass = dot.scale;
    dot.setCollider("circle", 0, 0, 10,10);
    //dot.debug=true;
    fig1.add(dot);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (var i = 0; i < fig1.size(); i++) {
    fig1.get(i).remove();
    i = i - 1;
  }
  for (var i = 0; i < obstaculos.size(); i++) {
    obstaculos.get(i).remove();
    i = i - 1;
  }
  nube.remove();
  piso.remove();
  start();
}

function collect(collector, collected) {
  //collector is another name for asterisk
  //show the animation
  // collector.changeAnimation("stretch");
  // collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  collected.remove();
}

function Herramientas() {

  this.colorM = color(255, 50);
  this.colorResaltar = color(255, 50);

  this.menu = function() {
    if (click) {
      push();
      rectMode(CORNER);
      noStroke();
      fill(this.colorM);
      rect(0.8 * width, 0, width, height);
      fill(this.colorResaltar);
      rect(x1, y1, tamW1, tamH1);
      pop();
    }
    if (EncimaCuad1) {
      this.colorResaltar = color(255, 0, 0);
    } else {
      this.colorResaltar = color(255, 50);
    }
  }
}

function mouseClicked() {
  if (mouseY > 0.3 * height && mouseX < 0.8 * width) {
    b = createSprite(mouseX, mouseY, 100, 20);
    b.setCollider('rectangle', 0, 100, 20);
    b.shapeColor = color(255);
    b.immovable = true;
    b.addToGroup(obstaculos);
  }
  if (mouseX > 0.9 * width) {
    click = true;
  }
  if (mouseX > x1 && mouseX < width && mouseY > 0 && mouseY < 0.15 * height) {
    EncimaCuad1 = true;
  } else {
    EncimaCuad1 = false;
  }
}