let xPods;
let yPods;
let angle1, angle2, angle3, angle4, angle5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    colorMode(HSB);
    angleMode(DEGREES);
    background(180,10,90);
    xPods = width/2;
    yPods = height/2;
    
    angle1 = random(360);
    angle2 = random(360);
    angle3 = random(360);
    angle4 = random(360);
    angle5 = random(360);
}

function draw() {
    noStroke();
    background(180,10,90);
    
    //rect1
    push();
    translate(xPods, yPods);
    rotate(angle1);
    fill(120,40,60);   
    rect(0,0,50);
    pop();

    //rect2
    push();
    translate(xPods/2, yPods/2);
    rotate(angle2);
    fill(50,80,100);   
    rect(0,0,50);
    pop();

    //rect3
    push();
    translate(xPods/2*3, yPods/2);
    rotate(angle3);
    fill(200,60,70);   
    rect(0,0,50);
    pop();

    //rect4
    push();
    translate(xPods/2, yPods/2*3);
    rotate(angle4);
    fill(300,40,60);   
    rect(0,0,50);
    pop();

    //rect5
    push();
    translate(xPods/2*3, yPods/2*3);
    rotate(angle5);
    fill(10,60,90);   
    rect(0,0,50);
    pop();
}

function mousePressed() {
    angle1 = random(360);
    angle2 = random(360);
    angle3 = random(360);
    angle4 = random(360);
    angle5 = random(360);
}






