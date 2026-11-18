let currentShape = [];
let savedShapes = [];

function updateRightHand(rightHand) {
  currentShape = [];

  if (rightHand) {
    let fingers = [
      rightHand.thumb_tip,
      rightHand.index_finger_tip,
      rightHand.middle_finger_tip,
      rightHand.ring_finger_tip,
      rightHand.pinky_finger_tip
    ];

    for (let i = 0; i < fingers.length; i++) {
      currentShape.push({
        x: width - fingers[i].x,
        y: fingers[i].y
      });
    }
  }


let spectrum = fft.analyze();

let low = 0;
let mid = 0;
let high = 0;

// read the strongest value in each frequency range
for (let i = 1; i < 161; i++) {
  if (i < 6) {
    low = max(low, spectrum[i]);
  } else if (i < 46) {
    mid = max(mid, spectrum[i]);
  } else {
    high = max(high, spectrum[i]);
  }
}

let lowLight = map(low, 0, 0.08, 0, 1, true);
let midLight = map(mid, 0, 0.05, 0, 1, true);
let highLight = map(high, 0, 0.03, 0, 1, true);

let strength = max(lowLight, midLight, highLight);
let flashColor = color("#ff4073");

if (midLight === strength) {
  flashColor = color("#7645ff");
} else if (highLight === strength) {
  flashColor = color("#00ffb3");
}

let edgeColor = lerpColor(color("#8cfffb"), flashColor, strength);
let opacity = map(strength, 0, 1, 25, 210);

  push();
  fill(red(edgeColor), green(edgeColor), blue(edgeColor), opacity);
  stroke(edgeColor);
  strokeWeight(4);

  for (let i = 0; i < savedShapes.length; i++) {
    drawHandShape(savedShapes[i]);
  }

  drawHandShape(currentShape);

  pop();
}

function drawHandShape(shape) {
  if (shape.length === 5) {
    beginShape();

    for (let i = 0; i < shape.length; i++) {
      vertex(shape[i].x, shape[i].y);
    }

    endShape(CLOSE);
  }
}

function saveRightShape() {
  if (currentShape.length === 5) {
    let shape = [];

    for (let i = 0; i < currentShape.length; i++) {
      shape.push({
        x: currentShape[i].x,
        y: currentShape[i].y
      });
    }

    savedShapes.push(shape);
  }
}