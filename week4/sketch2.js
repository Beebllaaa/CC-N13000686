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
  beginShape();

  for (let x = 20; x <= width - 20; x += 2) {
    vertex(x, y);
  }

  endShape();
}

function draw() {
  background(255);
  stroke(20, 100, 255);

  drawLine(30);
}

