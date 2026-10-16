function setup() {
  createCanvas(1600, 800);
}

function draw() {
  background(20);

  push();
  translate(width / 2, height / 2);

  noFill();
  stroke(150, 180, 255);
  strokeWeight(5);

  circle(0, 0, 100);

  pop();
}