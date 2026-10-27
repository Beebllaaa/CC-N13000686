let pMapper;
let offset = 0;

// Box 1
let quad1_1;
let quad1_2;

// Box 2
let quad2_1;
let quad2_2;

// Box 3
let quad3_1;
let quad3_2;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    pMapper = createProjectionMapper(this);

    // Box 1
    quad1_1 = pMapper.createQuadMap(400, 400);
    quad1_2 = pMapper.createQuadMap(400, 400);

    // Box 2
    quad2_1 = pMapper.createQuadMap(400, 400);
    quad2_2 = pMapper.createQuadMap(400, 400);

    // Box 3
    quad3_1 = pMapper.createQuadMap(400, 400);
    quad3_2 = pMapper.createQuadMap(400, 400);

    pMapper.load("map.json");
}


function draw() {
    background(0);

    // Box 1
    quad1_1.displaySketch(visual1_1);
    quad1_2.displaySketch(visual1_2);

    // Box 2
    quad2_1.displaySketch(visual2_1);
    quad2_2.displaySketch(visual2_2);

    // Box 3
    quad3_1.displaySketch(visual3_1);
    quad3_2.displaySketch(visual3_2);
}


// BOX 1 VISUALS

function visual1_1(g) {
    g.background(0);

    g.noFill();
    g.stroke(255);
    g.strokeWeight(2);
    g.rectMode(CENTER);

    for (let i = 0; i < 6; i++) {
        let size = 40 + i * 40 - offset;

        g.rect(200, 200, size, size);
    }

    offset += 1;

    if (offset >= 40) {
        offset = 0;
    }
}

function visual1_2(g) {
    g.background(0);
}


// BOX 2 VISUALS

function visual2_1(g) {
    g.background(0);
}

function visual2_2(g) {
    g.background(0);
}


// BOX 3 VISUALS

function visual3_1(g) {
    g.background(0);
}

function visual3_2(g) {
    g.background(0);
}


// KEYBOARD CONTROLS

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


// WINDOW RESIZE

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}