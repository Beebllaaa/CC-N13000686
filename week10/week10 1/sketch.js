// buttons
let triBut, sinBut, squBut;
// oscillator
let osc;
let playing = false;

let freqLo = 31;
let freqHi = 1000;

// shwo waveform
let fft;

class ControlButton {
    constructor(_label, _x, _y, _onClick) {
        this.button = createButton(_label);
        this.button.position(_x, _y);
        this.button.style("width", width / 5 + "px");
        this.button.style("height", "30px");
        this.button.mouseClicked(_onClick);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    triBut = new ControlButton("Triangle", 10, 10, triClicked);
    sinBut = new ControlButton("Sine", 2 * 10 + width / 4, 10, sineClicked);
    squBut = new ControlButton("Square", 3 * 10 + width / 2, 10, squareClicked);
    sawBut = new ControlButton("Saw", 4 * 10 + 3 * width / 4, 10, sawClicked);

    osc = new p5.Oscillator();
    fft = new p5.FFT();
    osc.connect(fft);
}

function triClicked() {
    osc.setType("triangle");
}

function sawClicked() {
    osc.setType("sawtooth");
}


function sineClicked() {
    osc.setType("sine");
}

function squareClicked() {
    osc.setType("square");
}


function draw() {
    background(20, 220, 120);
    textAlign(CENTER, CENTER);
    textSize(32);

    if (playing) {
        // mouse Y controls volume
        let myFreq = map(mouseX, 0, width, freqLo, freqHi);
        // mouse X controls pitch
        let myAmp = map(mouseY, 0, height, 1.0, 0.0);
        osc.freq(myFreq); // set frequency
        osc.amp(myAmp); // set amplitude
        noStroke();
        fill(255);
        text("pitch " + nf(myFreq, 1, 0) + " Hz   vol " + nf(myAmp, 2, 2), width / 2, height / 2);

        // draw the waveform
        let wave = fft.waveform();
        noFill();
        stroke(30);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < wave.length; i++) {
            let x = map(i, 0, wave.length, 0, width);
            let y = map(wave[i], -1, 1, height, 0);
            vertex(x, y);
        }
        endShape();


    } else {
        noStroke();
        fill(255);
        text("click to make some sound", width / 2, height / 2);
    }
}

function mousePressed() {
    // browsers suspend the audio context until the first user gesture
    if (getAudioContext().state === "suspended") {
        getAudioContext().resume();
    }

    if (playing) {
        osc.amp(0);
        osc.stop();
    } else {
        // set a starting pitch/volume from the mouse before it sounds
        osc.freq(map(mouseY, 0, height, freqHi, freqLo));
        osc.amp(map(mouseX, 0, width, 0, 1));
        osc.start();
    }
    playing = !playing;
}