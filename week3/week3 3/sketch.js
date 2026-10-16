let Xpods;
let Ypods;
let xDir;
let yDir;

function setup() {

    createCanvas(windowWidth, windowHeight);
    background(340,200,100);
    Xpods=50;
    Ypods=50;
    xDir=1;
    yDir=1;
}

function draw() {
    colorMode(HSB);
    background(270,100,100);

    //Make the square move inside the canvas
     Xpods+=xDir*3;
     Ypods+=yDir*3;

    if (Xpods>windowWidth-50 || Xpods<50){
        xDir*=-1;
    } 

    if (Ypods>windowHeight-50 || Ypods<50){
        yDir*=-1;
        
    } 
    
    if (xDir>0 && yDir>0){
        fill(190, 60, 90);
    }
    if (xDir<0 && yDir>0){
        fill(150,50,85);
    }
    if (xDir>0 && yDir<0){
        fill(320, 45, 90);
    }
    if (xDir<0 && yDir<0){
        fill(55,40,92);
    }
    noStroke();

    ellipse(Xpods, Ypods, 100);
}
