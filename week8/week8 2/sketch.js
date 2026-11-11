let faceMesh;
let video;
let faces = [];
let saul;
let eyeLayers;
let mouthLayers;

const canvasWidth = 960;
const canvasHeight = 540;
const saulOffset = { x: 24, y: 55 };
const labelY = 526;

const portrait = { x: 225, y: 270, width: 430, height: 430 };
const layers = {
  eyes: { x: 225, y: 157, width: 120, height: 52 },
  mouth: { x: 225, y: 220, width: 82, height: 50 }
};

const sourceBounds = {
  eyes: [
    { x: 400, y: 248, width: 444, height: 172 },
    { x: 292, y: 244, width: 704, height: 304 },
    { x: 436, y: 256, width: 860, height: 328 }
  ],
  mouth: [
    null,
    { x: 780, y: 188, width: 608, height: 392 },
    { x: 384, y: 304, width: 716, height: 452 }
  ]
};

let eyeClosure = [0, 0];

async function setup() {
  createCanvas(canvasWidth, canvasHeight);
  imageMode(CENTER);

  saul = await loadImage("assets/saul.png");
  eyeLayers = await Promise.all([
    loadImage("assets/saul-eyes-open.png"),
    loadImage("assets/saul-eyes-half.png"),
    loadImage("assets/saul-eyes-closed.png")
  ]);

  mouthLayers = [
    null,
    await loadImage("assets/saul-mouth-half.png"),
    await loadImage("assets/saul-mouth-open.png")
  ];

  loadSavedLayout();

  video = createCapture(VIDEO);
  video.size(480, 540);
  video.hide();

  faceMesh = await ml5.faceMesh({
    maxFaces: 1,
    refineLandmarks: false,
    flipHorizontal: true
  });

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  clear();
  drawBackground();
  drawSaul();
  drawCamera();
  drawDivider();

  const expression = updateExpression();
  drawExpression("eyes", expression.blink);
  drawExpression("mouth", expression.mouth);
  drawSpeechBubble(expression.mouth);

  drawLabel("Saul", width * 0.25, labelY);
  drawLabel("You", width * 0.75, labelY);
}

function drawBackground() {
  noStroke();
  fill(238, 190, 46);
  rect(0, 0, width / 2, height);
}

function drawSaul() {
  image(
    saul,
    portrait.x + saulOffset.x,
    portrait.y + saulOffset.y,
    portrait.width,
    portrait.height
  );
}

function drawCamera() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, width * 0.25, height / 2, 480, 540);
  pop();
}

function drawDivider() {
  stroke(255, 80);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
}

function updateExpression() {
  let mouth = 0;

  if (faces.length > 0) {
    const points = faces[0].keypoints;
    const openness = [
      normalizedDistance(points[159], points[145], points[33], points[133], 0.08, 0.3),
      normalizedDistance(points[386], points[374], points[362], points[263], 0.08, 0.3)
    ];

    eyeClosure = eyeClosure.map((closure, index) =>
      updateClosure(openness[index], closure)
    );

    mouth = normalizedDistance(
      points[13],
      points[14],
      points[61],
      points[291],
      0.03,
      0.42,
      0
    );
  } else {
    eyeClosure = eyeClosure.map(closure => max(0, closure - 0.025));
  }

  const blink = constrain(map(max(...eyeClosure), 0.005, 0.08, 0, 1), 0, 1);
  return { blink, mouth };
}

function normalizedDistance(top, bottom, left, right, minimum, maximum, floor = 0.12) {
  const vertical = dist(top.x, top.y, bottom.x, bottom.y);
  const horizontal = dist(left.x, left.y, right.x, right.y);
  return constrain(map(vertical / horizontal, minimum, maximum, floor, 1), floor, 1);
}

function updateClosure(openness, currentClosure) {
  const detectedClosure = 1 - openness;
  return detectedClosure > currentClosure
    ? detectedClosure
    : max(0, currentClosure - 0.025);
}

function drawExpression(name, amount) {
  const frames = name === "eyes" ? eyeLayers : mouthLayers;
  const target = expressionTarget(name);
  const position = constrain(amount, 0, 1) * (frames.length - 1);
  const lowerIndex = floor(position);
  const upperIndex = min(lowerIndex + 1, frames.length - 1);
  const progress = position - lowerIndex;
  const softenEdges = name === "eyes";

  drawLayer(
    frames[lowerIndex],
    sourceBounds[name][lowerIndex],
    target,
    255 * (1 - progress),
    softenEdges
  );

  if (upperIndex !== lowerIndex) {
    drawLayer(
      frames[upperIndex],
      sourceBounds[name][upperIndex],
      target,
      255 * progress,
      softenEdges
    );
  }
}

function expressionTarget(name) {
  const layer = layers[name];
  const scale = name === "mouth" ? 0.85 : 1;

  return {
    x: layer.x,
    y: layer.y,
    width: layer.width * scale,
    height: layer.height * scale
  };
}

function drawLayer(layer, source, target, alpha, softenEdges) {
  if (!layer || !source || alpha <= 0) {
    return;
  }

  push();
  tint(255, alpha);

  if (softenEdges) {
    drawingContext.filter = "blur(1.2px)";
  }

  image(
    layer,
    target.x + saulOffset.x,
    target.y + saulOffset.y,
    target.width,
    target.height,
    source.x,
    source.y,
    source.width,
    source.height
  );

  drawingContext.filter = "none";
  pop();
}

function drawSpeechBubble(mouthAmount) {
  const visibility = constrain(map(mouthAmount, 0.12, 0.5, 0, 1), 0, 1);

  if (visibility === 0) {
    return;
  }

  const bubble = { x: 350, y: lerp(160, 144, visibility), width: 190, height: 54 };

  push();
  noStroke();
  fill(255, 255, 255, 245 * visibility);
  rect(bubble.x, bubble.y, bubble.width, bubble.height, 22);

  triangle(
    bubble.x + 3,
    bubble.y + bubble.height * 0.52,
    bubble.x + 3,
    bubble.y + bubble.height * 0.76,
    bubble.x - 22,
    bubble.y + bubble.height * 0.72
  );

  fill(45, 26, 18, 255 * visibility);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text("Better Call Saul  !!!", bubble.x + bubble.width / 2, bubble.y + bubble.height / 2);
  pop();
}

function drawLabel(label, x, y) {
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x, y);
}

function gotFaces(results) {
  faces = results;
}

function loadSavedLayout() {
  const saved = localStorage.getItem("saul-layer-layout");

  if (!saved) {
    return;
  }

  const savedLayers = JSON.parse(saved);
  Object.assign(layers.eyes, savedLayers.eyes);
  Object.assign(layers.mouth, savedLayers.mouth);
}
