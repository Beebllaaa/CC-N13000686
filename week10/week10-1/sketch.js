let video;
let handPose;
let hands = [];
let sounds = [];
let pinching = [false, false, false, false];
let started = false;
let trackOn = [false, false, false, false];
let trackColors = ["#FF826F", "#FFCE5C", "#63D9C3", "#BAA4FF"];
let trackVolume = [1, 1, 1, 1];
let adjustingTrack = -1;

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
  playSound(i);
}

    pinching[i] = distance < 30;

    //four
    let x = width - finger.x;
    let y = finger.y;

    push();
    stroke(trackColors[i]);
    strokeWeight(3);

    if (trackOn[i]) {
      fill(trackColors[i]);
    } else {
      noFill();
    }

    circle(x, y, 28);

    if (pinching[i]) {
      noStroke();
      fill(255);
      circle(x, y, 9);
    }
    pop();

    if (pinching[i]) {
      fill(trackColors[i]);
    } else {  
      noFill();
    }

    circle(width - finger.x, finger.y, 20);
  }
  
  //thumb
  noStroke();
  fill(255);
  circle(width - thumb.x, thumb.y, 24);
}

fill(0);
}

function playSound(i) {
  if (!started) {
    for (let j = 0; j < sounds.length; j++) {
      sounds[j].amp(0, 0);
      sounds[j].loop(true);
      sounds[j].play();
    }

    started = true;
  }

  trackOn[i] = !trackOn[i];

  if (trackOn[i]) {
    sounds[i].amp(1);
  } else {
    sounds[i].amp(0);
  }
}

function gotHands(results) {
  hands = results;
}