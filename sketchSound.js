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

var playingLeft = 0, playingRight = 0;
var w, osc;

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

  //sound prep
  osc = new p5.Oscillator();

  noise = new p5.Noise();
  filter = new p5.BandPass();
  noise.disconnect();
  noise.connect(filter);

}

function draw() {

  background(white);
  
  // update the current slider 1 and 2 value
  slider1.oninput = function() {
    output1.innerHTML = this.value;
  }
  slider2.oninput = function() {
    output2.innerHTML = this.value;
  }

  if(!playingLeft && !playingRight){
    osc.amp(0);
    noise.amp(0);
  }
 
  // TEST 1 | AMPLITUDE 1
  if(findTest("test1Bol").active) {
    osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
    if(playingLeft){
      osc.start();
      osc.freq(500, 0.1);
      if(output1.innerHTML > 0)
        osc.amp(map(output1.innerHTML, 0, 8, 0, 1));
      else
        osc.amp(map(output1.innerHTML, -8, 0, 1, 0));
    }
    if(playingRight){
      osc.start();
      osc.freq(500, 0.1);
      osc.amp(map(output2.innerHTML, -8, 8, 0, 1));
    }
  }

  // TEST 2 |  AMPLITUDE 2
  if(findTest("test2Bol").active) {
    osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
    osc.start();
    osc.freq(1000);
    if(playingLeft){
      if(output1.innerHTML > 0)
        osc.amp(map(output1.innerHTML, 0, 8, 0, 1));
      else
        osc.amp(map(output1.innerHTML, -8, 0, 1, 0));    
    }
    if(playingRight){
      if(output2.innerHTML > 0)
        osc.amp(map(output2.innerHTML, 0, 8, 0, 1));
      else
        osc.amp(map(output2.innerHTML, -8, 0, 1, 0));    
    }
  }

  // TEST 3 |  AMPLITUDE 3
  if(findTest("test3Bol").active) {
    if(playingLeft){
      osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
      osc.start();
      osc.freq(1500);
      osc.amp(constrain(map(output1.innerHTML, -8, 8, 0, 1), 0, 1));
    }
    if(playingRight){
      osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
      osc.start();
      osc.freq(1500);
      osc.amp(map(output2.innerHTML, -8, 8, -1, 1));
    }
  }

  // TEST 4 | FILTER
  if(findTest("test4Bol").active) {
    if(playingLeft){
      //noise.connect(filter);
      noise.start();
      slider1.oninput = function() {
        noise.amp(1, 0.2);
        output1.innerHTML = this.value;
        // BandPass frequency based on slider
        var freq;
        if(output1.innerHTML < 0)
          freq = map(output1.innerHTML, -8, 0, 10000, 20);
        else
          freq = map(output1.innerHTML, 0, 8, 20, 10000);
        freq = constrain(freq, 20, 22050);
        filter.freq(freq);
        // give the filter a narrow band (lower res = wider bandpass)
        filter.res(150);
      }
    }
    if(playingRight){
      //noise.connect(filter);
      noise.start();
      slider1.oninput = function() {
        noise.amp(1, 0.2);
        output1.innerHTML = this.value;
        // BandPass frequency based on slider
        let freq = map(output2.innerHTML, -8, 8, 20, 10000);
        freq = constrain(freq, 0, 22050);
        filter.freq(freq);
        // give the filter a narrow band (lower res = wider bandpass)
        filter.res(150);
      }
    }
  }

  // TEST 5 | PAN LEFT AND RIGHT
  if(findTest("test5Bol").active) {
    osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
    if(playingLeft){
      osc.start();
      osc.freq(500);
      osc.amp(100);
      if(output1.innerHTML <= -4)
        osc.pan(map(output1.innerHTML, -8, -4, 0, -1));
      else if(output1.innerHTML <= 0)
        osc.pan(map(output1.innerHTML, -4, 0, -1, 0)); 
      else if(output1.innerHTML <= 4)
        osc.pan(map(output1.innerHTML, 0, 4, 0, 1));
      else if(output1.innerHTML <= 8)
        osc.pan(map(output1.innerHTML, 4, 8, 1, 0)); 
    }
    if(playingRight){
      osc.start();
      osc.freq(500);
      osc.amp(100);
      if(output2.innerHTML <= -4)
        osc.pan(map(output2.innerHTML, -8, -4, 0, -1));
      else if(output2.innerHTML <= 0)
        osc.pan(map(output1.innerHTML, -4, 0, -1, 0)); 
      else if(output2.innerHTML <= 4)
        osc.pan(map(output2.innerHTML, 0, 4, 0, 1));
      else if(output2.innerHTML <= 8)
        osc.pan(map(output2.innerHTML, 4, 8, 1, 0)); 
    }
  }

  // TEST 6 | ATTACK AND DECAY TIME
  if(findTest("test6Bol").active) {
      osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
    if(playingLeft){
      // attack time in seconds, attack level 0.0 to 1.0, same for decay
      slider1.oninput = function() {
        output1.innerHTML = this.value;
        env = new p5.Envelope(map(output1.innerHTML, -8, 8, 0, 4), 0.5, map(output1.innerHTML, -8, 8, 0, 4), 0.5);
        osc.start();
        osc.freq(500);
        osc.amp(0);
        env.play(osc);
      }
    }
    if(playingRight){
      // attack time in seconds, attack level 0.0 to 1.0, same for decay
      slider1.oninput = function() {
        output2.innerHTML = this.value;
        env = new p5.Envelope(map(output2.innerHTML, -8, 8, 0, 4), 0.5, map(output2.innerHTML, -8, 8, 0, 4), 0.5);
        osc.start();
        osc.freq(500);
        osc.amp(0);
        env.play(osc);
      }
    }
  }
 
  // TEST 7 |  WAVEFORMS
  if(findTest("test7Bol").active) {
    if(playingLeft){
      osc.start();
      osc.freq(300);
      osc.amp(0.1, 0.1);
      if(playingLeft){
        if(output1.innerHTML < -4)
          osc.setType('sine');
        else if(output1.innerHTML < 0)
          osc.setType('triangle');
        else if(output1.innerHTML < 4)
          osc.setType('square');
        else
          osc.setType('sawtooth');
      }
      if(playingRight){
        if(output2.innerHTML < -4)
          osc.setType('sine');
        else if(output2.innerHTML < 0)
          osc.setType('triangle');
        else if(output2.innerHTML < 4)
          osc.setType('square');
        else
          osc.setType('sawtooth');   
      }
    }
  }

  // TEST 8 | NOISE TYPE
  if(findTest("test8Bol").active) {
    filter.freq(15000);
    if(playingLeft){
      noise.start();
      noise.amp(1, 0.2);
      if(output1.innerHTML < -5 || output1.innerHTML > 5)
        noise.setType('white');
      else if(output1.innerHTML < -2 || output1.innerHTML > 2 )
        noise.setType('pink');
      else
        noise.setType('brown');
    }
    if(playingRight){
      noise.start();
      noise.amp(1, 0.2);
      if(output2.innerHTML < -1)
        noise.setType('white');
      else if(output2.innerHTML < 5)
        noise.setType('pink');
      else
        noise.setType('brown');
    }
  }

  // TEST 9 |dot sequence
  if(findTest("test9Bol").active) {
    
  }

  // TEST 10 | densidade?
  if(findTest("test10Bol").active) {

  }

  // TEST 11 | speed
  if(findTest("test11Bol").active) {
    
  }

  // TEST 12 |brightness
  if(findTest("test12Bol").active) {
    
  }

  // TEST 13 |saturation
  if(findTest("test13Bol").active) {
    
  }

  // TEST 14 |brightness and transparency for grayscale
  if(findTest("test14Bol").active) {
    
  }


  // TEST 15 | 2 oscs
  if(findTest("test15Bol").active) {

  }

  // TEST 16 |color area
  if(findTest("test16Bol").active) {
    
  }

  // TEST 17 |complementary color
  if(findTest("test17Bol").active) {
   
  }

  // TEST 18 |transparency
  if(findTest("test18Bol").active) {
  
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
  if(playingRight)
    playRight();
  if(playingLeft)
    playLeft();
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

  var oscs = max;
  var offSet = 0;
  var connect = 1;

  for(var i = 0; i < oscs; i++) { 
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

function mousePressed() {

}

function playLeft() {
  playingLeft = !playingLeft;
  
  let buttonContent = document.getElementById("playL").innerHTML;
  if(buttonContent=="PLAY")
    document.getElementById("playL").innerHTML = "STOP";
  else 
    document.getElementById("playL").innerHTML = "PLAY";
}

function playRight() {
  playingRight = !playingRight;
  
  let buttonContent = document.getElementById("playR").innerHTML;
  if(buttonContent=="PLAY")
    document.getElementById("playR").innerHTML = "STOP";
  else 
    document.getElementById("playR").innerHTML = "PLAY";
}