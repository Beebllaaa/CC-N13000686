let sound;

async function setup() {
  createCanvas(800, 600);
  sound = await loadSound("assets/drum.mp3");
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text("click to play drum", width / 2, height / 2);
}

function mousePressed() {
  sound.play();
}