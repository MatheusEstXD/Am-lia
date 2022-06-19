
var player,playerimg,estrelai,estrela;
var meteoritosGP,meteoro;
var meteoro1,meteoro2,meteoro3,meteoro4;
var velo = 3;
var gameState = 1;
var vida = 1;
var estrelagp;
var tzeGuerra,tzeGuerraIMG,dialogo,dialogoimg,socorro,socorro2;
//0 = dialogo 1 == oto dialogo 2== jogando 3== fim de jogo(cutscene) 

var bruh,seila
var som1,beep,ost2,ost3,boom;

function preload(){
playerimg = loadImage("./assets/SpaceShip.png");
meteoro1 = loadImage("./assets/meteoro.png");
meteoro2 = loadImage("./assets/meteoro2.png");
meteoro3 = loadImage("./assets/meteoro3.png");
meteoro4 = loadImage("./assets/meteoro4.png");
meteoro5 = loadImage("./assets/meteoro5.png");
meteoro6 = loadImage("./assets/meteoro6.png");
meteoro7 = loadImage("./assets/meteoro7.png");
meteoro8 = loadImage("./assets/meteoro8.png");
meteoro9 = loadImage("./assets/meteoro9.png");
meteoro10 = loadImage("./assets/meteoro10.png");
estrelai = loadImage("./assets/estrela.png");
tzeGuerraIMG = loadImage("./assets/Capitão Tzeguerra.png");
dialogoimg = loadImage("./assets/Balão de Fala.png");
som1 = loadSound("./assets/Dialogo1.mp3");
beep = loadSound("./assets/beep.mp3");
ost2 = loadSound("./assets/ost2.mp3");
socorro = loadImage("./assets/socorro.png");
boom = loadSound("./assets/Boom.mp3")
ost3 = loadSound("./assets/ost3.mp3")
}

