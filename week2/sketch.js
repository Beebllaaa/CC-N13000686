function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(180,10,90);
}

function draw() {
    translate(width/2, height/2);
    noStroke();
    ellipse(0,0,50);
}
