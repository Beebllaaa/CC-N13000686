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
    let fingerX = hands[0].index_finger_tip.x;
    let fingerY = hands[0].index_finger_tip.y;
    let thumbX = hands[0].thumb_tip.x;
    let thumbY = hands[0].thumb_tip.y;

    }
    
  }


function gotHands(results) {
  hands = results;
}