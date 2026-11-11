let faceMesh;
let video;
let faces = [];
let mrWhite;

const canvasWidth = 960;
const canvasHeight = 540;

const portrait = {
  x: 225,
  y: 270,
  width: 440,
  height: 434,
  sourceWidth: 874,
  sourceHeight: 862
};

// These regions are measured in the original Mister White image.
const features = {
  leftEye: { x: 318, y: 320, width: 88, height: 58 },
  rightEye: { x: 440, y: 320, width: 88, height: 58 },
  mouth: { x: 354, y: 455, width: 140, height: 90 }
};

const options = {
  maxFaces: 1,
  refineLandmarks: false,
  flipHorizontal: true
};

async function setup() {
  createCanvas(canvasWidth, canvasHeight);
  imageMode(CENTER);

  mrWhite = await loadImage("assets/mr. white.png");

  video = createCapture(VIDEO);
  video.size(480, 540);
  video.hide();

  faceMesh = await ml5.faceMesh(options);
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(12, 16, 30);

  drawMrWhite();
  drawCamera();
  drawDivider();

  if (faces.length === 0) {
    drawLabel("请把脸放进摄像头画面", width * 0.25, height - 24);
    return;
  }

  const expression = getExpression(faces[0]);

  // The body and head stay fixed. Only source pixels from Mister White's
  // original eyes and mouth are redrawn with different vertical proportions.
  deformEye(features.leftEye, expression.leftEyeOpen);
  deformEye(features.rightEye, expression.rightEyeOpen);
  deformMouth(features.mouth, expression.mouthOpen);

  drawLabel("Mister White", width * 0.25, height - 24);
}

function drawMrWhite() {
  image(
    mrWhite,
    portrait.x,
    portrait.y,
    portrait.width,
    portrait.height
  );
}

function drawCamera() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, width * 0.75, height / 2, 480, 540);
  pop();

  drawLabel("你", width * 0.75, height - 24);
}

function drawDivider() {
  push();
  stroke(255, 80);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
  pop();
}

function deformEye(region, openness) {
  const target = imageRegionToCanvas(region);
  const sourceHeight = max(5, region.height * openness);
  const sourceY =
    region.y + (region.height - sourceHeight) / 2;

  clipEllipse(target, () => {
    image(
      mrWhite,
      target.x,
      target.y,
      target.width,
      target.height,
      region.x,
      sourceY,
      region.width,
      sourceHeight
    );
  });
}

function deformMouth(region, openness) {
  const target = imageRegionToCanvas(region);
  const mouthHeight = lerp(target.height * 0.72, target.height * 1.55, openness);

  clipEllipse(
    {
      x: target.x,
      y: target.y,
      width: target.width,
      height: target.height * 1.55
    },
    () => {
      image(
        mrWhite,
        target.x,
        target.y,
        target.width,
        mouthHeight,
        region.x,
        region.y,
        region.width,
        region.height
      );
    }
  );
}

function imageRegionToCanvas(region) {
  const scaleX = portrait.width / portrait.sourceWidth;
  const scaleY = portrait.height / portrait.sourceHeight;

  return {
    x: portrait.x + (region.x + region.width / 2 - portrait.sourceWidth / 2) * scaleX,
    y: portrait.y + (region.y + region.height / 2 - portrait.sourceHeight / 2) * scaleY,
    width: region.width * scaleX,
    height: region.height * scaleY
  };
}

function clipEllipse(region, drawFeature) {
  const context = drawingContext;

  context.save();
  context.beginPath();
  context.ellipse(
    region.x,
    region.y,
    region.width / 2,
    region.height / 2,
    0,
    0,
    TWO_PI
  );
  context.clip();

  drawFeature();
  context.restore();
}

function getExpression(face) {
  const points = face.keypoints;

  return {
    leftEyeOpen: constrain(
      map(
        getDistanceRatio(points[159], points[145], points[33], points[133]),
        0.08,
        0.3,
        0.12,
        1
      ),
      0.12,
      1
    ),
    rightEyeOpen: constrain(
      map(
        getDistanceRatio(points[386], points[374], points[362], points[263]),
        0.08,
        0.3,
        0.12,
        1
      ),
      0.12,
      1
    ),
    mouthOpen: constrain(
      map(
        getDistanceRatio(points[13], points[14], points[61], points[291]),
        0.03,
        0.42,
        0,
        1
      ),
      0,
      1
    )
  };
}

function getDistanceRatio(topPoint, bottomPoint, leftPoint, rightPoint) {
  const vertical = dist(
    topPoint.x,
    topPoint.y,
    bottomPoint.x,
    bottomPoint.y
  );

  const horizontal = dist(
    leftPoint.x,
    leftPoint.y,
    rightPoint.x,
    rightPoint.y
  );

  return vertical / horizontal;
}

function drawLabel(label, x, y) {
  push();
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x, y);
  pop();
}

function gotFaces(results) {
  faces = results;
}
