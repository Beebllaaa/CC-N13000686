function updateLeftHand(leftHand) {
  let thumb = leftHand.thumb_tip;
  let fingers = [
    leftHand.index_finger_tip,
    leftHand.middle_finger_tip,
    leftHand.ring_finger_tip,
    leftHand.pinky_finger_tip
  ];

  let wrist = leftHand.keypoints[0];
let palm = leftHand.keypoints[9];
let palmSize = dist(wrist.x, wrist.y, palm.x, palm.y);
let closedFingers = 0;

for (let i = 0; i < fingers.length; i++) {
  let finger = fingers[i];
  let distance = dist(finger.x, finger.y, wrist.x, wrist.y);

  if (distance < palmSize * 1.2) {
    closedFingers++;
  }
}

if (palmSize > 0 && closedFingers === 4) {
  savedShapes = [];

  for (let i = 0; i < sounds.length; i++) {
    trackOn[i] = false;
    sounds[i].amp(0);

    pinching[i] = true;
  }

  return;
}

  push();

  for (let i = 0; i < fingers.length; i++) {
    let finger = fingers[i];
    let distance = dist(finger.x, finger.y, thumb.x, thumb.y);
    let x = width - finger.x;
    let y = finger.y;

    if (distance < 30 && !pinching[i]) {
      playSound(i);
    }

    pinching[i] = distance < 30;

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
      noFill();
      circle(x, y, 9);
    }
  }

  noStroke();
  fill(255);
  circle(width - thumb.x, thumb.y, 20);

  pop();
}