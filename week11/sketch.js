let data;

async function setup() {
  createCanvas(800, 600);

  data = await loadJSON("https://api.nekosapi.com/v5/images/random");

  console.log(data);
}

function draw() {
  background(220);
}