let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let lastCheckedGridCell;

let testNumber = 1;
let chosen;

let doneFullTests = 0;

var w, osc, env;

let pg;

let slider = 0, sliderDouble = 0, radioButtons = 0;
var radiosLeft_value, radiosRight_value;

let fullTestSound = 0, fullTestVisuals = 0;
let currentTestBol, doubleTest, imageTest, soundTest;
let tests = [], undoneTests = [1,2,3,4,5,6,7,8,9,10,11,12];
let end = 0;
let freq;

let downloaded = 0;

let hoverShow = 0, trigger = false;

let recorder, soundFile;

//C3 C4 C5 o C2(36) é um pouco baixo (?) 
var midiNotesConsidered = Array(48, 60, 72);
var seconds; // between notes, before the setinterval: worked: frameCount % 100 == 0

function setup() {

  var canvas = createCanvas(0.35*windowWidth, 0.48*windowHeight);

  // define colors
  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

  //tension sliders for left and right
 
  sliderTension = document.getElementById("myRangeTensionLeft");
  outputSliderTension = document.getElementById("tensionValueLeft");

  outputSliderTension.innerHTML = sliderTension.value;

  showTestButton =  document.getElementById("showTest");

  showTestButton.onmouseover = function(){
    osc.start(0.1);
    hoverShow = true; 
    trigger = true;
    showTestButton.innerHTML = '<span style="font-size: 1vw;">Unhover to</span><br>&nbsp;&nbsp;HIDE&nbsp;&nbsp;';
  };

  showTestButton.onmouseout = function(){
    downloaded = 1;
    //env.triggerRelease(osc); 
        hoverShow = false; 
        //showTestButton.disabled = false;
        showTestButton.innerHTML = '<span style="font-size: 1vw;">Hover to</span><br>SHOW';
      //showTestButton.disabled = true;
  };
  
  for(let i=1; i < 13; i++)
    tests.push(new Test('test' + i + 'Bol'));

  // first test is always an image test now, to avoid issues
  // because the hover doesn't require any clicking, which doesn't let the audio context begin for the webpage automatically
  var randtestNr = randomIntFromInterval(1,12); 
  currentTestBol = 'test' + randtestNr + 'Bol';
  findTest(currentTestBol).active = 1;
  currentTest(currentTestBol);
  undoneTests = undoneTests.filter(item => item !== randtestNr);

  //sound prep
  osc = new p5.Oscillator();
  env = new p5.Envelope();

  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(osc);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();

  seconds = 0;
  //increment the seconds
  setInterval(incrementSeconds, 1000);

}

