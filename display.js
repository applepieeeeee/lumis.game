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
const basicCost = 0;
const resilientCost = 10;
const hopeCost = 30;


let shopIcon;
let directions;

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

  // Place game components off-screen initially
  plot = new Sprite(-1000, -1000);
  shopIcon = new Sprite(-1000, -1000);
  backToGameButton = new Sprite(-1000, -1000);
  restartButton.pos = { x: -1000, y: -1000 };

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

  progressPercentage = currentHopePoints / goal;
  showProgressBar();

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
    showShop();
    textAlign(LEFT);
    text('owned: ' + basicSeeds + '/' + maxSeeds, 200, 340);
    text('owned: ' + resilientSeeds + '/' + maxSeeds, 200, 460);
    text('owned: ' + hopeSeeds + '/' + maxSeeds, 200, 580);
  }

  if (backToGameButton.mouse.presses()){
    showGameScreen();
  }

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

  if (buyResilient.mouse.presses()) {
    print("Resilient Seed button pressed.");
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

}

function showGameScreen() {
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
  // text('owned: ' + basicSeeds + '/' + maxSeeds, 200, 340);
  buyBasic.pos = { x: 450, y: 310 };

  // Resilient Seed
  text('resilient seed', 200, 400);
  text('cost: ' + resilientCost + ' hp', 200, 430);
  // text('owned: ' + resilientSeeds + '/' + maxSeeds, 200, 460);
  buyResilient.pos = { x: 450, y: 430 };

  // Hope Seed
  text('hope seed', 200, 520);
  text('cost: ' + hopeCost + ' hp', 200, 550);
  // text('owned: ' + hopeSeeds + '/' + maxSeeds, 200, 580);
  buyHope.pos = { x: 450, y: 550 };

  textAlign(CENTER); // Reset text alignment

}

function showDirections(){
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
  print("showEndScreen called");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  backToGameButton.pos = {
    x: -1000,
    y: -1000
  };

  directions.pos = {
    x: -1000,
    y: -1000
  };

  shopIcon.pos = {
    x: -1000,
    y: -1000
  };

  plot.pos = {
    x: -1000,
    y: -1000
  };

  startButton.pos = {
    x: -1000,
    y: -1000
  };

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