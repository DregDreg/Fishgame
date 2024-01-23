'use strict';

/**
 * ICS4UC Final Project
 * 
 * Author: Rhys Gibbons
 * Description: Fish Game
 * 
 */

//Hello! I assume if you're reading this then you are somebody else that needs to understand the code of this game at a later date. All of the comments are meant to explain possibly difficult to understand code, skipping over anything that's self explainitory. Hope this helps, thanks!

function $(id) {
  return document.getElementById(id);
}
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}
const ctx = $("bulletcanvas").getContext("2d");
const FPS = 30
const FRAME_TIME = (1000/60) * (60/FPS) - (1000/60) * 0.5
const W = 87;
const S = 83;
const A = 65;
const D = 68;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;

let timerecorder = []
let victorystring = [UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT]
let victorystringlamens = ["UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT"]
//"victorystringlamens" is used because the values in the actual "victorystring," (which is just the string of keyinputs that when pressed in order restore health) don't actucally exist, with "Up" just being a constant for 39, meaning they get printed to the screen as 39. This is done so that doesn't happen.
let victorystringlevel = 1
//victorystringlevel tracks the "Level" or "Stage" the character is on, this is tied to basically everything so changing the value changes most everything.
let attacktimer = 2500
let attacktimerconstant = 2500
let attacktimer2 = 3000
let attacktimer2constant = 4500
let attacktimer3 = 5250
let attacktimer3constant = 4500
let attacktimer4 = 1500
let attacktimer4constant = 1500
let attacktimer6 = 1000
let attacktimer6constant = 1750
let attacktimer7 = 1750
let attacktimer7constant = 1750
let attacktimer8 = 2500
let attacktimer8constant = 1750
//attacktimer is the starting value that the attack clocks start at, being the time inbetween firing of the same attack. Changing this will change the rhythym of the attacks compared to other attacks (ex. if you wanted two attacks to happen at the same time, the attacktimer var would be the same.)
//attacktimerconstant is the variable which actually changes the speed at which the attacks get fired at, so if the attacks are rapidly fired/do fire fast enough, then change this.
let isright = false
let isleft = false
let isup = false
let isdown = false
let isfiring = false
let ismoving = false
let fishattack1 = false
let fishattack2 = false
let fishattack3 = false
let fishattack4 = false
let fishattack5 = false
let fishattack6 = false
let fishattack7 = false
let fishattack8 = false
//All the fishattack variables do are to control weather an attack is currently happening or not.
let gamestarter = false
let DDRquestion = 0
let lastframe = 0
let numberadder = 0
let numberadder2 = 0
let numberadder3 = 0
let numberadder4 = 0
let numberadder6 = 0
let numberadder7 = 0
let numberadder8 = 0
//"numberadder" is just a glorified loop function, being they get increased for each movement an attack does with a limit being placed on each attack.
let shot2speed = 0.5
let shot3speed = 1.5
let bounceback = 0
let iframertimer = 0
let shot1x = 0
let shot2x = 0
let shot3x = 0
let shot4x = 0
let shot1y = 0
let shot2y = 0
let shot3y = 0
let shot4y = 0
let pointx = 0
let pointy = 0
//The "shot1-4x/y" variables are only important for the first attack as a way to track the player's position, the same is true for "pointx" and "pointy."
let cointracker = 0
let coingoal = 10
let cointimeout = 6000
//cointimeout resets the coin position if it's not gotten in 6000 miliseconds, this was a brute force fix to the disapearing coin problem as a sort of failsave.
let directionchanger = false
let lizarddirection = "Down"
let bouncebacksaver = 0
let bouncebacksaver2 = 0
let bouncebacksaver3 = 0
let timecalc = 0
let healthsaver = 15

document.addEventListener("keydown", startmoving);
document.addEventListener("keyup", stopmoving)

class bullet{
  posx = 0;
  posy = 0;
  width = 0;
  height= 0;
  image;
  constructor(positionx,positiony,width,height,image_src){
  this.posx = positionx;
    this.posy = positiony;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image_src;}
  draw(context) {
    context.drawImage(this.image, this.posx, this.posy, this.width, this.height)}
}

class character extends bullet{
 health = 10;
  fishenergyradius = 35;
  fishenergy = 0;
  iscoin
  constructor(positionx,positiony,width,height,image, health, fishen, iscoin = false){
super(positionx,positiony,width,height,image)
  this.health = health
  this.fishenergyradius = fishen
  this.iscoin = iscoin}
}
//fishenergyradius tracks the square around the character which collects fish energy that gets converted into health. If it's too easy to gain health then change the radius value in the declaration of the main character below

