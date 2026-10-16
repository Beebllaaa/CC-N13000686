
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  // Get time from HTML slider
  let h = Number(document.getElementById("timeSlider").value);

  // Update displayed time
  document.getElementById("timeValue").textContent =
    String(floor(h)).padStart(2, "0") + ":" +
    String(floor((h % 1) * 60)).padStart(2, "0");
    if (h < 5) {
    
  //change background color based on hour of the day
  background(16, 31, 80); // Night

} else if (h < 8) {
  background(lerpColor(
    color(16, 31, 80),
    color(255, 150, 120),
    map(h, 5, 8, 0, 1)
  )); // Sunrise

} else if (h < 12) {
  background(lerpColor(
    color(255, 150, 120),
    color(120, 190, 255),
    map(h, 8, 12, 0, 1)
  )); // Morning to noon

} else if (h < 17) {
  background(120, 190, 255); // Daytime

} else if (h < 19) {
  background(lerpColor(
    color(120, 190, 255),
    color(255, 110, 100),
    map(h, 17, 19, 0, 1)
  )); // Sunset

} else if (h < 21) {
  background(lerpColor(
    color(255, 110, 100),
    color(16, 31, 80),
    map(h, 19, 21, 0, 1)
  )); // Evening to night

} else {
  background(16, 31, 80); // Night
}

  //Connect circle number to minutes
  let m = minute();
  let layers = m;   

  //Make the circles breathe with seconds
  let s = second();
  
  let ssmmhh = 'second: ' + s + '\n' +
               'minute: ' + m + '\n' +
               'hour: ' + h;
    // to the console
    console.log(ssmmhh);

// print ss/mm/hh to the screen
    fill(255);
    noStroke();
    textSize(24);
    text(ssmmhh, 10, 20);

  push();
  translate(width / 2, height / 2);
  blendMode(SCREEN);
  noFill();
  stroke(150, 180, 255);
  strokeWeight(2);

  for (let i = 0; i < layers; i++) {

beginShape();

let baseRadius = 5 + i * 9 + i * 0.1;

for (let angle = 0; angle < 360; angle += 3) {
//change stroke color based every 10 layers(minutes)
    if (i < 10) {
  stroke(150, 180, 255); // Blue
} else if (i < 20) {
  stroke(180, 150, 255); // Purple
} else if (i < 30) {
  stroke(255, 150, 200); // Pink
} else if (i < 40) {
  stroke(255, 190, 130); // Orange
} else if (i < 50) {
  stroke(255, 230, 150); // Yellow
} else {
  stroke(150, 230, 200); // Green
}

  let xoff = cos(angle) + 1;
  let yoff = sin(angle) + 1;

  let noiseVal = noise(xoff + i*0.2, yoff + i*0.2, s*0.2);

  let radius = baseRadius + map(noiseVal, 0, 1, -i * 0.5, i * 0.5);

  let x = radius * cos(angle);
  let y = radius * sin(angle);

  vertex(x, y);
}

endShape(CLOSE);
  }

  pop();

}