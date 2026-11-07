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
    let a = hand.keypoints[5];
    let b = hand.keypoints[6];

    stroke(255);
    strokeWeight(4);

    line(a.x, a.y, b.x, b.y);

    }
    
  }


function gotHands(results) {
  hands = results;
}