class droplet extends bullet{
constructor(positionx,positiony,width,height,image,iscoin = true){
  super(positionx,positiony,width,height,image)
  this.iscoin = iscoin}
}

let shot1 = new bullet(0,-50,75,50,"./images/Fish.png")
let shot2 = new bullet(100,-50,75,50,"./images/Fish.png")
let shot3 = new bullet(200,-50,75,50,"./images/Fish.png")
let shot4 = new bullet(300,-50,75,50,"./images/Fish.png")
let shot21 = new bullet(-50,150,50,25,"./images/Wave.png")
let shot22 = new bullet(650,350,50,25,"./images/Wave.png")
let shot23 = new bullet(-50,550,50,25,"./images/Wave.png")
let shot24 = new bullet(650,750,50,25,"./images/Wave.png")
let shot31 = new bullet(-50,50,50,25,"./images/Wave.png")
let shot32 = new bullet(650,250,50,25,"./images/Wave.png")
let shot33 = new bullet(-50,550,50,25,"./images/Wave.png")
let shot34 = new bullet(650,650,50,25,"./images/Wave.png")
let shot41 = new bullet(0,-80,85,85,"./images/Whale.png")
let shot51 = new bullet(0,0,150,150,"./images/Lizard.png")
let shot61 = new bullet(265,-50,60,40,"./images/Fish.png")
let shot62 = new bullet(265,-50,60,40,"./images/Lizard.png")
let shot63 = new bullet(265,-50,60,40,"./images/Whale.png")
//The shot(x)(y) variables are all of the projectiles used, with the first number being the stage which they start being used at and the second value representing their order in such stage.
let mainchar = new character(275,600,50,80,"./images/Firspersonsmallcenter.png",10,25)
let enemychar = new character(200,0,50,60,"./images/Surfer.png",10,10)
let test = new bullet(0,0,100,100,"./images/Fish.png")
let coin = new droplet(300,200,20,20,"./images/droplet.png")
$("playerhealth").innerHTML = "Player health : " + mainchar.health
$("DDR").innerHTML = "The currently needed value is: " + victorystringlamens[victorystring.length-1]
$("completion").innerHTML = "There's " + victorystring.length + " values left in the string."
$("game").style.visibility = "hidden"
$("startgame").addEventListener("click",startgame)
$("easy").addEventListener("click",easyhealth)
$("regular").addEventListener("click",mediumhealth)
$("hard").addEventListener("click",hardhealth)
$("infinite").addEventListener("click",infinitehealth)
function easyhealth(){healthsaver = 30}
function mediumhealth(){healthsaver = 15}
function hardhealth(){healthsaver = 10}
function infinitehealth(){healthsaver = 999}

// All of this below just resets all of the values, I wish there was a way to do this that isn't just one giant stupid long paragraph, but that's why this is so long. Just ignore this unless you want to change a certain value on startup, such as the health of the maincharacter.
function startgame(){
  victorystringlevel = 1
  attacktimer = 2500
  attacktimerconstant = 2500
  attacktimer2 = 3000
  attacktimer2constant = 4500
  attacktimer3 = 5250
  attacktimer3constant = 4500
  attacktimer4 = 1500
  attacktimer4constant = 1500
  attacktimer6 = 1000
  attacktimer6constant = 1000
  isright = false
  isleft = false
  isup = false
  isdown = false
  isfiring = false
  ismoving = false
  fishattack1 = false
  fishattack2 = false
  fishattack3 = false
  fishattack4 = false
  fishattack5 = false
  fishattack6 = false
  fishattack7 = false
  fishattack8 = false
  gamestarter = false
  DDRquestion = 0
  lastframe = 0
  pointx = 0
  pointy = 0
  numberadder = 0
  numberadder2 = 0
  numberadder3 = 0
  numberadder4 = 0
  numberadder6 = 0
  shot2speed = 0.5
  shot3speed = 1.5
  bounceback = 0
  iframertimer = 0
  shot1x = 0
  shot2x = 0
  shot3x = 0
  shot4x = 0
  shot1y = 0
  shot2y = 0
  shot3y = 0
  shot4y = 0
  cointracker = 0
  coingoal = 10
  cointimeout = 6000 + performance.now()
  directionchanger = false
  lizarddirection = "Down"
  bouncebacksaver = 0
  bouncebacksaver2 = 0
  bouncebacksaver3 = 0
  mainchar.posx = 275
  mainchar.posy = 600
  mainchar.health = healthsaver
  mainchar.fishenergy = 0
  shot61.posy = -1000
  shot62.posy = -1000
  shot63.posy = -1000
  coin.posx = 300
  coin.posy = 200
  enemychar.posx = 200
  enemychar.posy = 0
  victorystring = [UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT]
  victorystringlamens = ["UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT"]
  $("game").style.visibility = "visible"
  $("startbutton").style.visibility = "hidden"
  $("playerhealth").innerHTML = "Player health : " + mainchar.health
  $("DDR").innerHTML = "The currently needed value is: " + victorystringlamens[victorystring.length-1]
  $("completion").innerHTML = "There's " + victorystring.length + " values left in the string."
  $("fishcoin").innerHTML = "Fishcoins gotten: " + cointracker + ", Fishcoins remaining: " + coingoal
  attacktimer = performance.now() + attacktimer
  attacktimer2 = performance.now() + attacktimer2
  timecalc = performance.now()
gamestarter = true}

