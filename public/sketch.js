var socket;

var state = 1;
var timer = 3;
var title = "MY PLANET";

var r;

var color1 = color2 = 10;
var planetName;
var slider1;
var slider2;
var nameInput;
var buttonCreate;
var buttonUniverse;
var buttonMake;
var hidden = 0;

var reName = [];
var colorA = [];
var colorB = [];
var pickedR = [];
var randomX = [];
var randomY = [];

function preload(){
  myFont = loadFont('BRITANIC.ttf');
  smallFont = loadFont('georgia.ttf');
}

function setup() {
  socket = io();

  createCanvas(windowWidth, windowHeight);

  r = windowHeight/3;

  textFont(myFont);
  colorMode(HSB, 360);

  drawBackground();


  slider1 = createSlider(0, 360, 0);
  slider1.position(windowWidth/2 - slider1.width, windowHeight/2 + r + 15);
  slider1.style('-webkit-appearance', 'none');
  slider1.style('border-radius', '4px');
  slider1.style('outline', 'none');
  slider1.style('opacity', '0.7');
  
  slider2 = createSlider(0, 360, 360);
  slider2.position(windowWidth/2, windowHeight/2 + r + 15);
  slider2.style('-webkit-appearance', 'none');
  slider2.style('border-radius', '4px');
  slider2.style('outline', 'none');
  slider2.style('opacity', '0.7');
  
  nameInput = createInput('Name the planet!');
  buttonCreate = createButton('CREATE!');
  nameInput.style('width', '200px');
  nameInput.style('height', '30px');
  buttonCreate.style('width', '70px');
  buttonCreate.style('height', '30px');

  nameInput.position(windowWidth/2 - (nameInput.width + buttonCreate.width)/2 - 5, windowHeight/2 + r + 45);
  nameInput.style('font-size', '16px');
  nameInput.style('text-align', 'center');
  nameInput.style('font-family', 'BRITANIC');
  nameInput.style('border-style', 'none');
  nameInput.style('background-color', 'white');
  nameInput.style('color', 'grey')
  nameInput.style('border-radius', '4px');

  buttonCreate.position(windowWidth/2 + (nameInput.width + buttonCreate.width)/2 - buttonCreate.width + 5, windowHeight/2 + r + 45);
  buttonCreate.style('font-size', '16px');
  buttonCreate.style('text-align', 'center');
  buttonCreate.style('font-family', 'BRITANIC');
  buttonCreate.style('border-style', 'none');
  buttonCreate.style('background-color', '#9FC7DC');
  buttonCreate.style('color', 'white');
  buttonCreate.style('text-shadow', '1px 0px black');
  buttonCreate.style('border-radius', '4px');

  buttonUniverse = createButton('See the universe!');
  buttonUniverse.style('width', '200px');
  buttonUniverse.position(windowWidth - 15 - buttonUniverse.width, 10);
  buttonUniverse.style('font-size', '18px');
  buttonUniverse.style('text-align', 'center');
  buttonUniverse.style('font-family', 'BRITANIC');
  buttonUniverse.style('border-style', 'none');
  buttonUniverse.style('background-color', 'white');
  buttonUniverse.style('color', 'grey')
  buttonUniverse.style('border-radius', '4px');
  buttonUniverse.style('padding', '10px');

  buttonMake = createButton('Create a planet!');
  buttonMake.style('width', '200px');
  buttonMake.position(windowWidth - 15 - buttonMake.width, 10);
  buttonMake.style('font-size', '18px');
  buttonMake.style('text-align', 'center');
  buttonMake.style('font-family', 'BRITANIC');
  buttonMake.style('border-style', 'none');
  buttonMake.style('background-color', 'white');
  buttonMake.style('color', 'grey')
  buttonMake.style('border-radius', '4px');
  buttonMake.style('padding', '10px');
  buttonMake.hide();

 
  listenOn();
  
}

