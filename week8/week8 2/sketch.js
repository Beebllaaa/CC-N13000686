let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

async function setup() {
  createCanvas(640, 480);
  
  // Load the faceMesh model asynchronously
  faceMesh = await ml5.faceMesh(options);
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(480, 540);
  video.hide();
  
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

// Callback function for when faceMesh outputs data
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
