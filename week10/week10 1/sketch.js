// Left-hand fingers and their sounds, from index finger to pinky.
let tracks = [
  { finger: 8, file: "bass" },
  { finger: 12, file: "keys" },
  { finger: 16, file: "guitar" },
  { finger: 20, file: "perc" }
];
let drums;
let thumbTap;

let leftHand;
let rightHand;
let flipped = true;
let started = false;
let message = "Click to start";

let leftPinch = -1;
let fistTime = -1;
let fistReset = false;
let rightPinch = false;
let draggedTrack = -1;
let grabDistance = 0;
let grabLength = 0;
let maxLength = 105;
let thumbContact = false;
let lastThumbHit = -1000;

let mouthVolume = 0.5;
let openEyes = [];
let lastNose;
let blinkNose;
let blinkStart = -1;
let blinkTimes = [];
let speed = 1;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.mousePressed(startInstrument);
  textAlign(CENTER, CENTER);
}

async function startLoops() {
  drums = await loadClip("drums");
  thumbTap = await loadClip("thumb-tap");
  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    track.sound = await loadClip(track.file);
    track.on = false;
    track.length = 0;
    track.angle = 0;
  }

  // All loops start on the same beat, even the ones that are muted.
  updateVolumes();
  let startTime = instrumentAudio.currentTime + 0.1;
  playSound(drums, startTime, true);
  for (let track of tracks) playSound(track.sound, startTime, true);
  started = true;
}

function loadClip(name) {
  let filename = name + ".wav";
  message = "Loading " + filename + "...";
  return waitForLoad(loadInstrumentSound("assets/" + filename), filename);
}

function draw() {
  background(22);

  if (video && video.readyState >= 2) {
    push();
    if (flipped) {
      translate(width, 0);
      scale(-1, 1);
    }
    drawingContext.drawImage(video, 0, 0, width, height);
    pop();
  }

  if (started) {
    updateTempo();
    checkTracking();
    drawFingers();
  }

  if (message) {
    noStroke();
    fill(255);
    text(message, 40, height / 2 - 60, width - 80, 120);
  }
}

function drawFingers() {
  if (leftHand) {
    let thumb = leftHand[4];
    let flash = map(millis() - lastThumbHit, 0, 260, 1, 0, true);
    stroke(255, 200, 95);
    strokeWeight(1);
    fill(255, 200, 95, 90 + flash * 165);
    circle(thumb.x, thumb.y, 19 + flash * 16);

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      let finger = leftHand[track.finger];
      push();
      translate(finger.x, finger.y);
      rotate(track.angle);
      stroke(255);
      strokeWeight(1);
      if (track.on) {
        fill("#8ef0ac");
      } else {
        fill("#343946");
      }
      rect(-13, -13, 26 + track.length, 26, 13);
      pop();
    }
  }

  if (rightHand) {
    noStroke();
    fill("#ffd36c");
    circle(rightHand[4].x, rightHand[4].y, 12);
    circle(rightHand[8].x, rightHand[8].y, 12);
  }
}

function gotHands(hands) {
  if (!started || video.videoWidth === 0) return;

  leftHand = null;
  rightHand = null;

  for (let hand of hands) {
    if (hand.handedness === "Left") leftHand = hand.keypoints;
    if (hand.handedness === "Right") rightHand = hand.keypoints;
  }

  if (!leftHand || !rightHand) {
    rightPinch = false;
    draggedTrack = -1;
  }
  if (!leftHand) {
    fistTime = -1;
    return;
  }

  let palmSize = pointDistance(leftHand[0], leftHand[9]);
  if (checkFist(palmSize)) return;
  switchTrack(palmSize);
  if (rightHand) moveRightHand(palmSize);
}

