let sound;
let video;
let handPose;
let hands = [];

async function setup() {
  createCanvas(900, 600);
  video = createCapture(VIDEO, { flipped: true });
  video.size(900, 600);
  video.hide();
  sound = await loadSound('assets/drums.wav');
  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0, width, height);
  textAlign(CENTER, CENTER);
  text("click to play drum", width / 2, height / 2);

  if (hands.length > 0) {
  let fingerX = hands[0].index_finger_tip.x;
  let fingerY = hands[0].index_finger_tip.y;

  circle(width - fingerX, fingerY, 20);
}
}

function mousePressed() {
    if (!sound.isPlaying()) {
        sound.play();
    } else {
        sound.stop();
    }
}

function gotHands(results) {
  hands = results;
}