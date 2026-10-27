let pMapper;
let offset = 0;
let centerX = 200;
let centerY = 200;
let editCenter = false;
let dragging = false;

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
    quad1_1.displaySketch(visual);
    quad1_2.displaySketch(visual);

    // Box 2
    quad2_1.displaySketch(visual);
    quad2_2.displaySketch(visual);

    // Box 3
    quad3_1.displaySketch(visual);
    quad3_2.displaySketch(visual);

    offset += 1;

    if (offset >= 40) {
        offset = 0;
    }
    
}


// BOX 1 VISUALS

function visual(g) {
    g.background(0);

    g.noFill();
    g.strokeWeight(2);
    g.rectMode(CENTER);

    for (let i = 0; i < 11; i++) {
        let size = 40 + i * 40 - offset;

        if (size > 0 && size <= 400) {

            let alpha = 255;

            if (size > 360) {
                alpha = map(size, 360, 400, 255, 0);
            }

            g.stroke(255, alpha);

            let x = map(size, 400, 0, 200, centerX); 
            let y = map(size, 400, 0, 200, centerY); 
            g.rect(x, y, size, size);
        }
    }

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
            pMapper.load("map.json");
            break;

        case "s":
            pMapper.save("map.json");
            break;

        case "p":
        case "P":
            editCenter = !editCenter;
            break;
    }
}

function mouseDragged() {
    if (editCenter) {
        centerX = constrain(map(mouseX, 0, width, 0, 400), 0, 400);
        centerY = constrain(map(mouseY, 0, height, 0, 400), 0, 400);
    }
}

// WINDOW RESIZE

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}