/* VARIABLES */
let font;
let italic_font;

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
  background('#f8e4c4');

  textAlign(CENTER);
  textFont(font);

  // Create the rounded corners
  noStroke();
  fill("#faf6ebff"); 
  rect(0, 0, 1000, 700, 40);

}


/* DRAW LOOP REPEATS */
function draw() {

}


/* FUNCTIONS */