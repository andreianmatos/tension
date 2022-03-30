let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let currentTestBol;
let test1Bol = test2Bol = test3Bol = test4Bol = 
test5Bol = test6Bol = test7Bol = test8Bol = test9Bol = 
test10Bol = test11Bol = test12Bol = test13Bol = 
test14Bol = test15Bol = test16Bol = test17Bol = test18Bol = 0;

let testNumber = 1;

var slider, output;

function setup() {

  var canvas = createCanvas(500, 500);
  canvas.center('horizontal');
  canvas.parent('sketch');

  // define colors
  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

  slider = document.getElementById("myRange");
  output = document.getElementById("demo");

  output.innerHTML = slider.value;

  currentTestBol = 'test' + randomIntFromInterval(1,20) + 'Bol';
  currentTest(currentTestBol);
  window[currentTestBol] = 1;
  // see what's up here
  if(currentTestBol == "test1Bol")
    test1Bol = 1;
  else  
    window[currentTestBol] = 1;

  setSliderValue(randomIntFromInterval(-8,8));
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
  
  // TEST 1 | straight line - wavy line - straight line - zigzag line - straight line
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
    let degrees = map(-31*(abs(parseInt(output.innerHTML))), 0, width, 0, 181); /* fix */
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

  // TEST 10 |rectangle verticality
  if(test10Bol) {
    strokeWeight(5);
    rectMode(CENTER);
    rotate(3 * map(output.innerHTML, -8, 8, 0, 100)); /* fix */
    rect(0, 0, 300, 100);
  }

  // TEST 11 |curved line extension
  if(test11Bol) {
    let mappedInput = map(output.innerHTML, -8, 8, 1, 360);  
    arc(0, 0, mappedInput, 200, 0, HALF_PI);
  }

  // TEST 12 |contrast
  if(test12Bol) {
    rectMode(CENTER);
    rect(0, 0, 308, 208);
    setGradient(-150, -100, 300, 200, black, white, X_AXIS, output.innerHTML);
  }

  // TEST 13 |brightness
  if(test13Bol) {
    colorMode(HSB, 100); // put this at the start, change all colors to hsb 
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 0, 100);  
    let c = color(100, 100, mappedInput);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);
  }

  // TEST 14 |saturation
  if(test14Bol) {
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 0, 100);  
    let c = color(100, mappedInput, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);
  }

  // TEST 15 |hue between high/low arousal colors
  if(test15Bol) {
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 0, 70); // to go from red to blue 
    let c = color(mappedInput, 100, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);
  }

  // TEST 16 |color area
  if(test16Bol) {
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 1, 10);  
    let c = color(100, 100, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 40 * mappedInput);
  }

  // TEST 17 |complementary color
  if(test17Bol) {
    colorMode(HSB, 360, 100, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 1, 360);  
    let c = color(80, 100, 100);
    fill(c);
    square(0, 0, 300);
    fill((hue(c) + 180)%mappedInput, saturation(c), brightness(c), 100);
    square(0, 0, 150);
  }

  // TEST 18 |transparency
  if(test18Bol) {
    let mappedInput = map(output.innerHTML, -8, 8, 1, 100);  
    fill(hue(black), saturation(black), brightness(black), 50);
    circle(-80, 0, 250); 
    fill(hue(black), saturation(black), brightness(black), mappedInput);
    circle(80, 0, 250); 
  }

}

function show(item){
  if(document.getElementById(item).style.display == "none"){
    document.getElementById(item).style.display = "block";
  }
  else{
    document.getElementById(item).style.display = "none";
  }
}  

function next(testNr) {
  test1Bol = test2Bol = test3Bol = test4Bol = 
  test5Bol = test6Bol = test7Bol = test8Bol = 
  test9Bol = test10Bol = test11Bol = test12Bol = 
  test13Bol = test14Bol = test15Bol = test16Bol = 
  test17Bol = test18Bol = 0;
  if(testNr != null)
    testNumber = testNr;
  testNumber ++; 
  testBol = 'test'+testNumber+'Bol';
  // see what's up here
  if(testBol == "test1Bol")
    test1Bol = 1;
  else
    window[testBol] = 1;
  currentTest(testBol);
  /*  let testFunction = 'test'+testNumber;
  document.getElementById("ritema").checked = false;
  document.getElementById("ritemb").checked = false;
  document.getElementById("ritemc").checked = false;
  document.getElementById("a").onclick = function() {setSliderValue('-8'); window[testFunction]()};
  document.getElementById("b").onclick = function() {setSliderValue('0'); window[testFunction]()};
  document.getElementById("c").onclick = function() {setSliderValue('8'); window[testFunction]()};*/
}

function currentTest(testBol) {
  if(currentTestBol != null) {
    console.log("AAAA"+currentTestBol);
    document.getElementById(currentTestBol).style.background = "#addfad";
    document.getElementById(currentTestBol).style.color = "#000";
  }
  currentTestBol = testBol;
  document.getElementById(testBol).style.background = "#000";
  document.getElementById(testBol).style.color = "#fff";
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

function setGradient(x, y, w, h, c1, c2, axis, input) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let mappedInput = map(input, -8, 8, 1, 10);
      let inter;
      if(mappedInput==10) // just to be sharper the difference at the end
        inter = map(i*mappedInput*60, x, x + w, 0, 1);
      else
        inter = map(i*mappedInput, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function checkGrid(cellNr) {
  for(let i = 1; i < 37; i++)
    document.getElementById(i.toString()).value = null;
  document.getElementById(cellNr).value = "X";
}