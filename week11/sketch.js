let data;

let url = "https://global-warming.org/api/arctic-api";

async function setup() {
  createCanvas(800, 600);

  data = await loadJSON(url);

  console.log(data);
}

function draw() {
  background(197, 222, 235);
}