var bg;
var sharkfin;
var fish;
var x, y;
var xx, yy;
var a, b;
let t=0;
let n=1;
var xloc, yloc, q;
var song;
var slider;
var textx1, textx2, textx3, textx4;

let font,
  fontsize = 30;

function preload() {
  font = loadFont('assets/Brush Script.ttf');
  song = loadSound('assets/oceanwaves.mp3');
}

function setup() {
  createCanvas(800, 800);
  bg = loadImage("assets/sailboats.jpg");
  sharkfin = loadImage("assets/sharkfin.png");
  fish = loadImage("assets/fish.png");
  bird = loadImage("assets/bird.png")

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  slider = createSlider(0, 1, 0.5, 0.01);

  x = 0;
  y = height*0.58;
  xx=width*0.2;
  yy = height*0.5;
  textx1 = 680;
  textx2 = 680;
  textx3 = 680;
  textx4 = 680;
}

function draw(){
    background(bg);

    // Text
textAlign(CENTER);
drawWords(width * 1);

// Sunshine
  fill(255, 227, 22);
  stroke(255, 150, 22);
  push();
  translate(width*0.85, height*0.12);
  rotate(frameCount / -130.0);
  star(0, 0, 30, 80, 16); 
  pop();

// Fish swimming
  // Make x and y grid 
  for (let a = -0.5; a <= width*1.5; a = a + 90) {
    for (let b = height*0.55; b <= height*0.8; b = b + 60) {
      // Starting point of each circle depends on mouse position
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // And also varies based on the particle's location
      let angle = xAngle * (a / width) + yAngle * (b / height);
      // Each particle moves in a circle
      let myX = a + 20 * cos(2 * PI * t + angle);
      let myY = b + 20 * sin(2 * PI * t + angle);
      // Draw particle
      image(fish, myX, myY, fish.width/40, fish.height/40);
    }
  }
  t = t + 0.01; // update time

// Moving shark fins
  image(sharkfin, x, y, sharkfin.width/6, sharkfin.height/6);
  x = x + 0.5;
  y = y + random(-1, 1);
  image(sharkfin, xx, yy, sharkfin.width/9, sharkfin.height/9);
  xx = xx + 0.8;
  yy = yy + random(-1, 1);
  // Repeat movement across screen
  if (x > width) {
    x= 0}
  if (xx > width) {
    xx=0}

// Bird
  image(bird, 100, 200, bird.width/5, bird.height/5)
  image(bird, 300, 20, bird.width/3.5, bird.height/4)
  image(bird, 650, 300, bird.width/6, bird.height/6)
  image(bird, mouseX, mouseY, bird.width/5, bird.height/random(3, 8))
  

// Music
  song.setVolume(slider.value());
}

// Star
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  }

// Text
function drawWords(x) {
  // The text() function needs three parameters:
  // the text to draw, the horizontal position,
  // and the vertical position
  fill(255);
  stroke(132, 193, 255);
  text('take', textx1, 80);
  textx1 = textx1-1;
  text('a seat,', textx2, 80);
  textx2 = textx2-0.75;
  text('stay', textx3, 80);
  textx3 = textx3-0.5;
  text('awhile', textx4, 80);
  textx4 = textx4-0.25;
}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}