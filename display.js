/* VARIABLES */
let font;
let italic_font;

// Buttons
let startButton;
let homeButton;
let backToGameButton;

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

  // Place game components off-screen initially
  plot = new Sprite(-1000, -1000);
  shopIcon = new Sprite(-1000, -1000);
  backToGameButton = new Sprite(-1000, -1000);

  // Default screen
  showStartScreen();
}


/* DRAW LOOP REPEATS */
function draw() {

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

  // Directions Text
  fill("#446634ff");
  noStroke();
  textSize(20);
  text("directions", width - 90, 670);

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
  }

  if (backToGameButton.mouse.presses()){
    showGameScreen();
  }

  if (directions.mouse.presses()){
    showDirections();
  }

}


/* FUNCTIONS */

/* MUSIC FUNCS */
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    userStartAudio();
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
  // Plot position
  plot.pos = {
    x: -1000,
    y: -1000
  };

  // Shop icon position
  shopIcon.pos = {
    x: -1000,
    y: -1000
  };

  // backToGameButton position
  backToGameButton.pos = {
    x: -1000,
    y: -1000
  };

}

function showGameScreen() {
  print("showGameScreen called");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  // Hide start button
  startButton.pos = {
    x: -1000,
    y: -1000
  };

  // Home button
  homeButton.pos = {
    x: 80,
    y: 60
  };

  // Plot position
  plot.pos = {
    x: width / 2,
    y: height / 2 + 80
  };

  // backToGameButton position
  backToGameButton.pos = {
    x: -1000,
    y: -1000
  };

  // Shop icon configurations
  shopIcon.img = loadImage('icons/shop.png');
  shopIcon.collider = 'k';

  // Shop icon position
  shopIcon.pos = {
    x: width - 70,
    y: height / 2 - 170
  };

  // Display game screen elements

  // Diplay plot
  plot.w = 300;
  plot.h = 300;
  plot.collider = "s";
  plot.img = loadImage('images/plot.png');

}

function showProgressBar(){
  
  fill('#d6d6d6ff');
  rect(barX, barY, barWidth, barHeight, 20); 

  // Draw the filled portion of the progress bar
  fill('#90b975ff'); 
  let filledWidth = barWidth * progressPercentage;
  rect(barX, barY, filledWidth, barHeight, 20);
  
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
  // Plot position
  plot.pos = {
    x: -1000,
    y: -1000
  };

  // shop icon position
  shopIcon.pos = {
    x: -1000,
    y: -1000
  };

  // backToGameButton
  backToGameButton.img = loadImage('icons/back.png');
  backToGameButton.w = 100;
  backToGameButton.h = 100;
  backToGameButton.pos = {
    x: 85,
    y: 170
  };


}

function showDirections(){
  print("showDirections called. showing directions");

  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  plot.pos = { x: -1000, y: -1000 };
  shopIcon.pos = { x: -1000, y: -1000 };
  
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