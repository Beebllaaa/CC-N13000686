// posterize on pinch
let video; // camera grabber
let handPose; // ml5.js model
let hands = []; // array to keep track of points

async function setup() {
  createCanvas(800, 600);

  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();

  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(5, 10, 45);

  if (hands.length > 0) {
    let hand = hands[0];

 //draw index finger
 let finger1 = [0, 5, 6, 7, 8];
   for (let i = 0; i < finger1.length - 1; i++) {
    let a = hand.keypoints[finger1[i]];
    let b = hand.keypoints[finger1[i + 1]];

    line(a.x, a.y, b.x, b.y);
    strokeWeight(4);
    stroke(255);
    }

    }
    
  }


function gotHands(results) {
  hands = results;
}