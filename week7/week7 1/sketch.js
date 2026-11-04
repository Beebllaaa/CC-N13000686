let tree;
let xoff, yoff;

async function setup() {
  createCanvas(600, 800);
  pixelDensity(1);
  tree = await loadImage("assets/tree.jpg");
  
  if (tree.width > width) tree.resize(width, 0);
  if (tree.height > height) tree.resize(0, height);

  // position in the center!
  xoff = (width - tree.width) / 2;
  yoff = (height - tree.height) / 2;
}

function draw() {
  background(0);
  push();
  translate(xoff, yoff);
//   // or follow the mouse
//   imageMode(CENTER);
//   translate(mouseX, mouseY);
  image(tree, 0, 0);
  pop();
}