function draw() {

  background(white); 

  window.onkeydown= function(gfg){
    if(gfg.keyCode === 32){
      console.log("spaceBar");
      recorder.stop();
      soundFile.play();
      saveSound(soundFile, '/UsersFiguresSounds/sounds/user1LeastTense.wav'); // save file
    };
};

  angularityValue = map(1.25, 0, 10, 0, 8);
  orientationValue = map(7.5, 0, 10, 0, 8);
  irregularityValue = map(1.25, 0, 10, 0, 8);
  thicknessValue = map(7.5, 0, 10, 0, 8);
  simmetryValue = map(8.75, 0, 10, 0, 8);

  /*angularityValue = map(8.75, 0, 10, 0, 8);
  orientationValue = map(1.25, 0, 10, 0, 8);
  irregularityValue = map(7.5, 0, 10, 0, 8);
  thicknessValue = map(1.25, 0, 10, 0, 8);
  simmetryValue = map(8.75, 0, 10, 0, 8);*/
  //SOUND
  amplitudeValue = Math.abs(map(1.25, 0, 10, 0, 8));
  waveformValue = "1.1";  
  releaseTimeValue = Math.abs(map(8.75, 0, 10, 0, 8));
  frequencyValue = Math.abs(map(4.25, 0, 10, 0, 8));
  attackTimeValue = Math.abs(map(0.1, 0, 10, 0, 8));

  if(hoverShow){

    //attackLevel = 0.5; // so that there's a difference from the amplitude test's max (1.0)
    releaseLevel = 0.0; // to make the note end all the way to silence (0)
    decayLevel = 0.5 // decay level 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    susPercent = 0.5;
    //attackTime = 1.5; // half of max value 3 when changed
    //releaseTime = 1.5; // half of max value 3 when changed
    decayTime = 0.5;

    angleMode(DEGREES);

    randomSeed(99);

    push();
    noFill();
    translate(width/2, height/2);

    angleMode(DEGREES);

    //IRREGULARITY
    //randomSeed(99);
    if(irregularityValue < 0) {
      irregularList = [4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4,
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4,
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4,
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14), 4, 
        map(irregularityValue, -8, 0, 14 + random(14,-15*irregularityValue), 14)];
    }
    if(irregularityValue > 0) {
      irregularList = [4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4,
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4,
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4,
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4,
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue)), 4, 
        map(irregularityValue, 0, 8, 14, 14 + random(15,15*irregularityValue))]; 
    }
    if(abs(irregularityValue) > 3) {
      setLineDash(irregularList); 
    }
    else{
      setLineDash([]);  
    }

    // THICKNESS
    if(thicknessValue > 0)
      sw = int(map(thicknessValue, 0, 8, 1, 25));
    if(thicknessValue <= 0)
      sw = int(map(thicknessValue, -8, 0, 25, 1));
    strokeWeight(sw);

    // ORIENTATION
    rectMode(CENTER);
    angleMode(RADIANS);
    let angle2 = map(orientationValue, 0, 8, 0, 180);
    if(orientationValue > 0)
      rotate(PI / 180 * angle2);
    if(orientationValue <= 0)
      rotate(PI / 180 * angle2);

    console.log("ang:" + angularityValue)

    // ANGULARITY + SYMMETRY
    if(angularityValue < 0) {
      if(simmetryValue < 0) {
        square(0, 0, 200, map(angularityValue, -8, 0, 0, 100), map(angularityValue, -8, 0, 0, 100) * map(simmetryValue, -8, 0, 0, 1), map(angularityValue, -8, 0, 0, 100)* map(simmetryValue, -8, 0, 0, 1), map(angularityValue, -8, 0, 0, 100));
      }
      if(simmetryValue >= 0) {
        square(0, 0, 200, map(angularityValue, -8, 0, 0, 100), map(angularityValue, -8, 0, 0, 100) * map(simmetryValue, 0, 8, 1, 0), map(angularityValue, -8, 0, 0, 100)* map(simmetryValue, 0, 8, 1, 0), map(angularityValue, -8, 0, 0, 100));
      }
    }
    if(angularityValue >= 0) {
      console.log("symmetry:" + simmetryValue)
      if(simmetryValue < 0) {
        square(0, 0, 200, map(angularityValue, 0, 8, 100, 0), map(angularityValue, 0, 8, 100, 0) * map(simmetryValue, -8, 0, 0, 1), map(angularityValue, 0, 8, 100, 0) * map(simmetryValue, -8, 0, 0, 1), map(angularityValue, 0, 8, 100, 0));
      }
      if(simmetryValue >= 0) {
        square(0, 0, 200, map(angularityValue, 0, 8, 100, 0), map(angularityValue, 0, 8, 100, 0) * map(simmetryValue, 0, 8, 1, 0), map(angularityValue, 0, 8, 100, 0) * map(simmetryValue, 0, 8, 1, 0), map(angularityValue, 0, 8, 100, 0));
      }
    }

    if(!downloaded)
      //saveCanvas('canvas', 'png')


    //S O U N D

    if(amplitudeValue > 0)
      attackLevel = map(amplitudeValue, 0, 8, 0.1, 1);
    else
      attackLevel = map(amplitudeValue, -8, 0, 1, 0.1);
      
    if(attackTimeValue > 0)
      attackTime = map(attackTimeValue, 0, 8, 0.0, 3.0);
    else
      attackTime = map(attackTimeValue, -8, 0, 3.0, 0.0);

    if(releaseTimeValue > 0)
      releaseTime = map(releaseTimeValue, 0, 8, 0.0, 3.0);
    else
      releaseTime = map(releaseTimeValue, -8, 0, 3.0, 0.0);

    freq = getNote(frequencyValue);

    // WAVEFORM
    if(waveformValue == "1.1")
      osc.setType('sine');
    else if(waveformValue == "1.2")
      osc.setType('triangle');
    else if(waveformValue == "1.3")
      osc.setType('square');
    else if(waveformValue == "1.4")
      osc.setType('sawtooth') ;
    
    osc.amp(env);

    osc.freq(freq);
    env.setRange(attackLevel, releaseLevel);
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);

    if(trigger){
      recorder.record(soundFile);
      env.play(osc,0,1);
      trigger = false;
    }   
    
    pop();

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


function setSliderValue(val, slider) {

  if(slider == "1") 
    currentValueSlider1 = val;
  else if(slider == "3") 
    currentValueSlider3 = val;
  else if(slider == "5")
    currentValueSlider5 = val;
  else if(slider == "7")
    currentValueSlider7 = val;
  else if(slider == "9")
    currentValueSlider9 = val;
    
  else if(slider == "2") 
  angularityValue = val;
  else if(slider == "4") 
    orientationValue = val; 
  else if(slider == "6")
    irregularityValue = val;
  else if(slider == "8")
    thicknessValue = val;
  else if(slider == "10")
    simmetryValue = val;
}

function getNote(sliderValue){
  /*var note =  midiNotesConsidered[0];
  midiNotesConsidered.shift();
  //return midiNotesConsidered[Math.floor(Math.random() * midiNotesConsidered.length)];
  if(midiNotesConsidered.length==1)
    midiNotesConsidered.push(48, 60, 72)
  return note;*/
  //C8 - C1 (piano keys Cs) 
  var note;
  var sliderValue = map(sliderValue, -8, 8, -7, 7);

  if(Math.abs(sliderValue) == 0) // c1
    note = midiToFreq(24);
  else if(Math.abs(sliderValue) < 1) // c2
    note = midiToFreq(36);
  else if(Math.abs(sliderValue) < 2) // c3
    note = midiToFreq(48);
  else if(Math.abs(sliderValue) < 4) //middle C used normally
    note = midiToFreq(60);
  else if(Math.abs(sliderValue) < 5) //c5
    note = midiToFreq(72);
  else if(Math.abs(sliderValue) < 6 ) //c6
    note = midiToFreq(84);
  else if(Math.abs(sliderValue) < 7) //c7
    note = midiToFreq(96);
  else if(Math.abs(sliderValue) == 7) //c8
    note =  midiToFreq(108); 
  
    console.log(Math.abs(sliderValue) + "n:" + freqToMidi(note))


  return note;
}

