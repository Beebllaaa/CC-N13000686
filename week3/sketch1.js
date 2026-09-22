let recXpods;
let recYpods;
let xDir;
let yDir;
let a;

function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
    background(340,200,100);
    recXpods=0;
    recYpods=0;
    xDir=1;
    yDir=1;
    a=0;
}

function draw() {
    background(340,200,100);

    //add a rectangle
    fill(12,49,120);
    strokeWeight(a);
    stroke(199,49,120);
    // rect(recXpods, recYpods, 100);

    //Make the square move inside the canvas
    //  recXpods+=xDir*3;
    //  recYpods+=yDir*3;
    // if (recXpods>windowWidth-200 || recXpods<0){
    //     xDir*=-1;
    // }
    // if (recYpods>windowHeight-200 || recYpods<0){
    //     yDir*=-1;
    // }

    //When the mouse is in the upper half, the stroke increases; otherwise, it decreases.
    if(mouseY<windowHeight/2){
        a+=1;
    } else {
        a+=-1;
    }

    // for(let i=0; i<7; i++){
    //     // make duplicate rectangles across the screen
    //     rect(i * 200, i * 200, 200);
    
    // }

    for(x=50; x<windowWidth; x+=200){
        for(y=50; y<windowHeight; y+=200){
            rect(x, y, 100);
        }

    }
}
