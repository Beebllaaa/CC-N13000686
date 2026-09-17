let xPods;
let yPods;
let angle1, angle2, angle3, angle4, angle5;
let scale1, scale2, scale3, scale4, scale5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    colorMode(HSB);
    angleMode(DEGREES);
    background(180,10,90);
    xPods = width/2;
    yPods = height/2;
    
}

function draw() {
    noStroke();
    background(180,10,90);
    
    //rect1
    push();
    translate(xPods, yPods);
    angle1++;
    rotate(angle1);
    scale(scale1);
    fill(120,40,60);   
    rect(0,0,50);
    pop();

    //rect2
    push();
    translate(xPods/2, yPods/2);
    angle2++;
    rotate(angle2);
    scale(scale2);
    fill(50,80,100);   
    rect(0,0,50);
    pop();

    //rect3
    push();
    translate(xPods/2*3, yPods/2);
    angle3++;
    rotate(angle3);
    scale(scale3);
    fill(200,60,70);   
    rect(0,0,50);
    pop();

    //rect4
    push();
    translate(xPods/2, yPods/2*3);
    angle4++;
    rotate(angle4);
    scale(scale4);
    fill(300,40,60);   
    rect(0,0,50);
    pop();

    //rect5
    push();
    translate(xPods/2*3, yPods/2*3);
    angle5++;
    rotate(angle5);
    scale(scale5);
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

    scale1 = random(1, 10);
    scale2 = random(1, 10);
    scale3 = random(1, 10);
    scale4 = random(1, 10);
    scale5 = random(1, 10);
}






