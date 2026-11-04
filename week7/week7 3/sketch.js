
let capture;
let disp;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Create camera
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  // Create offscreen graphics
  disp = createGraphics(640, 480);
  disp.pixelDensity(1);
}

function draw() {
  background(0);

  // Load camera pixels
  capture.loadPixels();

  // Black background
  disp.background(0);

  // Mouse controls distortion
  let intensity = map(
    constrain(mouseX, 0, width),
    0, width,
    0, 65
  );

  let lineSpacing = 8;

  disp.noFill();
  disp.strokeWeight(1.2);

  // Draw horizontal contour lines
  for (let y = 0; y < capture.height; y += lineSpacing) {

    disp.beginShape();

    for (let x = 0; x < capture.width; x += 4) {

      // Find pixel index
      let i = (y * capture.width + x) * 4;

      // Get RGB values
      let r = capture.pixels[i];
      let g = capture.pixels[i + 1];
      let b = capture.pixels[i + 2];

      // Calculate brightness
      let brightness = (r + g + b) / 3;
      let darkness = (255 - brightness) / 255;

      // Darker pixels create more displacement
      let displacement = darkness * intensity;

      // No automatic wave or noise
      let newY = y - displacement;

      // Color based on camera pixels
      disp.stroke(
        min(255, r * 1.3),
        min(255, g * 1.3),
        min(255, b * 1.3),
        190
      );

      // Draw line vertex
      disp.vertex(x, newY);
    }

    disp.endShape();
  }

  // Display graphics across the canvas
  image(disp, 0, 0, width, height);
}

// Resize canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Fullscreen
function keyPressed() {
  if (key === "f") {
    fullscreen(!fullscreen());
  }
}
