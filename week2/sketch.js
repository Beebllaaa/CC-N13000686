let xPods;
let yPods;
let angle1, angle2, angle3, angle4, angle5;
let scale1, scale2, scale3, scale4, scale5;
let H1, H2, H3, H4, H5;


function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    colorMode(HSB);
    angleMode(DEGREES);
    background(180,10,90);
    xPods = width/2;
    yPods = height/2;
    
    angle1 = 0;
    angle2 = 0;
    angle3 = 0;
    angle4 = 0;
    angle5 = 0;
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
    fill(H1,40,60,0.7);   
    rect(0,0,50);
    pop();

    //rect2
    push();
    translate(xPods/2, yPods/2);
    angle2++;
    rotate(angle2);
    scale(scale2);
    fill(H2,80,100,0.7);   
    rect(0,0,50);
    pop();

    //rect3
    push();
    translate(xPods/2*3, yPods/2);
    angle3++;
    rotate(angle3);
    scale(scale3);
    fill(H3,60,70,0.7);   
    rect(0,0,50);
    pop();

    //rect4
    push();
    translate(xPods/2, yPods/2*3);
    angle4++;
    rotate(angle4);
    scale(scale4);
    fill(H4,40,60,0.7);   
    rect(0,0,50);
    pop();

    //rect5
    push();
    translate(xPods/2*3, yPods/2*3);
    angle5++;
    rotate(angle5);
    scale(scale5);
    fill(H5,60,90,0.7);   
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

    H1 = random(360);
    H2 = random(360);
    H3 = random(360);
    H4 = random(360);
    H5 = random(360);

}






