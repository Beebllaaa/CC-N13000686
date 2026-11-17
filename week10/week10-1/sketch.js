let sound;
let video;

async function setup() {
  createCanvas(900, 600);
  video = createCapture(VIDEO);
  video.size(900, 600);
  video.hide();
  sound = await loadSound('assets/drums.wav');
}

function draw() {
  image(video, 0, 0, width, height);
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