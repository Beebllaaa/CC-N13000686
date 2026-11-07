
let sheep;

async function setup() {
  createCanvas(800, 600);

  sheep = await loadImage("assets/sheep.png");
}

function draw() {
  background(5, 10, 45);

  noSmooth();
  imageMode(CENTER);
  image(sheep, width / 2, height / 2, 320, 320);
}
