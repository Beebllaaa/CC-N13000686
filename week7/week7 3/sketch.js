let mirror;

async function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  mirror = await createCapture(VIDEO);
  mirror.size(640, 480);
  mirror.hide();
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  mirror.loadPixels();
  let stepSize = round(constrain(mouseX / 8, 6, 32)); // based on mouseX limit the size of our ellipses' diameter to be between 6 and 32 px. 

  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {

      let i = (y * width + x)*4; // get the pixel from the array

      // get pixel values
      let r = mirror.pixels[i];
      let g = mirror.pixels[i + 1];
      let b = mirror.pixels[i + 2];

      // Perceptual luminance formula: 0.299*R + 0.587*G + 0.114*B
      let brightness = (0.299 * r + 0.587 * g + 0.114 * b);
      // gives a percentage 0 is bright, 100 is dark
      let darkness = (255 - brightness) / 255;

      let radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}