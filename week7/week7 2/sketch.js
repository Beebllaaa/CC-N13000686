
let vid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  vid = await createVideo("assets/target.mp4");
  vid.autoplay();
  vid.volume(0);
  vid.hide();
  vid.loop();
}

function draw() {
  background(0);

  // Load video pixels
  vid.loadPixels();

  if (vid.pixels.length === 0) {
    return;
  }

  // Change non-red pixels to grayscale
  for (let y = 0; y < vid.height; y++) {
    for (let x = 0; x < vid.width; x++) {

      let i = (x + y * vid.width) * 4;

      let r = vid.pixels[i];
      let g = vid.pixels[i + 1];
      let b = vid.pixels[i + 2];

      // Detect red pixels
      if (r > 100 && r > g * 1.5 && r > b * 1.5) {
        // Keep red pixels unchanged
      } else {
        // Calculate grayscale
        let gray = (r + g + b) / 3;

        vid.pixels[i] = gray;
        vid.pixels[i + 1] = gray;
        vid.pixels[i + 2] = gray;
      }
    }
  }

  // Update video pixels
  vid.updatePixels();

  // Display video
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(vid, 0, 0);

  // Draw hearts on red areas
  let step = 20;

  noStroke();

  for (let y = 0; y < vid.height; y += step) {
    for (let x = 0; x < vid.width; x += step) {

      let i = (x + y * vid.width) * 4;

      let r = vid.pixels[i];
      let g = vid.pixels[i + 1];
      let b = vid.pixels[i + 2];

      if (r > 100 && r > g * 1.5 && r > b * 1.5) {

        // Noise controls heart size
        let n = noise(x * 0.05, y * 0.05);

        let heartSize = map(n, 0, 1, 10, 60);

        // Noise controls heart position
        let offsetX = map(
          noise(x * 0.1, y * 0.1),
          0, 1, -8, 8
        );

        let offsetY = map(
          noise(x * 0.1 + 100, y * 0.1),
          0, 1, -8, 8
        );

        // Semi-transparent red
        fill(255, 0, 0, 100);

        textSize(heartSize);

        text("♥", x - vid.width / 2 + offsetX, y - vid.height / 2 + offsetY);
      }
    }
  }
}
