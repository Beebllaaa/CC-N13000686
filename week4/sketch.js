// Press any key to generate a new seed
let seed = 327;
function setup() {
    createCanvas(800, 600);
    rectMode(CENTER);
    noFill();
}

function keyPressed() {
    seed = floor(random(13001));
    redraw(); // 手动触发draw()重新绘制！重点
}

function draw() {
    noiseSeed(seed);
    randomSeed(seed);
    background(220);
    
    let step = 64; // space in grid
    let inc = .01; // amt to increment noise val
    let noiseVal = random();

    for (let x = step; x < width - step; x += step) {
        for (let y = step; y < height - step; y += step) {
            let rot = TWO_PI * 2 * noise(noiseVal);
            push();
            translate(x, y);
            rotate(rot);
            rect(0, 0, 40);
            pop();
            noiseVal += inc;
        }
    }
    noLoop(); 
}