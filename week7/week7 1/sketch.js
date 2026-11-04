let tree;
let xoff, yoff;
let rad = 12;
let diam = rad * 2;

async function setup() {
  createCanvas(600, 800);
  pixelDensity(1);
  tree = await loadImage("assets/tree.jpg");
  
  console.log("Original size: " + tree.width + " x " + tree.height);

  if (tree.width > width) tree.resize(width, 0);
  if (tree.height > height) tree.resize(0, height);

  console.log("Scaled size: " + tree.width + " x " + tree.height);

  //load pixels of the image
  tree.loadPixels();
  console.log("pixel array size: " + tree.pixels.length);

  // position in the center!
  xoff = (width - tree.width) / 2;
  yoff = (height - tree.height) / 2;
}

function draw() {
  background(0);
  noStroke();

// map circle radius to mouse position
  rad = floor(map(mouseX, 0, width, 2, 32));
  diam = rad * 2;
  translate(xoff, yoff);
// draw circles on screen that correspond to image dimensions

    for (let y = rad; y < tree.height - rad; y += diam) {
    for (let x = rad; x < tree.width - rad; x += diam) {
      // pull x,y from pixel array index 
      let pixelNum = 4 * (y * tree.width + x);
      // set the rgb valed based on the pixel vals
      // arranged Red, Green, Blue, Alpha
      let redValue = tree.pixels[pixelNum];
      let greenValue = tree.pixels[pixelNum + 1];
      let blueValue = tree.pixels[pixelNum + 2];

      fill(redValue, greenValue, blueValue);
      ellipse(x, y, 1.75 * rad, 1.75 * rad);
      } 
    }
}