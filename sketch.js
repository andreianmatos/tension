function setup() {
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();

  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(50,50,80,80);
}

