function updateRightHand(rightHand) {
  if (!rightHand) {
    return;
  }

  let thumb = rightHand.thumb_tip;

  push();
  noStroke();
  fill(80, 180, 255);
  circle(width - thumb.x, thumb.y, 20);
  pop();
}