function pointDistance(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

// One pinch turns a sound on or off. Open the fingers before pinching again.
function switchTrack(palmSize) {
  let thumb = leftHand[4];
  if (leftPinch !== -1) {
    let finger = leftHand[tracks[leftPinch].finger];
    if (pointDistance(thumb, finger) < palmSize * 0.35) return;
    leftPinch = -1;
  }

  let closest = palmSize * 0.22;
  for (let i = 0; i < tracks.length; i++) {
    let gap = pointDistance(thumb, leftHand[tracks[i].finger]);
    if (gap < closest) {
      closest = gap;
      leftPinch = i;
    }
  }
  if (leftPinch === -1) return;

  let track = tracks[leftPinch];
  track.on = !track.on;
  updateTrackVolume(track);
}

function checkFist(palmSize) {
  let curled = 0;
  let wrist = leftHand[0];
  for (let i = 0; i < tracks.length; i++) {
    let tip = tracks[i].finger;
    let finger = leftHand[tip];
    let joint = leftHand[tip - 2];
    let base = leftHand[tip - 3];
    if (pointDistance(finger, wrist) < pointDistance(joint, wrist)
        && pointDistance(finger, base) < palmSize * 0.65) {
      curled++;
    }
  }

  if (curled === tracks.length) {
    if (fistTime === -1) fistTime = millis();
    if (!fistReset && millis() - fistTime >= 180) {
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].on = false;
        tracks[i].length = 0;
        tracks[i].angle = 0;
        updateTrackVolume(tracks[i]);
      }
      leftPinch = -1;
      draggedTrack = -1;
      fistReset = true;
    }
    return true;
  }

  fistTime = -1;
  if (fistReset) {
    for (let i = 0; i < tracks.length; i++) {
      if (pointDistance(leftHand[4], leftHand[tracks[i].finger]) < palmSize * 0.35) {
        return true;
      }
    }
    fistReset = false;
  }
  return false;
}

function moveRightHand(palmSize) {
  let thumb = rightHand[4];
  let index = rightHand[8];
  let gap = pointDistance(thumb, index);
  let tapGap = pointDistance(index, leftHand[4]);

  if (tapGap > palmSize * 0.36) thumbContact = false;
  if (gap > palmSize * 0.35) {
    rightPinch = false;
    draggedTrack = -1;
  }

  let pinch = { x: (thumb.x + index.x) / 2, y: (thumb.y + index.y) / 2 };
  if (!rightPinch && gap < palmSize * 0.22) {
    rightPinch = true;
    grabTrack(pinch, palmSize);
  }

  if (draggedTrack !== -1) {
    let track = tracks[draggedTrack];
    let finger = leftHand[track.finger];
    let pull = pointDistance(pinch, finger) - grabDistance;
    track.length = constrain(grabLength + pull, 0, maxLength);
    if (grabLength === 0 && pull > 5) {
      track.angle = atan2(pinch.y - finger.y, pinch.x - finger.x);
    }
    updateTrackVolume(track);
  }

  if (!rightPinch && !thumbContact && tapGap < palmSize * 0.23) {
    thumbContact = true;
    lastThumbHit = millis();
    playSound(thumbTap);
  }
}

function grabTrack(pinch, palmSize) {
  let closest = max(18, palmSize * 0.3);
  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    let finger = leftHand[track.finger];
    // Check several points along the bar so its far end can be grabbed again.
    for (let step = 0; step <= 5; step++) {
      let length = track.length * step / 5;
      let x = finger.x + cos(track.angle) * length;
      let y = finger.y + sin(track.angle) * length;
      let gap = dist(pinch.x, pinch.y, x, y);
      if (gap < closest) {
        closest = gap;
        draggedTrack = i;
      }
    }
  }

  if (draggedTrack !== -1) {
    grabLength = tracks[draggedTrack].length;
    grabDistance = pointDistance(pinch, leftHand[tracks[draggedTrack].finger]);
  }
}

function updateTrackVolume(track) {
  let volume = 0;
  if (track.on) {
    volume = map(track.length, 0, maxLength, 0.2, 0.6);
  }
  setVolume(track.sound, volume * mouthVolume);
}

function updateVolumes() {
  setVolume(drums, 0.2 * mouthVolume);
  setVolume(thumbTap, 0.35 * mouthVolume);
  for (let track of tracks) updateTrackVolume(track);
}

