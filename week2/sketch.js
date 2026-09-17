let xPods;
let yPods;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(180,10,90);
    xPods = width/2;
    yPods = height/2;
}

function draw() {
    translate(xPods, yPods);
    fill(120,40,60);   
    noStroke();
    ellipse(0,0,50);
}