function incrementSeconds() {
  seconds += 1;
}

function setSeconds(){
  seconds = 1; 
}


function star(x, y, radius1, radius2, npoints, symmetry) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 3.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    if(symmetry != 0)
      if(a  > PI )
        radius1 += symmetry; 
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
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


function setLineDash(list) {
  drawingContext.setLineDash(list);
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
  clearGrid();
  lastCheckedGridCell = cellNr;
  document.getElementById(cellNr).value = "X";
}

function clearGrid(){
  for(let i = 1; i < 26; i++){
    document.getElementById(i.toString()).value = null;
  } 
}

function Test(name){
  this.active = 0;
  this.name = name;

  this.tension = null;
  this.grid = null;
}

function findTest(name){
  for(let i = 0; i < 12; i++){
    if(tests[i].name == name)
      return tests[i];
  }
}

function saveTestChoices(testName){
  findTest(testName).tension = outputSliderTension.innerHTML;
  findTest(testName).grid = lastCheckedGridCell;
}

//TO DO save to document
function sendTestResults(){
  testResults = window.localStorage.getItem('testResultsPartTwo')+ "\n";
  //testResults += "<p><b>" + datetime +"</b></p>" + "\n";
  for(let i = 0; i < 12; i++){
    let j = i+1;
    testResults += "TEST" + j + "," +  tests[i].tension + "," + tests[i].grid + "\n";
  }
  //console.log(testResults);
  
  window.localStorage.setItem('testResultsPartTwo', testResults);
  
  //IN RESULTS PAGE
  //js_send(datetime, testResults);
  //js_send2(datetime, testResults);
 window.location.href="resultsPartTwo.html";

}

function sendEmail(results, date) { 
  window.location="mailto:andreianmatos@tecnico.ulisboa.pt?subject=Result"+date+"&body="+results;
}
function submit(){
  saveTestChoices(currentTestBol);
  sendTestResults();
}

function beginTests(){
  document.getElementById("startPopUp").style.display = 'none';
}


function chooseNextTest(){

  chosen = 0;

  // save test choices
  saveTestChoices(currentTestBol);
  //console.log("SAVED FOR TEST" + currentTestBol + " and slider left is " + currentValueSlider1 + " and slider right is " + angularityValue);


  while(!chosen){
    newTestNr = randomIntFromInterval(1,12);
    if(undoneTests.length == 2){
      newTestNr = undoneTests[0];
    }
    newTestBol = 'test' + newTestNr + 'Bol';
    if(undoneTests.length == 1){
      document.getElementById("testNext").style.display = 'none';
      //document.getElementById("updateAnswers").style.display = 'block';
      document.getElementById("lastTest").style.display = 'block';
      //document.getElementById("lastTest2").style.display = 'block';
      document.getElementById("submit").disabled = false;
      enableTests();
      newTestNr = undoneTests[0];
      newTestBol = 'test' + newTestNr + 'Bol';
      end = 1;
      chosen = 1;
    }
    else if(undoneTests.includes(newTestNr)){
      chosen = 1;
    }
  }
 
  // delete the new current test of the undone tests list
  undoneTests = undoneTests.filter(item => item !== newTestNr);
  //console.log(undoneTests);
  next(newTestBol);
}

function next(newTestBol) {

  
  findTest(newTestBol).active = 1;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  //at the end people are reviewing their answers
  if(!end ||(end && chosen)){
    if(end && chosen)
      chosen = 0;
    // clear inputs grid
    clearGrid(1,1);
    //clearTension values
    outputSliderTension.innerHTML = 1;
    sliderTension.value = 1;
  }
  // move on to next test
  currentTest(newTestBol); 
}

function currentTest(newTestBol) {
  if(currentTestBol != null) {
    document.getElementById(currentTestBol).style.background = "#f0d696";
    document.getElementById(currentTestBol).style.color = "#000";
    //document.getElementById(currentTestBol).disabled = false;
  }
  currentTestBol = newTestBol;
  document.getElementById(currentTestBol).style.background = "#000";
  document.getElementById(currentTestBol).style.color = "#fff";
}

function enableTests(){
  for(let i=1; i < 12; i++){
    document.getElementById('test'+i+'Bol').disabled = false;
  }
}

function updateAnswers(){
  saveTestChoices(currentTestBol);
}

function definitionOpen(){
  let def = document.getElementById("definitions");
  if(def.style.background === "rgb(17, 17, 17)"){
    def.style.background = '#d3d3d3';
    def.style.color = black;
  }
  else{
    def.style.background = "rgb(17, 17, 17)";
    def.style.color = white;
  }
}
