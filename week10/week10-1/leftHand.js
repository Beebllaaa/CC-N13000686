function updateLeftHand(leftHand) {
  let thumb = leftHand.thumb_tip;
  let fingers = [
    leftHand.index_finger_tip,
    leftHand.middle_finger_tip,
    leftHand.ring_finger_tip,
    leftHand.pinky_finger_tip
  ];

  push();

  for (let i = 0; i < fingers.length; i++) {
    let finger = fingers[i];
    let distance = dist(finger.x, finger.y, thumb.x, thumb.y);
    let x = width - finger.x;
    let y = finger.y;

    // 刚捏上的时候，切换一次音轨
    if (distance < 30 && !pinching[i]) {
      playSound(i);
    }

    pinching[i] = distance < 30;

    // 出声时是实心圆，静音时是空心环
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