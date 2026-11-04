let vid; 
let rad = 12;
let diam = rad * 2;
let xoff, yoff;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  // load a video
  vid = await createVideo("assets/target.mp4");
  vid.autoplay(); // start playing it
  vid.volume(0); // we'll mute the sound for now
  vid.hide(); // hide the HTML player
  vid.loop(); // loop the video
}

function draw() {
  background(0);
  noFill();
  //load pixels every frame
  vid.loadPixels();

  // map circle radius to mouse position
  rad = floor(map(mouseX, 0, width, 10, 32));
  dim = 2 * rad;
  translate(xoff, yoff);
   // draw circles on screen that correspond to image dimensions
   // we'll fill this in with the color of the images
  for (let y = rad; y < vid.height - rad; y += dim) {
    for (let x = rad; x < vid.width - rad; x += dim) {
      // pull x,y from pixel array index 
      let pixelNum = 4 * (y * vid.width + x);
      // set the rgb valed based on the pixel vals
      // arranged Red, Green, Blue, Alpha
      let redValue = vid.pixels[pixelNum];
      let greenValue = vid.pixels[pixelNum + 1];
      let blueValue = vid.pixels[pixelNum + 2];

      stroke(redValue, greenValue, blueValue);
      ellipse(x, y, 1.75 * rad, 1.75 * rad);
    }
}
}