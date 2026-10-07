// press 'r' for new random seed
// press 's' to save

let seed = 327;
let doExport = false;

function setup() {
  createCanvas(576, 384); // postcard size
}

function keyPressed() {
  if (key == "r") {
    seed = floor(random(13001));
  }

  if (key == "s") {
    doExport = true;
  }
}

function drawLine(y) {
  line(20, y, width - 20, y);
}

function draw() {
  background(255);
  stroke(20, 100, 255);

  drawLine(30);
}