function draw() {

  if(frameCount % 60 == 0 && timer > 0){
    timer--;
  }

  colorMode(HSB, 360);
  
  color1 = slider1.value();
  color2 = slider2.value();

  if(state == 1){
    var degMax = degrees(PI*5/4);
    var degMin = degrees(PI/4);
    for(var i = degMax; i > degMin; i-=0.2){
      var red = radians(i);
      var g = map(i, 0, 225, color1, color2);
      stroke(g, 50, 250);
      line(r * cos(red) + width/2, r * sin(red) + height/2, r * -cos(-red + PI/2*3) + width/2, r * -sin(-red + PI/2*3) + height/2);
    }
  }else if(state == -1){
    drawBackground();
    for(var p = 0; p < colorA.length; p++){
      var theName = reName[p];
      var pickedA = colorA[p];
      var pickedB = colorB[p];
      var R = pickedR[p];
      var X = int(randomX[p]);
      var Y = int(randomY[p]);
      var degMax = degrees(PI*5/4);
      var degMin = degrees(PI/4);

      for(var i = degMax; i > degMin; i-=0.2){
        var red = radians(i);
        var g = map(i, 0, 225, pickedA, pickedB);
        stroke(g, 50, 280);
        line(R * cos(red) + X, R * sin(red) + Y, R * -cos(-red + PI/2*3) + X, R * -sin(-red + PI/2*3) + Y);
        
        noStroke();
        textFont(smallFont);  
        textAlign(CENTER);
        textSize(11);
        text(theName, X, Y + R + 3);
      }
    }
    state = 2;
    textFont(myFont);
  }

  if(timer == 0){
    timer = -1;
    drawBackground();
  }

  if(timer > 0){
    //Initial
    textAlign(CENTER, CENTER);
    textSize(120);
    noStroke();
    fill(200, 100, 310);
    text(title, windowWidth/2 + 5, windowHeight/2 + 3);
    fill(360);
    text(title, windowWidth/2, windowHeight/2);
    var instruction1 = 'No noise. No bother. Being alone.';
    textSize(24);
    fill(150);
    text(instruction1, windowWidth/2, windowHeight/2 + 70);
  }else{
    //LOGO
    textAlign(LEFT, TOP);
    textSize(20);
    noStroke();
    fill(200, 100, 310);
    text(title, 16, 16);
    fill(360);
    text(title, 15, 15);
  }

  nameInput.input(removeInput);
  buttonCreate.mousePressed(getName);

  buttonUniverse.mousePressed(changeToUniverse);
  buttonMake.mousePressed(changeToCreate);

}

function drawBackground(){
  for(var i = 0; i < windowHeight; i++){
    var g = map(i, 0, windowHeight, 75, 324);
    stroke(221, g, 137);
    line(0, i, windowWidth, i);
  }
}

function removeInput(){
  if(hidden == 0){
    nameInput.value('');
    hidden = 1;
  }
}

function getName(){
	planetName = nameInput.value();
  // console.log('sending', {name: planetName, colorA: color1, colorB: color2})
  socket.emit('planet', {name: planetName, colorA: color1, colorB: color2});
  return false; 
}

function changeToUniverse(){
  state = -1;

  buttonUniverse.hide();
  slider1.hide();
  slider2.hide();
  nameInput.hide();
  buttonCreate.hide();

  buttonMake.show();
}

function changeToCreate(){
  state = 1;
  drawBackground();

  buttonMake.hide();

  buttonUniverse.show();
  slider1.show();
  slider2.show();
  nameInput.show();
  buttonCreate.show();
}

function listenOn(){
  socket.on('planet', function(planetData){
    
    if(state != 1){
      state = -1;
    }

    // console.log('receiving');
    // console.log(planetData);

    reName.push(planetData.name);
    colorA.push(planetData.colorA);
    colorB.push(planetData.colorB);
    var R = int(random(10, 30));
    var X = random(R*2, windowWidth - R*2);
    var Y = random(R*2, windowHeight - R*2);
    pickedR.push(R);
    randomX.push(X);
    randomY.push(Y);

  })
}

