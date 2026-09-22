let recXpods;
let recYpods;
function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
    background(340,200,100);
    recXpods=windowWidth/2;
    recYpods=windowHeight/2;
}

function draw() {
    background(340,200,100);
    rectMode(CENTER);

    //add a rectangle
    fill(12,49,120);
    strokeWeight(a);
    stroke(12,49,120);
    rect(recXpods, recYpods, 100);

}
