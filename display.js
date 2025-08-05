/* VARIABLES */
let font;
let italic_font;

// Buttons
let startButton;
let homeButton;

// Game graphics;
let plot;

// Music
let music;
let musicStarted = false;
let musicButton;
let isMuted = false;


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

  // Place game components off-screen initially
  plot = new Sprite(-1000, -1000);

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
}


/* FUNCTIONS */

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

  // Display game screen elements

  // Diplay plot
  plot.w = 300;
  plot.h = 300;
  plot.collider = "s";
  plot.img = loadImage('images/plot.png');

}