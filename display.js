/* VARIABLES */
let font;
let italic_font;

// Buttons
let startButton;
let homeButton;
let backToGameButton;
let restartButton;

let buyBasic;
let buyResilient;
let buyHope;

// Number of seeds
let basicSeeds = 1;
let resilientSeeds = 0;
let hopeSeeds = 0;
let maxSeeds = 3;

// Costs for seeds
const basicCost = 5;
const resilientCost = 10;
const hopeCost = 30;


let shopIcon;
let directions;

let shopOpen = false;

// Game graphics;
let plot;

// Music
let music;
let musicStarted = false;
let musicButton;
let isMuted = false;

// Points!!
let currentHopePoints = 0;
const goal = 1000;

  // Progress Bar Variables
  let barWidth = 600;
  let barHeight = 35;
  let barX;
  let barY = 50;
  let progressPercentage = currentHopePoints / goal;


// Plants
let basicSprout;
let basicSeedling;
let basicYoung;
let basicMature;

let resilientSprout;
let resilientSeedling;
let resilientYoung;
let resilientMature;

let hopeSprout;
let hopeSeedling;
let hopeYoung;
let hopeMature;

let well; // sprite for the well
let waterDrops = 0; // water inventory
let wellWater = 3; // amount of water in the well
const wellCapacity = 3; // the maximum amount of water the well can hold
let lastWellRefillTime = 0; // time when the well was last refilled
const wellRefillInterval = 10000; // how often the well refills (in milliseconds)


/* PRELOAD LOADS FILES */
function preload(){
  font = loadFont('fonts/font.ttf');
  italic_font = loadFont('fonts/italic_font.ttf');
  music = loadSound('music/music.mp3');
}

/* SETUP RUNS ONCE */
function setup() {

  music.loop();

  // Create a canvas and set its parent to the 'canvas-container' div
  let cnv = createCanvas(1000, 700);
  cnv.parent('canvas-container');
  background('#f3e0c6');

  barX = (width - barWidth) / 2;

  // Set text properties
  textAlign(CENTER);
  textFont(font);

  // Create the rounded corners
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  // Music button
  noStroke();
  musicButton = new Sprite();
  musicButton.img = loadImage('music/musicButton.png');
  musicButton.x = width - 70;
  musicButton.y = 55;
  musicButton.w = 200;
  musicButton.h = 200;
  musicButton.collider = 'k';

  music.loop();

  // Place all buttons off-screen initially
  startButton = new Sprite(-1000, -1000);

  // Home button is always visible
  homeButton = new Sprite(80, 60);
  noStroke();
  homeButton.w = 150;
  homeButton.h = 70;
  homeButton.collider = "k";
  homeButton.img = loadImage('icons/home.png');

  directions = new Sprite(width - 90, 600);
  directions.w = 150;
  directions.h = 70;
  directions.collider = "k";
  directions.img = loadImage('icons/directions.png');

  restartButton = new Sprite();
  restartButton.w = 200;
  restartButton.h = 70;
  restartButton.collider = "k";
  restartButton.color = "#90b975ff";
  restartButton.textSize = 27;
  restartButton.text = "play again";
  restartButton.textColor = '#fff3e7ff';

  buyBasic = new Sprite(-1000, -1000);
  buyBasic.w = 150;
  buyBasic.h = 50;
  buyBasic.collider = "k";
  buyBasic.img = loadImage('images/basic.png'); 

  buyResilient = new Sprite(-1000, -1000);
  buyResilient.w = 150;
  buyResilient.h = 50;
  buyResilient.collider = "k";
  buyResilient.img = loadImage('images/resilient.png'); 

  buyHope = new Sprite(-1000, -1000);
  buyHope.w = 150;
  buyHope.h = 50;
  buyHope.collider = "k";
  buyHope.img = loadImage('images/hope.png');

  // // INITIALIZE PLANTS
  // basicSprout = new Sprite();
  // basicSprout.img = loadImage('images/basicSprout.png');
  // basicSeedling = new Sprite();
  // basicSeedling.img = loadImage('images/basicSeedling.png');
  // basicYoung = new Sprite();
  // basicYoung.img = loadImage('images/basicYoung.png');
  // basicMature = new Sprite();
  // basicMature.img = loadImage('images/basicMature.png');

  // resilientSprout = new Sprite();
  // resilientSprout.img = loadImage('images/resilientSprout.png');
  // resilientSeedling = new Sprite();
  // resilientSeedling.img = loadImage('images/resilientSeedling.png');
  // resilientYoung = new Sprite();
  // resilientYoung.img = loadImage('images/resilientYoung.png');
  // resilientMature = new Sprite();
  // resilientMature.img = loadImage('images/resilientMature.png');

  // hopeSprout = new Sprite();
  // hopeSprout.img = loadImage('images/hopeSprout.png');
  // hopeSeedling = new Sprite();
  // hopeSeedling.img = loadImage('images/hopeSeedling.png');
  // hopeYoung = new Sprite();
  // hopeYoung.img = loadImage('images/hopeYoung.png');
  // hopeMature = new Sprite();
  // hopeMature.img = loadImage('images/hopeMature.png');

  // Place game components off-screen initially
  plot = new Sprite(-1000, -1000);
  shopIcon = new Sprite(-1000, -1000);
  backToGameButton = new Sprite(-1000, -1000);
  restartButton.pos = { x: -1000, y: -1000 };

  well = new Sprite(-1000, -1000);
  well.img = loadImage('images/well.png');
  well.w = 200;
  well.h = 200;
  well.collider = 'k';

  // Default screen
  showStartScreen();
}


