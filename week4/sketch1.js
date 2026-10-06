// press 'r' for new random seed
// press 's' to save

let seed = 327;
let doExport = false;

function setup() {
  createCanvas(576, 384); // postcard size
}

function keyPressed() {
  if (key == "r") {
    seed = floor(random(13001));
  }
  if (key == "s") {
    doExport = true;
  }
}

function drawHatch(x, y, inc) {
  push();
  let noiseVal = noise(x * inc, y * inc);
  translate(x, y);
  rotate(TWO_PI * noiseVal);

     for (let h = -20; h <= 20; h += 4) {
      line(-20, h, 20, h);
    }
  pop();
}
function drawHatch2(x, y) {
  push();
  translate(x, y);
     for (let h = -20; h <= 20; h += 4) {
      line(-20, h, 20, h);
    }
  pop();
}

//   function drawRectangle2(x, y) {
//   push();
//   // let noiseVal = noise(x * inc2, y * inc2);
//   translate(x, y);
//   // rotate(TWO_PI * noiseVal);
//   rect(0, 0, 40);
//   pop();
// }

function draw() {

  noiseSeed(seed);
  randomSeed(seed);
  background(220);
  noFill();

  

  if (doExport){
    beginRecordSvg("myOutput.svg");
  }
  let step = 46; // space in grid
  let inc = .0002; // amt to incrment noise val
  
  rectMode(CENTER);
  // increment noiseVal every time through the loop
  for (let x = step; x < width - step; x += step) {
    for (let y = step; y < height - step; y += step) {
      // drawRectangle2(x, y); // this is our function
      drawHatch(x, y, inc); // this is our function
      drawHatch2(x, y); // this is our function
    }
  }

   if (doExport){
    endRecordSvg();
    doExport = false;
  }
}