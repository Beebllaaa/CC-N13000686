let pMapper;
let leftQuad;
let rightQuad;
let BellaQuad;
let balls = [];
let numBalls = 20;
let a = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pMapper = createProjectionMapper(this);
    
    // create three quads
    leftQuad = pMapper.createQuadMap(400, 400);
    rightQuad = pMapper.createQuadMap(400, 400);
    BellaQuad = pMapper.createQuadMap(400, 400);

    // create array of circles
    for (let i = 0; i < numBalls; i++) {
        let oneBall = {
            x: random(leftQuad.width),
            y: random(leftQuad.height),
            d: random(20, 100)
        };
        balls.push(oneBall);
    }
}


function draw() {
    background(0);

    // each quad runs its own function
    leftQuad.displaySketch(dots);
    rightQuad.displaySketch(stripes);
    BellaQuad.displaySketch(BellaSketch);
}

function dots(mySketch) {
    mySketch.background("aliceblue");  
    mySketch.noStroke();
    mySketch.fill(180, 10, 220, 40);
    for (let i = 0; i < numBalls; i++) {
        mySketch.ellipse(balls[i].x, balls[i].y, balls[i].d);
        balls[i].x += random(-1, 1);
    }
}

function stripes(yourSketch) {
    yourSketch.background("orange");
    yourSketch.stroke(255);
    yourSketch.strokeWeight(5);
    for (let i = 0; i < 400; i += 40) {
        yourSketch.line(i, 0, i, 400);
    }
}

function BellaSketch(BellaSketch) {
    BellaSketch.background(255, 200, 100);
    BellaSketch.fill(12, 49, 120);
    BellaSketch.stroke(199, 49, 120);

    if (mouseY < height / 2) {
        a += 1;
    } else {
        a -= 1;
    }

    a = constrain(a, 0, 30);
    BellaSketch.strokeWeight(a);

    for (let x = 50; x < BellaSketch.width; x += 200) {
        for (let y = 50; y < BellaSketch.height; y += 200) {
            BellaSketch.rect(x, y, 100, 100);
        }
    }
}



function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
            break;
        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;
        case "l":
            pMapper.load("maps/map.json");
            break;
        case "s":
            pMapper.save("map.json");
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



