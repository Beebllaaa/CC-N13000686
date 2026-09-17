let xPods;
let yPods;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    colorMode(HSB);
    background(180,10,90);
    xPods = width/2;
    yPods = height/2;
    angleMode(DEGREES);
    angle = random(360);
}

function draw() {
    noStroke();

    push();
    translate(xPods, yPods);
    rotate(angle);
    fill(120,40,60);   
    rect(0,0,50);
    pop();

    push();
    translate(xPods/2, yPods/2);
    rotate(angle);
    fill(120,40,60);   
    rect(0,0,50);
    pop();

    push();
    translate(xPods/2*3, yPods/2);
    rotate(angle);
    fill(120,40,60);   
    rect(0,0,50);
    pop();

    push();
    translate(xPods/2, yPods/2*3);
    rotate(angle);
    fill(120,40,60);   
    rect(0,0,50);
    pop();

    push();
    translate(xPods/2*3, yPods/2*3);
    rotate(angle);
    fill(120,40,60);   
    rect(0,0,50);
    pop();
}