//I stole all of this requestAnimationFrame code from Mr. Brash so don't tell him please
requestAnimationFrame(draw_frame)
function draw_frame(){
  let td = performance.now() - lastframe
  if (td >= FRAME_TIME){
    if (gamestarter == true){
    attacktimer += 1
    clear_frame()
    maincharmovement()
    updatescene()
      // All of the attacks are programmed in the same way, being that if the performance.now time value is greater then the allocated clock for each attack, being the attack timer's explained above, then the attack fires. Read the above comment about the attack timers for more info about how they work.
      if(victorystringlevel < 4){
    if (performance.now() > attacktimer){
      attacktimer += attacktimerconstant
      firstfishattack()}
      }
      if(victorystringlevel < 5){
    if (performance.now() > attacktimer2){
      attacktimer2 += attacktimer2constant
      secondfishattack()}
    }
      if(victorystringlevel > 1 && victorystringlevel < 5){
    if (performance.now() > attacktimer3 ){
      attacktimer3 += attacktimer3constant
      thirdfishattack()}
    }
      if(victorystringlevel>2 && victorystringlevel < 5){
        if (performance.now() > attacktimer4){
          attacktimer4 += attacktimer4constant
          fourthfishattack()}
        }
      if(victorystringlevel > 4){
        if (performance.now() > attacktimer6){
        attacktimer6 += attacktimer6constant
        finalfishattack()}
      }
      if(victorystringlevel > 4){
        if (performance.now() > attacktimer7){
        attacktimer7 += attacktimer7constant
        finalfishattack2()}
      }
      if(victorystringlevel > 4){
        if (performance.now() > attacktimer8){
        attacktimer8 += attacktimer8constant
        finalfishattack3()}
      }
      if(performance.now() > cointimeout){
        coin.posx = randInt(0,580)
        coin.posy = randInt(100,780)
        clear_frame()
        updatescene()
        cointimeout = performance.now() + 6000
      }
    enemymovement()
      //The fishattackmovement functions only actucally get fired if the above coinciding attack functions also get fired thanks to the fishattack variables.
    firstfishattackmovement()
    secondfishattackmovement()
    thirdfishattackmovement()
    fourthfishattackmovement()
    fifthfishattackmovement()
    finalfishattackmovement()
    finalfishattackmovement2()
    finalfishattackmovement3()
    lastframe = performance.now()
  }
  }
  requestAnimationFrame(draw_frame)
}

