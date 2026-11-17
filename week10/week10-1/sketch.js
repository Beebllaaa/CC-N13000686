let sound;
let video;
let handPose;
let hands = [];
let pinching = false;

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

if (hands.length > 0) {
  let fingerX = hands[0].index_finger_tip.x;
  let fingerY = hands[0].index_finger_tip.y;
  let thumbX = hands[0].thumb_tip.x;
  let thumbY = hands[0].thumb_tip.y;

  let distance = dist(fingerX, fingerY, thumbX, thumbY);
  
  
  if (distance < 30 && !pinching) {
  playDrum();
}
pinching = distance < 30;

  if (distance < 30) {
    fill(255, 180, 0);
  } else {
    fill(255);
  }

  circle(width - fingerX, fingerY, 20);
  circle(width - thumbX, thumbY, 20);
}

fill(0);
}

function playDrum() {
  if (!sound.isPlaying()) {
    sound.loop(true);
    sound.play();
  } else {
    sound.stop();
  }
}

function gotHands(results) {
  hands = results;
}