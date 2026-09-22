let recXpods;
let recYpods;
let xDir;
function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
    background(340,200,100);
    recXpods=windowWidth/2;
    recYpods=windowHeight/2;
    xDir=1;
}

function draw() {
    background(340,200,100);
    rectMode(CENTER);

    //add a rectangle
    fill(12,49,120);
    strokeWeight(a);
    stroke(12,49,120);
    rect(recXpods, recYpods, 100);

    //make the rectangle move back and forth across the screen
     recXpods+=xDir*3;
    if (recXpods>windowWidth-50 || recXpods<50){
        xDir*=-1;
    }
    
}