function clear_frame() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function maincharmovement(){
  if (ismoving == true){
    if(isdown == true){mainchar.posy +=15}
    if(isleft == true){mainchar.posx -=15}
    if(isup == true){mainchar.posy -=15}
    if(isright == true){mainchar.posx +=15}
    if(mainchar.posx > (ctx.canvas.width - mainchar.width)){mainchar.posx = ctx.canvas.width-mainchar.width}
    if(mainchar.posy > (ctx.canvas.height - mainchar.height)){mainchar.posy = ctx.canvas.height-mainchar.height}
    if(mainchar.posx < 0){mainchar.posx = 0}
    if(mainchar.posy < 100){mainchar.posy = 100}
    collisiondetecter(coin)
    //All of this is just movement code that looks long and complex as to make the movement actually smooth and and not super stuttery, being controled by constant variables that turn on and off depending on held keys. The important values/strings are the mainchar.posx/y +/- 15, as if the maincharacter's too slow/fast to your liking, then just change this.
  }
}
function startmoving(event){
  ismoving = true
  if (event.keyCode == W){
    mainchar.image.src = "./images/Firspersonsmallcenter.png"
   isup = true}
  if (event.keyCode == S){
    mainchar.image.src = "./images/Firspersonsmallcenter.png"
   isdown = true}
  if (event.keyCode == A){
    mainchar.image.src = "./images/fishpersonsmallleft.png"
    isleft = true}
  if (event.keyCode == D){
     mainchar.image.src = "./images/fishpersonsmallright.png"
    isright = true}
  //The same thing above with the start and stopmoving code.
  if (event.keyCode == UP){
    DDRquestion = UP
    Guess()
  }
  if (event.keyCode == LEFT){
    DDRquestion = LEFT
    Guess()
  }
  if (event.keyCode == RIGHT){
    DDRquestion = RIGHT
    Guess()
  }
}
function stopmoving(event){
  if(event.keyCode == W){
  isup = false}
  if(event.keyCode == A){
    mainchar.image.src = "./images/Firspersonsmallcenter.png"
  isleft = false}
  if(event.keyCode == S){
  isdown = false}
  if(event.keyCode == D){
    mainchar.image.src = "./images/Firspersonsmallcenter.png"
  isright = false}
  if(isup == false && isdown == false && isleft == false && isright == false){ismoving = false}
}

function Guess(){
  if (gamestarter == true){
  if(DDRquestion == victorystring[victorystring.length-1]){
      mainchar.fishenergy += 3
    if(mainchar.fishenergy >= 20){
      mainchar.fishenergy -= 20
    mainchar.health+=1}
    $("playerhealth").innerHTML = "Player health : " + mainchar.health + ", Fishenergy : " + mainchar.fishenergy
    victorystring.pop()
    victorystringlamens.pop()
    if(victorystring.length>0){
    $("DDR").innerHTML = "The currently needed value is: " + victorystringlamens[victorystring.length-1]
    $("completion").innerHTML = "There's " + victorystring.length + " values left in the string."}
    else{
      $("DDR").innerHTML = "There are no more values left in the string."
      $("completion").innerHTML = "There's " + victorystring.length + " values left in the string."}
    }
  else{
    if(victorystring.length > 0){
    mainchar.health -= 1
    $("playerhealth").innerHTML = "Player health : " + mainchar.health + ", Fishenergy : " + mainchar.fishenergy}
  }
  }
}
//The guess function is to make sure that the arrowkeys pressed are actually the next arrowkeys in the string, then removing them if they are correct just like a stack. The only important thing to know about this is that the code reconizes the last value in the string as the current value to be pressed and pops that, not the first value, so if you want the health regen string to be in a specific pattern it needs to be in reverse order. 

function enemymovement(){
  if(victorystringlevel < 5){
  if(shot1.posy>100 || shot1.posy == -50){
  if(enemychar.posx+25>600){bounceback = 0}
  if(enemychar.posx-25<0){bounceback = 1}
  if(bounceback == 1){enemychar.posx += 25}
  else if (bounceback == 0){enemychar.posx -= 25}}
  }
  else if (victorystringlevel > 4){
    if(enemychar.posx+25>550 && bounceback == 0){bounceback = 1}
    else if(enemychar.posy+25>725 && bounceback == 1){bounceback = 2}
    else if(enemychar.posx-25<0 && bounceback == 2){bounceback = 3}
    else if(enemychar.posy-25<0 && bounceback == 3){bounceback = 0}
    if(bounceback == 0){enemychar.posx += 25}
    else if (bounceback == 1){enemychar.posy += 25}
    else if (bounceback == 2){enemychar.posx -= 25}
    else if (bounceback == 3){enemychar.posy -= 25}
  }
}

