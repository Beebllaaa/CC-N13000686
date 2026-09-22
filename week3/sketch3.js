let Xpods;
let Ypods;
let xDir;
let yDir;

function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
    background(340,200,100);
    Xpods=50;
    Ypods=50;
    xDir=1;
    yDir=1;
}

function draw() {
    background(340,200,100);

    //add a rectangle
    fill(30,10,100);
    ellipse(Xpods, Ypods, 100);

    //Make the square move inside the canvas
     Xpods+=xDir*3;
     Ypods+=yDir*3;

    if (Xpods>windowWidth-50 || Xpods<50){
        xDir*=-1;
    } 

    if (Ypods>windowHeight-50 || Ypods<50){
        yDir*=-1;
        
    } 
    
    if (xDir>0){
        fill(100,10,100);
    }else{
        fill(30,10,100);
    }

}
