let capture; // object to hold the video grabber 

async function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  // start video grabber
  capture = await createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide(); // hide HTML video
}

function draw() {
  background(0);
  
  // create pixel array for the grabber
  capture.loadPixels();
  
  // some variables to track the pixel and location
  let brightest = 0;
  let drawX = 0;
  let drawY = 0;
  
  // loop through all pixels in the image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
       // magic algo to get the number in the pixel array
      let i = (y * width + x)*4;
      // extraxct the RGB values 
      let r = capture.pixels[i];
      let g = capture.pixels[i+1];
      let b = capture.pixels[i+2];
      
      // Perceptual luminance formula: 0.299*R + 0.587*G + 0.114*B
      let bright = (0.299 * r + 0.587 * g + 0.114 * b);
      
      // if the current pixel's brightness is 
      // greater than the previous brightest
      // update the variable and the x/y location to draw
      if(brightest<=bright){
        brightest = bright;
        drawX = x;
        drawY = y;
      }
      
    }
  }
 // update pixel array
  capture.updatePixels();
  // draw the array
  image(capture, 0, 0);
  // draw an ellipse over the brightest pixel
  strokeWeight(5);
  stroke(200, 10, 180);
  ellipse(drawX, drawY, 20, 20);
}