/* DRAW LOOP REPEATS */
function draw() {
  checkWinCondition();

  if (currentHopePoints >= goal) {
    showEndScreen();
    noLoop(); 
  }

  if (musicButton.mouse.presses()) {
    isMuted = !isMuted;
    if (isMuted) {
      music.setVolume(0);
    } else {
      music.setVolume(1);
    }
  }

  // Music button text
  fill('#446634ff');
  textSize(20);
  text('music <3', width - 70, 110);

  // Home text
  fill('#446634ff');
  textSize(20);
  text('home <3', 80, 110);

  // Update percentage for the progress bar
  progressPercentage = currentHopePoints / goal;
  showProgressBar();

  if (plot.x > 0) {

    noStroke();
    fill('#faf6ebff'); 
    rect(20, 140, 200, 150); 
    rect(20, 480, 200, 80);
    
    showGameUI();
  }

  // Display startButton
  startButton.w = 200;
  startButton.h = 70;
  startButton.collider = "k";
  startButton.color = "#90b975ff";
  startButton.textSize = 27;
  startButton.text = "start game";
  startButton.textColor = '#fff3e7ff'

  // Conditionals for the buttons
  // Check if startButton is pressed
  if (startButton.mouse.presses()){
    showGameScreen();
  }

  // Check if homeButton is pressed
  if (homeButton.mouse.presses()){
    showStartScreen();
  }
  
  if (shopIcon.mouse.presses()){
    shopOpen = true;
    showShop();
    textAlign(LEFT);
  } 

  // Check if shop is open
  if (shopOpen){
    // Clear old text before redrawing
    noStroke();
    fill("#faf6ebff"); 
    rect(190, 315, 300, 30);
    rect(190, 435, 300, 30);
    rect(190, 555, 300, 30);

    fill('#446634ff');
    noStroke();
    textSize(20);
    textAlign(LEFT);
    text('owned: ' + basicSeeds + '/' + maxSeeds, 200, 340);
    text('owned: ' + resilientSeeds + '/' + maxSeeds, 200, 460);
    text('owned: ' + hopeSeeds + '/' + maxSeeds, 200, 580);
    textAlign(CENTER);
  }

  // Check if backToGameButton is pressed
  if (backToGameButton.mouse.presses()){
    showGameScreen();
  }
  
  // Check if directions button is pressed
  if (directions.mouse.presses()){
    showDirections();
  }


  if (restartButton.mouse.presses()) {
    restartButton.pos = { x: -1000, y: -1000 };
    currentHopePoints = 0;
    showStartScreen();
    loop(); // Restart the draw loop
  }

  if (buyBasic.mouse.presses()) {
    print("buyBasic pressed");
    if (currentHopePoints >= basicCost && basicSeeds < maxSeeds) {
      currentHopePoints -= basicCost;
      basicSeeds++;
      print("Bought Basic Seed. Basic Seeds: " + basicSeeds);
    } else if (basicSeeds >= maxSeeds) {
      print("Cannot buy Basic Seed: Limit reached!");
    } else {
      print("Cannot buy Basic Seed: Not enough points!");
    }
  }

  // check if the resilient seed is pressed
  if (buyResilient.mouse.presses()) {
    if (currentHopePoints >= resilientCost && resilientSeeds < maxSeeds) {
      currentHopePoints -= resilientCost;
      resilientSeeds++;
      print("Bought Resilient Seed. Resilient Seeds: " + resilientSeeds);
    } else if (resilientSeeds >= maxSeeds) {
      print("Cannot buy Resilient Seed: Limit reached!");
    } else {
      print("Cannot buy Resilient Seed: Not enough points!");
    }
  }

  // check if the hope seed is pressed
  if (buyHope.mouse.presses()) {
    if (currentHopePoints >= hopeCost && hopeSeeds < maxSeeds) {
      currentHopePoints -= hopeCost;
      hopeSeeds++;
      print("Bought Hope Seed. Hope Seeds: " + hopeSeeds);
    } else if (hopeSeeds >= maxSeeds) {
      print("Cannot buy Hope Seed: Limit reached!");
    } else {
      print("Cannot buy Hope Seed: Not enough points!");
    }
  }

  // check if the well is pressed
  if (well.mouse.presses() && wellWater > 0) {
    wellWater--;
    print("Well pressed. Current water: " + wellWater);
    waterDrops++;
    print("Gathered 1 water drop. Total: " + waterDrops);
  }

  // Refill the well every 10 seconds
  if (millis() - lastWellRefillTime >= wellRefillInterval && wellWater < wellCapacity){
    wellWater++;
    lastWellRefillTime = millis();
    print("Well refilled. Current water: " + wellWater);
  } 
}


