let sound;

async function setup() {
  createCanvas(800, 600);
  sound = await loadSound('assets/drums.wav');
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  text("click to play drum", width / 2, height / 2);
}

function mousePressed() {
    if (!sound.isPlaying()) {
        sound.play();
    } else {
        sound.stop();
    }
}