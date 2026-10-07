// press 'r' for new random seed
// press 's' to save SVG
// Export requires loading the p5.plotSvg library

let seed = 327;
let doExport = false;

function setup() {
  createCanvas(576, 384);
}

function keyPressed() {
  if (key == "r") {
    seed = floor(random(13001));
  }

  if (key == "s") {
    doExport = true;
  }
}

function drawLine(y, reverse) {
  if (reverse) {
    stroke(255, 50, 150); //pink
  } else {
    stroke(20, 100, 255); // blue
  }

  beginShape();

  for (let x = 20; x <= width - 20; x += 2) {
    let amount = (x - 20) / (width - 40);
    let noiseOffset = 0;

    // Reverse the direction of changes
    if (reverse) {
      amount = 1 - amount;
      noiseOffset = 100;
    }

    // Calm in the middle, with intensified changes near the fluctuating ends
    let intensity = amount * amount * amount;

    let n = noise(
      amount * 2 + intensity * 6,
      y * 0.02 + noiseOffset
    );

    let currentY = y + (n - 0.5) * 90 * intensity;

    vertex(x, currentY);
  }

  endShape();
}

function draw() {
  noiseSeed(seed);

  background(255);
  noFill();
  strokeWeight(0.6);

  if (doExport) {
    beginRecordSvg("overlapping-lines.svg");
  }

  for (let y = 30; y <= height - 30; y += 10) {
    drawLine(y, false); // Blue line: right fluctuation intensifies
    drawLine(y, true);  // Pink line: left fluctuation intensifies
  }

  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}