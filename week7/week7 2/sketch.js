let vid; 

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  // load a video
  vid = await createVideo("assets/target.mp4");
  vid.autoplay(); // start playing it
  vid.volume(0); // we'll mute the sound for now
  vid.hide(); // hide the HTML player
  vid.loop(); // loop the video
}

function draw() {
  background(0);
  image(vid, 0, 0); // draw it just like we would an image
}