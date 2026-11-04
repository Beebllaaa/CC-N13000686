
let vid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Load video
  vid = await createVideo("assets/target.mp4");

  vid.autoplay();
  vid.volume(0);
  vid.hide();
  vid.loop();
}

function draw() {
  background(0);

  // Display video in the center
  translate(width / 2, height / 2);

  imageMode(CENTER);
  image(vid, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
