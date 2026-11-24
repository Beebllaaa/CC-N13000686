let data;
let url = "https://global-warming.org/api/arctic-api";

let years = [];
let iceValues = [];
let yearSlider;

async function setup() {
  createCanvas(800, 600);

  data = await loadJSON(url);

  for (let year = 1979; year <= 2026; year++) {
    let date = year + "09";
    let monthData = data.arcticData.data[date];

    if (monthData && monthData.value != -9999) {
      years.push(year);
      iceValues.push(Number(monthData.value));
    }
  }

  yearSlider = createSlider(0, years.length - 1, 0, 1);
  yearSlider.position(50, 540);
  yearSlider.size(700);
}

function draw() {
  // Sky
  background(197, 222, 235);

  // Ocean
  noStroke();
  fill(49, 94, 123);
  rect(0, 350, width, 250);

  // Get current data
  let index = yearSlider.value();
  let year = years[index];
  let ice = iceValues[index];

  // Map sea ice extent to ice width
  let iceWidth = map(
    ice,
    min(iceValues),
    max(iceValues),
    150,
    650
  );

  // Draw ice
  push();
  translate(width / 2 - iceWidth / 2, 330);

  // Underwater ice
  fill(192, 220, 231);
  beginShape();
  vertex(-10, 0);
  vertex(iceWidth, 0);
  vertex(iceWidth * 0.95, 48);
  vertex(iceWidth * 0.75, 60);
  vertex(iceWidth * 0.45, 52);
  vertex(iceWidth * 0.15, 58);
  endShape(CLOSE);

  // Ice above water
  fill(255);
  beginShape();
  vertex(0, 0);
  vertex(iceWidth * 0.15, -5);
  vertex(iceWidth * 0.4, 0);
  vertex(iceWidth * 0.65, -6);
  vertex(iceWidth * 0.85, -3);
  vertex(iceWidth, 0);
  vertex(iceWidth * 0.98, 20);
  vertex(iceWidth * 0.04, 20);
  endShape(CLOSE);

  pop();

  // Display year
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text(year, width / 2, 460);

  // Display sea ice extent
  textSize(16);
  text("Global Sea Ice Extent: " + ice + " million km²",
       width / 2, 495);
}