var imgFondo;
var nubeImg;
var x1,y1;
var x2,y2;
var x3,y3;
var LondrinaFont;
var OverTheRect1=false;
var OverTheRect2=false;
var NuevoJuego=false;
var NubesCon=true;
var InstCon=false;
var click=false;
var nube=[];
var textoInstruc;


function preload(){
  LondrinaFont= loadFont("Fonts/LondrinaSolid-Regular.otf");
  imgFondo= loadImage("imagenes/imgFondo.png");
  nubeImg= loadImage("imagenes/nube.png")
}

function setup() {
  createCanvas(1411,941);
  //
  textoInstruc= new TextoInstrucciones();
  //
  nube[0]= new Nube(width*0.5,100,150,90);
  nube[1]= new Nube(width*0.8,700,100,60);
  nube[2]= new Nube(width*0.2,350,80,50);
  //
  x1=width/2;
  y1=0.4*height;
  x2=width/2;
  y2=0.6*height;
  x3=0.9*width;
  y3=0.9*height;
  
  textFont(LondrinaFont);
  textAlign(CENTER);
}

function draw() {
 
  rectMode(CENTER);
  //fondo//
  image(imgFondo,0,0);
  //BOTONNUEVOJUEGO//
  if(!click && !OverTheRect1){
  push();
  fill(255,100);
  textSize(60);
  text("Nuevo Juego",x1,y1+20);
  noStroke();
  fill(255,20);
  rect(x1,y1,500,180);
  pop();
  }
  //
  //BOTONINSTRUCCIONES//
  if(!click && !OverTheRect1){
  push();
  fill(255,100);
  textSize(60);
  text("Instrucciones",x2,y2);
  noStroke();
  fill(255,20);
  rect(x2,y2,500,180);
  pop();
  }
  //
  //BOTONREGRESO//
  if(NuevoJuego || InstCon){
  push();
  fill(255,100);
  textSize(30);
  text("Regresar",x3,y3+5);
  noStroke();
  fill(255,20);
  rect(x3,y3,160,90);
  pop();
  }
 
  print(OverTheRect2);
 //
 
 if(NubesCon){
 nube[0].dibujar();
 nube[0].mover1();
 nube[1].dibujar();
 nube[1].mover2();
 nube[2].dibujar();
 nube[2].mover3();
 }
 //
 textoInstruc.dibujar();
 //

}

function mouseClicked(){
  if(!NuevoJuego){
    if(!InstCon){
if(mouseX<x1+250 && mouseX>x1-250 && mouseY<y1+90 && mouseY>y1-90){
  OverTheRect1=true;
  click=true;
  NuevoJuego=true;
  NubesCon=false;

}else{
  NubesCon=true;
}
}
//rect2//
if(mouseX<x2+250 && mouseX>x2-250 && mouseY<y2+90 && mouseY>y2-90){
  OverTheRect2=true;
  click=true;
  OverTheRect1=false;
  NuevoJuego=false;
  InstCon=true;
}
}
//regresar//
if(mouseX<x3+250 && mouseX>x3-250 && mouseY<y3+90 && mouseY>y3-90){
  Regresar=true;
  OverTheRect1=false;
  OverTheRect2=false;
  click=false;
  NuevoJuego=false;
  NubesCon=true;
  InstCon=false;

}else{
  Regresar=false;
}
}

function Nube(x,y,w1,h1){
 this.x=x;
 this.y=y;
 this.w1=w1;
 this.h1=h1;
 
 this.dibujar= function(){
   push();
   tint(255,50);
   imageMode(CENTER);
   image(nubeImg,this.x,this.y,this.w1,this.h1); 
   pop();
   }
  this.mover1= function(){
    this.x+=1.2;
    this.regresar1();
  }
  this.mover2= function(){
    this.x-=1;
    this.regresar2();
  }
  this.mover3= function(){
    this.x+=0.7;
    this.regresar3();
  }
  this.regresar1= function(){
    if(this.x-75>width){
      this.x=-150;
    }
  }
  this.regresar2= function(){
    if(this.x+50<0){
      this.x=width+100;
    }
  }
  this.regresar3= function(){
    if(this.x-40>width){
      this.x=-80;
    }
  }
}

function TextoInstrucciones(){
  this.dibujar= function(){
  var titulo= "-INSTRUCCIONES-"
  var t1= "1. El objetivo del juego es ir plantando árboles y protegerlos de la nube que absorbe cada parte de el."
  var t2= "2. El usuario dispone de 3 figuras geométricas con las cuales se irá formando el árbol.";
  var t3= "    TRIÁNGULO = RAIZ";
  var t4= "    RECTÁNGULO = TRONCO";
  var t5= "    ELIPSE = HOJAS";
  var t6= "3. En cada nivel, el jugador tendrá la ventaja de utilizar - Protectores - , los cuales dificultarán el objetivo de la nube.";
  var t7= "4. Igualmente se podrá reunir elementos para ir destruyendo a la nube y mantener los árboles a salvo.";
  if(OverTheRect2){
    
    push();
  rectMode(CORNER);
  fill(255,30);
  rect(0,0,width,height);
    pop();
  textSize(30);
  text(titulo,width/2,0.12*height);
  text(t1,width/2,0.35*height,900,300);
  text(t2,width/2,0.45*height,900,300);
  text(t3,width/2,0.55*height,900,300);
  text(t4,width/2,0.6*height,900,300);
  text(t5,width/2,0.65*height,900,300);
  text(t6,width/2,0.7*height,900,300);
  text(t7,width/2,0.8*height,900,300);
    
  }
  }
}


// function NuevoJuego(){
 
//   this.dibujar=function (){
    
//   } 
  
  
// }
// }