/* FUNCTIONS */

/* MUSIC FUNCS */
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    userStartAudio();
  }

  if (mouseX > restartButton.x - restartButton.w/2 && 
      mouseX < restartButton.x + restartButton.w/2 && 
      mouseY > restartButton.y - restartButton.h/2 && 
      mouseY < restartButton.y + restartButton.h/2) {
    
    currentHopePoints = 0;
    basicSeeds = 0;
    resilientSeeds = 0;
    hopeSeeds = 0;

    restartButton.pos = { x: -1000, y: -1000 }; 
    showStartScreen();
    loop(); 
  }
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    userStartAudio();
  }
}

function showStartScreen() {
  shopOpen = false;
  print("showStartScreen called");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  // Display start screen elements
  textSize(50);
  fill('#446634ff');
  textFont(font);
  text('welcome to lumis', width / 2, height / 2 - 50);
  
  textFont(italic_font);
  textSize(20);
  text('press the button to start', width / 2, height / 2 - 10);

  fill('#446634ff');
  text('// press anywhere to start music', width / 2, 590);

  // Start button
  startButton.pos = {
    x: width / 2,
    y: height / 2 + 170
  };

  // Game elements should be off screen
  plot.pos = { x: -1000, y: -1000 };
  shopIcon.pos = { x: -1000, y: -1000 };
  backToGameButton.pos = { x: -1000, y: -1000 };
  buyBasic.pos = { x: -1000, y: -1000 };
  buyResilient.pos = { x: -1000, y: -1000 };
  buyHope.pos = { x: -1000, y: -1000 };
  restartButton.pos = { x: -1000, y: -1000 };

  well.pos = { x: -1000, y: -1000 };


}