function gotFaces(faces) {
  if (faces.length === 0) {
    lastNose = null;
    blinkStart = -1;
    return;
  }

  let points = faces[0].keypoints;
  let mouthOpening = abs(points[14].y - points[13].y);
  let opening = mouthOpening * height / video.videoHeight;
  let volume = map(opening, 0, 25, 0.2, 1, true);
  if (abs(volume - mouthVolume) > 0.02) {
    mouthVolume = volume;
    updateVolumes();
  }

  let nose = points[1];
  let faceWidth = pointDistance(points[33], points[263]);
  let moving = lastNose && pointDistance(nose, lastNose) > faceWidth * 0.08;
  lastNose = nose;
  if (moving || faceWidth < 1) {
    blinkStart = -1;
    return;
  }

  let left = eyeRatio(points, 159, 145, 33, 133);
  let right = eyeRatio(points, 386, 374, 362, 263);
  if (openEyes.length === 0 && left > 0.15 && right > 0.15) {
    openEyes = [left, right];
  }
  if (openEyes.length === 0) return;

  if (left < openEyes[0] * 0.65 && right < openEyes[1] * 0.65) {
    if (blinkStart === -1) {
      blinkStart = millis();
      blinkNose = nose;
    }
  } else if (left > openEyes[0] * 0.82 && right > openEyes[1] * 0.82) {
    if (blinkStart !== -1 && millis() - blinkStart < 500
        && pointDistance(nose, blinkNose) < faceWidth * 0.12) {
      blinkTimes.push(millis());
    }
    blinkStart = -1;
    openEyes[0] = lerp(openEyes[0], left, 0.08);
    openEyes[1] = lerp(openEyes[1], right, 0.08);
  }
}

function eyeRatio(points, top, bottom, corner1, corner2) {
  let opening = pointDistance(points[top], points[bottom]);
  let eyeWidth = pointDistance(points[corner1], points[corner2]);
  return opening / max(1, eyeWidth);
}

// Count only recent blinks. Four blinks are needed to change the speed.
function updateTempo() {
  let now = millis();
  while (blinkTimes.length > 0 && now - blinkTimes[0] >= 3000) blinkTimes.shift();

  let newSpeed = 1;
  if (blinkTimes.length >= 4) {
    let extraBlinks = min(blinkTimes.length - 3, 7);
    newSpeed = 1 + extraBlinks * 0.05;
  }
  if (newSpeed === speed) return;

  speed = newSpeed;
  let changeTime = instrumentAudio.currentTime + 0.03;
  let sounds = [drums];
  for (let track of tracks) sounds.push(track.sound);
  for (let sound of sounds) {
    sound.source.playbackRate.setTargetAtTime(speed, changeTime, 0.16);
  }
}

// Audio and camera setup

let instrumentAudio;

async function openInstrumentCamera() {
  if (!navigator.mediaDevices) throw new Error("Open the sketch in Live Server for camera access.");

  let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  let camera = document.createElement("video");
  camera.muted = true;
  camera.playsInline = true;
  camera.hidden = true;
  camera.srcObject = stream;
  document.body.appendChild(camera);
  try {
    await camera.play();
    camera.width = camera.videoWidth;
    camera.height = camera.videoHeight;
    return camera;
  } catch (error) {
    for (let track of stream.getTracks()) track.stop();
    camera.remove();
    throw error;
  }
}

async function loadInstrumentSound(path) {
  let response = await fetch(path);
  if (!response.ok) throw new Error("Could not load " + path);
  let buffer = await instrumentAudio.decodeAudioData(await response.arrayBuffer());
  let gain = instrumentAudio.createGain();
  gain.connect(instrumentAudio.destination);
  return { buffer, gain, source: null };
}

function playSound(sound, time = instrumentAudio.currentTime, loop = false) {
  let source = instrumentAudio.createBufferSource();
  source.buffer = sound.buffer;
  source.loop = loop;
  source.connect(sound.gain);
  source.start(time);
  sound.source = source;
}

function setVolume(sound, volume) {
  if (sound.source) {
    sound.gain.gain.setTargetAtTime(volume, instrumentAudio.currentTime, 0.04);
  } else {
    sound.gain.gain.value = volume;
  }
}

let video;
let loading = false;

async function startInstrument() {
  if (loading || (started && trackers.every(tracker => tracker.model))) return;
  if (window.location.protocol === "file:") {
    message = "Open this page with Live Server first.";
    return;
  }
  loading = true;

  try {
    message = "Starting audio...";
    if (!instrumentAudio) instrumentAudio = new AudioContext();
    await waitForLoad(instrumentAudio.resume(), "Audio startup");

    message = "Waiting for camera access...";
    if (!video) video = await openInstrumentCamera();

    if (!started) await startLoops();
  } catch (error) {
    console.error(error);
    if (error.name === "NotAllowedError") {
      message = "Camera access was denied. Allow the camera and click to retry.";
    } else {
      message = error.message + " Click to retry.";
    }
    loading = false;
    return;
  }

  await startTracking();
  loading = false;
}

