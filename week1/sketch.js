// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "turning ideas into interactive experiences through computation", source: "Casey Reas" },
  { text: "where logic meets imagination", source: "Mitchell Resnick" },
  { text: "exploring what code can create beyond traditional software", source: "Vera Molnár" },
  { text: "a way of thinking, making, and experimenting with technology", source: "Lauren McCarthy" },
  { text: "a conversation between human creativity and computational systems", source: "Manuel Lima" },
  { text: "where the algorithm is a brush, the screen is a canvas", source: "Soren" },
  { text: "turning data into emotion", source: "Zach" },
  { text: "a bridge between artistic intuition and computational thinking", source: "John Maeda" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(10, 255, 10);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 20, 250); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}