function showGameScreen() {
  shopOpen = false;
  print("showGameScreen called");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  startButton.pos = { x: -1000, y: -1000 };  
  backToGameButton.pos = { x: -1000, y: -1000 };
  buyBasic.pos = { x: -1000, y: -1000 };
  buyResilient.pos = { x: -1000, y: -1000 };
  buyHope.pos = { x: -1000, y: -1000 };
  restartButton.pos = { x: -1000, y: -1000 };

  homeButton.pos = { x: 80, y: 60 };
  plot.pos = { x: width / 2, y: height / 2 + 80 };
  directions.pos = { x: width - 90, y: 600 };

  well.pos = { x: 80, y: height / 2 + 30 };

  // Shop icon configurations
  shopIcon.img = loadImage('icons/shop.png');
  shopIcon.collider = 'k';

  // Shop icon position
  shopIcon.pos = {
    x: width - 70,
    y: height / 2 - 170
  };

  // Diplay plot
  plot.w = 300;
  plot.h = 300;
  plot.collider = "s";
  plot.img = loadImage('images/plot.png');

  fill('#446634ff');
  textFont(font);
  textSize(20);
  textAlign(LEFT);
  text('Seeds Inventory', 30, 160);

  textSize(15);
  text('Basic: ' + basicSeeds + '/' + maxSeeds, 30, 190);
  text('Resilient: ' + resilientSeeds + '/' + maxSeeds, 30, 220);
  text('Hope: ' + hopeSeeds + '/' + maxSeeds, 30, 250);
  textAlign(CENTER);

  // Display water count and well water
  textAlign(LEFT);
  textSize(15);
  textFont(font);
  text('water count: ' + waterDrops, 30, 530);
  text('well: ' + wellWater + '/' + wellCapacity, 30, 500);
  textAlign(CENTER);

}

function showProgressBar(){
  // Clear the area where the progress bar will be drawn
  noStroke();
  fill("#faf6ebff"); 
  rect(barX, barY, barWidth, barHeight + 50, 20);

  // Draw the background of the progress bar
  fill('#d6d6d6ff');
  rect(barX, barY, barWidth, barHeight, 20, 20, 20, 20); 

  // Draw the filled portion of the progress bar
  fill('#90b975ff'); 
  let filledWidth = barWidth * progressPercentage;
  rect(barX, barY, filledWidth, barHeight, 20, 20, 20, 20);
  
  fill('#446634ff');
  textSize(20);
  textFont(font);
  text(currentHopePoints + ' / ' + goal + ' hope points', 
      width / 2, barY + barHeight + 30);
}

function showShop(){
  shopOpen = true;
  print("Shop screen showing. function showShop() is called.");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  // Remove gameScreen elements
  plot.pos = { x: -1000, y: -1000 };
  shopIcon.pos = { x: -1000, y: -1000 };
  startButton.pos = { x: -1000, y: -1000 };
  restartButton.pos = { x: -1000, y: -1000 };
  well.pos = { x: -1000, y: -1000 };

  // backToGameButton
  backToGameButton.img = loadImage('icons/back.png');
  backToGameButton.w = 100;
  backToGameButton.h = 100;
  backToGameButton.pos = { x: 85, y: 170 };

  // Shop title
  fill('#446634ff');
  textFont(font);
  textSize(40);
  text('Seed Shop', width / 2, 180);

  // Display seed options
  textFont(italic_font);
  textSize(25);
  textAlign(LEFT);


  // Basic Seed
  text('basic seed', 200, 280);
  text('cost: ' + basicCost + ' hp', 200, 310);
  text('owned: ' + basicSeeds + '/' + maxSeeds, 200, 340);
  buyBasic.pos = { x: 450, y: 310 };

  // Resilient Seed
  text('resilient seed', 200, 400);
  text('cost: ' + resilientCost + ' hp', 200, 430);
  text('owned: ' + resilientSeeds + '/' + maxSeeds, 200, 460);
  buyResilient.pos = { x: 450, y: 430 };

  // Hope Seed
  text('hope seed', 200, 520);
  text('cost: ' + hopeCost + ' hp', 200, 550);
  text('owned: ' + hopeSeeds + '/' + maxSeeds, 200, 580);
  buyHope.pos = { x: 450, y: 550 };

  textAlign(CENTER); // Reset text alignment

}

