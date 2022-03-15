
let black;
let white;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let test1Bol = test2Bol = test3Bol = test4Bol = 
test5Bol = test6Bol = test7Bol = test8Bol = test9Bol = 0;

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
  
  // TEST 1 | wavy line - straight line - zigzag line
  if(test1Bol) {
    val1 = 0;
    val2 = 10;
    if(output.innerHTML >= 0){
      if(output.innerHTML > 0)
        val1 = 20;
      drawZigZagLine(-400, 0, 55, val1 * output.innerHTML);
    }
    else
      drawWavyLine(-400,0, val2 * output.innerHTML, 100);
  }

  // TEST 2 |circle to assymetrical ellipse
  if(test2Bol) {
    if(output.innerHTML == 0) 
      circle(0, 0, 200);
    else {
      arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
      arc(0, 0, 200 + 10 * output.innerHTML, 200, PI + HALF_PI, HALF_PI);
    }
  }

  // TEST 3 |small square - medium square - big square
  if(test3Bol) {
    rectMode(CENTER);
    if(output.innerHTML == 0) 
      square(0, 0, 100);
    else 
      square(0, 0, 100 + 10 * output.innerHTML);
  }

  // TEST 4 |from square to circle
  if(test4Bol) {
    rectMode(CENTER);
    square(0, 0, 200, 6 * (parseInt(output.innerHTML)+8));
  }

  // TEST 5 |assymetrical circle
  if(test5Bol) {
    if(output.innerHTML == 0) 
      circle(0, 0, 200);
    else {
      arc(0, 0, 200, 200, TWO_PI, PI + HALF_PI);
      arc(0, output.innerHTML, 200, 200, PI + HALF_PI, TWO_PI);
      line(100, 0, 100, -6); /* fix */
    }
  }

  // TEST 6 |from acute angle to straight
  if(test6Bol) {
    let degrees = map(-31*(parseInt(output.innerHTML)+8), 0, width, 0, 181); /* fix */
    let v = p5.Vector.fromAngle(radians(degrees), 200);
    let vx = v.x;
    let vy = v.y;
    line(0, 0, 200, 0);
    line(0, 0, vx, vy);
  }

  // TEST 7 |square rotation
  if(test7Bol) {
    rectMode(CENTER);
    rotate(PI / output.innerHTML);
    square(0, 0, 200);
  }

  // TEST 8 |dot in rectangle
  if(test8Bol) {
    rectMode(CENTER);
    rect(0, 0, 500, 300);
    strokeWeight(10);
    point(15 * output.innerHTML, 15 * output.innerHTML);
  }

  // TEST 9 |dot sequence
  if(test9Bol) {
    strokeWeight(10);
    point(-100,20);
    point(-60,20);
    point(-20 + parseInt(output.innerHTML),20);
    point(20 - parseInt(output.innerHTML),20);
    point(60,20);
    point(100,20);
  }
 
}

function test1() {
  test2Bol = test3Bol = test4Bol  = test5Bol = 
  test6Bol = test7Bol = test8Bol = test9Bol = 0;
  test1Bol = 1;
}

function test2() {
  test1Bol = test3Bol = test4Bol = test5Bol = 
  test6Bol = test7Bol = test8Bol = test9Bol =  0;
  test2Bol = 1;
}

function test3() {
  test1Bol = test2Bol = test4Bol = test5Bol = 
  test6Bol = test7Bol = test8Bol = test9Bol =  0;
  test3Bol = 1;
}

function test4() {
  test1Bol = test2Bol = test3Bol = test5Bol = 
  test6Bol = test7Bol = test8Bol = test9Bol =  0;
  test4Bol = 1;
}

function test5() {
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test6Bol = test7Bol = test8Bol = test9Bol =  0;
  test5Bol = 1;
}

function test6() {
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test5Bol = test7Bol = test8Bol = test9Bol =  0;
  test6Bol = 1;
}

function test7() {
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test5Bol = test6Bol = test8Bol = test9Bol =  0;
  test7Bol = 1;
}

function test8() {
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test5Bol = test6Bol = test7Bol = test9Bol =  0;
  test8Bol = 1;
}

function test9() {
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test5Bol = test6Bol = test7Bol = test8Bol =  0;
  test9Bol = 1;
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
  setSliderValue(0);
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test5Bol = test6Bol = test7Bol = test8Bol = test9Bol =  0;
  testNumber ++; 
  let testFunction = 'test'+testNumber;
  document.getElementById("ritema").checked = false;
  document.getElementById("ritemb").checked = false;
  document.getElementById("ritemc").checked = false;
  document.getElementById("a").onclick = function() {setSliderValue('-8'); window[testFunction]()};
  document.getElementById("b").onclick = function() {setSliderValue('0'); window[testFunction]()};
  document.getElementById("c").onclick = function() {setSliderValue('8'); window[testFunction]()};  
}

function setSliderValue(val) {
  document.getElementById("myRange").value = val;
  output.innerHTML = val;
}

function drawZigZagLine(x, y, w, h) {
  beginShape();

  var showBoxes = 0;

  for(var i = 0; i < 20; i++) {
    if(showBoxes) 
      rect(x+i*w,y,w,h);
    if(i%2==0) 
      line(x+i*w,y,x+(i+1)*w,y+h);
    else 
      line(x+i*w,y+h,x+(i+1)*w,y);
  }

  endShape();
}

function drawWavyLine(x, y, amp, w) {
  beginShape();

  var waves = 10;
  var offSet = 0;
  var connect = 1;

  for(var i = 0; i < waves; i++) { 
    for(var j = 0; j < w; j++) { 
      point(x+i*w+j,y+amp*sin( TWO_PI/w*j+offSet));
      if(connect) line(x+i*w+j,y+amp*sin( TWO_PI/w*j+offSet),
                       x+i*w+(j+1),y+amp*sin( TWO_PI/w*(j+1) +offSet));
    }
  }

  endShape();
}