
let black;
let white;

let slider;


function setup() {

  var canvas = createCanvas(400, 400);
  canvas.center();

  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

}

function draw() {

  background(white);
  
  fill(white);
  stroke(black);
  strokeWeight(5);


  translate(width/2, height/2);

  // test 1
  ellipse(0, 0, 300, 300);

}



