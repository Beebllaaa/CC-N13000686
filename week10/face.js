let faceMesh;
let mouthVolume = 1;

async function setupFace() {
  faceMesh = await ml5.faceMesh({ maxFaces: 1 });
  faceMesh.detectStart(video, updateFace);
}

function updateFace(faces) {
  if (faces.length === 0) {
    return;
  }

  let points = faces[0].keypoints;
  let upperLip = points[13];
  let lowerLip = points[14];
  let leftCorner = points[61];
  let rightCorner = points[291];

  let gap = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
  let mouthWidth = dist(leftCorner.x, leftCorner.y, rightCorner.x, rightCorner.y);

  if (mouthWidth === 0) {
    return;
  }

  let opening = gap / mouthWidth;
  let nextVolume = map(opening, 0.04, 0.5, 0.2, 1, true);
  nextVolume = round(nextVolume * 20) / 20;

  if (nextVolume === mouthVolume) {
    return;
  }

  mouthVolume = nextVolume;

  for (let i = 0; i < sounds.length; i++) {
    if (trackOn[i]) {
      sounds[i].amp(mouthVolume, 0.08);
    }
  }
}