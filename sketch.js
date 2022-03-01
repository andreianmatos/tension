
let black;
let white;

let a = 1, b = 1, c = 1, d = 1;

let test1Bol = 1, test2Bol = 0;

var slider, output;

function setup() {

  var canvas = createCanvas(500, 500);
  canvas.center('horizontal');

  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

  slider = document.getElementById("myRange");
  output = document.getElementById("demo");

  output.innerHTML = slider.value;

}

function draw() {

  background(white);
  
  fill(white);
  stroke(black);
  strokeWeight(5);

  translate(width/2, height/2);

  // update the current slider value
  slider.oninput = function() {
    output.innerHTML = this.value;
  }

  if(test1Bol)
    ellipse(0, 0, a*output.innerHTML, b*output.innerHTML);

  if(test2Bol)
    line(100, 20, c*output.innerHTML, d*output.innerHTML);

}

function test1(val1, val2) {
  a = val1;
  b = val2;
}

function test2(val1, val2) {
  test1Bol = 0;
  test2Bol = 1;
  c = val1;
  d = val2;
}