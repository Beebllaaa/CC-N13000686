let x, y;

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
      strokeWeight(40*(x*y/5000000));
      stroke(199,49,120);
      translate(x, y);
      rotate(10*(x*y/50000000));
      rect(x, y, 200);
      pop();
    }
  }
} 