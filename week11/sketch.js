let data;
let url = "https://global-warming.org/api/arctic-api";

let years = [];
let iceValues = [];

async function setup() {
  createCanvas(800, 600);

  data = await loadJSON(url);

  for (let year = 1979; year <= 2026; year++) {
    let date = year + "03";

    let monthData = data.arcticData.data[date];

    if (monthData && monthData.value != -9999) {
      years.push(year);
      iceValues.push(monthData.value);
    }
  }

  console.log(years);
  console.log(iceValues);
}

function draw() {
  background(197, 222, 235);
}