let video;
let handPose;
let hands = [];
let sounds = [];
let pinching = [false, false, false, false];
let started = false;
let trackOn = [false, false, false, false];
let trackColors = ["#FF826F", "#FFCE5C", "#63D9C3", "#BAA4FF"];
let fft;

async function setup() {
  createCanvas(900, 600);
  video = createCapture(VIDEO, { flipped: true });
  video.size(900, 600);
  video.hide();

  sounds[0] = await loadSound("assets/drums.wav");
  sounds[1] = await loadSound("assets/bass.wav");
  sounds[2] = await loadSound("assets/guitar.wav");
  sounds[3] = await loadSound("assets/keys.wav");
 
  fft = new p5.FFT(512);

  for (let i = 0; i < sounds.length; i++) {
    sounds[i].connect(fft);
  }
  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);

  await setupFace();
}

function draw() {
  image(video, 0, 0, width, height);

  let leftHand;
  let rightHand;

  for (let i = 0; i < hands.length; i++) {
    if (hands[i].handedness === "Right") {
      leftHand = hands[i];
    } else if (hands[i].handedness === "Left") {
      rightHand = hands[i];
    }
  }

  if (leftHand) {
    updateLeftHand(leftHand);
  }

  updateRightHand(rightHand);
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

  if (trackOn[i]) {
  sounds[i].amp(mouthVolume);
} else {
  sounds[i].amp(0);
}
}

function gotHands(results) {
  hands = results;
}

function keyPressed(event) {
  if (key === " ") {
    if (!event.repeat) {
      saveRightShape();
    }

    return false;
  }
}