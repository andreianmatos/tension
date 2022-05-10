let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let lastCheckedGrid1Cell, lastCheckedGrid2Cell;

let testNumber = 1;

var slider1, output1;

var playingLeft = 0, playingRight = 0;
var w, osc, env;

let slider = 0, sliderDouble = 0, radioButtons = 0;
var radiosLeft_value, radiosRight_value;

let currentTestBol, doubleTest, imageTest, soundTest;
let tests = [], undoneTests = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let end = 0;


function setup() {

  var canvas = createCanvas(1200, 500);
  canvas.center('horizontal');
  canvas.parent('sketch');

  // define colors
  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

  slider1 = document.getElementById("myRange1");
  output1 = document.getElementById("demo1");

  slider1double = document.getElementById("myRange1double");
  output1double = document.getElementById("demo1double");

  slider2 = document.getElementById("myRange2");
  output2 = document.getElementById("demo2");

  slider2double = document.getElementById("myRange2double");
  output2double = document.getElementById("demo2double");


  output1.innerHTML = slider1.value;
  output1double.innerHTML = slider1double.value;
  output2.innerHTML = slider2.value;
  output2double.innerHTML = slider2double.value;

  for(let i=1; i < 21; i++)
    tests.push(new Test('test' + i + 'Bol'));

  currentTestBol = 'test' + randomIntFromInterval(1,20) + 'Bol';
  findTest(currentTestBol).active = 1;
  currentTest(currentTestBol);
  undoneTests = undoneTests.filter(item => item !== currentTestBol);

  var radiosLeft = document.getElementsByName('radioLeft');
  var radiosRight = document.getElementsByName('radioRight');
  radiosLeft[Math.floor(Math.random() * 4)].checked = true;
  radiosRight[Math.floor(Math.random() * 4 )].checked = true;

  //sound prep
  osc = new p5.Oscillator();
  env = new p5.Envelope();
  reverb = new p5.Reverb();
  polySynth = new p5.PolySynth();
  delay = new p5.Delay();

  //polySynth = new p5.PolySynth();

  //noise = new p5.Noise();
  /*filter = new p5.BandPass();
  noise.disconnect();
  noise.connect(filter);*/
}

