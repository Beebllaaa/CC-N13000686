let data;

async function setup() {
  createCanvas(800, 600);

  data = await loadJSON("https://api.nekosapi.com/v5/images/random");

  console.log(data);
}

function draw() {
  background(220);
  noStroke();

  let colors = data.color_palette;
  let w = width / colors.length;

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(i * w, 0, w, height);
  }
}