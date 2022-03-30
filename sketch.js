let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let currentTestBol;
let lastCheckedGridCell;
let tests = [];

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

  for(let i=1; i < 21; i++)
    tests.push(new Test('test' + i + 'Bol'));

  currentTestBol = 'test' + randomIntFromInterval(1,20) + 'Bol';
  currentTest(currentTestBol);

  for(let i=1; i < 21; i++)
    findTest('test' + i + 'Bol').active = 0;
  findTest(currentTestBol).active = 1;

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
  if(findTest("test1Bol").active) {
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
  if(findTest("test2Bol").active) {
    if(output.innerHTML == 0) 
      circle(0, 0, 200);
    else {
      arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
      arc(0, 0, 200 + 10 * output.innerHTML, 200, PI + HALF_PI, HALF_PI);
    }
  }

  // TEST 3 |small square - medium square - big square
  if(findTest("test3Bol").active) {
    rectMode(CENTER);
    if(output.innerHTML == 0) 
      square(0, 0, 100);
    else 
      square(0, 0, 100 + 10 * output.innerHTML);
  }

  // TEST 4 |from square to circle
  if(findTest("test4Bol").active) {
    rectMode(CENTER);
    square(0, 0, 200, 6 * (parseInt(output.innerHTML)+8));
  }

  // TEST 5 |assymetrical circle
  if(findTest("test5Bol").active) {
    if(output.innerHTML == 0) 
      circle(0, 0, 200);
    else {
      arc(0, 0, 200, 200, TWO_PI, PI + HALF_PI);
      arc(0, output.innerHTML, 200, 200, PI + HALF_PI, TWO_PI);
      line(100, 0, 100, -6); /* fix */
    }
  }

  // TEST 6 |from acute angle to straight
  if(findTest("test6Bol").active) {
    let degrees = map(-31*(abs(parseInt(output.innerHTML))), 0, width, 0, 181); /* fix */
    let v = p5.Vector.fromAngle(radians(degrees), 200);
    let vx = v.x;
    let vy = v.y;
    line(0, 0, 200, 0);
    line(0, 0, vx, vy);
  }
 
  // TEST 7 |square rotation
  if(findTest("test7Bol").active) {
    rectMode(CENTER);
    rotate(PI / output.innerHTML);
    square(0, 0, 200);
  }

  // TEST 8 |dot in rectangle
  if(findTest("test8Bol").active) {
    rectMode(CENTER);
    rect(0, 0, 500, 300);
    strokeWeight(10);
    point(15 * output.innerHTML, 15 * output.innerHTML);
  }

  // TEST 9 |dot sequence
  if(findTest("test9Bol").active) {
    strokeWeight(10);
    point(-100,20);
    point(-60,20);
    point(-20 + parseInt(output.innerHTML),20);
    point(20 - parseInt(output.innerHTML),20);
    point(60,20);
    point(100,20);
  }

  // TEST 10 |rectangle verticality
  if(findTest("test10Bol").active) {
    strokeWeight(5);
    rectMode(CENTER);
    rotate(3 * map(output.innerHTML, -8, 8, 0, 100)); /* fix */
    rect(0, 0, 300, 100);
  }

  // TEST 11 |curved line extension
  if(findTest("test11Bol").active) {
    let mappedInput = map(output.innerHTML, -8, 8, 1, 360);  
    arc(0, 0, mappedInput, 200, 0, HALF_PI);
  }

  // TEST 12 |contrast
  if(findTest("test12Bol").active) {
    rectMode(CENTER);
    rect(0, 0, 308, 208);
    setGradient(-150, -100, 300, 200, black, white, X_AXIS, output.innerHTML);
  }

  // TEST 13 |brightness
  if(findTest("test13Bol").active) {
    colorMode(HSB, 100); // put this at the start, change all colors to hsb 
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 0, 100);  
    let c = color(100, 100, mappedInput);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);
  }

  // TEST 14 |saturation
  if(findTest("test14Bol").active) {
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 0, 100);  
    let c = color(100, mappedInput, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);
  }

  // TEST 15 |hue between high/low arousal colors
  if(findTest("test15Bol").active) {
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 0, 70); // to go from red to blue 
    let c = color(mappedInput, 100, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);
  }

  // TEST 16 |color area
  if(findTest("test16Bol").active) {
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output.innerHTML, -8, 8, 1, 10);  
    let c = color(100, 100, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 40 * mappedInput);
  }

  // TEST 17 |complementary color
  if(findTest("test17Bol").active) {
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
  if(findTest("test18Bol").active) {
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
  if(testNr != null)
    testNumber = testNr;
  testNumber ++; 
  testBol = 'test'+testNumber+'Bol';
  for(let i=0; i < 20; i++)
    tests[i].active = 0;
  findTest(testBol).active = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // save test choices
  saveTestChoices(currentTestBol);
  // clear input (tension + grid)
  clearInput("tensionNumber");
  for(let i = 1; i < 37; i++)
    clearInput(i.toString());
  setSliderValue(randomIntFromInterval(-8,8));
  // move on to next test
  currentTest(testBol); 
}

function currentTest(testBol) {
  if(currentTestBol != null) {
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
    clearInput(i.toString());
  lastCheckedGridCell = cellNr;
  document.getElementById(cellNr).value = "X";
}

function clearInput(id){
  document.getElementById(id).value = null;
}

function Test(name){
  this.active = 0;
  this.name = name;
  this.scroll = null;
  this.tension = null;
  this.grid = null;
}

function findTest(name){
  for(let i = 0; i < 20; i++){
    if(tests[i].name == name)
      return tests[i];
  }
}

function saveTestChoices(testName){
  findTest(testName).scroll = output.innerHTML;
  findTest(testName).tension = document.getElementById("tensionNumber").value;
  findTest(testName).grid = lastCheckedGridCell;
}

//TO DO save to document
function printTests(){
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  let testResults = "<p><b>" + datetime +"</b></p>" + "\n";
  for(let i = 0; i < 20; i++){
    let j = i+1;
    testResults += "<p><b>TEST " + j + "</b> | <b>scroll:</b> " + tests[i].scroll +
     " <b>tension:</b> " + tests[i].tension + " <b>grid:</b> " + tests[i].grid + "\n</p>";
  }
  console.log(testResults);
  window.localStorage.setItem('testResults', testResults);
  //console.log(document.getElementById("results").innerHTML);
  //document.getElementById("results").innerHTML = testResults;
}

function submit(){
  saveTestChoices(currentTestBol);
  printTests();
  window.location.href="results.html";
}