function draw() {

  background(white);

  if(imageTest){
    document.getElementById("playL").style.display = 'none';
    document.getElementById("playR").style.display = 'none';  
    document.getElementById("textQ2").innerHTML = '<h2>&#8595; First consider the chosen image on the left &#8595;</h2>';  
    document.getElementById("textQ3").innerHTML = '<h2>From 1 to 10, how would you rate the image in terms of tension?<input type="number" id="tensionNumber" min="1" max="10"></h2>';  
    document.getElementById("textQ5").innerHTML = '<h2>&#8595; First consider the chosen image on the left &#8595;</h2>';  
    document.getElementById("textQ6").innerHTML = '<h2>From 1 to 10, how would you rate the image in terms of tension?<input type="number" id="tensionNumber2" min="1" max="10"></h2>';
  }
  if(soundTest){
    document.getElementById("playL").style.display = 'block';
    document.getElementById("playR").style.display = 'block';  
    document.getElementById("textQ2").innerHTML = '<h2>&#8595; First consider the chosen sound on the left &#8595;</h2>';  
    document.getElementById("textQ3").innerHTML = '<h2>From 1 to 10, how would you rate the sound in terms of tension?<input type="number" id="tensionNumber" min="1" max="10"></h2>';  
    document.getElementById("textQ5").innerHTML = '<h2>&#8595; First consider the chosen sound on the left &#8595;</h2>';  
    document.getElementById("textQ6").innerHTML = '<h2>From 1 to 10, how would you rate the sound in terms of tension?<input type="number" id="tensionNumber2" min="1" max="10"></h2>';
  }
  
  // update the current slider 1 and 2 value
  slider1.oninput = function() {
    output1.innerHTML = this.value;
  }
  slider1double.oninput = function() {
    output1double.innerHTML = this.value;
  }
  slider2.oninput = function() {
    output2.innerHTML = this.value;
  }
  slider2double.oninput = function() {
    output2double.innerHTML = this.value;
  }

  if(slider){
    document.getElementById("slidecontainer1").style.display = 'block';
    document.getElementById("slidecontainer2").style.display = 'block';
  }
  else{
    document.getElementById("slidecontainer1").style.display = 'none';
    document.getElementById("slidecontainer2").style.display = 'none';
  }

  if(sliderDouble){
    document.getElementById("slidecontainer1double").style.display = 'block';
    document.getElementById("slidecontainer2double").style.display = 'block';
  }
  else{
    document.getElementById("slidecontainer1double").style.display = 'none';
    document.getElementById("slidecontainer2double").style.display = 'none';
  }
  
  if(radioButtons){
    document.getElementById("radiosRight").style.display = 'block';
    document.getElementById("radiosLeft").style.display = 'block';
  }
  else{
    document.getElementById("radiosRight").style.display = 'none';
    document.getElementById("radiosLeft").style.display = 'none';
  }

  if(slider && radioButtons || slider && sliderDouble){
    document.getElementById("slidecontainer1").style.top = '85%';
    document.getElementById("slidecontainer2").style.top = '85%';
  }
  else{
    document.getElementById("slidecontainer1").style.top = '80%';
    document.getElementById("slidecontainer2").style.top = '80%';
  }

  var radiosLeft = document.getElementsByName('radioLeft');
  for(var i = 0; i < radiosLeft.length; i++){
      if(radiosLeft[i].checked){
        radiosLeft_value = radiosLeft[i].value;
      }
  }
  var radiosRight = document.getElementsByName('radioRight');
  for(var i = 0; i < radiosRight.length; i++){
      if(radiosRight[i].checked){
        radiosRight_value = radiosRight[i].value;
      }
  }

  if(!playingLeft && !playingRight){
    osc.start();
    osc.freq(0);
    osc.amp(0);
  }

  // TEST 1 | WAVEFORM + ATTACK 
  if(findTest("test1Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;
    if(playingLeft){
      if(radiosLeft_value != null){
        if(output1.innerHTML > 0)
          attackTime = map(output1.innerHTML, 0, 8, 0, 1);
        else
          attackTime = map(output1.innerHTML, -8, 0, 1, 0);
        // WAVEFORM
        if(radiosLeft_value == "1.1")
          osc.setType('sine');
        else if(radiosLeft_value == "1.2")
          osc.setType('triangle');
        else if(radiosLeft_value == "1.3")
          osc.setType('square');
        else if(radiosLeft_value == "1.4")
          osc.setType('sawtooth');

        osc.amp(env);
 
        // C - G - D - A - E (before) C2 C3 C4 (now)
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        if(output2.innerHTML > 0)
          attackTime = map(output2.innerHTML, 0, 8, 0, 1);
        else
          attackTime = map(output2.innerHTML, -8, 0, 1, 0);
        // WAVEFORM
        if(radiosRight_value == "2.1")
          osc.setType('sine');
        else if(radiosRight_value == "2.2")
          osc.setType('triangle');
        else if(radiosRight_value == "2.3")
          osc.setType('square');
        else if(radiosRight_value == "2.4")
          osc.setType('sawtooth');

        osc.amp(env);

        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
  }

  // TEST 2 | WAVEFORM + RELEASE
  if(findTest("test2Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

    let attackLevel = 1.0;
    let releaseLevel = 0; // to make the note end all the way to silence
    let attackTime = 0;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0.001;
    if(playingLeft){
      if(radiosLeft_value != null){
        if(output1.innerHTML > 0)
          releaseTime = map(output1.innerHTML, 0, 8, 0, 1);
        else
          releaseTime = map(output1.innerHTML, -8, 0, 1, 0);
        // WAVEFORM
        if(radiosLeft_value == "1.1")
          osc.setType('sine');
        else if(radiosLeft_value == "1.2")
          osc.setType('triangle');
        else if(radiosLeft_value == "1.3")
          osc.setType('square');
        else if(radiosLeft_value == "1.4")
          osc.setType('sawtooth') ;

        osc.amp(env);

        //C2 C3 C4 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        if(output2.innerHTML > 0)
          releaseTime = map(output2.innerHTML, 0, 8, 0, 1);
        else
          releaseTime = map(output2.innerHTML, -8, 0, 1, 0);
        // WAVEFORM
        if(radiosRight_value == "2.1")
          osc.setType('sine');
        else if(radiosRight_value == "2.2")
          osc.setType('triangle');
        else if(radiosRight_value == "2.3")
          osc.setType('square');
        else if(radiosRight_value == "2.4")
          osc.setType('sawtooth');

        osc.amp(env);

        //C2 C3 C4 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
  }

  // TEST 3 | WAVEFORM + DECAY
  if(findTest("test3Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

    let attackLevel = 1.0;
    let releaseLevel = 0; // to make the note end all the way to silence
    let attackTime = 0;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0.001;

    if(playingLeft){
      if(radiosLeft_value != null){
        if(output1.innerHTML > 0)
          decayTime = map(output1.innerHTML, 0, 8, 0, 1);
        else
          decayTime = map(output1.innerHTML, -8, 0, 1, 0);

        // WAVEFORM
        if(radiosLeft_value == "1.1")
          osc.setType('sine');
        else if(radiosLeft_value == "1.2")
          osc.setType('triangle');
        else if(radiosLeft_value == "1.3")
          osc.setType('square');
        else if(radiosLeft_value == "1.4")
          osc.setType('sawtooth');

        osc.amp(env);
        
        //C2 C3 C4 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }

      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        
        if(output2.innerHTML > 0)
          decayTime = map(output1.innerHTML, 0, 8, 0, 1);
        else
          decayTime = map(output1.innerHTML, -8, 0, 1, 0);

        // WAVEFORM
        if(radiosRight_value == "2.1")
          osc.setType('sine');
        else if(radiosRight_value == "2.2")
          osc.setType('triangle');
        else if(radiosRight_value == "2.3")
          osc.setType('square');
        else if(radiosRight_value == "2.4")
          osc.setType('sawtooth');

        osc.amp(env);
        
        //C2 C3 C4 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }

      }
    }
  }

  // TEST 4 | WAVEFORM + SUSTAIN
  if(findTest("test4Bol").active) {

    imageTest = 0;
    soundTest = 1;
    
    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

    let attackLevel = 1.0;
    let releaseLevel = 0; // to make the note end all the way to silence
    let attackTime = 0;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0.001;
    
    if(playingLeft){
      if(radiosLeft_value != null){
        if(output1.innerHTML > 0)
          susPercent = map(output1.innerHTML, 0, 8, 0.0, 1);
        else
          susPercent = map(output1.innerHTML, -8, 0, 1, 0.0);

        // WAVEFORM
        if(radiosLeft_value == "opt1")
          osc.setType('sine');
        else if(radiosLeft_value == "1.2")
          osc.setType('triangle');
        else if(radiosLeft_value == "1.3")
          osc.setType('square');
        else if(radiosLeft_value == "1.4")
          osc.setType('sawtooth') ;

        osc.amp(env);

        //C2 C3 C4 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        if(output2.innerHTML > 0)
          susPercent = map(output2.innerHTML, 0, 8, 0.0, 1);
        else
          susPercent = map(output2.innerHTML, -8, 0, 1, 0.0);
        // WAVEFORM
        if(radiosRight_value == "2.1")
          osc.setType('sine');
        else if(radiosRight_value == "2.2")
          osc.setType('triangle');
        else if(radiosRight_value == "2.3")
          osc.setType('square');
        else if(radiosRight_value == "2.4")
          osc.setType('sawtooth') ;

        osc.amp(env);

         //C2 C3 C4 
         if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(36, 48, 60))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
  }

  // TEST 5 | ATTACK + RELEASE
  if(findTest("test5Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;
    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;
    if(playingLeft){
      if(output1.innerHTML > 0)
        attackTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        releaseTime = map(output1double.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output1double.innerHTML, -8, 0, 1, 0);

      osc.amp(env);

      //C2 C3 C4 
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        attackTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output2double.innerHTML > 0)
        releaseTime = map(output2double.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output2double.innerHTML, -8, 0, 1, 0);

      osc.amp(env);

      // C2 C3 C4 
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 6 | ATTACK + DECAY
  if(findTest("test6Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    if(playingLeft){
      if(output1.innerHTML > 0)
        attackTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        decayTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        decayTime = map(output1.innerHTML, -8, 0, 1, 0);

      osc.amp(env);

      // C2 C3 C4 
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        decayTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        decayTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output2double.innerHTML > 0)
        reverbTime = map(output2double.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output2double.innerHTML, -8, 0, 10, 0);

      osc.amp(env);

      // C2 C3 C4 
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }
 
  // TEST 7 |  ATTACK + SUSTAIN
  if(findTest("test7Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    if(playingLeft){
      if(output1.innerHTML > 0)
        attackTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        susPercent = map(output1double.innerHTML, 0, 8, 0.0, 1);
      else
        susPercent = map(output1double.innerHTML, -8, 0, 1, 0.0);
        
      osc.amp(env);

      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        attackTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output2double.innerHTML > 0)
        susPercent = map(output1double.innerHTML, 0, 8, 0.0, 1);
      else
        susPercent = map(output1double.innerHTML, -8, 0, 1, 0.0);
        
      osc.amp(env);

      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 8 | RELEASE + DECAY
  if(findTest("test8Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    //let dryWet;
    let reverbTime, decayRate = 2;

    if(playingLeft){
      if(output1.innerHTML > 0)
        releaseTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        decayTime = map(output1double.innerHTML, 0, 8, 0, 1);
      else
        decayTime = map(output1double.innerHTML, -8, 0, 1, 0);
      
      osc.amp(env);

      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        releaseTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output2double.innerHTML > 0)
        decayTime = map(output1double.innerHTML, 0, 8, 0, 1);
      else
        decayTime = map(output1double.innerHTML, -8, 0, 1, 0);
      
      osc.amp(env);

      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 9 | RELEASE + SUSTAIN
  if(findTest("test9Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    if(playingLeft){
      if(output1.innerHTML > 0)
        releaseTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        susPercent = map(output1double.innerHTML, 0, 8, 0.0, 1);
      else
        susPercent = map(output1double.innerHTML, -8, 0, 1, 0.0);
        
      osc.amp(env);

      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        releaseTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output2double.innerHTML > 0)
        susPercent = map(output2double.innerHTML, 0, 8, 0.0, 1);
      else
        susPercent = map(output2double.innerHTML, -8, 0, 1, 0.0);

      osc.amp(env);
      
      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 10 | DECAY + SUSTAIN
  if(findTest("test10Bol").active) {

    imageTest = 0;
    soundTest = 1;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    if(playingLeft){
      if(output1.innerHTML > 0)
        decayTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        decayTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        susPercent = map(output2double.innerHTML, 0, 8, 0.0, 1);
      else
        susPercent = map(output2double.innerHTML, -8, 0, 1, 0.0);
        
      osc.amp(env);
      
      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        decayTime = map(output2.innerHTML, 0, 8, 0, 1);
      else
        decayTime = map(output2.innerHTML, -8, 0, 1, 0);

      if(output2double.innerHTML > 0)
        susPercent = map(output2double.innerHTML, 0, 8, 0.0, 1);
      else
        susPercent = map(output2double.innerHTML, -8, 0, 1, 0.0);
        
      osc.amp(env);
      
      // C2 C3 C4
      if (frameCount % 100 == 0){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TESTE 11 | SYMMETRY + THICKNESS
  if(findTest("test11Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw; 

    push();
    noFill();
    translate(width/5, height/2);
    if(output1double.innerHTML > 0)
      sw = int(map(output1double.innerHTML, 0, 8, 1, 25));
    if(output1double.innerHTML <= 0)
      sw = int(map(output1double.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);
    if(output1.innerHTML < 0) 
      arc(0, 0, map(output1.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output1.innerHTML >= 0) 
      arc(0, 0, map(output1.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop()

    push();
    noFill();
    translate(width/1.21, height/2);
    if(output2double.innerHTML > 0)
      sw = int(map(output2double.innerHTML, 0, 8, 1, 25));
    if(output2double.innerHTML <= 0)
      sw = int(map(output2double.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);
    if(output2.innerHTML < 0) 
      arc(0, 0, map(output2.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output2.innerHTML >= 0) 
      arc(0, 0, map(output2.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop()
  }

  // TESTE 12 | SYMMETRY + ORIENTATION
  if(findTest("test12Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);
    let angle = map(output1double.innerHTML, 0, 8, 0, 180);
    if(output1double.innerHTML > 0)
      rotate(PI / 180 * angle);
    if(output1double.innerHTML <= 0)
    rotate(PI / 180 * angle);
    if(output1.innerHTML < 0) 
      arc(0, 0, map(output1.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output1.innerHTML >= 0) 
      arc(0, 0, map(output1.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop();

    push();
    noFill();
    translate(width/1.21, height/2);

    strokeWeight(10);
    let angle2 = map(output2double.innerHTML, 0, 8, 0, 180);
    if(output2double.innerHTML > 0)
      rotate(PI / 180 * angle2);
    if(output2double.innerHTML <= 0)
      rotate(PI / 180 * angle2);
    if(output2.innerHTML < 0) 
      arc(0, 0, map(output2.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output2.innerHTML >= 0) 
      arc(0, 0, map(output2.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);

    pop();
  }
  
  // TESTE 13 | SYMMETRY + IRREGULARITY
  if(findTest("test13Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);
    //console.log(lerp(5, 5, map(output1double.innerHTML, -8, 0, 0, 1)));
    let irregularList;
   
    if(output1double.innerHTML > 0) {
      irregularList = [ 1,  map(output1double.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(output1double.innerHTML <= 0) {
      irregularList = [ 1,  map(output1double.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }
    if(output1.innerHTML < 0) 
      arc(0, 0, map(output1.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output1.innerHTML >= 0) 
      arc(0, 0, map(output1.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop();

    push();
    noFill();
    translate(width/1.21, height/2);

    strokeWeight(10);
    console.log(lerp(5, 5, map(output2double.innerHTML, -8, 0, 0, 1)));
    let irregularList2;
   
    if(output2double.innerHTML > 0) {
      irregularList2 = [ 1,  map(output2double.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList2);  
    }
    if(output2double.innerHTML <= 0) {
      irregularList2 = [ 1,  map(output2double.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList2);  
    }
    if(output2.innerHTML < 0) 
      arc(0, 0, map(output2.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output2.innerHTML >= 0) 
      arc(0, 0, map(output2.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop();

  }

  // TESTE 14 | SYMMETRY + ANGULARITY
  if(findTest("test14Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);

    const numVertices = 10;
    let radius = 100;
    const spacing = 360 / numVertices;

    let angleChange = 180;
    let asymmetry = 0, asymmetry2 = 0;

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(output1double.innerHTML <= 0) {
        angleChange = map(output1double.innerHTML, -8, 0, 50, 150);
      }
      if(output1double.innerHTML > 0) {
        angleChange = map(output1double.innerHTML, 0, 8, 150, 50);
      }

      if(output1.innerHTML <= 0) {
        asymmetry = map(output1.innerHTML, -8, 0, 0, 50)
        asymmetry2 = map(output1.innerHTML, -8, 0, 0, 10)
      }
      if(output1.innerHTML > 0) {
        asymmetry = map(output1.innerHTML, 0, 8, 50, 0)
        asymmetry2 = map(output1.innerHTML, 0, 8, 10, 0)
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;    

      if(i == 0){
        vertex(x, y);
      }
      
      if(output1double.innerHTML > 4 || output1double.innerHTML < -4 ){
        if(i == 0)
          rotate(PI / 180 * 70);
        star(0, 0, 150 - angleChange + 30, 100, 10, asymmetry2);
      }
      else if(i != 0){
        if( i < 3 || i > 8)
          angleChange += asymmetry;  
        const cAngle = angle - spacing/2;
        const cX = cos(radians(cAngle)) * angleChange;
        const cY = sin(radians(cAngle)) * angleChange;
        quadraticVertex(cX, cY, x, y);
      }
    }

    endShape();
    
    /*if(output1.innerHTML < 0) 
      arc(0, 0, map(output1.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output1.innerHTML >= 0) 
      arc(0, 0, map(output1.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);*/
    pop();

    push();
    noFill();
    translate(width/1.21, height/2);

    strokeWeight(10);
   
    if(output2double.innerHTML > 0) {
    }
    if(output2double.innerHTML <= 0) {
    }
    if(output2.innerHTML < 0) 
      arc(0, 0, map(output2.innerHTML, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(output2.innerHTML >= 0) 
      arc(0, 0, map(output2.innerHTML, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop();

  }
  
  // TESTE 15 | THICKNESS + ORIENTATION
  if(findTest("test15Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw; 

    push();
    noFill();
    translate(width/5, height/2);
    rectMode(CENTER);
    if(output1double.innerHTML > 0)
      sw = int(map(output1double.innerHTML, 0, 8, 1, 25));
    if(output1double.innerHTML <= 0)
      sw = int(map(output1double.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);
    let angle = map(output1.innerHTML, 0, 8, 0, 45);
    if(output1.innerHTML > 0)
      rotate(PI / 180 * angle);
    if(output1.innerHTML <= 0)
    rotate(PI / 180 * angle);
    rect(0, 0, 200, 200);
    pop()

    push();
    noFill();
    translate(width/1.21, height/2);
    rectMode(CENTER);
    if(output2double.innerHTML > 0)
      sw = int(map(output2double.innerHTML, 0, 8, 1, 25));
    if(output2double.innerHTML <= 0)
      sw = int(map(output2double.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);
    let angle2 = map(output2.innerHTML, 0, 8, 0, 45);
    if(output2.innerHTML > 0)
      rotate(PI / 180 * angle2);
    if(output2.innerHTML <= 0)
    rotate(PI / 180 * angle2);
    rect(0, 0, 200, 200);
    pop()
  }

  // TESTE 16 | THICKNESS + IRREGULARITY  
  if(findTest("test16Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw, irregularList;

    push();
    noFill();
    translate(width/5, height/2);
   
    if(output1double.innerHTML > 0) {
      irregularList = [ 1,  map(output1double.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(output1double.innerHTML <= 0) {
      irregularList = [ 1,  map(output1double.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }
    if(output1.innerHTML > 0) 
      sw = int(map(output1.innerHTML, 0, 8, 1, 25));
    if(output1.innerHTML <= 0) 
      sw = int(map(output1.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);
    ellipse(0,0, 200, 200);
    pop();

    push();
    noFill();
    translate(width/1.21, height/2);output1double

    if(output2double.innerHTML > 0) {
      irregularList = [ 1,  map(output2double.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(output2double.innerHTML <= 0) {
      irregularList = [ 1,  map(output2double.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }
    if(output2.innerHTML > 0) 
      sw = int(map(output2.innerHTML, 0, 8, 1, 25));
    if(output2.innerHTML <= 0) 
      sw = int(map(output2.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);
    ellipse(0,0, 200, 200);
    pop();  
  }
  
  // TESTE 17 | THICKNESS + ANGULARITY  
  if(findTest("test17Bol").active) {

    imageTest = 1;
    soundTest = 0;

    const numVertices = 10;
    let radius = 100;
    const spacing = 360 / numVertices;

    let angleChange = 180;

    push();
    noFill();
    translate(width/5, height/2);
    
    if(output1.innerHTML > 0)
      sw = int(map(output1.innerHTML, 0, 8, 1, 25));
    if(output1.innerHTML <= 0)
      sw = int(map(output1.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(output1double.innerHTML <= 0) {
        angleChange = map(output1double.innerHTML, -8, 0, 50, 150);
      }
      if(output1double.innerHTML > 0) {
        angleChange = map(output1double.innerHTML, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(output1double.innerHTML > 4 || output1double.innerHTML < -4 ){
        star(0, 0, 150 - angleChange + 30, 100, 10, 0);
      }
      else{
        const cAngle = angle - spacing/2;
        const cX = cos(radians(cAngle)) * angleChange;
        const cY = sin(radians(cAngle)) * angleChange;
        quadraticVertex(cX, cY, x, y);
      }
    }

    endShape();

    pop();

    push();
    noFill();
    translate(width/1.21, height/2);
    
    if(output2.innerHTML > 0)
      sw = int(map(output2.innerHTML, 0, 8, 1, 25));
    if(output2.innerHTML <= 0)
      sw = int(map(output2.innerHTML, -8, 0, 25, 1));
    strokeWeight(sw);

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(output2double.innerHTML <= 0) {
        angleChange = map(output2double.innerHTML, -8, 0, 50, 150);
      }
      if(output2double.innerHTML > 0) {
        angleChange = map(output2double.innerHTML, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(output2double.innerHTML > 4 || output2double.innerHTML < -4 ){
        star(0, 0, 150 - angleChange + 30, 100, 10, 0);
      }
      else{
        const cAngle = angle - spacing/2;
        const cX = cos(radians(cAngle)) * angleChange;
        const cY = sin(radians(cAngle)) * angleChange;
        quadraticVertex(cX, cY, x, y);
      }
    }

    endShape();

    pop();
  }

  // TESTE 18 |ORIENTATION + IRREGULARITY  
  if(findTest("test18Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw, irregularList;

    push();
    noFill();
    translate(width/5, height/2);

    rectMode(CENTER);
    strokeWeight(10);
   
    if(output1double.innerHTML > 0) {
      irregularList = [ 1,  map(output1double.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(output1double.innerHTML <= 0) {
      irregularList = [ 1,  map(output1double.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }
    let angle = map(output1.innerHTML, 0, 8, 0, 45);
    if(output1.innerHTML > 0)
      rotate(PI / 180 * angle);
    if(output1.innerHTML <= 0)
    rotate(PI / 180 * angle);
    rect(0, 0, 200, 200);
    pop();

    push();
    noFill();
    translate(width/1.21, height/2);

    rectMode(CENTER);
    strokeWeight(10);

    if(output2double.innerHTML > 0) {
      irregularList = [ 1,  map(output2double.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(output2double.innerHTML <= 0) {
      irregularList = [ 1,  map(output2double.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }
    let angle2 = map(output2.innerHTML, 0, 8, 0, 45);
    if(output2.innerHTML > 0)
      rotate(PI / 180 * angle2);
    if(output2.innerHTML <= 0)
      rotate(PI / 180 * angle2);
    rect(0, 0, 200, 200);
    pop();  

  }

  // TESTE 19 |ORIENTATION + ANGULARITY  
  if(findTest("test19Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);
    rectMode(CENTER);
    let angle = map(output1double.innerHTML, 0, 8, 0, 45);
    if(output1double.innerHTML > 0)
      rotate(PI / 180 * angle);
    if(output1double.innerHTML <= 0)
      rotate(PI / 180 * angle);
    if(output1.innerHTML < 0) 
      square(0, 0, 200, map(output1.innerHTML, -8, 0, 0, 100));
    if(output1.innerHTML >= 0) 
      square(0, 0, 200, map(output1.innerHTML, 0, 8, 100, 0));
    pop();

    push();
    noFill();
    translate(width/1.21, height/2);

    strokeWeight(10);
    rectMode(CENTER);
    let angle2 = map(output2double.innerHTML, 0, 8, 0, 45);
    if(output2double.innerHTML > 0)
      rotate(PI / 180 * angle2);
    if(output2double.innerHTML <= 0)
      rotate(PI / 180 * angle2);
    if(output2.innerHTML < 0) 
      square(0, 0, 200, map(output2.innerHTML, -8, 0, 0, 100));
    if(output2.innerHTML >= 0) 
      square(0, 0, 200, map(output2.innerHTML, 0, 8, 100, 0));
    pop();
  }
  
  // TESTE 20 |IRREGULARITY + ANGULARITY  
  if(findTest("test20Bol").active) {

    imageTest = 1;
    soundTest = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    const numVertices = 10;
    let radius = 100;
    const spacing = 360 / numVertices;

    let angleChange = 180;
    let irregularList;

    push();
    noFill();
    translate(width/5, height/2);

    strokeWeight(10);
       
    if(output1.innerHTML > 0) {
      irregularList = [ 1,  map(output1.innerHTML, 0, 8, 5, 25)];
      setLineDash(irregularList);  
    }
    if(output1.innerHTML <= 0) {
      irregularList = [ 1,  map(output1.innerHTML, -8, 0, 25, 5)];
      setLineDash(irregularList);  
    }

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(output1double.innerHTML <= 0) {
        angleChange = map(output1double.innerHTML, -8, 0, 50, 150);
      }
      if(output1double.innerHTML > 0) {
        angleChange = map(output1double.innerHTML, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(output1double.innerHTML > 4 || output1double.innerHTML < -4 ){
        star(0, 0, 150 - angleChange + 30, 100, 10, 0);
      }
      else{
        const cAngle = angle - spacing/2;
        const cX = cos(radians(cAngle)) * angleChange;
        const cY = sin(radians(cAngle)) * angleChange;
        quadraticVertex(cX, cY, x, y);
      }
    }

    endShape();

    pop();

    push();
    noFill();
    translate(width/1.21, height/2);

    strokeWeight(10);
    
     if(output2.innerHTML > 0) {
      irregularList = [ 1,  map(output2.innerHTML, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(output2.innerHTML <= 0) {
      irregularList = [ 1,  map(output2.innerHTML, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(output2double.innerHTML <= 0) {
        angleChange = map(output2double.innerHTML, -8, 0, 50, 150);
      }
      if(output2double.innerHTML > 0) {
        angleChange = map(output2double.innerHTML, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(output2double.innerHTML > 4 || output2double.innerHTML < -4 ){
        star(0, 0, 150 - angleChange + 30, 100, 10, 0);
      }
      else{
        const cAngle = angle - spacing/2;
        const cX = cos(radians(cAngle)) * angleChange;
        const cY = sin(radians(cAngle)) * angleChange;
        quadraticVertex(cX, cY, x, y);
      }
    }

    endShape();

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
  let range = "myRange" + slider;
  document.getElementById(range).value = val;
  if(slider == "1")
    output1.innerHTML = val;
  else if(slider == "1double")
    output1double.innerHTML = val;
  else if(slider == "2")
    output2.innerHTML = val;
  else if(slider == "2double")
    output2double.innerHTML = val;
}

function star(x, y, radius1, radius2, npoints, symmetry) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
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
  this.scroll11 = null;
  this.scroll12 = null;
  this.tension = null;
  this.grid = null;
  this.scroll21 = null;
  this.scroll22 = null;
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
  if(radioButtons){
    findTest(testName).scroll1double = radiosLeft_value;
    findTest(testName).scroll2double = radiosRight_value;
  }
  else{
    findTest(testName).scroll1double = output1double.innerHTML;
    findTest(testName).scroll2double = output2double.innerHTML;
  }
  console.log("saved")
  findTest(testName).scroll1 = output1.innerHTML;
  findTest(testName).tension = document.getElementById("tensionNumber").value;
  findTest(testName).grid = lastCheckedGrid1Cell;
  
  findTest(testName).scroll2 = output2.innerHTML;
  findTest(testName).tension2 = document.getElementById("tensionNumber2").value;
  findTest(testName).grid2 = lastCheckedGrid2Cell;
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
    testResults += "TEST" + j + "|" + tests[i].scroll1double + "_" + tests[i].scroll1 + "_" +  tests[i].tension + "_" + tests[i].grid + "|" + tests[i].scroll2double + "_" + tests[i].scroll2 + "_" +  tests[i].tension2 + "_" + tests[i].grid2+ "\n<br>";
    /*testResults += "<b>TEST " + j + "</b> | <b>LEFT: scroll:</b> " + tests[i].scroll +
     " <b>tension:</b> " + tests[i].tension + " <b>grid:</b> " + tests[i].grid + 
     "</b> | <b>RIGHT: scroll:</b> " + tests[i].scroll2 +
     " <b>tension:</b> " + tests[i].tension2 + " <b>grid:</b> " + tests[i].grid2 + "\n<br>";*/
  }
  console.log(testResults);
  //sendEmail(testResults, datetime);
  //window.location="mailto:andreianmatos@tecnico.ulisboa.pt?subject=Results"+datetime+"&body="+testResults;
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
  window.location.href="results.html";
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

function chooseNextTest(){

  let chosen = 0;

  // save test choices
  saveTestChoices(currentTestBol);
  //console.log("SAVED FOR TEST" + currentTestBol + " and slider left is " + output1.innerHTML + " and slider right is " + output2.innerHTML);


  while(!chosen){
    newTestNr = randomIntFromInterval(1,20);
    newTestBol = 'test' + newTestNr + 'Bol';
    if(undoneTests.length == 1){
      document.getElementById("testNext").style.display = 'none';
      document.getElementById("updateAnswers").style.display = 'block';
      document.getElementById("lastTest").style.display = 'block';
      document.getElementById("lastTest2").style.display = 'block';
      document.getElementById("submit").disabled = false;
      enableTests();
      end = 1;
      break;
    }
    if(undoneTests.includes(newTestNr)){
      chosen = 1;
    }
  }
  // delete the new current test of the undone tests list
  undoneTests = undoneTests.filter(item => item !== newTestNr);
  next(newTestBol);
  console.log(undoneTests);
}

function next(newTestBol) {

  if(playingRight)
    playRight();
  if(playingLeft)
    playLeft();

  for(let i=0; i < 20; i++)
    tests[i].active = 0;
  findTest(newTestBol).active = 1;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  //at the end people are reviewing their answers
  if(!end){
    // clear input (tension + grid)
    clearInputs(1,1);
    var radiosLeft = document.getElementsByName('radioLeft');
    var radiosRight = document.getElementsByName('radioRight');
    radiosLeft[Math.floor(Math.random() * 4)].checked = true;
    radiosRight[Math.floor(Math.random() * 4 )].checked = true;
    setSliderValue(randomIntFromInterval(-8,8),"1");
    setSliderValue(randomIntFromInterval(-8,8),"1double");
    setSliderValue(randomIntFromInterval(-8,8),"2");
    setSliderValue(randomIntFromInterval(-8,8),"2double");
  }
  // move on to next test
  currentTest(newTestBol); 
}

function currentTest(newTestBol) {
  if(currentTestBol != null) {
    console.log(currentTestBol);
    document.getElementById(currentTestBol).style.background = "#fff";
    document.getElementById(currentTestBol).style.color = "#000";
    //document.getElementById(currentTestBol).disabled = false;
  }
  currentTestBol = newTestBol;
  document.getElementById(currentTestBol).style.background = "#000";
  document.getElementById(currentTestBol).style.color = "#fff";
}

function enableTests(){
  for(let i=1; i < 21; i++){
    document.getElementById('test'+i+'Bol').style.background = "#fff";
    document.getElementById('test'+i+'Bol').style.color = "#000";
    document.getElementById('test'+i+'Bol').disabled = false;
  }
}

function updateAnswers(){
  saveTestChoices(currentTestBol);
}