function showDirections(){
  shopOpen = false;
  print("showDirections called. showing directions");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  plot.pos = { x: -1000, y: -1000 };
  shopIcon.pos = { x: -1000, y: -1000 };
  buyBasic.pos = { x: -1000, y: -1000 };
  buyResilient.pos = { x: -1000, y: -1000 };
  buyHope.pos = { x: -1000, y: -1000 };
  well.pos = { x: -1000, y: -1000 };

  backToGameButton.img = loadImage('icons/back.png');
  backToGameButton.w = 100;
  backToGameButton.h = 100;
  backToGameButton.pos = {
    x: 85,
    y: 170
  };
  
  fill('#446634ff');
  textFont(font);
  textSize(40);
  text('Directions', width / 2, 180);

  textFont(italic_font);
  textSize(15);
  textAlign(LEFT);
  text('Goal: Cultivate a thriving garden to reach 1000 Hope Points.', 150, 250);
  text('The Plot: Start with 2 unlocked plots. Earn Hope Points to unlock more.', 150, 290);
  text('Water: Gather from the well (refills every 10s). Click plants to water them.', 150, 330);
  text('Fertilizer: Randomly drops (every 90s). Use to grow plants faster.', 150, 370);
  text('Seeds: Buy different seeds in the shop to get different plants.', 150, 410);
  text('Hope Points: Earned by growing plants to maturity.', 150, 450);
  
  textAlign(CENTER);
}

function checkWinCondition() {
  if (currentHopePoints >= goal) {
    // Show end screen
    showEndScreen();
  }
}

function showEndScreen() {
  shopOpen = false;
  print("showEndScreen called");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  backToGameButton.pos = { x: -1000, y: -1000 };
  directions.pos = { x: -1000, y: -1000 };
  shopIcon.pos = { x: -1000, y: -1000 };
  plot.pos = { x: -1000, y: -1000 };
  startButton.pos = { x: -1000, y: -1000 };
  well.pos = { x: -1000, y: -1000 };


  // Display end screen elements
  textSize(50);
  fill('#446634ff');
  textFont(font);
  text('congratulations!', width / 2, height / 2 - 50);
  
  textFont(italic_font);
  textSize(20);
  text('you have reached your goal of ' + goal + ' hope points!', width / 2, height / 2 - 10);

  text('you have successfully cultivated a thriving garden!', width / 2, height / 2 + 30);

  restartButton.pos = {
    x: width / 2,
    y: height / 2 + 250
  };
}

function showGameUI() {
    fill('#446634ff');
    textFont(font);
    textSize(20);
    textAlign(LEFT);
    text('Seeds Inventory', 30, 160);

    textSize(15);
    text('Basic: ' + basicSeeds + '/' + maxSeeds, 30, 190);
    text('Resilient: ' + resilientSeeds + '/' + maxSeeds, 30, 220);
    text('Hope: ' + hopeSeeds + '/' + maxSeeds, 30, 250);
    textAlign(CENTER);

    textAlign(LEFT);
    textSize(15);
    textFont(font);
    text('water count: ' + waterDrops, 30, 530);
    text('well: ' + wellWater + '/' + wellCapacity, 30, 500);
    textAlign(CENTER);
}