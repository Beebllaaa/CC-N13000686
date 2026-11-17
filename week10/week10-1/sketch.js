let video;
let handPose;
let hands = [];
let sounds = [];
let pinching = [false, false, false, false];

async function setup() {
  createCanvas(900, 600);
  video = createCapture(VIDEO, { flipped: true });
  video.size(900, 600);
  video.hide();

  sounds[0] = await loadSound("assets/drums.wav");
  sounds[1] = await loadSound("assets/bass.wav");
  sounds[2] = await loadSound("assets/guitar.wav");
  sounds[3] = await loadSound("assets/keys.wav");
 
  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0, width, height);

if (hands.length > 0) {
  let hand = hands[0];
  let thumb = hand.thumb_tip;
  let fingers = [
  hand.index_finger_tip,
  hand.middle_finger_tip,
  hand.ring_finger_tip,
  hand.pinky_finger_tip
];

  for (let i = 0; i < fingers.length; i++) {
    let finger = fingers[i];
    let distance = dist(finger.x, finger.y, thumb.x, thumb.y);

    if (distance < 30 && !pinching[i]) {
      playSound(sounds[i]);
    }

    pinching[i] = distance < 30;

    if (pinching[i]) {
      fill(255, 180, 0);
    } else {
      fill(255);
    }

    circle(width - finger.x, finger.y, 20);
  }

  fill(255);
  circle(width - thumb.x, thumb.y, 20);
}

fill(0);
}

function playSound(sound) {
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