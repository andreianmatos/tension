let black, gray, white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let lastCheckedGridCell;

let adjustTime = 1;


let testNumber = 1;
let chosen;

let doneFullTests = 0;

var w, osc, env;

let nextOrientation = 0;

let freq;

var seconds; 

let hoverShow = 0, trigger = false;

let xOffset = 0;
// time delay vars
// current time "snapshot" (imagine pressing the lap time button)
let time;
// the interval to wait between time "snapshots": 2s (2000 milliseconds) in this case
let wait = 2000;

//C3 C4 C5 o C2(36) é um pouco baixo (?) 
var midiNotesConsidered = Array(48, 60, 72);
var seconds; // between notes, before the setinterval: worked: frameCount % 100 == 0

let thicknessValueInput, thicknessCurrentGoal, angularityCurrentGoal, angularityValueInput, symmetryValueInput, symmetryCurrentGoal ;

function setup() {

  var canvas = createCanvas(0.85*windowWidth, 0.50*windowHeight);


  // define colors
  black = color('rgb(17, 17, 17)');
  gray = color('rgb(128, 128, 128)');
  white = color('rgb(245, 245, 245)');
 
  sliderTension = document.getElementById("sliderTension");
  sliderTensionSound = document.getElementById("sliderTensionSound");
  //soundButtonFinal = document.getElementById("soundButtonFinal");

  //sound prep
  osc = new p5.Oscillator();
  env = new p5.Envelope();

  time = millis();

  thicknessCurrentGoal = parseFloat(randomGaussianPositive(5, 1).toFixed(1));
  thicknessValueInput =  parseFloat(randomGaussianPositive(5, 1).toFixed(1));
  
  angularityCurrentGoal = parseFloat(randomGaussianPositive(5, 1).toFixed(1));
  angularityValueInput =  parseFloat(randomGaussianPositive(5, 1).toFixed(1));

  symmetryCurrentGoal = parseFloat(randomGaussianPositive(5, 1).toFixed(1));
  symmetryValueInput =  parseFloat(randomGaussianPositive(5, 1).toFixed(1));

  irregularityCurrentGoal = parseFloat(randomGaussianPositive(5, 1).toFixed(1));
  irregularityValueInput =  parseFloat(randomGaussianPositive(5, 1).toFixed(1));

  orientationCurrentGoal = parseFloat(randomGaussianPositive(5, 1).toFixed(1));
  orientationValueInput =  parseFloat(randomGaussianPositive(5, 1).toFixed(1));

  attackCurrentGoal = parseFloat(randomGaussianPositiveSound(1, 1).toFixed(1));
  attackValueInput =  parseFloat(randomGaussianPositiveSound(1, 1).toFixed(1));
  
  releaseCurrentGoal = parseFloat(randomGaussianPositiveSound(1, 1).toFixed(1));
  releaseValueInput =  parseFloat(randomGaussianPositiveSound(1, 1).toFixed(1));

  amplitudeCurrentGoal = parseFloat(randomGaussianPositiveSound(1, 1).toFixed(1));
  amplitudeValueInput =  parseFloat(randomGaussianPositiveSound(1, 1).toFixed(1));

  seconds = 7;
  //increment the seconds
  setInterval(incrementSeconds, 1000);

  frameRate(20);
  //stroke(gray);
}

