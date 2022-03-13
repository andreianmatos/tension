
let black;
let white;

let a = 1, b = 1, c = 1, d = 1;

let test1Bol = 0, test2Bol = 0, test3Bol = 0;

let testNumber = 1;

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
    square(0, 0, 10*output.innerHTML, 20*output.innerHTML);

  if(test2Bol)
    line(100, 20, c*output.innerHTML, d*output.innerHTML);

  if(test3Bol)
    ellipse(0, 0, a*output.innerHTML, b*output.innerHTML);
}

function test1(val1, val2) {
  test1Bol = 1;
  test2Bol = 0;
  test3Bol = 0;
  a = val1;
  b = val2;
}

function test2(val1, val2) {
  test1Bol = 0;
  test2Bol = 1;
  test3Bol = 0;
  c = val1;
  d = val2;
}

function test3(val1, val2) {
  test1Bol = 0;
  test2Bol = 0;
  test3Bol = 1;
  c = val1;
  d = val2;
}

function show(item){
  if(document.getElementById(item).style.display == "none"){
    document.getElementById(item).style.display = "block";
  }
  else{
    document.getElementById(item).style.display = "none";
  }
}

function next() {
  test1Bol = test2Bol = test3Bol = 0;
  testNumber ++; 
  let testFunction = 'test'+testNumber;
  document.getElementById("ritema").checked = false;
  document.getElementById("ritemb").checked = false;
  document.getElementById("ritemc").checked = false;
  document.getElementById("ritemd").checked = false;
  document.getElementById("a").onclick = function() {window[testFunction]('10','10')};
  document.getElementById("b").onclick = function() {window[testFunction]('50','50')};
  document.getElementById("c").onclick = function() {window[testFunction]('80','80')};
  document.getElementById("d").onclick = function() {window[testFunction]('100','100')};
}


function drawZigZagLine() {
}

function drawWavyLine() {
}