function firstfishattack(){
   shot1.posx = 0
   shot1.posy = -50
   shot2.posx = 100
   shot2.posy = -50
   shot3.posx = 200
   shot3.posy = -50
   shot4.posx = 300
   shot4.posy = -50
  pointx = randInt(mainchar.posx-50,mainchar.posx+50)
  pointy = randInt(mainchar.posy-100,mainchar.posy)
  numberadder = 0
  shot1x = (shot1.posx-pointx)/30
  shot2x = (shot2.posx-pointx)/30
  shot3x = (shot3.posx-pointx)/30
  shot4x = (shot4.posx-pointx)/30
  shot1y = (shot1.posy-pointy)/30
  shot2y = (shot2.posy-pointy)/30
  shot3y = (shot3.posy-pointy)/30
  shot4y = (shot4.posy-pointy)/30
  fishattack1 = true
}
//All of the other attacks  are pretty simple, with them just following a path around the map or to the main character, so I'm not gonna explain them, but the first fish attack is more complex. The pointx and y variables are used to create a point of intersection between all of the paths of the projectiles, being around the main character's position, with the shot1-4x/y variables being averages between the starting positions and the point of intersection. All of this is so that the 4 projectiles all hit the same place at the same time targeted around the player's character. To make the fire speed faster change the value which the average is divided by, and to make it more or less precise change the values the randInt values are offset by in the declarations of pointx and y.
function firstfishattackmovement(){
  if(fishattack1 == true){
    if(numberadder <= 400){
    shot1.posx -= shot1x
    shot1.posy -= shot1y
      collisiondetecter(shot1)
    shot2.posx -= shot2x
    shot2.posy -= shot2y
      collisiondetecter(shot2)
    shot3.posx -= shot3x
    shot3.posy -= shot3y
      collisiondetecter(shot3)
    shot4.posx -= shot4x
    shot4.posy -= shot4y
      collisiondetecter(shot4)
    numberadder +=  1
    }
    else{fishattack1 == false
        clear_frame()
        updatescene()}
  }
}

function secondfishattack(){
  shot2speed = 0.5
  shot21.posx = -50
  shot22.posx = 650
  shot23.posx = -50
  shot24.posx = 650
  shot21.posy = 150
  shot22.posy = 350
  shot23.posy = 550
  shot24.posy = 750
  numberadder2 = 0
  fishattack2 = true
}

function secondfishattackmovement(){
  if(fishattack2 == true){
    if(numberadder2<=200){
    shot21.posx += shot2speed
      collisiondetecter(shot21, false)
    shot22.posx -= shot2speed
      collisiondetecter(shot22, false)
    shot23.posx += shot2speed
      collisiondetecter(shot23, false)
    shot24.posx -= shot2speed
      collisiondetecter(shot24, false)
      numberadder2 += 1
      shot2speed += 1
    }
    else{fishattack2 = false
        clear_frame()
        updatescene()}
  }
}

function thirdfishattack(){
  shot3speed = 0.75
  shot31.posx = -50
  shot32.posx = 650
  shot33.posx = -50
  shot34.posx = 650
  shot31.posy = 50
  shot32.posy = 250
  shot33.posy = 450
  shot34.posy = 650
  numberadder3 = 0
  fishattack3 = true
}

function thirdfishattackmovement(){
  if(fishattack3 == true){
    if(numberadder3<=200){
    shot31.posx += shot3speed
      collisiondetecter(shot31, false)
    shot32.posx -= shot3speed
      collisiondetecter(shot32, false)
    shot33.posx += shot3speed
      collisiondetecter(shot33, false)
    shot34.posx -= shot3speed
      collisiondetecter(shot34, false)
      numberadder3 += 1
      shot3speed += 1
    }
    else{fishattack3 = false
        clear_frame()
        updatescene()}
  }
}

function fourthfishattack(){
  shot41.posy = -80
  shot41.posx = mainchar.posx
  numberadder4 = 0
  fishattack4 = true
}

function fourthfishattackmovement(){
  if(fishattack4 == true){
    if (numberadder4<150){
      shot41.posy +=20
      collisiondetecter(shot41, true)
    }
    else{fishattack4 = false
        clear_frame()
        updatescene()}
  }
}

function fifthfishattack(){
  if(shot51.posx > 450 || shot51.posx < 0 || shot51.posy < 0 || shot51.posy > 650){
    if(shot51.posx > 450){shot51.posx = 450}
    if(shot51.posx < 0){shot51.posx = 0}
    if(shot51.posy > 650){shot51.posy = 650}
    if(shot51.posy < 0){shot51.posy = 0}
  if (lizarddirection == "Down"){lizarddirection = "Right"}
  else if (lizarddirection == "Right"){lizarddirection = "Up"}
  else if (lizarddirection == "Up"){lizarddirection = "Left"}
  else if (lizarddirection == "Left"){lizarddirection = "Down"}
  }
}

function fifthfishattackmovement(){
  if(fishattack5 == true){
    if(shot51.posx < 450 || shot51.posx > 0 || shot51.posy > 0 || shot51.posy < 650){
    if (lizarddirection == "Down"){shot51.posy += 20}
    else if (lizarddirection == "Right"){shot51.posx += 20}
    else if (lizarddirection == "Up"){shot51.posy -= 20}
    else if (lizarddirection == "Left"){shot51.posx -= 20}
    collisiondetecter(shot51,false)
  }
    fifthfishattack()
  }
}

