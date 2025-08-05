/* VARIABLES */
let font;
let italic_font;

// Buttons
let startButton;
let homeButton;

/* PRELOAD LOADS FILES */
function preload(){
  font = loadFont('fonts/font.ttf');
  italic_font = loadFont('fonts/italic_font.ttf');
}

/* SETUP RUNS ONCE */
function setup() {
  // Create a canvas and set its parent to the 'canvas-container' div
  let cnv = createCanvas(1000, 700);
  cnv.parent('canvas-container');
  background('#f3e0c6');

  textAlign(CENTER);
  textFont(font);

  // Create the rounded corners
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  // Place all buttons off-screen initially
  startButton = new Sprite(-1000, -1000);
  homeButton = new Sprite(-1000, -1000);

  // Default screen
  showStartScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  // Display startButton
  startButton.w = 200;
  startButton.h = 70;
  startButton.collider = "k";
  startButton.color = "#90b975ff";
  startButton.textSize = 20;
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
  fill('#000000');
  textFont(font);
  text('welcome to lumis', width / 2, height / 2 - 50);
  
  textSize(30);
  text('press the button to start', width / 2, height / 2 + 20);

  // Start button
  startButton.pos = {
    x: width / 2,
    y: height / 2 + 170
  };
}

function showGameScreen() {
  print("showGameScreen called");
  // Clear the canvas
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

  // Display game screen elements
  textSize(50);
  fill('#000000');
  textFont(font);
  text('game screen', width / 2, height / 2 - 50);

  textSize(30);
  text('game is under construction', width / 2, height / 2 + 20);

  // Hide start button
  startButton.pos = {
    x: -1000,
    y: -1000
  };

  // Home button
  homeButton.pos = {
    x: 120,
    y: 75
  };

  homeButton.w = 150;
  homeButton.h = 70;
  homeButton.collider = "k";
  homeButton.color = "#90b975ff";
  homeButton.textSize = 20;
  homeButton.text = "go home";
  homeButton.textColor = '#fff3e7ff'

}