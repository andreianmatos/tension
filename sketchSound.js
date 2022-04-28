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
var w, osc, env;

let slider = 0, sliderDouble = 0, radioButtons = 0;

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

  for(let i=1; i < 11; i++)
    tests.push(new Test('test' + i + 'Bol'));

  currentTestBol = 'test' + randomIntFromInterval(1,10) + 'Bol';
  currentTest(currentTestBol);

  for(let i=1; i < 10; i++)
    findTest('test' + i + 'Bol').active = 0;
  findTest(currentTestBol).active = 1;

  setSliderValue(randomIntFromInterval(-8,8),"1");
  setSliderValue(randomIntFromInterval(-8,8),"1double");
  setSliderValue(randomIntFromInterval(-8,8),"2");
  setSliderValue(randomIntFromInterval(-8,8),"2double");

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
  var radiosLeft_value;
  for(var i = 0; i < radiosLeft.length; i++){
      if(radiosLeft[i].checked){
        radiosLeft_value = radiosLeft[i].value;
      }
  }
  var radiosRight = document.getElementsByName('radioRight');
  var radiosRight_value;
  for(var i = 0; i < radiosRight.length; i++){
      if(radiosRight[i].checked){
        radiosRight_value = radiosRight[i].value;
      }
  }
  //console.log("L"+radiosLeft_value);
  //console.log("R"+radiosRight_value);

  if(!playingLeft && !playingRight){
    osc.start();
    osc.freq(0);
    osc.amp(0);
    //noise.amp(0);
  }

  /* AMPLITUDE
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
  }*/
 
  // TEST 1 | WAVEFORM + ATTACK (TIME AND VOLUME? ONLY TIME?)
  if(findTest("test1Bol").active) {
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
        if(radiosLeft_value == "opt1")
          osc.setType('sine');
        else if(radiosLeft_value == "opt2")
          osc.setType('triangle');
        else if(radiosLeft_value == "opt3")
          osc.setType('square');
        else if(radiosLeft_value == "opt4")
          osc.setType('sawtooth');

        osc.amp(env);

        // C - G - D - A - E 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
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
        if(radiosRight_value == "opt5")
          osc.setType('sine');
        else if(radiosRight_value == "opt6")
          osc.setType('triangle');
        else if(radiosRight_value == "opt7")
          osc.setType('square');
        else if(radiosRight_value == "opt8")
          osc.setType('sawtooth');

        osc.amp(env);

        // C - G - D - A - E 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
  }

  // TEST 2 | WAVEFORM + RELEASE
  if(findTest("test2Bol").active) {
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
        if(radiosLeft_value == "opt1")
          osc.setType('sine');
        else if(radiosLeft_value == "opt2")
          osc.setType('triangle');
        else if(radiosLeft_value == "opt3")
          osc.setType('square');
        else if(radiosLeft_value == "opt4")
          osc.setType('sawtooth') ;

        osc.amp(env);

        // C - G - D - A - E 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
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
        if(radiosRight_value == "opt5")
          osc.setType('sine');
        else if(radiosRight_value == "opt6")
          osc.setType('triangle');
        else if(radiosRight_value == "opt7")
          osc.setType('square');
        else if(radiosRight_value == "opt8")
          osc.setType('sawtooth');

        osc.amp(env);

        // C - G - D - A - E 
        if (frameCount % 100 == 0){
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
        }
      }
    }
  }

  // TEST 3 | WAVEFORM + REVERB
  if(findTest("test3Bol").active) {
    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

    //let dryWet;
    let reverbTime, decayRate = 2;

    if(playingLeft){
      if(radiosLeft_value != null){
        if(output1.innerHTML > 0)
          reverbTime = map(output1.innerHTML, 0, 8, 0, 10);
        else
          reverbTime = map(output1.innerHTML, -8, 0, 10, 0);

        /* com... polySynth? ou oscilador?
        // note duration (in seconds)
        let dur = 1.5;

        // time from now (in seconds)
        let time = 0;

        // velocity (volume, from 0 to 1)
        let vel = 0.1;

        // notes can overlap with each other
        polySynth.play('G2', vel, 0, dur);
        polySynth.play('C3', vel, time += 1/3, dur);
        polySynth.play('G3', vel, time += 1/3, dur);
        */

        // WAVEFORM
        if(radiosLeft_value == "opt1")
          osc.setType('sine');
        else if(radiosLeft_value == "opt2")
          osc.setType('triangle');
        else if(radiosLeft_value == "opt3")
          osc.setType('square');
        else if(radiosLeft_value == "opt4")
          osc.setType('sawtooth');
        
        osc.amp(0.1, 0)

        // C - G - D - A - E 
        if (frameCount % 100 == 0){
          //osc.disconnect(); ?? check
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
          osc.connect(reverb);
          reverb.set(reverbTime,decayRate);
        }

        //polySynth.connect(reverb);
        // 0-10 second reverbTime, 0-100% decayRate, reverse
        //reverb.drywet(dryWet);
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        
        if(output2.innerHTML > 0)
          reverbTime = map(output2.innerHTML, 0, 8, 0, 10);
        else
          reverbTime = map(output2.innerHTML, -8, 0, 10, 0);

        /* com... polySynth? ou oscilador?
        // note duration (in seconds)
        let dur = 1.5;

        // time from now (in seconds)
        let time = 0;

        // velocity (volume, from 0 to 1)
        let vel = 0.1;

        // notes can overlap with each other
        polySynth.play('G2', vel, 0, dur);
        polySynth.play('C3', vel, time += 1/3, dur);
        polySynth.play('G3', vel, time += 1/3, dur);
        */

        // WAVEFORM
        if(radiosRight_value == "opt5")
          osc.setType('sine');
        else if(radiosRight_value == "opt6")
          osc.setType('triangle');
        else if(radiosRight_value == "opt7")
          osc.setType('square');
        else if(radiosRight_value == "opt8")
          osc.setType('sawtooth');
        
        osc.amp(0.1, 0.1)
        // C - G - D - A - E 
        if (frameCount % 100 == 0){
          //osc.disconnect(); ?? check
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
          osc.connect(reverb);
          reverb.set(reverbTime,2);
        }
         
        //polySynth.connect(reverb);
        // 0-10 second reverbTime, 0-100% decayRate, reverse
        //reverb.drywet(dryWet);
      }
    }
  }

  // TEST 4 | WAVEFORM + DELAY
  if(findTest("test4Bol").active) {
    
    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

    let delayTime = 0.12;
    let feedback = 0.7;
    let filterFreq = 2300;
    
    if(playingLeft){
      if(radiosLeft_value != null){
        if(output1.innerHTML > 0)
          delayTime = map(output1.innerHTML, 0, 8, 0.0, 0.9);
        else
          delayTime = map(output1.innerHTML, -8, 0, 0.9, 0.0);
        // WAVEFORM
        if(radiosLeft_value == "opt1")
          osc.setType('sine');
        else if(radiosLeft_value == "opt2")
          osc.setType('triangle');
        else if(radiosLeft_value == "opt3")
          osc.setType('square');
        else if(radiosLeft_value == "opt4")
          osc.setType('sawtooth') ;

        osc.amp(0.1, 0.1);
        // delay.process(source, delayTime (in seconds), feedback, filter frequency)
        delay.process(osc, delayTime, feedback, filterFreq);

        // C - G - D - A - E 
        if (frameCount % 50 == 0){
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        if(output2.innerHTML > 0)
          delayTime = map(output2.innerHTML, 0, 8, 0.0, 0.9);
        else
          delayTime = map(output2.innerHTML, -8, 0, 0.9, 0.0);
        // WAVEFORM
        if(radiosRight_value == "opt5")
          osc.setType('sine');
        else if(radiosRight_value == "opt6")
          osc.setType('triangle');
        else if(radiosRight_value == "opt7")
          osc.setType('square');
        else if(radiosRight_value == "opt8")
          osc.setType('sawtooth') ;

        osc.amp(0.1, 0.1);
        // delay.process(source, delayTime (in seconds), feedback, filter frequency)
        delay.process(osc, delayTime, feedback, filterFreq);

        // C - G - D - A - E 
        if (frameCount % 50 == 0){
          osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        }
      }
    }
  }

  // TEST 5 | ATTACK + RELEASE
  if(findTest("test5Bol").active) {
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

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
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

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }

    /* BEFORE: PAN LEFT AND RIGHT
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
    } */
  }

  // TEST 6 | ATTACK AND REVERB - is off?
  if(findTest("test6Bol").active) {
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
    let reverbTime;
    let decayRate = 2;

    if(playingLeft){
      if(output1.innerHTML > 0)
        attackTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        reverbTime = map(output1double.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output1double.innerHTML, -8, 0, 10, 0);
        
      osc.amp(env);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
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
        reverbTime = map(output2double.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output2double.innerHTML, -8, 0, 10, 0);

      osc.amp(env);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
    /*
    //osc.setType('sine'); // Sine, Triangle, Square and Sawtooth
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
    } */
  }
 
  // TEST 7 |  ATTACK + DELAY
  if(findTest("test7Bol").active) {
    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    let delayTime = 0.12;
    let feedback = 0.7;
    let filterFreq = 2300;

    if(playingLeft){
      if(output1.innerHTML > 0)
        attackTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        attackTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        delayTime = map(output1double.innerHTML, 0, 8, 0.0, 0.9);
      else
        delayTime = map(output1double.innerHTML, -8, 0, 0.9, 0.0);
        
      osc.amp(env);

      // delay.process(source, delayTime (in seconds), feedback, filter frequency)
      delay.process(osc, delayTime, feedback, filterFreq);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
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
        reverbTime = map(output2double.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output2double.innerHTML, -8, 0, 10, 0);

      osc.amp(env);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 8 | RELEASE + REVERB
  if(findTest("test8Bol").active) {
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
        reverbTime = map(output1double.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output1double.innerHTML, -8, 0, 10, 0);
      
      osc.amp(env);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
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
        reverbTime = map(output2double.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output2double.innerHTML, -8, 0, 10, 0);
      
      osc.amp(env);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 9 | RELEASE + DELAY
  if(findTest("test9Bol").active) {
    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let attackLevel = 1.0;
    let releaseLevel = 0;
    let attackTime = 0.001;
    let decayTime = 0.2;
    let susPercent = 0.2;
    let releaseTime = 0;

    let delayTime = 0.12;
    let feedback = 0.7;
    let filterFreq = 2300;

    if(playingLeft){
      if(output1.innerHTML > 0)
        releaseTime = map(output1.innerHTML, 0, 8, 0, 1);
      else
        releaseTime = map(output1.innerHTML, -8, 0, 1, 0);

      if(output1double.innerHTML > 0)
        delayTime = map(output1double.innerHTML, 0, 8, 0.0, 0.9);
      else
        delayTime = map(output1double.innerHTML, -8, 0, 0.9, 0.0);
        
      osc.amp(env);

      // delay.process(source, delayTime (in seconds), feedback, filter frequency)
      delay.process(osc, delayTime, feedback, filterFreq);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
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
        delayTime = map(output2double.innerHTML, 0, 8, 0.0, 0.9);
      else
        delayTime = map(output2double.innerHTML, -8, 0, 0.9, 0.0);

      osc.amp(env);
      
      // delay.process(source, delayTime (in seconds), feedback, filter frequency)
      delay.process(osc, delayTime, feedback, filterFreq);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
      }
    }
  }

  // TEST 10 | REVERB + DELAY
  if(findTest("test10Bol").active) {
    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    //let dryWet;
    let reverbTime, decayRate = 2;

    let delayTime = 0.12;
    let feedback = 0.7;
    let filterFreq = 2300;

    if(playingLeft){
      if(output1.innerHTML > 0)
        reverbTime = map(output1.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output1.innerHTML, -8, 0, 10, 0);

      if(output1double.innerHTML > 0)
        delayTime = map(output1double.innerHTML, 0, 8, 0.0, 0.9);
      else
        delayTime = map(output1double.innerHTML, -8, 0, 0.9, 0.0);
        
      osc.amp(0.5);

      // delay.process(source, delayTime (in seconds), feedback, filter frequency)
      delay.process(osc, delayTime, feedback, filterFreq);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
      }
    }
    if(playingRight) {
      if(output2.innerHTML > 0)
        reverbTime = map(output2.innerHTML, 0, 8, 0, 10);
      else
        reverbTime = map(output2.innerHTML, -8, 0, 10, 0);

      if(output2double.innerHTML > 0)
        delayTime = map(output2double.innerHTML, 0, 8, 0.0, 0.9);
      else
        delayTime = map(output2double.innerHTML, -8, 0, 0.9, 0.0);
        
      osc.amp(0.5);

      // delay.process(source, delayTime (in seconds), feedback, filter frequency)
      delay.process(osc, delayTime, feedback, filterFreq);

      // C - G - D - A - E 
      if (frameCount % 50 == 0){
        osc.freq(midiToFreq(int(random(60,67,62,69,64))));
        osc.connect(reverb);
        reverb.set(reverbTime,decayRate);
      }
    }
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
  for(let i=0; i < 10; i++)
    tests[i].active = 0;
  findTest(testBol).active = 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // save test choices
  saveTestChoices(currentTestBol);
  // clear input (tension + grid)
  clearInputs(1,1);
  setSliderValue(randomIntFromInterval(-8,8),"1");
  setSliderValue(randomIntFromInterval(-8,8),"1double");
  setSliderValue(randomIntFromInterval(-8,8),"2");
  setSliderValue(randomIntFromInterval(-8,8),"2double");
  // move on to next test
  currentTest(testBol); 
}

function currentTest(testBol) {
  if(currentTestBol != null) {
    console.log(currentTestBol);
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
  if(slider == "1")
    output1.innerHTML = val;
  else if(slider == "1double")
    output1double.innerHTML = val;
  else if(slider == "2")
    output2.innerHTML = val;
  else if(slider == "2double")
    output2double.innerHTML = val;
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
  //findTest(testName).scroll = output1.innerHTML;
  findTest(testName).tension = document.getElementById("tensionNumber").value;
  findTest(testName).grid = lastCheckedGrid1Cell;
  if(doubleTest){
    //findTest(testName).scroll2 = output2.innerHTML;
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