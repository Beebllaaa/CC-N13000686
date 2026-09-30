// press 'r' for new random seed
// press 's' to save

let seed = 367;
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

function drawShape(x, y, inc) {
  push();
  let noiseVal = noise(x * inc, y * inc);
  translate(x, y);
  scale(5*noiseVal);
  rotate(TWO_PI * noiseVal);
  line(-10,0,10,0);
  line(0,-10,0,10);
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
  for (let x = step; x < width - step; x += step) {
    for (let y = step; y < height - step; y += step) {
      drawShape(x, y, inc); // this is our function
    }
  }

   if (doExport){
    endRecordSvg();
    doExport = false;
  }
}