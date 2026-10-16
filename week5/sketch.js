
function setup() {
  createCanvas(1600, 800);
  angleMode(DEGREES);
}

function draw() {
  background(20);

  //Connect circle number to minutes
  let m = minute();
  let layers = map(m, 0, 59, 0, 6);   

  //Make the circles breathe with seconds
  let s = second();
  let pulse = sin(s * 6) * 10;

  push();
  translate(width / 2, height / 2);

  noFill();
  stroke(150, 180, 255);
  strokeWeight(5);

  for (let i = 0; i < layers; i++) {

beginShape();

for (let angle = 0; angle < 360; angle += 3) {
  let xoff = cos(angle) + 1;
  let yoff = sin(angle) + 1;

  let noiseVal = noise(xoff, yoff);
  let radius = 100 + map(noiseVal, 0, 1, -40, 40);

  let x = radius * cos(angle);
  let y = radius * sin(angle);

  vertex(x, y);
}

endShape(CLOSE);
  }

  pop();

}