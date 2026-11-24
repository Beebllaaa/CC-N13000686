let data;
let url = "https://global-warming.org/api/arctic-api";

let years = [];
let iceValues = [];
let yearSlider;
let bear;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  bear = await loadImage("assets/polar bear.png");
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
  yearSlider.position(windowWidth/2-300, 700);
  yearSlider.size(600);
}

function draw() {
  // Sky
  background(197, 222, 235);

  // Ocean
  noStroke();
  fill(49, 94, 123);
  rect(0, 350, width, 500);

  // Get current data
  let index = yearSlider.value();
  let year = years[index];
  let ice = iceValues[index];

  // Ice width
  let iceWidth = map(
    ice,
    min(iceValues),
    max(iceValues),
    150,
    1000
  );

  // Draw ice
  push();
  translate(width / 2 - iceWidth / 2, 330);

  // Underwater ice
  fill(192, 220, 231);
  beginShape();
  vertex(0, 0);
  vertex(iceWidth, 0);
  vertex(iceWidth * 0.91, 145);
  vertex(iceWidth * 0.75, 120);
  vertex(iceWidth * 0.55, 150);
  vertex(iceWidth * 0.25, 140);
  vertex(iceWidth * 0.15, 130);
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
  vertex(iceWidth * 0.988, 20);
  vertex(iceWidth * 0.02, 20);
  endShape(CLOSE);

  pop();

  // Number of polar bears
  let bearCount = round(map(
    ice,
    min(iceValues),
    max(iceValues),
    1,
    12
  ));

  // Draw polar bears
  let bearWidth = 65;
  let bearHeight = bearWidth * bear.height / bear.width;

  for (let i = 0; i < bearCount; i++) {
    let x = width / 2 - iceWidth / 2
          + iceWidth / (bearCount + 1) * (i + 1);

    image(
      bear,
      x - bearWidth / 2,
      330 - bearHeight,
      bearWidth,
      bearHeight
    );
  }

  // Display year
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text(year, width / 2, 600);

  // Display sea ice extent
  textSize(16);
  text("Global Sea Ice Extent: " + ice + " million km²",
       width / 2, 630);

  textSize(12);
  text("Polar bears represent habitat change, not population data.",
       width / 2, 660);
}