function draw() {

  background(white); 

  if(!adjustTime){
    setTimeout(function(){
      //stroke(gray);
      adjustTime = 1;
    }, 4000); 
  }   

  
  window.onkeydown= function(gfg){
    if(gfg.keyCode === 32){
      saveCanvas('canvas', 'png')
    };
  };
 
  /*setTimeout(function(){
    frameRate(0);
    nextOrientation = 1;
    console.log("stopped");
    setTimeout(function(){
      //stroke(gray);
      frameRate(30);
    }, 2000);
  }, 3000);*/

  /* in between always stop the oscillator
  if(!hoverLeft && !hoverRight){
    osc.stop(0.1);
  }*/

  // para o som não é um botão de hover porque a pessoa não controla o attack / release
  // meter barra least / most para o som também e só tipo o quadrado vermelho quando está fora do meio

  if(sliderTension.value == 1){ // least tense
    document.getElementById("imageText").style.display = "none";
    showImage = true;
    thicknessMean = 2.5469;
    thicknessStandardDeviation = 3.068505;
    angularityMean = 3.578125;
    angularityStandardDeviation = 2.744948;
    symmetryMean = 8.770825;
    symmetryStandardDeviation = 2.565962;
    irregularityMean = 4.255175-2;
    irregularityStandardDeviation = 3.938052;
    orientationMean = 2.963575-1;
    orientationStandardDeviation = 3.261007;
  }
  else if(sliderTension.value == 3){ // most tense
    document.getElementById("imageText").style.display = "none";
    showImage = true;
    thicknessMean = 6.744775;
    thicknessStandardDeviation = 4.09486;
    angularityMean = 8.093725;
    angularityStandardDeviation = 3.007697;
    symmetryMean = 2.317725;
    symmetryStandardDeviation = 3.031077;
    irregularityMean = 5.802075;
    irregularityStandardDeviation = 3.953392;
    orientationMean = 5.5573;
    orientationStandardDeviation = 3.047185;
  }
  else if(sliderTension.value == 2){
    document.getElementById("imageText").style.display = "block";
    showImage = false;
  }

  if(sliderTensionSound.value == 1){ // least tense
    //soundButtonFinal.disabled = false;
    let left = 9 - seconds;
    document.getElementById("soundText").innerHTML ="<b>PLAYING | "+left+"</b>";    
    attackMean = 1.692175;
    attackStandardDeviation =  1.03998;
    releaseMean = 1.6672;
    releaseStandardDeviation =  1.0537925;
    amplitudeMean = 0.77655;
    amplitudeStandardDeviation =  0.25538;
    waveformWeights = [81.25, 12.08, 3.33, 3.33];
    frequencyWeights = [19.40,21.55, 24.14, 30.60, 2.16, 0.86, 0.86, 0.43];
    playSound = true;
  }
  else if(sliderTensionSound.value == 3){ // most tense
    //soundButtonFinal.disabled = false;
    let left = 9 - seconds;
    document.getElementById("soundText").innerHTML ="<b>PLAYING | "+left+"</b>";    
    attackMean = 1.33125;
    attackStandardDeviation =  1.034575;
    releaseMean = 1,3547;
    releaseStandardDeviation =  1.0184425;
    amplitudeMean = 0.271375;
    amplitudeStandardDeviation =  0.2963025;
    waveformWeights = [2.50, 1.67, 35.00, 60.83];
    frequencyWeights = [9.48, 3.45, 0.86, 0.86, 4.74, 8.62, 20.26, 51.72];
    playSound = true; 
  }
  else if(sliderTensionSound.value == 2){
    playSound = false;
    document.getElementById("soundText").innerHTML ="<b>SOUND</b>";
    osc.stop(0);
    seconds = 7;
    //soundButtonFinal.disabled = true;
  }

  push();
  noFill();
  translate(width/1.25, height/2);

  console.log(adjustTime)

  if(showImage){

    if(adjustTime){
      
      setTimeout(function(){
        adjustTime = 0;
        stroke(black);
        console.log("stopped");   
      }, 4000);    

      randomSeed();
      //VISUALS
      if(parseFloat(thicknessValueInput.toFixed(1)) == parseFloat(thicknessCurrentGoal.toFixed(1))){
        thicknessCurrentGoal = parseFloat(randomGaussianPositive(thicknessMean, thicknessStandardDeviation).toFixed(1));
      }
      else if(thicknessValueInput > thicknessCurrentGoal){
        thicknessValueInput =  parseFloat((thicknessValueInput - 0.1).toFixed(1));
      }
      else{
        thicknessValueInput =  parseFloat((thicknessValueInput + 0.1).toFixed(1));
      }

      if(parseFloat(angularityValueInput.toFixed(1)) == parseFloat(angularityCurrentGoal.toFixed(1))){
        angularityCurrentGoal = parseFloat(randomGaussianPositive(angularityMean, angularityStandardDeviation).toFixed(1));
      }
      else if(angularityValueInput > angularityCurrentGoal){
        angularityValueInput = parseFloat((angularityValueInput - 0.1).toFixed(1));
      }
      else{
        angularityValueInput = parseFloat((angularityValueInput + 0.1).toFixed(1));
      }

      if(parseFloat(symmetryValueInput.toFixed(1)) == parseFloat(symmetryCurrentGoal.toFixed(1))){
        symmetryCurrentGoal = parseFloat(randomGaussianPositive(symmetryMean, symmetryStandardDeviation).toFixed(1));
      }
      else if(symmetryValueInput > symmetryCurrentGoal){
        symmetryValueInput =  parseFloat((symmetryValueInput - 0.1).toFixed(1));
      }
      else{
        symmetryValueInput =  parseFloat((symmetryValueInput + 0.1).toFixed(1));
      }

      if(irregularityValueInput.toFixed(1)==2.0 && irregularityCurrentGoal.toFixed(1) == 10.0){
        //console.log("WEIRD CASE")
        // ??? 2.0 > 10.0 gives true and creates error loop
        irregularityCurrentGoal = parseFloat(randomGaussianPositive(irregularityMean, irregularityStandardDeviation).toFixed(1));
      }
      if(irregularityValueInput.toFixed(1) == irregularityCurrentGoal.toFixed(1)){
        irregularityCurrentGoal = parseFloat(randomGaussianPositive(irregularityMean, irregularityStandardDeviation).toFixed(1));
        console.log("equal and new goal" + irregularityCurrentGoal)
      }
      else if(irregularityValueInput.toFixed(1) > irregularityCurrentGoal.toFixed(1)){
        irregularityValueInput = parseFloat((irregularityValueInput - 0.1).toFixed(1));
        console.log("SMALLER Input"+ parseFloat(irregularityValueInput).toFixed(1)+"goal"+ parseFloat(irregularityCurrentGoal).toFixed(1))
      }
      else{
        irregularityValueInput =  parseFloat((irregularityValueInput + 0.1).toFixed(1));
        console.log("SMALLER Input"+ parseFloat(irregularityValueInput).toFixed(1)+"goal"+ parseFloat(irregularityCurrentGoal).toFixed(1))
      }

      if(orientationValueInput.toFixed(1)==2.0 && orientationCurrentGoal.toFixed(1) == 10.0){
        //console.log("WEIRD CASE")
        // ??? 2.0 > 10.0 gives true and creates error loop
        orientationCurrentGoal = parseFloat(randomGaussianPositive(orientationMean, orientationStandardDeviation).toFixed(1));
      }
      if(orientationValueInput.toFixed(1) < orientationCurrentGoal.toFixed(1)){
        orientationValueInput =  parseFloat((orientationValueInput + 0.1).toFixed(1));
        //console.log("SMALLER Input"+ parseFloat(orientationValueInput).toFixed(1)+"goal"+ parseFloat(orientationCurrentGoal).toFixed(1))
      }
      else if(orientationValueInput.toFixed(1) > orientationCurrentGoal.toFixed(1)){
        orientationValueInput = parseFloat((orientationValueInput - 0.1).toFixed(1));
        //console.log("BIGGER Input"+ parseFloat(orientationValueInput).toFixed(1)+"goal"+ parseFloat(orientationCurrentGoal).toFixed(1))
      }
      else{ //is equal
          orientationCurrentGoal = parseFloat(randomGaussianPositive(orientationMean, orientationStandardDeviation).toFixed(1));
      }
      

      }


      irregularityValue = clamp(map(irregularityValueInput, 0, 10, 0, 8), 0, 8);
      //console.log("Irr"+irregularityValue)
      thicknessValue = clamp(map(thicknessValueInput, 0, 10, 0, 8), 0, 8);
      //console.log("Thi"+thicknessValue)
      angularityValue = clamp(map(angularityValueInput, 0, 10, 0, 8), 0, 8);
      //console.log("Ang"+angularityValue)
      orientationValue = clamp(map(orientationValueInput, 0, 10, 0, 8), 0, 8);
      //console.log("Or"+orientationValue + "Goal"+orientationCurrentGoal)
      simmetryValue = clamp(map(symmetryValueInput, 0, 10, 0, 8), 0, 8);
      //console.log("Sym"+simmetryValue)

      angleMode(DEGREES);

      //IRREGULARITY

      randomSeed(99);
    
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
      
      if(abs(irregularityValue) > 3) {
        setLineDash(irregularList); 
      }
      else{
        setLineDash([]);  
      }
      
      // THICKNESS
      if(thicknessValue > 0)
        sw = int(map(thicknessValue, 0, 8, 1, 25));
      strokeWeight(sw);

      // ORIENTATION
      rectMode(CENTER);
      angleMode(RADIANS);
      let angle2 = map(orientationValue, 0, 8, 0, 45);
      rotate(PI / 180 * angle2);

      // ANGULARITY + SYMMETRY
      square(0, 0, 200, map(angularityValue, 0, 8, 100, 0), map(angularityValue, 0, 8, 100, 0) * map(simmetryValue, 0, 8, 0, 1), map(angularityValue, 0, 8, 100, 0) * map(simmetryValue, 0, 8, 0, 1), map(angularityValue, 0, 8, 100, 0));
    
  }

  //S O U N D
  if(playSound){

    releaseLevel = 0.0; // to make the note end all the way to silence (0)
    decayLevel = 0.5 // decay level 
    susPercent = 0.5;
    decayTime = 0.5;

    randomSeed();

    if(parseFloat(attackValueInput.toFixed(1)) == parseFloat(attackCurrentGoal.toFixed(1))){
      attackCurrentGoal = parseFloat(randomGaussianPositiveSound(attackMean, attackStandardDeviation).toFixed(1));
    }
    else if(attackValueInput > attackCurrentGoal){
      attackValueInput =  parseFloat((attackValueInput - 0.1).toFixed(1));
    }
    else{
      attackValueInput =  parseFloat((attackValueInput + 0.1).toFixed(1));
    }

    if(parseFloat(amplitudeValueInput.toFixed(1)) == parseFloat(amplitudeCurrentGoal.toFixed(1))){
      amplitudeCurrentGoal = parseFloat(randomGaussianPositiveSound(amplitudeMean, amplitudeStandardDeviation).toFixed(1));
    }
    else if(amplitudeValueInput > amplitudeCurrentGoal){
      amplitudeValueInput = parseFloat((amplitudeValueInput - 0.1).toFixed(1));
    }
    else{
      amplitudeValueInput = parseFloat((amplitudeValueInput + 0.1).toFixed(1));
    }

    if(parseFloat(releaseValueInput.toFixed(1)) == parseFloat(releaseCurrentGoal.toFixed(1))){
      releaseCurrentGoal = parseFloat(randomGaussianPositiveSound(releaseMean, releaseStandardDeviation).toFixed(1));
    }
    else if(releaseValueInput > releaseCurrentGoal){
      releaseValueInput =  parseFloat((releaseValueInput - 0.1).toFixed(1));
    }
    else{
      releaseValueInput =  parseFloat((releaseValueInput + 0.1).toFixed(1));
    }  

    attackLevel = clamp(amplitudeValueInput, 0, 1.0);
    attackTime = clamp(attackValueInput, 0, 3.0);
    releaseTime = clamp(releaseValueInput, 0, 3.0);
  
    // add percentages
    //freq = getNote(400);

    // WAVEFORM 

    osc.amp(env);

    if (seconds == 8 || seconds > 8){

      osc.setType(weighted_random(['sine','triangle','square','sawtooth'], waveformWeights));

      osc.freq(weighted_random([midiToFreq(24), midiToFreq(36), midiToFreq(48), midiToFreq(60), 
        midiToFreq(72),midiToFreq(84),midiToFreq(96),midiToFreq(108)], 
        frequencyWeights));
      env.setRange(attackLevel, releaseLevel);
      env.setADSR(attackTime, decayTime, susPercent, releaseTime);
      
      osc.start();
      env.play(0,0,1);
      console.log("playing")
      seconds=0;
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

function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
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


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomGaussianPositive(m,sd){
  value = randomGaussian(m,sd);
  if(value < 0)
    return 0;
  if(value > 10)
    return 10;
  return value;
}
function randomGaussianPositiveSound(m,sd){
  value = randomGaussian(m,sd);
  if(value < 0)
    return 0.1;
  if(value > 3)
    return 3;
  return value;
}

function weighted_random(items, weights) {
  var i;

  for (i = 0; i < weights.length; i++)
      weights[i] += weights[i - 1] || 0;
  
  var random = Math.random() * weights[weights.length - 1];
  
  for (i = 0; i < weights.length; i++)
      if (weights[i] > random)
          break;
  
  return items[i];
}