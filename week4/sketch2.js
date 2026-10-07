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
    //diffrent noise values for x and y to get more variation in the lines
    let n = noise(x * 0.01, y * 0.02);
    let amount = (x - 20) / (width - 40);
    let currentY = y + (n - 0.5) * 40 * amount;

    vertex(x, currentY);
  }

  endShape();
}

function draw() {
  noiseSeed(seed);
  
  background(255);
  stroke(20, 100, 255);

  for (let y = 30; y <= height - 30; y += 10) {
  drawLine(y);
  }
}

