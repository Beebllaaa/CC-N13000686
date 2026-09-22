let x, y;
let rot=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(340,90,100);
}

function draw() {
  rectMode(CENTER);
  for(x=40; x<windowWidth; x+=70){
    for(y=35; y<windowHeight; y+=70){
      push();
      fill(50,50,100);
      //let strokeweight change with x and y 
      strokeWeight(40*(x*y/1000000));
      stroke(199,49,120);
      translate(x, y);
      rotate(rot);
      rect(0, 0, 50);
      pop();
      rot+=0.01;
    }
  }
  noLoop();
  
} 