function finalfishattack(){
  numberadder6 = 0
  bouncebacksaver = bounceback
  shot61.posx = enemychar.posx
  shot61.posy = enemychar.posy
  fishattack6 = true
  
}

function finalfishattackmovement(){
  if(fishattack6 = true){
    if(numberadder6<40){
      if(bouncebacksaver == 0 || bouncebacksaver == 2){
      if(mainchar.posx - shot61.posx > 0){
      shot61.posx += 6}
      else{shot61.posx -= 6}
        if(bouncebacksaver == 0){
        shot61.posy += 19}
        else{shot61.posy -= 19}
      }
      else if(bouncebacksaver == 1 || bouncebacksaver == 3){
      if(bouncebacksaver == 1){
      shot61.posx -= 19}
      else{shot61.posx += 19}
        if(mainchar.posy - shot61.posy > 0){
        shot61.posy += 6}
        else{shot61.posy -= 6}
      }
      collisiondetecter(shot61, true)
      numberadder6 += 1}
    else{
      fishattack6 = false
      clear_frame()
      updatescene()}
  }
}
//all of the "bouncebacksaver" code is just to track which side of the screen the enemy is on, so that the bullet can be fired at correct speeds. 0 is top, 1 is left, 2 is bottom and 3 is right.
function finalfishattack2(){
  numberadder7 = 0
  bouncebacksaver2 = bounceback
  shot62.posx = enemychar.posx
  shot62.posy = enemychar.posy
  fishattack7 = true
}

function finalfishattackmovement2(){
  if(fishattack7 = true){
    if(numberadder7<40){
      if(bouncebacksaver2 == 0 || bouncebacksaver2 == 2){
      if(mainchar.posx - shot62.posx > 0){
      shot62.posx += 6}
      else{shot62.posx -= 6}
        if(bouncebacksaver2 == 0){
        shot62.posy += 19}
        else{shot62.posy -= 19}
      }
      else if(bouncebacksaver2 == 1 || bouncebacksaver2 == 3){
      if(bouncebacksaver2 == 1){
      shot62.posx -= 19}
      else{shot62.posx += 19}
        if(mainchar.posy - shot62.posy > 0){
        shot62.posy += 6}
        else{shot62.posy -= 6}
      }
      collisiondetecter(shot62, true)
      numberadder7 += 1}
    else{
      fishattack7 = false
      clear_frame()
      updatescene()}
  }
}

function finalfishattack3(){
  numberadder8 = 0
  bouncebacksaver3 = bounceback
  shot63.posx = enemychar.posx
  shot63.posy = enemychar.posy
  fishattack8 = true

}

function finalfishattackmovement3(){
  if(fishattack8 = true){
    if(numberadder8<40){
      if(bouncebacksaver3 == 0 || bouncebacksaver3 == 2){
      if(mainchar.posx - shot63.posx > 0){
      shot63.posx += 6}
      else{shot63.posx -= 6}
        if(bouncebacksaver3 == 0){
        shot63.posy += 19}
        else{shot63.posy -= 19}
      }
      else if(bouncebacksaver3 == 1 || bouncebacksaver3 == 3){
      if(bouncebacksaver3 == 1){
      shot63.posx -= 19}
      else{shot63.posx += 19}
        if(mainchar.posy - shot63.posy > 0){
        shot63.posy += 6}
        else{shot63.posy -= 6}
      }
      collisiondetecter(shot63, true)
      numberadder8 += 1}
    else{
      fishattack8 = false
      clear_frame()
      updatescene()}
  }
}
//The final fish attack is copied three times as it's the easiest way to have three individual projectiles firing in rhythym.

