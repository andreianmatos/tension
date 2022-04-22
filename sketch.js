let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let currentTestBol, doubleTest;
let lastCheckedGrid1Cell, lastCheckedGrid2Cell;
let tests = [];

let testNumber = 1;

var slider1, output1;

function setup() {

  var canvas = createCanvas(1200, 500);
  canvas.center('horizontal');
  canvas.parent('sketch');

  // define colors
  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

  slider1 = document.getElementById("myRange1");
  output1 = document.getElementById("demo1");

  slider2 = document.getElementById("myRange2");
  output2 = document.getElementById("demo2");

  output1.innerHTML = slider1.value;
  output2.innerHTML = slider2.value;

  for(let i=1; i < 21; i++)
    tests.push(new Test('test' + i + 'Bol'));

  currentTestBol = 'test' + randomIntFromInterval(1,20) + 'Bol';
  currentTest(currentTestBol);

  for(let i=1; i < 21; i++)
    findTest('test' + i + 'Bol').active = 0;
  findTest(currentTestBol).active = 1;

  setSliderValue(randomIntFromInterval(-8,8),1);
  setSliderValue(randomIntFromInterval(-8,8),2);
}

function draw() {

  background(white);
  
  fill(white);
  stroke(black);
  strokeWeight(5);
  
  // update the current slider 1 and 2 value
  slider1.oninput = function() {
    output1.innerHTML = this.value;
  }
  slider2.oninput = function() {
    output2.innerHTML = this.value;
  }
  
  // TEST 1 | SYMMETRY 1
  if(findTest("test1Bol").active) {
    
    push();
    strokeWeight(20);
    translate(width/5, height/2);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    if(output1.innerHTML < 0) 
      arc(0, 0, map(output1.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output1.innerHTML >= 0) 
      arc(0, 0, map(output1.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    pop();

    push();
    strokeWeight(20);
    translate(width/1.3, height/2);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    if(output2.innerHTML < 0) 
      arc(0, 0, map(output2.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output2.innerHTML >= 0) 
      arc(0, 0, map(output2.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    pop()
    
    
    /*HORIZONTALITY - rectangle and line
    
    doubleTest = 1;

    push();
    translate(width/5, height/2);
    strokeWeight(5);
    rectMode(CENTER);
    rotate(3 * map(output1.innerHTML, -8, 8, 0, 100)); /* fix 
    rect(0, 0, 300, 100);
    pop();

    push();
    translate(width/1.3, height/2);
    let mappedInput = map(output2.innerHTML, -8, 8, 1, 360);  
    arc(0, 0, mappedInput, 200, 0, HALF_PI);
    pop();
    */
  }

  // TEST 2 | SYMMETRY 2
  if(findTest("test2Bol").active) {
    doubleTest = 1;

    push();
    translate(width/5, height/2);
    if(output1.innerHTML == 0) 
      circle(0, 0, 200);
    if(output1.innerHTML < 0) {
      arc(0, 0, 200, 200, TWO_PI, PI + HALF_PI);
      arc(0, map(output1.innerHTML, -8, 0, -10, 0), 200, 200, PI + HALF_PI, TWO_PI);
      line(100, 0, 100, -10); /* fix */
    }
    if(output1.innerHTML > 0) {
      arc(0, 0, 200, 200, TWO_PI, PI + HALF_PI);
      arc(0, map(output1.innerHTML, 0, 8, 0, -10), 200, 200, PI + HALF_PI, TWO_PI);
      line(100, 0, 100, -10); /* fix */
    }
    pop();

    push();
    translate(width/1.3, height/2);
    if(output2.innerHTML == 0) 
      circle(0, 0, 200);
    if(output2.innerHTML < 0) {
      arc(0, 0, 200, 200, TWO_PI, PI + HALF_PI);
      arc(0, map(output2.innerHTML, -8, 0, -10, 0), 200, 200, PI + HALF_PI, TWO_PI);
      line(100, 0, 100, -10); /* fix */
    }
    if(output2.innerHTML > 0) {
      arc(0, 0, 200, 200, TWO_PI, PI + HALF_PI);
      arc(0, map(output2.innerHTML, 0, 8, 0, -10), 200, 200, PI + HALF_PI, TWO_PI);
      line(100, 0, 100, -10); /* fix */
    }
    pop();
  }

  // TEST 3 | SYMMETRY 
  if(findTest("test3Bol").active) {

    push();
    translate(width/5-100, height/2); 
    rotate(PI / 180*map(output1.innerHTML, -8, 8, 0, 180));
    star(0, 0, 80, 100, 2);
    pop();
    push();
    translate(width/5, height/2); 
    star(100, 0, 80, 100, 2);
    pop();

    push();
    translate(width/1.3-50, height/2);
    rotate(PI / 180*map(output2.innerHTML, -8, 8, 0, 180));
    star(0, 0, 80, 100, 2);
    pop();
    push();
    translate(width/1.3, height/2); 
    star(150, 0, 80, 100, 2);
    pop();
    
    /* angulo
    doubleTest = 1;

    push();
    translate(width/5, height/2);
    let degrees = map(-74.5*(parseInt(output1.innerHTML)+8), 0, width, 0, 181); 
    let v = p5.Vector.fromAngle(radians(degrees), 150);
    let vx = v.x;
    let vy = v.y;
    line(0, 0, 150, 0);
    line(0, 0, vx, vy);
    pop();

    push();
    translate(width/1.2, height/2);
    let degrees2 = map(-74.5*(parseInt(output2.innerHTML)+8), 0, width, 0, 181);  
    let v2 = p5.Vector.fromAngle(radians(degrees2), 150);
    let v2x = v2.x;
    let v2y = v2.y;
    line(0, 0, 150, 0);
    line(0, 0, v2x, v2y);
    pop();
  */
  }

  // TEST 4 | ANGULARIDADE 1 onda sinusoide
  if(findTest("test4Bol").active) {
    doubleTest = 1;

    /*push();
    translate(width/5, height/2);
    drawWavyLine(-200,0, 10 * output1.innerHTML, 35, 10);
    pop();

    push();
    translate(width/1.3, height/2);
    drawWavyLine(-150,0, 30, 35 * map(output2.innerHTML, -8, 8, 2, 6), 10);
    pop();*/

    push();
    translate(width/5, height/2);
    rectMode(CENTER);
    if(output1.innerHTML >= 0)
      square(0, 0, 200, map(output1.innerHTML, 0, 8, 0, 100));
    if(output1.innerHTML < 0)
      square(0, 0, 200, map(output1.innerHTML, -8, 0, 100, 0));
    pop();

    push();
    translate(width/1.3, height/2);
    rectMode(CENTER);
    if(output2.innerHTML >= 0)
      square(0, 0, 200, map(output2.innerHTML, 0, 8, 0, 100));
    if(output2.innerHTML < 0)
      square(0, 0, 200, map(output2.innerHTML, -8, 0, 100, 0));
    pop();
  
  }

  // TEST 5 | ANGULARIDADE 2 
  if(findTest("test5Bol").active) {
    
    push();
    translate(width/5.2, height/2); 
    fill(black);   
    if(output1.innerHTML <= 0) 
      star(0, 0, 60, map(output1.innerHTML, -8, 0, 1, 30), 20);
    if(output1.innerHTML > 0) 
      star(0, 0, 60, map(output1.innerHTML, 0, 8, 30, 1), 20);
    pop();

    push();
    translate(width/1.2, height/2);
    fill(black);   
    if(output2.innerHTML <= 0) 
      star(0, 0, 60, map(output2.innerHTML, -8, 0, 1, 30), 20);
    if(output2.innerHTML > 0) 
      star(0, 0, 60, map(output2.innerHTML, 0, 8, 30, 1), 20);
    pop(); 

  }

  // TEST 6 | ANGULARIDADE 3 spiky straigh wavy 
  if(findTest("test6Bol").active) {
    doubleTest = 1;
    val1 = 0;
    val2 = 10;

    push();
    translate(width/5, height/2);
    if(output1.innerHTML >= 0){
      val1 = 20;
      if(output1.innerHTML < 5)
        drawZigZagLine(-210, 0, 55, val1 * map(output1.innerHTML, 0, 5, 0, 6),8);
      else
        drawZigZagLine(-210, 0, 55, val1 * map(output1.innerHTML, 5, 8, 6, 0),8);
    }
    else{
      if(output1.innerHTML < -5)
        drawWavyLine(-210, 0, val2 * map(output1.innerHTML, -8, -5, 0, -6), 100, 4);  
      else
        drawWavyLine(-210, 0, val2 * map(output1.innerHTML, -5, 0, -6, 0), 100, 4);  
    }
    pop();

    push();
    translate(width/1.3, height/2);
    if(output2.innerHTML >= 0){
      val1 = 20;
      if(output2.innerHTML < 5)
        drawZigZagLine(-210, 0, 55, val1 * map(output2.innerHTML, 0, 5, 0, 6),8);
      else
        drawZigZagLine(-210, 0, 55, val1 * map(output2.innerHTML, 5, 8, 6, 0),8);
    }
    else{
      if(output2.innerHTML < -5)
        drawWavyLine(-210, 0, val2 * map(output2.innerHTML, -8, -5, 0, -6), 100, 4);  
      else
        drawWavyLine(-210, 0, val2 * map(output2.innerHTML, -5, 0, -6, 0), 100, 4);  
    }  
    pop();
  }
 
  // TEST 7 | IRREGULARIDADE 1 dot in rectangle
  if(findTest("test7Bol").active) {

    push();
    translate(width/5, height/2);
    strokeWeight(10);
    point(-100,20);
    point(-60,20);
    if(output1.innerHTML > 0 ){
      point(-20 + map(output1.innerHTML, 0, 8, 0, 10),20);
      point(20 - map(output1.innerHTML, 0, 8, 0, 10),20);
    }
    else {
      point(-20 + map(output1.innerHTML, -8, 0, 10, 0),20);
      point(20 - map(output1.innerHTML, -8, 0, 10, 0),20);
    }
    point(60,20);
    point(100,20);
    pop();

    push();
    translate(width/1.3, height/2);
    strokeWeight(10);
    point(-100,20);
    point(-60,20);
    if(output2.innerHTML > 0 ){
      point(-20 + map(output2.innerHTML, 0, 8, 0, 10),20);
      point(20 - map(output2.innerHTML, 0, 8, 0, 10),20);
    }
    else {
      point(-20 + map(output2.innerHTML, -8, 0, 10, 0),20);
      point(20 - map(output2.innerHTML, -8, 0, 10, 0),20);
    }
    point(60,20);
    point(100,20);
    pop();

    /*doubleTest = 1;

    push();
    translate(width/5, height/2);
    rectMode(CENTER);
    rect(0, 0, 400, 200);
    strokeWeight(10);
    point(15 * output1.innerHTML, 10 * output1.innerHTML);
    pop();

    
  }

  // TEST 8 | IRREGULARIDADE 2 weight and size
  if(findTest("test8Bol").active) {
    
    push();
    translate(width/5, height/2);
    noFill();
    let val;
    if(output1.innerHTML > 0)
      val = map(output1.innerHTML, 0, 8, 5, 10);  
    else
      val = map(output1.innerHTML, -8, 0, 10, 5);  
    for (let x = -10; x <= 45; x += val) 
      circle(0, 0, x*val);
    pop();

    push();
    translate(width/1.21, height/2);
    noFill();
    let val2 = map(output2.innerHTML, -8, 8, 5, 10);  
    for (let x = -10; x <= 45; x += val2) 
      circle(0, 0, x*val2); 
    pop();
    
    /*doubleTest = 1;

    push();
    translate(width/5, height/2);
    rectMode(CENTER);
    if(output1.innerHTML == 0) 
      square(0, 0, 100);
    else 
      square(0, 0, 100 + 10 * output1.innerHTML);
    pop();

    push();
    rectMode(CENTER);
    translate(width/1.2, height/2);
    strokeWeight(10 * map(output2.innerHTML, -8, 8, 0.1, 5));
    square(0, 0, 150);
    pop();*/
  }

  // TEST 9 | IRREGULARIDADE 3 gradient
  if(findTest("test9Bol").active) {
    doubleTest = 1;

    push();
    translate(width/5, height/2);
    drawWavyLine(-210, 40, 10, 100, 4);  
    drawWavyLine(-210, 20, 10, 100, 4);  
    drawWavyLine(-210, 0, 10, 100, 4); 
    if(output1.innerHTML < 0)
      drawWavyLine(-210, -20, map(output1.innerHTML, -8, 0, 20, 0), 100, 4);  
    else  
      drawWavyLine(-210, -20, map(output1.innerHTML, -8, 8, 0, 20), 100, 4);  
    drawWavyLine(-210, -40, 10, 100, 4);  
    pop();

    push();
    translate(width/1.2, height/2);
    drawWavyLine(-210, 40, 10, 100, 4);  
    drawWavyLine(-210, 20, 10, 100, 4);  
    drawWavyLine(-210, 0, 10, 100, 4); 
    if(output2.innerHTML < 0)
      drawWavyLine(-210, -20, map(output2.innerHTML, -8, 0, 20, 0), 100, 4);  
    else  
      drawWavyLine(-210, -20, map(output2.innerHTML, -8, 8, 0, 20), 100, 4);  
    drawWavyLine(-210, -40, 10, 100, 4);
    pop();

    /*push();
    translate(width/5, height/2);
    rectMode(CENTER);
    rect(0, 0, 308, 208);
    setGradient(-150, -100, 300, 200, black, white, X_AXIS, output1.innerHTML);
    pop();

    push();
    translate(width/1.2, height/2);
    rectMode(CENTER);
    rect(0, 0, 308, 208);
    setGradient(-150, -100, 300, 200, black, white, X_AXIS, output2.innerHTML);
    pop(); */
  }

  // TEST 10 | CONTRASTE 1
  if(findTest("test10Bol").active) {

    push();
    translate(width/5, height/2);
    rectMode(CENTER);
    rect(0, 0, 308, 208);
    setGradient(-150, -100, 300, 200, black, white, X_AXIS, output1.innerHTML);
    pop();

    push();
    translate(width/1.2, height/2);
    rectMode(CENTER);
    rect(0, 0, 308, 208);
    setGradient(-150, -100, 300, 200, black, white, X_AXIS, output2.innerHTML);
    pop();

    /*doubleTest = 1;

    push();
    translate(width/5, height/2);

    val = map(output1.innerHTML, -8, 8, 1, 50)

    for (let x = -120; x <= 120; x += val) 
      circle(x, x, x+val);

    pop();

    push();
    translate(width/1.55, height/2);

    val = map(output2.innerHTML, -8, 8, 1, 50)

    for (let x = 0; x <= 450; x += val) {
      if (x/val % 2 == 0) 
          line(x, -200, x + val, 250);
      else 
          line(x, 250, x + val, -200);
    }
    pop();*/
  }

  // TEST 11 | CONTRAST 2
  if(findTest("test11Bol").active) {

    colorMode(HSB, 100);

    push();
    rectMode(CENTER);
    translate(width/5, height/2);
    fill(hue(0,0,0), saturation(0,0,0), brightness(0,0,0),100);
    noStroke();
    square(0, 0, 300);
    let mappedInput;
    if(output1.innerHTML >= 0)
      mappedInput = map(output1.innerHTML, 0, 8, 1, 100);  
    else
      mappedInput = map(output1.innerHTML, -8, 0, 100, 1);  
    let c = color(0, 0, mappedInput);
    fill(hue(c), saturation(c), brightness(c), 100);
    square(0, 0, 150);
    pop();

    push();
    translate(width/1.2, height/2);
    rectMode(CENTER);
    fill(hue(0,0,0), saturation(0,0,0), brightness(0,0,0),100);
    noStroke()
    square(0, 0, 300);
    let mappedInput2 = map(output2.innerHTML, -8, 8, 0, 100);  
    let c2 = color(0, 0, mappedInput2);
    fill(hue(c2), saturation(c2), brightness(c2), 100);
    square(0, 0, 150);
    pop();

    /*doubleTest = 1;

    push();
    rectMode(CENTER);
    translate(width/5, height/2);
    rotate(frameCount/100.0 * map(output1.innerHTML, -8, 8, 0.1, 20));
    square(0, 0, 100);
    pop();

    push();
    translate(width/1.55, height/2);
    pop();*/
  }

  // TEST 12 | CONTRAST 3
  if(findTest("test12Bol").active) {
    colorMode(HSB, 100); // put this at the start, change all colors to hsb 

    push();
    translate(width/5, height/2);
    rectMode(CENTER);   
    noStroke();
    let mappedInput = map(output1.innerHTML, -8, 8, 0, 100);  
    let c = color(100, 100, mappedInput);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 200);
    pop();

    push();
    translate(width/1.25, height/2);
    rectMode(CENTER);   
    noStroke();
    let mappedInput2 = map(output2.innerHTML, -8, 8, 0, 100);  
    let c2 = color(60, 60, mappedInput2);
    fill(hue(c2), saturation(c2), brightness(c2), 100);
    circle(0, 0, 200);
    pop();
  }

  // TEST 13 | SIZE
  if(findTest("test13Bol").active) {

    push();
    rectMode(CENTER);
    translate(width/5, height/2);
    strokeWeight(10 * map(output1.innerHTML, -8, 8, 0.1, 5));
    square(0, 0, 150);
    pop();

    push();
    rectMode(CENTER);
    translate(width/1.2, height/2);
    strokeWeight(10 * map(output2.innerHTML, -8, 8, 0.1, 5));
    square(0, 0, 150);
    pop();

    
    /* POS REL 
    push();
    translate(width/5, height/2);
    rectMode(CENTER);
    rect(0, 0, 400, 200);
    strokeWeight(10);
    point(15 * output2.innerHTML, 10 * output2.innerHTML);
    pop();

    push();
    translate(width/1.21, height/2);
    rectMode(CENTER);
    rect(0, 0, 400, 200);
    strokeWeight(10);
    point(15 * output2.innerHTML, 10 * output2.innerHTML);
    pop(); */
    
    /*
    colorMode(HSB, 100); // put this at the start, change all colors to hsb 

    push();
    translate(width/5, height/2);
    rectMode(CENTER);   
    noStroke();
    let mappedInput = map(output1.innerHTML, -8, 8, 0, 100);  
    let c = color(100, mappedInput, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 200);
    pop();

    push();
    translate(width/1.25, height/2);
    rectMode(CENTER);   
    noStroke();
    let mappedInput2 = map(output2.innerHTML, -8, 8, 0, 100);  
    let c2 = color(60, mappedInput2, 100);
    fill(hue(c2), saturation(c2), brightness(c2), 100);
    circle(0, 0, 200);
    pop();
    */
  }

  // TEST 14 |brightness and transparency for grayscale
  if(findTest("test14Bol").active) {
    colorMode(HSB, 100); // put this at the start, change all colors to hsb 

    push();
    translate(width/5, height/2);
    rectMode(CENTER);   
    noStroke();
    let mappedInput = map(output1.innerHTML, -8, 8, 0, 100);  
    let c = color(0, 0, mappedInput);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 200);
    pop();

    push();
    translate(width/1.24, height/2);
    noStroke();
    let mappedInput2 = map(output2.innerHTML, -8, 8, 1, 100);  
    fill(hue(black), saturation(black), brightness(black), 50);
    circle(-80, 0, 200); 
    fill(hue(black), saturation(black), brightness(black), mappedInput2);
    circle(80, 0, 200); 
    pop();
  }


  // TEST 15 | 2 waves
  if(findTest("test15Bol").active) {

    doubleTest = 1;
    val1 = 20;
    val2 = 10;

    push();
    translate(width/5, height/2);
    drawWavyLine(-210,0, val1 * output1.innerHTML, 100, 4);  
    drawWavyLine(-210,0, val2 * output1.innerHTML, 100, 4);  
    pop();

    push();
    translate(width/1.2, height/2);
    drawWavyLine(-210,0, val1 * output2.innerHTML, 100, 4);  
    drawWavyLine(-210,val2, val1 * output2.innerHTML, 100, 4); 
    pop();
    
    /*hue between high/low arousal colors
    colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output1.innerHTML, -8, 8, 0, 70); // to go from red to blue 
    let c = color(mappedInput, 100, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 300);*/
  }

  // TEST 16 |color area
  if(findTest("test16Bol").active) {
    doubleTest = 1;

    push();
    translate(width/5, height/2);
    noFill();
    let val = map(output1.innerHTML, -8, 8, 5, 10);  
    for (let x = -10; x <= 45; x += val) 
      circle(0, 0, x*val);
    pop();

    push();
    translate(width/1.21, height/2);
    noFill();
    let val2 = map(output2.innerHTML, -8, 8, 5, 10);  
    for (let x = -10; x <= 45; x += val2) 
      circle(0, 0, x*val2); 
    pop();
    /*colorMode(HSB, 100);
    rectMode(CENTER);   
    let mappedInput = map(output1.innerHTML, -8, 8, 1, 10);  
    let c = color(100, 100, 100);
    fill(hue(c), saturation(c), brightness(c), 100);
    circle(0, 0, 40 * mappedInput);*/
  }

  // TEST 17 |complementary color
  if(findTest("test17Bol").active) {
    doubleTest = 1;

    push();
    translate(width/5, height/2);
    strokeWeight(5);

    pop();
    /*colorMode(HSB, 360, 100, 100);
    rectMode(CENTER);
    let mappedInput = map(output1.innerHTML, -8, 8, 1, 360);  
    let c = color(80, 100, 100);
    fill(c);
    square(0, 0, 300);
    fill((hue(c) + 180) % mappedInput, saturation(c), brightness(c), 100);
    square(0, 0, 150);*/
  }

  // TEST 18 |transparency
  if(findTest("test18Bol").active) {
    /*let mappedInput = map(output1.innerHTML, -8, 8, 1, 100);  
    fill(hue(black), saturation(black), brightness(black), 50);
    circle(-80, 0, 250); 
    fill(hue(black), saturation(black), brightness(black), mappedInput);
    circle(80, 0, 250);*/
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
  clearInputs(1,1);
  setSliderValue(randomIntFromInterval(-8,8),1);
  setSliderValue(randomIntFromInterval(-8,8),2);
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

function setSliderValue(val, slider) {
  let range = "myRange" + slider;
  document.getElementById(range).value = val;
  if(slider==1)
    output1.innerHTML = val;
  else
    output2.innerHTML = val;
}

function drawZigZagLine(x, y, w, h, max) {
  beginShape();

  var showBoxes = 0;

  for(var i = 0; i < max; i++) {
    if(showBoxes) 
      rect(x+i*w,y,w,h);
    if(i%2==0) 
      line(x+i*w,y,x+(i+1)*w,y+h);
    else 
      line(x+i*w,y+h,x+(i+1)*w,y);
  }

  endShape();
}

function drawWavyLine(x, y, amp, w, max) {
  beginShape();

  var waves = max;
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
  clearInputs(1,0);
  lastCheckedGrid1Cell = cellNr;
  document.getElementById(cellNr).value = "X";
}

function checkGrid2(cellNr) {
  clearInputs(0,1);
  lastCheckedGrid2Cell = cellNr;
  document.getElementById("2_"+cellNr).value = "X";
}

function clearInputs(test1, test2){
  if(test1){
    for(let i = 1; i < 37; i++){
      document.getElementById(i.toString()).value = null;
    }
  }
  if(test2){
    for(let i = 1; i < 37; i++){
      document.getElementById("2_" + i.toString()).value = null;
    }
  }
  if(test1 && test2){
    document.getElementById("tensionNumber").value = null;
    document.getElementById("tensionNumber2").value = null;
  }
}

function Test(name){
  this.active = 0;
  this.name = name;
  this.scroll = null;
  this.tension = null;
  this.grid = null;
  this.scroll2 = null;
  this.tension2 = null;
  this.grid2 = null;
}

function findTest(name){
  for(let i = 0; i < 20; i++){
    if(tests[i].name == name)
      return tests[i];
  }
}

function saveTestChoices(testName){
  findTest(testName).scroll = output1.innerHTML;
  findTest(testName).tension = document.getElementById("tensionNumber").value;
  findTest(testName).grid = lastCheckedGrid1Cell;
  if(doubleTest){
    findTest(testName).scroll2 = output2.innerHTML;
    findTest(testName).tension2 = document.getElementById("tensionNumber2").value;
    findTest(testName).grid2 = lastCheckedGrid2Cell;
  }
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
    testResults += "<b>TEST " + j + "</b> | <b>LEFT: scroll:</b> " + tests[i].scroll +
     " <b>tension:</b> " + tests[i].tension + " <b>grid:</b> " + tests[i].grid + 
     "</b> | <b>RIGHT: scroll:</b> " + tests[i].scroll2 +
     " <b>tension:</b> " + tests[i].tension2 + " <b>grid:</b> " + tests[i].grid2 + "\n<br>";
  }
  console.log(testResults);
  //sendEmail(testResults, datetime);
  window.location="mailto:andreianmatos@tecnico.ulisboa.pt?subject=Results"+datetime+"&body="+testResults;
  window.localStorage.setItem('testResults', testResults);
  //console.log(document.getElementById("results").innerHTML);
  //document.getElementById("results").innerHTML = testResults;
}

// EMAIL TOO LONG??? CHECK

function sendEmail(results, date) { 
  window.location="mailto:andreianmatos@tecnico.ulisboa.pt?subject=Result"+date+"&body="+results;
}
function submit(){
  saveTestChoices(currentTestBol);
  printTests();
  //window.location.href="results.html";
}

function checkDoubleTest(){

}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}