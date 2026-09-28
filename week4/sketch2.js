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

function drawLine(x, y, inc) {
  push();
  let noiseVal = noise(x * inc, y * inc);
  translate(x, y);
  scale(3*noiseVal);
  line(0, 0, 40, 40);
  pop();
}

function draw() {

  noiseSeed(seed);
  randomSeed(seed);
  background(220);
  noFill();

  if (doExport){
    beginRecordSvg("myOutput.svg");
  }
  let step = 46; // space in grid
  let inc = .001; // amt to incrment noise val

  // increment noiseVal every time through the loop
  for (let x1 = step; x1 < width - step; x1 += step) {
    for (let y1 = step; y1 < height - step; y1 += step) {
      drawLine(x1, y1, inc); // this is our function
    }
  }

   if (doExport){
    endRecordSvg();
    doExport = false;
  }
}