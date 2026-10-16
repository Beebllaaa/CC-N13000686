function setup() {
  createCanvas(1600, 800);
}

function draw() {
  background(20);

  //Connect circle number to minutes
  let m = minute();
  let layers = map(m, 0, 59, 0, 6);   

  push();
  translate(width / 2, height / 2);

  noFill();
  stroke(150, 180, 255);
  strokeWeight(5);

  for (let i = 0; i < layers; i++) {
    let diameter = 50 + i * 60;
    circle(0, 0, diameter);
  }

  pop();

}