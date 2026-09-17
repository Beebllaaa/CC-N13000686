let xPods;
let yPods;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(180,10,90);
    xPods = width/2;
    yPods = height/2;
    angleMode(DEGREES);
    angle = random(360);
}

function draw() {
    push();
    translate(xPods, yPods);
    rotate(angle);
    fill(120,40,60);   
    noStroke();
    rect(0,0,50);
    pop();

}


