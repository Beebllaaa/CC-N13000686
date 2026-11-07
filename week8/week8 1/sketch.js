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

    //draw thumb
 let finger0 = [0, 1, 2, 3, 4];
   for (let i = 0; i < finger0.length - 1; i++) {
    let a = hand.keypoints[finger0[i]];
    let b = hand.keypoints[finger0[i + 1]];

    line(a.x, a.y, b.x, b.y);
    strokeWeight(40);
    stroke(255);

    }
 //draw index finger
 let finger1 = [0, 5, 6, 7, 8];
   for (let i = 0; i < finger1.length - 1; i++) {
    let a = hand.keypoints[finger1[i]];
    let b = hand.keypoints[finger1[i + 1]];

    line(a.x, a.y, b.x, b.y);
    strokeWeight(40);
    stroke(255);
    }

    //draw middle finger
 let finger2 = [0, 9, 10, 11, 12];
   for (let i = 0; i < finger2.length - 1; i++) {
    let a = hand.keypoints[finger2[i]];
    let b = hand.keypoints[finger2[i + 1]];

    line(a.x, a.y, b.x, b.y);
    strokeWeight(40);
    stroke(255);
    }

//draw ring finger
 let finger3 = [0, 13, 14, 15, 16];
   for (let i = 0; i < finger2.length - 1; i++) {
    let a = hand.keypoints[finger3[i]];
    let b = hand.keypoints[finger3[i + 1]];

    line(a.x, a.y, b.x, b.y);
    strokeWeight(40);
    stroke(255);
    }

    //draw ring finger
 let finger4 = [0, 17, 18, 19, 20];
   for (let i = 0; i < finger2.length - 1; i++) {
    let a = hand.keypoints[finger4[i]];
    let b = hand.keypoints[finger4[i + 1]];

    line(a.x, a.y, b.x, b.y);
    strokeWeight(40);
    stroke(255);
    }

    }
    
  }


function gotHands(results) {
  hands = results;
}