async function waitForLoad(task, label, timeout = 15000) {
  let timer;
  let deadline = new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error(label + " timed out.")), timeout);
  });
  try {
    return await Promise.race([task, deadline]);
  } finally {
    clearTimeout(timer);
  }
}

// Hand and face tracking

let trackers = [
  { kind: "hand", detect: detectHands, update: gotHands, interval: 0 },
  { kind: "face", detect: detectFaces, update: gotFaces, interval: 50 }
];

const visionCDNs = [
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21",
  "https://unpkg.com/@mediapipe/tasks-vision@0.10.21"
];
const visionModels = "https://storage.googleapis.com/mediapipe-models/";
let visionRuntime;

async function loadLandmarker(kind) {
  if (!visionRuntime) {
    try {
      visionRuntime = await waitForLoad(import(visionCDNs[0] + "/vision_bundle.mjs"), "Tracking library", 10000);
    } catch (error) {
      visionRuntime = await waitForLoad(import(visionCDNs[1] + "/vision_bundle.mjs"), "Backup tracking library", 10000);
    }
  }

  const model = kind + "_landmarker";
  const options = {
    baseOptions: {
      modelAssetPath: visionModels + model + "/" + model + "/float16/1/" + model + ".task",
      delegate: "CPU"
    },
    runningMode: "VIDEO"
  };
  const landmarker = kind === "hand" ? visionRuntime.HandLandmarker : visionRuntime.FaceLandmarker;
  if (kind === "hand") options.numHands = 2;
  else options.numFaces = 1;

  let lastError;
  for (const cdn of visionCDNs) {
    try {
      const wasm = await visionRuntime.FilesetResolver.forVisionTasks(cdn + "/wasm");
      return await waitForLoad(landmarker.createFromOptions(wasm, options), kind + " model", 15000);
    } catch (error) {
      lastError = error;
      console.error(error);
    }
  }
  throw lastError;
}

function cameraPoints(landmarks, pointWidth, pointHeight, mirror) {
  return landmarks.map(point => ({
    x: (mirror ? 1 - point.x : point.x) * pointWidth,
    y: point.y * pointHeight
  }));
}

function detectHands(model, video, mirror) {
  const result = model.detectForVideo(video, performance.now());
  const labels = result.handedness || result.handednesses || [];
  return result.landmarks.map((points, index) => {
    const label = labels[index]?.[0];
    return {
      handedness: label?.categoryName || label?.displayName,
      keypoints: cameraPoints(points, width, height, mirror)
    };
  });
}

function detectFaces(model, video) {
  const result = model.detectForVideo(video, performance.now());
  return result.faceLandmarks.map(points => ({ keypoints: cameraPoints(points, video.videoWidth, video.videoHeight, false) }));
}

async function startTracking() {
  let failures = [];
  for (let tracker of trackers) {
    if (tracker.model) continue;
    message = "Loading " + tracker.kind + " tracking...";
    try {
      let model = await loadLandmarker(tracker.kind);
      tracker.update(tracker.detect(model, video, flipped));
      tracker.model = model;
      tracker.frame = video.currentTime;
      tracker.time = millis();
    } catch (error) {
      failures.push(trackingError(tracker, error));
    }
  }
  message = failures.length ? failures.join("\n") + "\nClick to retry tracking." : "";
}

function trackingError(tracker, error) {
  console.error(error);
  return tracker.kind + " tracking: " + String(error?.message || error).slice(0, 75);
}

function checkTracking() {
  if (video.readyState < 2) return;

  for (let tracker of trackers) {
    let now = millis();
    if (!tracker.model || tracker.frame === video.currentTime || now - tracker.time < tracker.interval) continue;
    tracker.frame = video.currentTime;
    tracker.time = now;
    try {
      tracker.update(tracker.detect(tracker.model, video, flipped));
    } catch (error) {
      tracker.model.close();
      tracker.model = null;
      tracker.update([]);
      message = trackingError(tracker, error) + "\nClick to retry tracking.";
    }
  }
}
