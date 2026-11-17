function updateRightHand(rightHand) {
  if (!rightHand) {
    return;
  }

  let fingers = [
    rightHand.thumb_tip,
    rightHand.index_finger_tip,
    rightHand.middle_finger_tip,
    rightHand.ring_finger_tip,
    rightHand.pinky_finger_tip
  ];

  push();
  fill(80, 180, 255, 60);
  stroke(80, 180, 255);
  strokeWeight(3);

  beginShape();

  for (let i = 0; i < fingers.length; i++) {
    let finger = fingers[i];
    vertex(width - finger.x, finger.y);
  }

  endShape(CLOSE);
  pop();
}