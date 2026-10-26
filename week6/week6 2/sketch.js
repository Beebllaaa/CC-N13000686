
let numDots = 41;
let dotSize = 8;

let speed = 0.02;
let delay = 0.045;

function setup() {
  createCanvas(600, 600);
  background(0);
}

function draw() {
  // Fading trails
  background(0, 15);

  noStroke();
  fill(255);

  for (let i = 0; i < numDots; i++) {

    let x = map(
      i, 0, numDots - 1,
      dotSize / 2, width - dotSize / 2
    );

    // Each dot follows the same motion,
    // but starts at a different phase
    let phase = frameCount * speed - i * delay;

    // Smooth movement between top and bottom
    let progress = (sin(phase - HALF_PI) + 1) / 2;

    let y = map(
      progress, 0, 1,
      height - dotSize / 2,
      dotSize / 2
    );

    circle(x, y, dotSize);
  }
}