function collisiondetecter(object, disapear = true){
  if(object.iscoin == true){
    if(object.posx+object.width>=mainchar.posx && object.posx<=(mainchar.posx+mainchar.width)){
      if(object.posy+object.height>=mainchar.posy && object.posy<=(mainchar.posy+mainchar.height)){
    object.posx = randInt(0,580)
        object.posy = randInt(100,780)
        console.log(object.posx)
        console.log(object.posy)
        if(object.posx > 580 && object.posy > 780){
          object.posx = randInt(0,580)
          object.posy = randInt(100,780)
        }
        cointimeout = performance.now() + 6000
        cointracker += 1
        $("fishcoin").innerHTML = "Fishcoins gotten: " + cointracker + ", Fishcoins needed: " + coingoal
//This function describes the collision of everything, which is why it's so long. The above portion desribes the collection of the coins/droplet, where if you come into contact with them they appear randomly around the canvas.
        if(cointracker == coingoal){
          mainchar.health += 2
          victorystringlevel+= 1
          if(victorystringlevel== 2){
            coingoal = 40
            $("fishcoin").innerHTML = "Fishcoins gotten: " + cointracker + ", Fishcoins remaining: " + coingoal
            victorystring = [LEFT,LEFT,RIGHT,UP,LEFT,RIGHT,UP,UP,LEFT,RIGHT,RIGHT,UP,LEFT,LEFT,RIGHT,UP,LEFT,RIGHT,UP,UP,LEFT,RIGHT,RIGHT,UP,LEFT,LEFT,UP,UP,LEFT,LEFT,UP,UP,RIGHT,LEFT,UP,UP,RIGHT,LEFT,UP,UP]
            victorystringlamens = ["LEFT","LEFT","RIGHT","UP","LEFT","RIGHT","UP","UP","LEFT","RIGHT","RIGHT","UP","LEFT","LEFT","RIGHT","UP","LEFT","RIGHT","UP","UP","LEFT","RIGHT","RIGHT","UP","LEFT","LEFT","UP","UP","LEFT","LEFT","UP","UP","RIGHT","LEFT","UP","UP","RIGHT","LEFT","UP","UP"]
            $("DDR").innerHTML = "The currently needed value is: " + victorystringlamens[victorystring.length-1]
            $("completion").innerHTML = "There's " + victorystring.length + " values left in the string."
          attacktimer2constant -= 1500
          shot2speed = 1.5
            attacktimer3 = performance.now() + attacktimer3
          }
          if(victorystringlevel== 3){
            coingoal = 80
            $("fishcoin").innerHTML = "Fishcoins gotten: " + cointracker + ", Fishcoins remaining: " + coingoal
            victorystring = [LEFT,RIGHT,LEFT,RIGHT,UP,LEFT,RIGHT,LEFT,LEFT,UP,LEFT,UP,UP,LEFT,UP,UP,RIGHT,LEFT,RIGHT,RIGHT,LEFT,RIGHT,RIGHT,UP,RIGHT,LEFT,UP,RIGHT,LEFT,UP,RIGHT,RIGHT,RIGHT,RIGHT,LEFT,RIGHT,LEFT,UP,LEFT,UP]
            victorystringlamens = ["LEFT","RIGHT","LEFT","RIGHT","UP","LEFT","RIGHT","LEFT","LEFT","UP","LEFT","UP","UP","LEFT","UP","UP","RIGHT","LEFT","RIGHT","RIGHT","LEFT","RIGHT","RIGHT","UP","RIGHT","LEFT","UP","RIGHT","LEFT","UP","RIGHT","RIGHT","RIGHT","RIGHT","LEFT","RIGHT","LEFT","UP","LEFT","UP"]
            $("DDR").innerHTML = "The currently needed value is: " + victorystringlamens[victorystring.length-1]
            $("completion").innerHTML = "There's " + victorystring.length + " values left in the string."
            attacktimer4 = performance.now() + attacktimer4
        }
          if(victorystringlevel== 4){
            fishattack5 = true
          coingoal = 120
          $("fishcoin").innerHTML = "Fishcoins gotten: " + cointracker + ", Fishcoins remaining: " + coingoal
          victorystring = [UP,UP,UP,UP,LEFT,UP,LEFT,RIGHT,LEFT,UP,LEFT,RIGHT,LEFT,UP,LEFT,RIGHT,UP,RIGHT,UP,LEFT,UP,RIGHT,UP,LEFT,UP,RIGHT,UP,LEFT,LEFT,RIGHT,LEFT,UP,LEFT,RIGHT,LEFT,UP,LEFT,RIGHT,LEFT,UP]
          victorystringlamens =['UP','UP','UP','UP',"LEFT","UP","LEFT","RIGHT","LEFT","UP","LEFT","RIGHT","LEFT","UP","LEFT","RIGHT","UP","RIGHT","UP","LEFT","UP","RIGHT","UP","LEFT","UP","RIGHT","UP",'LEFT','LEFT','RIGHT','LEFT','UP','LEFT','RIGHT','LEFT','UP','LEFT','RIGHT','LEFT','UP']
      }
         if(victorystringlevel== 5){
           mainchar.health +=10
           bounceback = 3
           fishattack5 = false
           coingoal = 160
           victorystring = [UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT,UP,LEFT,RIGHT]
           victorystringlamens = ["UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT","UP","LEFT","RIGHT"]
            $("fishcoin").innerHTML = "Fishcoins gotten: " + cointracker + ", Fishcoins remaining: " + coingoal
           $("DDR").innerHTML = "The currently needed value is: " + victorystringlamens[victorystring.length-1]
           $("completion").innerHTML = "There's " + victorystring.length + " values left in the string."
         attacktimer6 = performance.now() + attacktimer6
           attacktimer7 = performance.now() + attacktimer7
           attacktimer8 = performance.now() + attacktimer8
         shot61.posy = -50
         shot62.posy = -50
         shot63.posy = -50}
          if(victorystringlevel== 6){
            $("game").style.visibility = "hidden"
            $("startbutton").style.visibility = "visible"
            let inbetween = (Math.round(performance.now() - timecalc))/100
            timerecorder.push(inbetween)
            timerecorder.sort()
            $("congrats").innerHTML = "Congratulations! You beat the fish game in " + inbetween + " seconds, with your best time being " + timerecorder[0] + "! Thank you for playing my game! Press startgame to start again."
          }
         }
    }
  }
  }
  //Everything above and between the two comments looks complex however it's all relatively simple. It all just resets values when new stages are met, so that for example, when the first 10 coins are gotten, the next needed value changes from 10 to 40. All of the values are important so that the game works in the way that it does, however none of it are essential for the base game to function, so if you want to change any of the numerical values of the attacks/coins/health gains between levels it's here.
  if(performance.now() - iframertimer > 300){
  if(object.posx+object.width>=mainchar.posx && object.posx<=(mainchar.posx+mainchar.width)){
    if(object.posy+object.height>=mainchar.posy && object.posy<=(mainchar.posy+mainchar.height)){
      iframertimer = performance.now()
      mainchar.health = mainchar.health - 1
      $("playerhealth").innerHTML = "Player health : " + mainchar.health + ", Fishenergy : " + mainchar.fishenergy
      if(disapear == true){
      object.posy = 1600}
      if (mainchar.health <= 0){
        gamestarter =  false
         $("startbutton").style.visibility = "visible"
        $("game").style.visibility = "hidden"
      }
  }
}
//The above is the hurtbox collision, that when the bullet sprites are in contact with the maincharacter's sprite it reconizes it as damage. If there's not enough invinsibility frames between damage, increase the value the performence.now needs to be greater then.
  else if(object.posx+object.width+mainchar.fishenergyradius>=mainchar.posx && object.posx<=(mainchar.posx+mainchar.width+mainchar.fishenergyradius)){
      if(object.posy+object.height+mainchar.fishenergyradius>=mainchar.posy && object.posy<=(mainchar.posy+mainchar.height+mainchar.fishenergyradius)){
        mainchar.fishenergy = mainchar.fishenergy + 1
        if(mainchar.fishenergy > 20){
          mainchar.fishenergy -= 20
          mainchar.health = mainchar.health + 1}
        $("playerhealth").innerHTML = "Player health : " + mainchar.health + ", Fishenergy : " + mainchar.fishenergy
//The above is the fishenergy calculation. It works the same way at the hurtbox collision except for the collision radius being different. If it's too easy/hard to score said "fishenergy," then decrease/increase the fishenergyradius value present in the maincharacter's declaration respectivly. 
    }
  }
  }
}

function updatescene(){
  mainchar.draw(ctx)
  enemychar.draw(ctx)
  coin.draw(ctx)
  if(fishattack1 == true){
    shot1.draw(ctx)
    shot2.draw(ctx)
    shot3.draw(ctx)
    shot4.draw(ctx)
  }
  if(fishattack2 == true){
    shot21.draw(ctx)
    shot22.draw(ctx)
    shot23.draw(ctx)
    shot24.draw(ctx)
  }
    if(fishattack3 == true){
      shot31.draw(ctx)
      shot32.draw(ctx)
      shot33.draw(ctx)
      shot34.draw(ctx)
    }
    if(fishattack4 == true){
        shot41.draw(ctx)
    }
    if(fishattack5 == true){
      shot51.draw(ctx)
    }
      if(fishattack6 == true){
        shot61.draw(ctx)
      }
        if(fishattack7 == true){
          shot62.draw(ctx)
        }
          if(fishattack8 == true){
            shot63.draw(ctx)
          }
  else{isfiring = false}
}
updatescene()
