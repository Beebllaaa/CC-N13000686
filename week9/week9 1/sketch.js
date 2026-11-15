// posterize on pinch
let video; // camera grabber
let handPose; // ml5.js model
let hands = []; // array to keep track of points
let duck;
let shapes = [];
let pinching = false;

async function setup() {
  createCanvas(800, 600);

  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();

  handPose = await ml5.handPose();
  handPose.detectStart(video, gotHands);

  duck = await loadImage("assets/duck.png");
}

    
function draw() {
  
  // Camera background
  strokeWeight(1);
  imageMode(CORNER);
  image(video, 0, 0, width, height);

  // Blue gradient overlay
  for (let y = 0; y < height; y++) {
    let a = map(y, 0, height, 0, 255);

    stroke(145,240,252, a);
    line(0, y, width, y);
  }

  if (hands.length > 0) {
    let hand = hands[0];

    strokeWeight(20);
    stroke(255,50);
    noFill();

    // Draw thumb
    let finger0 = [0, 1, 2, 3, 4];
    for (let i = 0; i < finger0.length - 1; i++) {
      let a = hand.keypoints[finger0[i]];
      let b = hand.keypoints[finger0[i + 1]];
      line(a.x, a.y, b.x, b.y);
    }

    // Draw index finger
    let finger1 = [0, 5, 6, 7, 8];
    for (let i = 0; i < finger1.length - 1; i++) {
      let a = hand.keypoints[finger1[i]];
      let b = hand.keypoints[finger1[i + 1]];
      line(a.x, a.y, b.x, b.y);
    }

    // Draw middle finger
    let finger2 = [0, 9, 10, 11, 12];
    for (let i = 0; i < finger2.length - 1; i++) {
      let a = hand.keypoints[finger2[i]];
      let b = hand.keypoints[finger2[i + 1]];
      line(a.x, a.y, b.x, b.y);
    }

    // Draw ring finger
    let finger3 = [0, 13, 14, 15, 16];
    for (let i = 0; i < finger3.length - 1; i++) {
      let a = hand.keypoints[finger3[i]];
      let b = hand.keypoints[finger3[i + 1]];
      line(a.x, a.y, b.x, b.y);
    }

    // Draw pinky
    let finger4 = [0, 17, 18, 19, 20];
    for (let i = 0; i < finger4.length - 1; i++) {
      let a = hand.keypoints[finger4[i]];
      let b = hand.keypoints[finger4[i + 1]];
      line(a.x, a.y, b.x, b.y);
    }

    // Draw palm
    push();
    let palm = [0, 1, 5, 9, 13, 17, 0];

    stroke(255,50);
    noStroke();

    beginShape();
    for (let i = 0; i < palm.length - 1; i++) {
      let a = hand.keypoints[palm[i]];
      vertex(a.x, a.y);
    }
    endShape(CLOSE);
    pop();

    // Get finger positions
    let fingerX = hand.index_finger_tip.x;
    let fingerY = hand.index_finger_tip.y;
    let thumbX = hand.thumb_tip.x;
    let thumbY = hand.thumb_tip.y;

    
    // Are the fingers close together?
    if (dist(fingerX, fingerY, thumbX, thumbY) < 20) {

      // Create a duck when pinching starts
      if (pinching == false) {

        shapes.push({
            x: ((fingerX + thumbX) / 2 + hand.keypoints[5].x) / 2,
            y: (fingerY + thumbY) / 2,
          speed: 0,
          stopY: 580 - random(0, 300)
        });

      }

      pinching = true;

    } else {
      pinching = false;
    }

  } else {
    pinching = false;
  }

  // Draw falling cows
  imageMode(CENTER);
  noSmooth();

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    // Gravity
    shape.y += shape.speed;
    shape.speed += 0.3;

    // Stop at the bottom
    if (shape.y > shape.stopY) {
  shape.y = shape.stopY;
  shape.speed = 0;
}
    
    // Draw duck
    push();

    translate(shape.x, shape.y);

    let angle = sin(frameCount * 0.05) * 0.1;

    rotate(angle);

    image(duck, 0, 0, 100, 130);

    pop();

}
}


function gotHands(results) {
  hands = results;
}