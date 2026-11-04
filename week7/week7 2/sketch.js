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
  //load pixels every frame
  vid.loadPixels();

  for (let i = 0; i < vid.pixels.length; i += 4) {
    // read RGB values of a pixel:
    let r = vid.pixels[i];
    let g = vid.pixels[i + 1];
    let b = vid.pixels[i + 2];

  // if color is close to black, make it red
    if(r < 110 && g < 110 && b < 110) {
      vid.pixels[i] = 255;
      vid.pixels[i + 1] = 5;
      vid.pixels[i + 2] = 110;
    } else{
      vid.pixels[i] = 89;
      vid.pixels[i + 1] = 40;
      vid.pixels[i + 2] = 123;
    }

  }
  vid.updatePixels();
  translate(width/2, height/2);
  imageMode(CENTER);
  image(vid, 0, 0);
  
}