function inimigos(){
    
  if(frameCount % 60 == 0 ){
      meteoro = createSprite(Math.round(random(1,width)),-height + 40);
      meteoro.velocityY = velo;
      meteoro.lifeTime = 50;
      var boo = Math.round(random(1,10));
      switch(boo){
          case 1: meteoro.addImage(meteoro1); break;
          case 2: meteoro.addImage(meteoro2); break;
          case 3: meteoro.addImage(meteoro3); break;
          case 4: meteoro.addImage(meteoro4); break; 
          case 5: meteoro.addImage(meteoro5); break;
          case 6: meteoro.addImage(meteoro6); break;
          case 7: meteoro.addImage(meteoro7); break;
          case 8: meteoro.addImage(meteoro8); break; 
          case 9: meteoro.addImage(meteoro9); break;
          case 10: meteoro.addImage(meteoro10); break;
          default:break;
      }
      meteoritosGP.add(meteoro);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  meteoritosGP = new Group();
  estrelagp = new Group();
  
  for(var i = 0; i <=499; i++){
    estrela = createSprite(Math.round(random(1,width)),Math.round(random(1,height + 8000)));
    estrela.scale = 0.4;
    estrela.addImage(estrelai);
    estrela.depth = 0;
    estrela.velocityY = velo/100;
    estrelagp.add(estrela);
  }
  player = createSprite(width / 2,height - 40,40,30);
player.addImage(playerimg);
tzeGuerra = createSprite(width - 225,height / 2 + 75);
tzeGuerra.scale = 2;
tzeGuerra.addImage(tzeGuerraIMG);
dialogo = createSprite(width / 2,height - 100);
dialogo.addImage(dialogoimg);
socorro2 = createSprite(width/2,height/2);
socorro2.addImage(socorro)
socorro2.scale =0.35
socorro2.visible = false


}

function draw() {
  background(10);  
  drawSprites();
 
  player.rotation = 0;
  if(gameState == 2){
    dialogo.visible = false
  tzeGuerra.visible = false
  som1.stop();
  if(!ost2.isPlaying()){
    ost2.play();
  ost2.setVolume(0.2)
  }
  
  if(vida == 1){ 
  velo+=0.02;
  if(frameCount - bruh >= 3000){
    gameState = 3
  }
    if(keyDown("A") && player.x >= 0){
      player.x-= 4 + velo / 10;
      player.rotation-=15;
    }
    if(keyDown("D") && player.x <= width){
      player.x+= 4 + velo/10;
      player.rotation+= 15;
    }
    if (player.isTouching(meteoritosGP)){
     // console.log("tocou");
       // boom.play();
        //boom.looping = false
        //boom.setVolume(0.2)
        vida = 0;
  }
  inimigos();
  }else if(vida <1){
    estrelagp.setVelocityYEach(0);
      stroke("White");
      fill("Red");
      textSize(20);
      textFont("Times New Roman");
      text("Dano Crítico no motor da nave,impossivel locomoção",width / 2 - 200,height /2 - 50);
      textFont("Courier New");;
      textSize(30);
      text("Fim de Jogo",width / 2 - 100,height /2);
    }
  }else if(gameState == 0){
    if(!som1.isPlaying()){
  som1.play();
  som1.setVolume(0.2)
    }
    
    textSize(35);
    fill("Blue");
    text("Capitão Tzeguerra",width / 2 - 375,height - 225);
    fill("black");
    text("Amélia, descobrimos um novo planeta e", width / 2 - 375,height - 175);
    text("queremos que você vá até ele e investigue", width / 2 - 375,height - 125);
    text("se existe formas de vida inteligentes ", width / 2 - 375,height - 75);
    text("nesse planeta", width / 2 - 375,height - 25);
    if(keyWentUp("Space")){
      beep.play();
    gameState = 1;
    }
  }else if(gameState == 1){
    textSize(35);
    fill("Blue");
    text("Capitão Tzeguerra",width / 2 - 375,height - 225);
    fill("black");
    text("Preparamos uma nave para você, ela acelera", width / 2 - 375,height - 175);
    text("aos poucos, portanto tome cuidado, o caminho", width / 2 - 375,height - 125);
    text("é cheio de obstaculos como meteoros que podem", width / 2 - 375,height - 75);
    text("destruir a nave.Boa sorte Amélia", width / 2 - 375,height - 25);
    if(keyWentUp("Space")){
      beep.play();
      beep.setVolume(0.05)
      gameState = 2;
      bruh = frameCount
      }
  }else if(gameState == 3){
      socorro2.visible = true
      dialogo.visible = true
      dialogo.depth =5
      textSize(35);
    fill("Blue");
    text("Amélia",width / 2 - 375,height - 225);
    fill("black");
    text("Cheguei ao planeta e minha nave está em ótimas", width / 2 - 375,height - 175);
    text("Condições,vou preparar para a aterrissagem", width / 2 - 375,height - 125);
    text("a vista do Planeta é linda,e a composição da", width / 2 - 375,height - 75);
    text("atmosfera é perfeita para a vida humana.", width / 2 - 375,height - 25);
    if(keyWentUp("Space")){
      beep.play();
      beep.setVolume(0.05)
      gameState = 4;
      }

  }else if(gameState == 4){
    ost2.stop()
    som1.stop()
    textSize(35);
    fill("Blue");
    text("Amélia",width / 2 - 375,height - 225);
    fill("black");
    text("aterrissando em...", width / 2 - 375,height - 175);
    text("3", width / 2 - 375,height - 125);
    text("2", width / 2 - 375,height - 75);
    text("1...", width / 2 - 375,height - 25);
    if(keyWentUp("Space")){
      beep.play();
      beep.setVolume(0.05)
      gameState = 5;
      }
  }if(gameState == 5){
dialogo.visible = false
    textSize(60)
    stroke("White")
    fill("Black")
  text("Continua...",width/2 - 125,height/2);
  if(!ost3.isPlaying()){
    ost3.play();
    ost3.setVolume(0.4)
      }

  }
  
      

 
  
}


