let x, y;
let rot=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(340,90,100);
  x=120;
  y=120;
}

function draw() {
  rectMode(CENTER);
  for(x=120; x<windowWidth; x+=300){
    for(y=120; y<windowHeight; y+=300){
      push();
      fill(50,50,100);
      //let strokeweight change with x and y 
      strokeWeight(40*(x*y/3000000));
      stroke(199,49,120);
      translate(x, y);
      rotate(rot);
      rect(0, 0, 200);
      pop();
      rot+=0.01;
    }
  }
  // noLoop();
  
} 
