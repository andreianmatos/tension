let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

let a = 0, b = 1, c = 1, d = 1;
let val = 0;

let lastCheckedGrid1Cell, lastCheckedGrid2Cell;

let testNumber = 1;
let chosen;

let doneFullTests = 0;

var playingLeft = 0, playingRight = 0, isStarted = 0;
var w, osc, env;

let slider = 0, sliderDouble = 0, radioButtons = 0;
var radiosLeft_value, radiosRight_value;

let fullTestSound = 0, fullTestVisuals = 0;
let currentTestBol, doubleTest, imageTest, soundTest;
let tests = [], undoneTests = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let end = 0;

let sliderCircular1;

var output1, output1double, output2, output2double, output5, output6, output7, output8, output9, output10;
var currentValueSlider1, currentValueSlider1double, currentValueSlider2, currentValueSlider2double,
currentValueSlider5, currentValueSlider6,currentValueSlider7, currentValueSlider8, currentValueSlider9, currentValueSlider10;
var sliderTensionLeft, sliderTensionRight, outputsliderTensionLeft, outputsliderTensionRight;

var initialSlider1 = randomIntFromInterval(-8,8), 
initialSlider1double = randomIntFromInterval(-8,8), 
initialSlider2 = randomIntFromInterval(-8,8), 
initialSlider2double = randomIntFromInterval(-8,8);

initialSlider5 = randomIntFromInterval(-8,8),
initialSlider6 = randomIntFromInterval(-8,8),
initialSlider7 = randomIntFromInterval(-8,8),
initialSlider8 = randomIntFromInterval(-8,8),
initialSlider9 = randomIntFromInterval(-8,8),
initialSlider10 = randomIntFromInterval(-8,8);

//C3 C4 C5 o C2(36) é um pouco baixo (?) 
var midiNotesConsidered = Array(48, 60, 72);
var seconds; // between notes
// before the setinterval: worked: frameCount % 100 == 0

 // LEFT: SLIDER 1 sliderCircular app options
 const opts = {
  DOMselector: '#app',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider1,
          color: '',
          displayName: 'Slider 1'
      }
  ]
};
 // LEFT: SLIDER 2 sliderCircular app options
 const opts3 = {
  DOMselector: '#app3',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider1double,
          color: '',
          displayName: 'Slider 3'
      }
  ]
};

 // RIGHT: SLIDER 1 sliderCircular app options
 const opts2 = {
  DOMselector: '#app2',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider2,
          color: '',
          displayName: 'Slider 2'
      }
  ]
};
 //RIGHT: SLIDER 2 sliderCircular app options
 const opts4 = {
  DOMselector: '#app4',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider2double,
          color: '',
          displayName: 'Slider 4'
      }
  ]
};

 //LEFT: SLIDER 3 sliderCircular app options
 const opts5 = {
  DOMselector: '#app5',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider5,
          color: '',
          displayName: 'Slider 5'
      },
  ]
};
 //LEFT: SLIDER 4 sliderCircular app options
 const opts6 = {
  DOMselector: '#app6',
  sliderCirculars: [
    {
        radius: 40,
        min: -8,
        max: 8,
        step: 1,
        initialValue: initialSlider6,
        color: '',
        displayName: 'Slider 6'
    }
]
};
 //LEFT: SLIDER 5 sliderCircular app options
 const opts7 = {
  DOMselector: '#app7',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider7,
          color: '',
          displayName: 'Slider 7'
      }
  ]
};

 //LEFT: SLIDER 5 sliderCircular app options
 const opts8 = {
  DOMselector: '#app8',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider8,
          color: '',
          displayName: 'Slider 8'
      }
  ]
};

//LEFT: SLIDER 5 sliderCircular app options
const opts9 = {
  DOMselector: '#app9',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider9,
          color: '',
          displayName: 'Slider 8'
      }
  ]
};

const opts10 = {
  DOMselector: '#app10',
  sliderCirculars: [
      {
          radius: 40,
          min: -8,
          max: 8,
          step: 1,
          initialValue: initialSlider10,
          color: '',
          displayName: 'Slider 8'
      }
  ]
};


function setup() {

  var canvas = createCanvas(0.85*windowWidth, 0.7*windowHeight);
  canvas.center('horizontal');
  canvas.parent('sketch');

  // define colors
  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)');

  // instantiate the sliderCircular
  sliderCircular1 =  new sliderCircular(opts);
  sliderCircular1.draw();
  sliderCircular2 = new sliderCircular(opts2);
  sliderCircular2.draw();
  sliderCircular3 =  new sliderCircular(opts3);
  sliderCircular3.draw();
  sliderCircular4 = new sliderCircular(opts4);
  sliderCircular4.draw();

  sliderCircular5 = new sliderCircular(opts5);
  sliderCircular5.draw();
  sliderCircular6 = new sliderCircular(opts6);
  sliderCircular6.draw();
  sliderCircular7 = new sliderCircular(opts7);
  sliderCircular7.draw();
  sliderCircular8 = new sliderCircular(opts8);
  sliderCircular8.draw();
  sliderCircular9 = new sliderCircular(opts9);
  sliderCircular9.draw();
  sliderCircular10 = new sliderCircular(opts10);
  sliderCircular10.draw();

  //tension sliders for left and right
 
  sliderTensionLeft = document.getElementById("myRangeTensionLeft");
  outputSliderTensionLeft = document.getElementById("tensionValueLeft");

  sliderTensionRight = document.getElementById("myRangeTensionRight");
  outputSliderTensionRight = document.getElementById("tensionValueRight");

  outputSliderTensionLeft.innerHTML = sliderTensionLeft.value;
  outputSliderTensionRight.innerHTML = sliderTensionRight.value;
  
  /// not being used atm, plain sliders for pics
  slider1 = document.getElementById("myRange1");
  output1 = document.getElementById("demo1");

  slider1double = document.getElementById("myRange1double");
  output1double = document.getElementById("demo1double");

  slider2 = document.getElementById("myRange2");
  output2 = document.getElementById("demo2");

  slider2double = document.getElementById("myRange2double");
  output2double = document.getElementById("demo2double");

  setSliderValue(initialSlider1,"1");
  setSliderValue(initialSlider1double,"1double");
  setSliderValue(initialSlider2,"2");
  setSliderValue(initialSlider2double,"2double");
  setSliderValue(initialSlider5,"5");
  setSliderValue(initialSlider6,"6");
  setSliderValue(initialSlider7,"7");
  setSliderValue(initialSlider8,"8");
  setSliderValue(initialSlider9,"9");
  setSliderValue(initialSlider10,"10");

  for(let i=1; i < 23; i++)
    tests.push(new Test('test' + i + 'Bol'));

  var randtestNr = randomIntFromInterval(1,20);
  currentTestBol = 'test' + randtestNr + 'Bol';
  findTest(currentTestBol).active = 1;
  currentTest(currentTestBol);
  undoneTests = undoneTests.filter(item => item !== randtestNr);

  var radiosLeft = document.getElementsByName('radioLeft');
  var radiosRight = document.getElementsByName('radioRight');
  radiosLeft[Math.floor(Math.random() * 4)].checked = true;
  radiosRight[Math.floor(Math.random() * 4 )].checked = true;

  //sound prep
  osc = new p5.Oscillator();
  env = new p5.Envelope();

  seconds = 0;
  //increment the seconds
  setInterval(incrementSeconds, 1000);

}

function draw() {

  background(white); 

  //console.log(seconds);


  if(imageTest){
    document.getElementById("playL").style.display = 'none';
    document.getElementById("playR").style.display = 'none';  
    document.getElementById("textQ2").innerHTML = '<h2>&#8595; First consider the chosen image on the left &#8595;</h2>';  
    document.getElementById("textQ5").innerHTML = '<h2>&#8595; Now consider the chosen image on the right &#8595;</h2>';  
  }
  if(soundTest){
    document.getElementById("playL").style.display = 'block';
    document.getElementById("playR").style.display = 'block';  
    document.getElementById("textQ2").innerHTML = '<h2>&#8595; First consider the chosen sound on the left &#8595;</h2>';  
    document.getElementById("textQ5").innerHTML = '<h2>&#8595; Now consider the chosen sound on the right &#8595;</h2>';  
  }

  // tension sliders update value

  sliderTensionLeft.oninput = function() {
    outputSliderTensionLeft.innerHTML = this.value;
  }

  sliderTensionRight.oninput = function() {
    outputSliderTensionRight.innerHTML = this.value;
  }

  /*
  // update the current slider 1 and 2 value
  slider1.oninput = function() {
    output1.innerHTML = this.value;
  }
  slider1double.oninput = function() {
    currentValueSlider1double = this.value;
  } 
  slider2.oninput = function() {
    currentValueSlider2 = this.value;
  }
  slider2double.oninput = function() {
    currentValueSlider2double = this.value;
  */

  // deletee
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
  

  // NEEDED
  if(radioButtons){
    document.getElementById("radiosRight").style.display = 'block';
    document.getElementById("radiosLeft").style.display = 'block';

    document.getElementById("app").style.display = 'block';
    document.getElementById("app2").style.display = 'block';
    document.getElementById("app3").style.display = 'none';
    document.getElementById("app4").style.display = 'none';
    document.getElementById("app5").style.display = 'none';
    document.getElementById("app6").style.display = 'none';
    document.getElementById("app7").style.display = 'none';
    document.getElementById("app8").style.display = 'none';
    document.getElementById("app9").style.display = 'none';
    document.getElementById("app10").style.display = 'none';

    document.getElementById("app").style.top = '65.5%';
    document.getElementById("app2").style.top = '65.5%';
    document.getElementById("app").style.marginLeft = '20%';
    document.getElementById("app2").style.marginLeft = '70%';
  }
  else if(fullTestSound){
    document.getElementById("radiosRight").style.display = 'block';
    document.getElementById("radiosLeft").style.display = 'block';
    //left
    document.getElementById("app").style.display = 'block';
    document.getElementById("app3").style.display = 'block';
    document.getElementById("app5").style.display = 'block';
    document.getElementById("app7").style.display = 'block';

    //right
    document.getElementById("app2").style.display = 'block';
    document.getElementById("app4").style.display = 'block';
    document.getElementById("app6").style.display = 'block';
    document.getElementById("app8").style.display = 'block';

    document.getElementById("app9").style.display = 'none';
    document.getElementById("app10").style.display = 'none';

    document.getElementById("app").style.top = '65.5%';
    document.getElementById("app2").style.top = '65.5%';
    document.getElementById("app3").style.top = '65.5%';
    document.getElementById("app4").style.top = '65.5%';
    document.getElementById("app5").style.top = '65.5%';
    document.getElementById("app6").style.top = '65.5%';
    document.getElementById("app7").style.top = '65.5%';
    document.getElementById("app8").style.top = '65.5%';

    document.getElementById("app").style.marginLeft = '5.5%';
    document.getElementById("app3").style.marginLeft = '15.5%';
    document.getElementById("app5").style.marginLeft = '25.5%';
    document.getElementById("app7").style.marginLeft = '35.5%';
    document.getElementById("app2").style.marginLeft = '55.5%';
    document.getElementById("app4").style.marginLeft = '65.5%';
    document.getElementById("app6").style.marginLeft = '75.5%';
    document.getElementById("app8").style.marginLeft = '85.5%';
   
  }
  else if(fullTestVisuals){
    document.getElementById("radiosRight").style.display = 'none';
    document.getElementById("radiosLeft").style.display = 'none';
    //left
    document.getElementById("app").style.display = 'block';
    document.getElementById("app3").style.display = 'block';
    document.getElementById("app5").style.display = 'block';
    document.getElementById("app7").style.display = 'block';
    document.getElementById("app9").style.display = 'block';

    //right
    document.getElementById("app2").style.display = 'block';
    document.getElementById("app4").style.display = 'block';
    document.getElementById("app6").style.display = 'block';
    document.getElementById("app8").style.display = 'block';
    document.getElementById("app10").style.display = 'block';

    document.getElementById("app").style.top = '74.5%';
    document.getElementById("app2").style.top = '74.5%';
    document.getElementById("app3").style.top = '64.5%';
    document.getElementById("app4").style.top = '64.5%';
    document.getElementById("app5").style.top = '64.5%';
    document.getElementById("app6").style.top = '64.5%';
    document.getElementById("app7").style.top = '64.5%';
    document.getElementById("app8").style.top = '64.5%';    
    document.getElementById("app9").style.top = '74.5%';
    document.getElementById("app10").style.top = '74.5%';

    document.getElementById("app").style.marginLeft = '13.5%';
    document.getElementById("app3").style.marginLeft = '6.5%';
    document.getElementById("app5").style.marginLeft = '20.5%';
    document.getElementById("app7").style.marginLeft = '34.5%';
    document.getElementById("app9").style.marginLeft = '27.5%';
    
    document.getElementById("app2").style.marginLeft = '63.0%';
    document.getElementById("app4").style.marginLeft = '56.0%';
    document.getElementById("app6").style.marginLeft = '70.0%';
    document.getElementById("app8").style.marginLeft = '84.0%';
    document.getElementById("app10").style.marginLeft = '77.0%';
   
  }
  if(!radioButtons && !fullTestSound && !fullTestVisuals){

    document.getElementById("radiosRight").style.display = 'none';
    document.getElementById("radiosLeft").style.display = 'none';

    document.getElementById("app").style.display = 'block';
    document.getElementById("app2").style.display = 'block';
    document.getElementById("app3").style.display = 'block';
    document.getElementById("app4").style.display = 'block';
    document.getElementById("app5").style.display = 'none';
    document.getElementById("app6").style.display = 'none';
    document.getElementById("app7").style.display = 'none';
    document.getElementById("app8").style.display = 'none';    
    document.getElementById("app9").style.display = 'none';
    document.getElementById("app10").style.display = 'none';

    document.getElementById("app").style.top = '69.5%';
    document.getElementById("app2").style.top = '69.5%';
    document.getElementById("app3").style.top = '69.5%';
    document.getElementById("app4").style.top = '69.5%';
    document.getElementById("app").style.marginLeft = '10%';
    document.getElementById("app2").style.marginLeft = '60%';
    document.getElementById("app3").style.marginLeft = '30.5%';
    document.getElementById("app4").style.marginLeft = '80%';
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

  // in between always stop the oscillator
  if(isStarted && !playingLeft && !playingRight){
    osc.stop(0.1);
    isStarted = 0;
  }


  // TEST 1 | WAVEFORM + ATTACK 
  if(findTest("test1Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;


    // keeping these levels always up to the maximum (0.0 and 1.0)
    let attackLevel = 1.0;
    let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
    let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
  // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
  //let susPercent = 0.5;

    let attackTime = 1.0;
    let decayTime = 0.5;
    let releaseTime = 1.0;

    if(playingLeft){

      if(radiosLeft_value != null){ 
        if(currentValueSlider1 > 0)
          attackTime = map(currentValueSlider1, 0, 8, 0, 2.0);
        else
          attackTime = map(currentValueSlider1, -8, 0, 2.0, 0);

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

        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime)
          env.setRange(attackLevel, releaseLevel);
          //unecessary
          //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds=0;
        }
      }
    }
    if(playingRight) {

      if(radiosRight_value != null ){
        if(currentValueSlider2 > 0)
          attackTime = map(currentValueSlider2, 0, 8, 0, 2.0);
        else
          attackTime = map(currentValueSlider2, -8, 0, 2.0, 0);
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

        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
          env.setRange(attackLevel, releaseLevel);
          //unecessary
          //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds=0;
        }
      }
    }
  }

  // TEST 2 | WAVEFORM + RELEASE
  if(findTest("test2Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

     // keeping these levels always up to the maximum (0.0 and 1.0)
     let attackLevel = 1.0;
     let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
     let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    //let susPercent = 0.5;
 
     let attackTime = 1.0; // half value from the total 2.0 of the attack tests
     let decayTime = 0.5; // half value from the total 1.0 of the decay tests
     let releaseTime = 1.0; // half value from the total 2.0 of the release tests

    if(playingLeft){
      if(radiosLeft_value != null){
        if(currentValueSlider1 > 0)
          releaseTime = map(currentValueSlider1, 0, 8, 0, 2.0);
        else
          releaseTime = map(currentValueSlider1, -8, 0, 2.0, 0);
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

        
        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime)
          env.setRange(attackLevel, releaseLevel);
          //unecessary
          //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds = 0;
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        if(currentValueSlider2 > 0)
          releaseTime = map(currentValueSlider2, 0, 8, 0, 2.0);
        else
          releaseTime = map(currentValueSlider2, -8, 0, 2.0, 0);
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

        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime)
          env.setRange(attackLevel, releaseLevel);
         //unecessary 
          //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds = 0;
        }
      }
    }
  }

  // TEST 3 | WAVEFORM + DECAY
  if(findTest("test3Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

     // keeping these levels always up to the maximum (0.0 and 1.0)
     let attackLevel = 1.0;
     let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
     let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    //let susPercent = 0.5;
 
    let attackTime = 1.0;
    let decayTime = 0.5;
    let releaseTime = 1.0;

    if(playingLeft){
      if(radiosLeft_value != null){
        if(currentValueSlider1 > 0)
          decayTime = map(currentValueSlider1, 0, 8, 0.0, 1.0);
        else
          decayTime = map(currentValueSlider1, -8, 0, 1.0, 0.0);

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
        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime)
          env.setRange(attackLevel, releaseLevel);
          //unecessary
          //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds = 0;
        }

      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        
        if(currentValueSlider2 > 0)
          decayTime = map(currentValueSlider2, 0, 8, 0.0, 1.0);
        else
          decayTime = map(currentValueSlider2, -8, 0, 1.0, 0.0);

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
        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
          env.setRange(attackLevel, releaseLevel);
          //unecessary
          //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds = 0;
        }

      }
    }
  }

  // TEST 4 | WAVEFORM + SUSTAIN
  if(findTest("test4Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;
    
    radioButtons = 1;
    slider = 1;
    sliderDouble = 0;

     // keeping these levels always up to the maximum (0.0 and 1.0)
     let attackLevel = 1.0;
     let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
     let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    let susPercent = 0.5;
 
    let attackTime = 1.0; // half value from the total 2.0 of the attack tests
    let decayTime = 0.5; // half value from the total 1.0 of the decay tests
    let releaseTime = 1.0; // half value from the total 2.0 of the release tests
    
    if(playingLeft){
      if(radiosLeft_value != null){
        if(currentValueSlider1 > 0)
          susPercent = map(currentValueSlider1, 0, 8, 0.0, 1.0);
        else
          susPercent = map(currentValueSlider1, -8, 0, 1.0, 0.0);

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

        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          //here is the other way around to keep the sustainTime
          //env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.setRange(attackLevel, releaseLevel);
          env.play();
          seconds = 0;
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){
        if(currentValueSlider2 > 0)
          susPercent = map(currentValueSlider2, 0, 8, 0.0, 1.0);
        else
          susPercent = map(currentValueSlider2, -8, 0, 1.0, 0.0);
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

         if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          //env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds = 0;
        }
      }
    }
  }

  // TEST 5 | ATTACK + RELEASE
  if(findTest("test5Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    // keeping these levels always up to the maximum (0.0 and 1.0)
    let attackLevel = 1.0;
    let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
    let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    //let susPercent = 0.5;
 
    let attackTime = 1.0; // half value from the total 2.0 of the attack tests
    let decayTime = 0.5; // half value from the total 1.0 of the decay tests
    let releaseTime = 1.0; // half value from the total 2.0 of the release tests

    if(playingLeft){
      if(currentValueSlider1 > 0)
        attackTime = map(currentValueSlider1, 0, 8, 0.0, 2.0);
      else
        attackTime = map(currentValueSlider1, -8, 0, 2.0, 0.0);

      if(currentValueSlider1double > 0)
        releaseTime = map(currentValueSlider1double, 0, 8, 0.0, 2.0);
      else
        releaseTime = map(currentValueSlider1double, -8, 0, 2.0, 0.0);
      
      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        //unecessary
        //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
    if(playingRight) {
      if(currentValueSlider2 > 0)
        attackTime = map(currentValueSlider2, 0, 8, 0, 2.0);
      else
        attackTime = map(currentValueSlider2, -8, 0, 2.0, 0);

      if(currentValueSlider2double > 0)
        releaseTime = map(currentValueSlider2double, 0, 8, 0, 2.0);
      else
        releaseTime = map(currentValueSlider2double, -8, 0, 2.0, 0);

      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        //unecessary
        //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
  }

  // TEST 6 | ATTACK + DECAY
  if(findTest("test6Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    // keeping these levels always up to the maximum (0.0 and 1.0)
    let attackLevel = 1.0;
    let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
    let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    //let susPercent = 0.5;
 
    let attackTime = 1.0; // half value from the total 2.0 of the attack tests
    let decayTime = 0.5; // half value from the total 1.0 of the decay tests
    let releaseTime = 1.0; // half value from the total 2.0 of the release tests

    if(playingLeft){
      if(currentValueSlider1 > 0)
        attackTime = map(currentValueSlider1, 0, 8, 0.0, 2.0);
      else
        attackTime = map(currentValueSlider1, -8, 0, 2.0, 0.0);

      if(currentValueSlider1double > 0)
        decayTime = map(currentValueSlider1double, 0, 8, 0.0, 2.0);
      else
        decayTime = map(currentValueSlider1double, -8, 0, 2.0, 0.0);

      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        //unecessary
        //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
    if(playingRight) {
      if(currentValueSlider2 > 0)
        attackTime = map(currentValueSlider2, 0, 8, 0.0, 2.0);
      else
        attackTime = map(currentValueSlider2, -8, 0, 2.0, 0.0);

      if(currentValueSlider2double > 0)
        decayTime = map(currentValueSlider2double, 0, 8, 0.0, 2.0);
      else
        decayTime = map(currentValueSlider2double, -8, 0, 2.0, 0.0);

      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        //unecessary
        //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
  }
 
  // TEST 7 |  ATTACK + SUSTAIN
  if(findTest("test7Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    // keeping these levels always up to the maximum (0.0 and 1.0)
    let attackLevel = 1.0;
    let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
    let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    let susPercent = 0.5;

    let attackTime = 1.0; // half value from the total 2.0 of the attack tests
    let decayTime = 0.5; // half value from the total 1.0 of the decay tests
    let releaseTime = 1.0; // half value from the total 2.0 of the release tests

    if(playingLeft){
      if(currentValueSlider1 > 0)
        attackTime = map(currentValueSlider1, 0, 8, 0.0, 2.0);
      else
        attackTime = map(currentValueSlider1, -8, 0, 2.0, 0.0);

      if(currentValueSlider1double > 0)
        susPercent = map(currentValueSlider1double, 0, 8, 0.0, 1.0);
      else
        susPercent = map(currentValueSlider1double, -8, 0, 1.0, 0.0);
      
      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        //here is the other way around to keep the sustainTime
        //env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        env.play();
        seconds = 0;
      }
    }
    if(playingRight) {
      if(currentValueSlider2 > 0)
        attackTime = map(currentValueSlider2, 0, 8, 0.0, 2.0);
      else
        attackTime = map(currentValueSlider2, -8, 0, 2.0, 0.0);

      if(currentValueSlider2double > 0)
        susPercent = map(currentValueSlider1double, 0, 8, 0.0, 1.0);
      else
        susPercent = map(currentValueSlider1double, -8, 0, 1.0, 0.0);
      
      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
  }

  // TEST 8 | RELEASE + DECAY
  if(findTest("test8Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

   // keeping these levels always up to the maximum (0.0 and 1.0)
   let attackLevel = 1.0;
   let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
   let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
   // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
   //let susPercent = 0.5;

   let attackTime = 1.0; // half value from the total 2.0 of the attack tests
   let decayTime = 0.5; // half value from the total 1.0 of the decay tests
   let releaseTime = 1.0; // half value from the total 2.0 of the release tests

    //let dryWet;
    let reverbTime, decayRate = 2;

    if(playingLeft){
      if(currentValueSlider1 > 0)
        releaseTime = map(currentValueSlider1, 0, 8, 0.0, 2.0);
      else
        releaseTime = map(currentValueSlider1, -8, 0, 2.0, 0.0);

      if(currentValueSlider1double > 0)
        decayTime = map(currentValueSlider1double, 0, 8, 0.0, 1.0);
      else
        decayTime = map(currentValueSlider1double, -8, 0, 1.0, 0.0);
      
      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        //unecessary
        //env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
    if(playingRight) {
      if(currentValueSlider2 > 0)
        releaseTime = map(currentValueSlider2, 0, 8, 0.0, 2.0);
      else
        releaseTime = map(currentValueSlider2, -8, 0, 2.0, 0.0);

      if(currentValueSlider2double > 0)
        decayTime = map(currentValueSlider2double, 0, 8, 0.0, 1.0);
      else
        decayTime = map(currentValueSlider2double, -8, 0, 1.0, 0.0);
      
      env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
      osc.setType('sine');
      osc.amp(env);

      // C2 C3 C4
      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
        env.setRange(attackLevel, releaseLevel);
        env.play();
        seconds = 0;
      }
    }
  }

  // TEST 9 | RELEASE + SUSTAIN
  if(findTest("test9Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

   // keeping these levels always up to the maximum (0.0 and 1.0)
   let attackLevel = 1.0;
   let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
   let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
   // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
   let susPercent = 0.5;

   let attackTime = 1.0; // half value from the total 2.0 of the attack tests
   let decayTime = 0.5; // half value from the total 1.0 of the decay tests
   let releaseTime = 1.0; // half value from the total 2.0 of the release tests

    if(playingLeft){
      if(currentValueSlider1 > 0)
        releaseTime = map(currentValueSlider1, 0, 8, 0.0, 2.0);
      else
        releaseTime = map(currentValueSlider1, -8, 0, 2.0, 0.0);

      if(currentValueSlider1double > 0)
        susPercent = map(currentValueSlider1double, 0, 8, 0.0, 1.0);
      else
        susPercent = map(currentValueSlider1double, -8, 0, 1.0, 0.0);
        
      env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
      osc.setType('sine');
      osc.amp(env);

      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
    if(playingRight) {
      if(currentValueSlider2 > 0)
        releaseTime = map(currentValueSlider2, 0, 8, 0.0, 2.0);
      else
        releaseTime = map(currentValueSlider2, -8, 0, 2.0, 0.0);

      if(currentValueSlider2double > 0)
        susPercent = map(currentValueSlider2double, 0, 8, 0.0, 1.0);
      else
        susPercent = map(currentValueSlider2double, -8, 0, 1.0, 0.0);

      osc.setType('sine');
      osc.amp(env);
      
      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(getNote())));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
  }

  // TEST 10 | DECAY + SUSTAIN
  if(findTest("test10Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    // keeping these levels always up to the maximum (0.0 and 1.0)
   let attackLevel = 1.0;
   let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
   let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
   // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
   let susPercent = 0.5;

   let attackTime = 1.0; // half value from the total 2.0 of the attack tests
   let decayTime = 0.5; // half value from the total 1.0 of the decay tests
   let releaseTime = 1.0; // half value from the total 2.0 of the release tests


    if(playingLeft){
      if(currentValueSlider1 > 0)
        decayTime = map(currentValueSlider1, 0, 8, 0, 1.0);
      else
        decayTime = map(currentValueSlider1, -8, 0, 1.0, 0);

      if(currentValueSlider1double > 0)
        susPercent = map(currentValueSlider1double, 0, 8, 0.0, 1.0);
      else
        susPercent = map(currentValueSlider1double, -8, 0, 1.0, 0.0);
      
      osc.setType('sine');
      osc.amp(env);
      
      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
    if(playingRight) {
      if(currentValueSlider2 > 0)
        decayTime = map(currentValueSlider2, 0, 8, 0, 1);
      else
        decayTime = map(currentValueSlider2, -8, 0, 1, 0);

      if(currentValueSlider2double > 0)
        susPercent = map(currentValueSlider2double, 0, 8, 0.0, 1);
      else
        susPercent = map(currentValueSlider2double, -8, 0, 1, 0.0);
        
      osc.setType('sine');
      osc.amp(env);
      
      if (seconds == 4 || seconds > 4){
        osc.freq(midiToFreq(int(random(36, 48, 60))));
        env.setRange(attackLevel, releaseLevel);
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.play();
        seconds = 0;
      }
    }
  }

  // TESTE 11 | SYMMETRY + THICKNESS
  if(findTest("test11Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw; 

    push();
    noFill();
    translate(width/5, height/2);
    if(currentValueSlider1double > 0)
      sw = int(map(currentValueSlider1double, 0, 8, 1, 25));
    if(currentValueSlider1double <= 0)
      sw = int(map(currentValueSlider1double, -8, 0, 25, 1));
    strokeWeight(sw);
    if(currentValueSlider1 < 0) 
      arc(0, 0, map(currentValueSlider1, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(currentValueSlider1 >= 0) 
      arc(0, 0, map(currentValueSlider1, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop()

    push();
    noFill();
    translate(width/1.25, height/2);
    if(currentValueSlider2double > 0)
      sw = int(map(currentValueSlider2double, 0, 8, 1, 25));
    if(currentValueSlider2double <= 0)
      sw = int(map(currentValueSlider2double, -8, 0, 25, 1));
    strokeWeight(sw);
    if(currentValueSlider2 < 0) 
      arc(0, 0, map(currentValueSlider2, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(currentValueSlider2 >= 0) 
      arc(0, 0, map(currentValueSlider2, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop()
  }

  // TESTE 12 | SYMMETRY + ORIENTATION
  if(findTest("test12Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);
    let angle = map(currentValueSlider1double, 0, 8, 0, 180);
    if(currentValueSlider1double > 0)
      rotate(PI / 180 * angle);
    if(currentValueSlider1double <= 0)
    rotate(PI / 180 * angle);
    if(currentValueSlider1 < 0) 
      arc(0, 0, map(currentValueSlider1, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(currentValueSlider1 >= 0) 
      arc(0, 0, map(currentValueSlider1, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop();

    push();
    noFill();
    translate(width/1.25, height/2);

    strokeWeight(10);
    let angle2 = map(currentValueSlider2double, 0, 8, 0, 180);
    if(currentValueSlider2double > 0)
      rotate(PI / 180 * angle2);
    if(currentValueSlider2double <= 0)
      rotate(PI / 180 * angle2);
    if(currentValueSlider2 < 0) 
      arc(0, 0, map(currentValueSlider2, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(currentValueSlider2 >= 0) 
      arc(0, 0, map(currentValueSlider2, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);

    pop();
  }
  
  // TESTE 13 | SYMMETRY + IRREGULARITY
  if(findTest("test13Bol").active) {

    imageTest = 1;
    soundTest = 0;

     fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);
    //console.log(lerp(5, 5, map(currentValueSlider1double, -8, 0, 0, 1)));
    let irregularList;
   
    if(currentValueSlider1double > 0) {
      irregularList = [map(currentValueSlider1double, 0, 8, 5, 5), map(currentValueSlider1double, 0, 8, 5, 20), map(currentValueSlider1double, 0, 8, 5, 30), map(currentValueSlider1double, 0, 8, 5, 40)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider1double <= 0) {
      irregularList = [map(currentValueSlider1double, -8, 0, 5, 5), map(currentValueSlider1double, -8, 0, 20, 5), map(currentValueSlider1double, -8, 0, 30, 5), map(currentValueSlider1double, -8, 0, 40, 5)];
      setLineDash(irregularList);  
    }
    beginShape();
    if(currentValueSlider1 < 0) 
      arc(0, 0, map(currentValueSlider1, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(currentValueSlider1 >= 0) 
      arc(0, 0, map(currentValueSlider1, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    endShape(CLOSE);
    pop();

    push();
    noFill();
    translate(width/1.25, height/2);

    strokeWeight(10);
    //console.log(lerp(5, 5, map(currentValueSlider2double, -8, 0, 0, 1)));
    let irregularList2;
   
    if(currentValueSlider2double > 0) {
      irregularList2 = [map(currentValueSlider2double, 0, 8, 5, 5), map(currentValueSlider2double, 0, 8, 5, 20), map(currentValueSlider2double, 0, 8, 5, 30), map(currentValueSlider2double, 0, 8, 5, 40)];
      setLineDash(irregularList2);  
    }
    if(currentValueSlider2double <= 0) {
      irregularList2 = [map(currentValueSlider2double, -8, 0, 5, 5), map(currentValueSlider2double, -8, 0, 20, 5), map(currentValueSlider2double, -8, 0, 30, 5), map(currentValueSlider2double, -8, 0, 40, 5)];
      setLineDash(irregularList2);  
    }
    if(currentValueSlider2 < 0) 
      arc(0, 0, map(currentValueSlider2, -8, 0, 200, 300), 200, PI + HALF_PI, HALF_PI);
    if(currentValueSlider2 >= 0) 
      arc(0, 0, map(currentValueSlider2, 0, 8, 300, 200), 200, PI + HALF_PI, HALF_PI);
    arc(0, 0, 200, 200, HALF_PI, PI + HALF_PI);
    pop();

  }

  // TESTE 14 | SYMMETRY + ANGULARITY
  if(findTest("test14Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    const numVertices = 10;
    const spacing = 360 / numVertices;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);

   
    let radius = 100;

    let angleChange = 180;
    let asymmetry = 0, asymmetry2 = 0;

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(currentValueSlider1double <= 0) {
        angleChange = map(currentValueSlider1double, -8, 0, 50, 150);
      }
      if(currentValueSlider1double > 0) {
        angleChange = map(currentValueSlider1double, 0, 8, 150, 50);
      }

      if(currentValueSlider1 <= 0) {
        asymmetry = map(currentValueSlider1, -8, 0, 0, 50)
        asymmetry2 = map(currentValueSlider1, -8, 0, 0, 10)
      }
      if(currentValueSlider1 > 0) {
        asymmetry = map(currentValueSlider1, 0, 8, 50, 0)
        asymmetry2 = map(currentValueSlider1, 0, 8, 10, 0)
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;    

      if(i == 0){
        vertex(x, y);
      }
      
      if(currentValueSlider1double > 4 || currentValueSlider1double < -4 ){
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
    pop();

    push();
    noFill();
    translate(width/1.25, height/2);

    strokeWeight(10);

    let radius2 = 100;

    let angleChange2 = 180;
    let asymmetry3 = 0, asymmetry4 = 0;

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(currentValueSlider2double <= 0) {
        angleChange2 = map(currentValueSlider2double, -8, 0, 50, 150);
      }
      if(currentValueSlider2double > 0) {
        angleChange2 = map(currentValueSlider2double, 0, 8, 150, 50);
      }

      if(currentValueSlider2 <= 0) {
        asymmetry3 = map(currentValueSlider2, -8, 0, 0, 50)
        asymmetry4 = map(currentValueSlider2, -8, 0, 0, 10)
      }
      if(currentValueSlider2 > 0) {
        asymmetry3 = map(currentValueSlider2, 0, 8, 50, 0)
        asymmetry4 = map(currentValueSlider2, 0, 8, 10, 0)
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius2;
      const y = sin(radians(angle)) * radius2;    

      if(i == 0){
        vertex(x, y);
      }
      
      if(currentValueSlider2double > 4 || currentValueSlider2double < -4 ){
        if(i == 0)
          rotate(PI / 180 * 70);
        star(0, 0, 150 - angleChange2 + 30, 100, 10, asymmetry4);
      }
      else if(i != 0){
        if( i < 3 || i > 8)
        angleChange2 += asymmetry3;  
        const cAngle = angle - spacing/2;
        const cX = cos(radians(cAngle)) * angleChange2;
        const cY = sin(radians(cAngle)) * angleChange2;
        quadraticVertex(cX, cY, x, y);
      }
    }

    endShape();
    pop();

  }
  
  // TESTE 15 | THICKNESS + ORIENTATION
  if(findTest("test15Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw; 

    push();
    noFill();
    translate(width/5, height/2);
    rectMode(CENTER);
    if(currentValueSlider1double > 0)
      sw = int(map(currentValueSlider1double, 0, 8, 1, 25));
    if(currentValueSlider1double <= 0)
      sw = int(map(currentValueSlider1double, -8, 0, 25, 1));
    strokeWeight(sw);
    let angle = map(currentValueSlider1, 0, 8, 0, 45);
    if(currentValueSlider1 > 0)
      rotate(PI / 180 * angle);
    if(currentValueSlider1 <= 0)
    rotate(PI / 180 * angle);
    rect(0, 0, 200, 200);
    pop()

    push();
    noFill();
    translate(width/1.25, height/2);
    rectMode(CENTER);
    if(currentValueSlider2double > 0)
      sw = int(map(currentValueSlider2double, 0, 8, 1, 25));
    if(currentValueSlider2double <= 0)
      sw = int(map(currentValueSlider2double, -8, 0, 25, 1));
    strokeWeight(sw);
    let angle2 = map(currentValueSlider2, 0, 8, 0, 45);
    if(currentValueSlider2 > 0)
      rotate(PI / 180 * angle2);
    if(currentValueSlider2 <= 0)
    rotate(PI / 180 * angle2);
    rect(0, 0, 200, 200);
    pop()
  }

  // TESTE 16 | THICKNESS + IRREGULARITY  
  if(findTest("test16Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw, irregularList;

    push();
    noFill();
    translate(width/5, height/2);
   
    if(currentValueSlider1double > 0) {
      irregularList = [map(currentValueSlider1double, 0, 8, 5, 5), map(currentValueSlider1double, 0, 8, 5, 20), map(currentValueSlider1double, 0, 8, 5, 30), map(currentValueSlider1double, 0, 8, 5, 40)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider1double <= 0) {
      irregularList = [map(currentValueSlider1double, -8, 0, 5, 5), map(currentValueSlider1double, -8, 0, 20, 5), map(currentValueSlider1double, -8, 0, 30, 5), map(currentValueSlider1double, -8, 0, 40, 5)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider1 > 0) 
      sw = int(map(currentValueSlider1, 0, 8, 1, 25));
    if(currentValueSlider1 <= 0) 
      sw = int(map(currentValueSlider1, -8, 0, 25, 1));
    strokeWeight(sw);
    ellipse(0,0, 200, 200);
    pop();

    push();
    noFill();
    translate(width/1.25, height/2);output1double

    if(currentValueSlider2double > 0) {
      irregularList2 = [map(currentValueSlider2double, 0, 8, 5, 5), map(currentValueSlider2double, 0, 8, 5, 20), map(currentValueSlider2double, 0, 8, 5, 30), map(currentValueSlider2double, 0, 8, 5, 40)];
      setLineDash(irregularList2);  
    }
    if(currentValueSlider2double <= 0) {
      irregularList2 = [map(currentValueSlider2double, -8, 0, 5, 5), map(currentValueSlider2double, -8, 0, 20, 5), map(currentValueSlider2double, -8, 0, 30, 5), map(currentValueSlider2double, -8, 0, 40, 5)];
      setLineDash(irregularList2);  
    }
    if(currentValueSlider2 > 0) 
      sw = int(map(currentValueSlider2, 0, 8, 1, 25));
    if(currentValueSlider2 <= 0) 
      sw = int(map(currentValueSlider2, -8, 0, 25, 1));
    strokeWeight(sw);
    ellipse(0,0, 200, 200);
    pop();  
  }
  
  // TESTE 17 | THICKNESS + ANGULARITY  
  if(findTest("test17Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;


    const numVertices = 10;
    let radius = 100;
    const spacing = 360 / numVertices;

    let sw, angleChange = 180;

    push();
    noFill();
    translate(width/5, height/2);
    
    if(currentValueSlider1 > 0)
      sw = int(map(currentValueSlider1, 0, 8, 1, 25));
    if(currentValueSlider1 <= 0)
      sw = int(map(currentValueSlider1, -8, 0, 25, 1));
    strokeWeight(sw);

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(currentValueSlider1double <= 0) {
        angleChange = map(currentValueSlider1double, -8, 0, 50, 150);
      }
      if(currentValueSlider1double > 0) {
        angleChange = map(currentValueSlider1double, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(currentValueSlider1double > 4 || currentValueSlider1double < -4 ){
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
    translate(width/1.25, height/2);
    
    if(currentValueSlider2 > 0)
      sw = int(map(currentValueSlider2, 0, 8, 1, 25));
    if(currentValueSlider2 <= 0)
      sw = int(map(currentValueSlider2, -8, 0, 25, 1));
    strokeWeight(sw);

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(currentValueSlider2double <= 0) {
        angleChange = map(currentValueSlider2double, -8, 0, 50, 150);
      }
      if(currentValueSlider2double > 0) {
        angleChange = map(currentValueSlider2double, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(currentValueSlider2double > 4 || currentValueSlider2double < -4 ){
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

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    let sw, irregularList;

    push();
    noFill();
    translate(width/5, height/2);

    rectMode(CENTER);
    strokeWeight(10);
   
    if(currentValueSlider1double > 0) {
      irregularList = [map(currentValueSlider1double, 0, 8, 5, 5), map(currentValueSlider1double, 0, 8, 5, 20), map(currentValueSlider1double, 0, 8, 5, 30), map(currentValueSlider1double, 0, 8, 5, 40)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider1double <= 0) {
      irregularList = [map(currentValueSlider1double, -8, 0, 5, 5), map(currentValueSlider1double, -8, 0, 20, 5), map(currentValueSlider1double, -8, 0, 30, 5), map(currentValueSlider1double, -8, 0, 40, 5)];
      setLineDash(irregularList);  
    }
    let angle = map(currentValueSlider1, 0, 8, 0, 45);
    if(currentValueSlider1 > 0)
      rotate(PI / 180 * angle);
    if(currentValueSlider1 <= 0)
    rotate(PI / 180 * angle);
    rect(0, 0, 200, 200);
    pop();

    push();
    noFill();
    translate(width/1.25, height/2);

    rectMode(CENTER);
    strokeWeight(10);

    if(currentValueSlider2double > 0) {
      irregularList2 = [map(currentValueSlider2double, 0, 8, 5, 5), map(currentValueSlider2double, 0, 8, 5, 20), map(currentValueSlider2double, 0, 8, 5, 30), map(currentValueSlider2double, 0, 8, 5, 40)];
      setLineDash(irregularList2);  
    }
    if(currentValueSlider2double <= 0) {
      irregularList2 = [map(currentValueSlider2double, -8, 0, 5, 5), map(currentValueSlider2double, -8, 0, 20, 5), map(currentValueSlider2double, -8, 0, 30, 5), map(currentValueSlider2double, -8, 0, 40, 5)];
      setLineDash(irregularList2);  
    }
    let angle2 = map(currentValueSlider2, 0, 8, 0, 45);
    if(currentValueSlider2 > 0)
      rotate(PI / 180 * angle2);
    if(currentValueSlider2 <= 0)
      rotate(PI / 180 * angle2);
    rect(0, 0, 200, 200);
    pop();  

  }

  // TESTE 19 |ORIENTATION + ANGULARITY  
  if(findTest("test19Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 1;
    sliderDouble = 1;

    push();
    noFill();
    translate(width/5, height/2);
    strokeWeight(10);
    rectMode(CENTER);
    let angle = map(currentValueSlider1double, 0, 8, 0, 45);
    if(currentValueSlider1double > 0)
      rotate(PI / 180 * angle);
    if(currentValueSlider1double <= 0)
      rotate(PI / 180 * angle);
    if(currentValueSlider1 < 0) 
      square(0, 0, 200, map(currentValueSlider1, -8, 0, 0, 100));
    if(currentValueSlider1 >= 0) 
      square(0, 0, 200, map(currentValueSlider1, 0, 8, 100, 0));
    pop();

    push();
    noFill();
    translate(width/1.25, height/2);

    strokeWeight(10);
    rectMode(CENTER);
    let angle2 = map(currentValueSlider2double, 0, 8, 0, 45);
    if(currentValueSlider2double > 0)
      rotate(PI / 180 * angle2);
    if(currentValueSlider2double <= 0)
      rotate(PI / 180 * angle2);
    if(currentValueSlider2 < 0) 
      square(0, 0, 200, map(currentValueSlider2, -8, 0, 0, 100));
    if(currentValueSlider2 >= 0) 
      square(0, 0, 200, map(currentValueSlider2, 0, 8, 100, 0));
    pop();
  }
  
  // TESTE 20 |IRREGULARITY + ANGULARITY  
  if(findTest("test20Bol").active) {

    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 0;

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
       
    if(currentValueSlider1 > 0) {
      irregularList = [ 1,  map(currentValueSlider1, 0, 8, 5, 25)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider1 <= 0) {
      irregularList = [ 1,  map(currentValueSlider1, -8, 0, 25, 5)];
      setLineDash(irregularList);  
    }

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(currentValueSlider1double <= 0) {
        angleChange = map(currentValueSlider1double, -8, 0, 50, 150);
      }
      if(currentValueSlider1double > 0) {
        angleChange = map(currentValueSlider1double, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(currentValueSlider1double > 4 || currentValueSlider1double < -4 ){
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
    translate(width/1.25, height/2);

    strokeWeight(10);
    
     if(currentValueSlider2 > 0) {
      irregularList = [ 1,  map(currentValueSlider2, 0, 8, 25, 15)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider2 <= 0) {
      irregularList = [ 1,  map(currentValueSlider2, -8, 0, 15, 25)];
      setLineDash(irregularList);  
    }

    beginShape();

    for(let i = 0; i < numVertices+1; i++) {

      if(currentValueSlider2double <= 0) {
        angleChange = map(currentValueSlider2double, -8, 0, 50, 150);
      }
      if(currentValueSlider2double > 0) {
        angleChange = map(currentValueSlider2double, 0, 8, 150, 50);
      }

      const angle = i * spacing;
      const x = cos(radians(angle)) * radius;
      const y = sin(radians(angle)) * radius;

      if(i == 0)
        vertex(x, y);
      else if(currentValueSlider2double > 4 || currentValueSlider2double < -4 ){
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

  // TESTE 21 | ALL SOUND
  if(findTest("test21Bol").active) {

    imageTest = 0;
    soundTest = 1;

    fullTestSound = 1;
    fullTestVisuals = 0;

    radioButtons = 0;
    slider = 0;
    sliderDouble = 0;

     // keeping these levels always up to the maximum (0.0 and 1.0)
     let attackLevel = 1.0;
     let releaseLevel = 0.0; // to make the note end all the way to silence (0 is the level at the end of the release)
     let decayLevel = 0.5 // decay level (0 is the level at the end of the decay) 
    // o decayLevel a meio dos 2 acima é como se o sustainLevel estivesse a 0.5
    let susPercent = 0.5;
 
    let attackTime = 1.0; // half value from the total 2.0 of the attack tests
    let decayTime = 0.5; // half value from the total 1.0 of the decay tests
    let releaseTime = 1.0; // half value from the total 2.0 of the release tests
    
    if(playingLeft){
      if(radiosLeft_value != null){
        if(currentValueSlider1 > 0)
          susPercent = map(currentValueSlider1, 0, 8, 0.0, 1.0);
        else
          susPercent = map(currentValueSlider1, -8, 0, 1.0, 0.0);
        
        if(currentValueSlider1double > 0)
          attackTime = map(currentValueSlider1double, 0, 8, 0.0, 2.0);
        else
          attackTime = map(currentValueSlider1double, -8, 0, 2.0, 0.0);

        if(currentValueSlider5 > 0)
          releaseTime = map(currentValueSlider5, 0, 8, 0.0, 2.0);
        else
          releaseTime = map(currentValueSlider5, -8, 0, 2.0, 0.0);

        if(currentValueSlider7 > 0)
          decayTime = map(currentValueSlider7, 0, 8, 0.0, 1.0);
        else
          decayTime = map(currentValueSlider7, -8, 0, 1.0, 0.0);

        // WAVEFORM
        if(radiosLeft_value == "1.1")
          osc.setType('sine');
        else if(radiosLeft_value == "1.2")
          osc.setType('triangle');
        else if(radiosLeft_value == "1.3")
          osc.setType('square');
        else if(radiosLeft_value == "1.4")
          osc.setType('sawtooth') ;

        //console.log("susPerc:"+ susPercent + " attack:" + attackTime + " release:" + releaseTime + " decay:" + decayTime);
        
        osc.amp(env);

        if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          //here is the other way around to keep the sustainTime
          //env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.setRange(attackLevel, releaseLevel);
          env.play();
          seconds = 0;
        }
      }
    }
    if(playingRight) {
      if(radiosRight_value != null ){

        if(currentValueSlider2 > 0)
          susPercent = map(currentValueSlider2, 0, 8, 0.0, 1.0);
        else
          susPercent = map(currentValueSlider2, -8, 0, 1.0, 0.0);
        
        if(currentValueSlider2double > 0)
          attackTime = map(currentValueSlider2double, 0, 8, 0.0, 2.0);
        else
          attackTime = map(currentValueSlider2double, -8, 0, 2.0, 0.0);

        if(currentValueSlider6 > 0)
          releaseTime = map(currentValueSlider6, 0, 8, 0.0, 2.0);
        else
          releaseTime = map(currentValueSlider6, -8, 0, 2.0, 0.0);

        if(currentValueSlider8 > 0)
          decayTime = map(currentValueSlider8, 0, 8, 0.0, 1.0);
        else
          decayTime = map(currentValueSlider8, -8, 0, 1.0, 0.0);

        // WAVEFORM
        if(radiosRight_value == "2.1")
          osc.setType('sine');
        else if(radiosRight_value == "2.2")
          osc.setType('triangle');
        else if(radiosRight_value == "2.3")
          osc.setType('square');
        else if(radiosRight_value == "2.4")
          osc.setType('sawtooth') ;

        console.log("susPerc:"+ susPercent + " attack:" + attackTime + " release:" + releaseTime + " decay:" + decayTime);

        osc.amp(env);

         if (seconds == 4 || seconds > 4){
          osc.freq(midiToFreq(int(getNote())));
          //env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
          env.setRange(attackLevel, releaseLevel);
          env.setADSR(attackTime, decayTime, susPercent, releaseTime);
          env.play();
          seconds = 0;
        }
      }
    }

  }

   // TESTE 22 | ALL VISUALS
   if(findTest("test22Bol").active) {
    
    imageTest = 1;
    soundTest = 0;

    fullTestSound = 0;
    fullTestVisuals = 1;

    radioButtons = 0;
    slider = 0;
    sliderDouble = 0;

    push();
    noFill();
    translate(width/5, height/2);

    //IRREGULARITY
    if(currentValueSlider5 > 0) {
      irregularList = [map(currentValueSlider5, 0, 8, 5, 5), map(currentValueSlider5, 0, 8, 5, 20), map(currentValueSlider5, 0, 8, 5, 50), map(currentValueSlider5, 0, 8, 5, 70), map(currentValueSlider5, 0, 8, 50, 90)];
      setLineDash(irregularList);  
    }
    if(currentValueSlider5 <= 0) {
      irregularList = [map(currentValueSlider5, -8, 0, 5, 5), map(currentValueSlider5, -8, 0, 20, 5), map(currentValueSlider5, -8, 0, 30, 5), map(currentValueSlider5, -8, 0, 40, 5)];
      setLineDash(irregularList);  
    }

    // THICKNESS
    if(currentValueSlider7 > 0)
      sw = int(map(currentValueSlider7, 0, 8, 1, 25));
    if(currentValueSlider7 <= 0)
      sw = int(map(currentValueSlider7, -8, 0, 25, 1));
    strokeWeight(sw);
    
    // ORIENTATION
    rectMode(CENTER);
    let angle = map(currentValueSlider1double, 0, 8, 0, 45);
    if(currentValueSlider1double > 0)
      rotate(PI / 180 * angle);
    if(currentValueSlider1double <= 0)
      rotate(PI / 180 * angle);

    // ANGULARITY + SYMMETRY
    if(currentValueSlider1 < 0) {
      if(currentValueSlider9 < 0) {
        square(0, 0, 200, map(currentValueSlider1, -8, 0, 0, 100), map(currentValueSlider1, -8, 0, 0, 100) * map(currentValueSlider9, -8, 0, 0, 1), map(currentValueSlider1, -8, 0, 0, 100)* map(currentValueSlider9, -8, 0, 0, 1), map(currentValueSlider1, -8, 0, 0, 100));
      }
      if(currentValueSlider9 >= 0) {
        square(0, 0, 200, map(currentValueSlider1, -8, 0, 0, 100), map(currentValueSlider1, -8, 0, 0, 100) * map(currentValueSlider9, 0, 8, 1, 0), map(currentValueSlider1, -8, 0, 0, 100)* map(currentValueSlider9, 0, 8, 1, 0), map(currentValueSlider1, -8, 0, 0, 100));
      }
    }
    if(currentValueSlider1 >= 0) {
      if(currentValueSlider9 < 0) {
        square(0, 0, 200, map(currentValueSlider1, 0, 8, 100, 0), map(currentValueSlider1, 0, 8, 100, 0) * map(currentValueSlider9, -8, 0, 0, 1), map(currentValueSlider1, 0, 8, 100, 0) * map(currentValueSlider9, -8, 0, 0, 1), map(currentValueSlider1, 0, 8, 100, 0));
      }
      if(currentValueSlider9 >= 0) {
        square(0, 0, 200, map(currentValueSlider1, 0, 8, 100, 0), map(currentValueSlider1, 0, 8, 100, 0) * map(currentValueSlider9, 0, 8, 1, 0), map(currentValueSlider1, 0, 8, 100, 0) * map(currentValueSlider9, 0, 8, 1, 0), map(currentValueSlider1, 0, 8, 100, 0));
      }
    }

    pop();

    push();
    noFill();
    translate(width/1.25, height/2);

   //IRREGULARITY
   if(currentValueSlider6 > 0) {
    irregularList = [map(currentValueSlider6, 0, 8, 5, 5), map(currentValueSlider6, 0, 8, 5, 20), map(currentValueSlider6, 0, 8, 5, 50), map(currentValueSlider6, 0, 8, 5, 70), map(currentValueSlider6, 0, 8, 50, 90)];
    setLineDash(irregularList);  
  }
  if(currentValueSlider6 <= 0) {
    irregularList = [map(currentValueSlider6, -8, 0, 5, 5), map(currentValueSlider6, -8, 0, 20, 5), map(currentValueSlider6, -8, 0, 30, 5), map(currentValueSlider6, -8, 0, 40, 5)];
    setLineDash(irregularList);  
  }

  // THICKNESS
  if(currentValueSlider8 > 0)
    sw = int(map(currentValueSlider8, 0, 8, 1, 25));
  if(currentValueSlider8 <= 0)
    sw = int(map(currentValueSlider8, -8, 0, 25, 1));
  strokeWeight(sw);
  
  // ORIENTATION
  rectMode(CENTER);
  let angle2 = map(currentValueSlider2double, 0, 8, 0, 45);
  if(currentValueSlider2double > 0)
    rotate(PI / 180 * angle2);
  if(currentValueSlider2double <= 0)
    rotate(PI / 180 * angle2);

  // ANGULARITY + SYMMETRY
  if(currentValueSlider2 < 0) {
    if(currentValueSlider10 < 0) {
      square(0, 0, 200, map(currentValueSlider2, -8, 0, 0, 100), map(currentValueSlider2, -8, 0, 0, 100) * map(currentValueSlider10, -8, 0, 0, 1), map(currentValueSlider2, -8, 0, 0, 100)* map(currentValueSlider10, -8, 0, 0, 1), map(currentValueSlider2, -8, 0, 0, 100));
    }
    if(currentValueSlider10 >= 0) {
      square(0, 0, 200, map(currentValueSlider2, -8, 0, 0, 100), map(currentValueSlider2, -8, 0, 0, 100) * map(currentValueSlider10, 0, 8, 1, 0), map(currentValueSlider2, -8, 0, 0, 100)* map(currentValueSlider10, 0, 8, 1, 0), map(currentValueSlider2, -8, 0, 0, 100));
    }
  }
  if(currentValueSlider2 >= 0) {
    if(currentValueSlider10 < 0) {
      square(0, 0, 200, map(currentValueSlider2, 0, 8, 100, 0), map(currentValueSlider2, 0, 8, 100, 0) * map(currentValueSlider10, -8, 0, 0, 1), map(currentValueSlider2, 0, 8, 100, 0) * map(currentValueSlider10, -8, 0, 0, 1), map(currentValueSlider2, 0, 8, 100, 0));
    }
    if(currentValueSlider10 >= 0) {
      square(0, 0, 200, map(currentValueSlider2, 0, 8, 100, 0), map(currentValueSlider2, 0, 8, 100, 0) * map(currentValueSlider10, 0, 8, 1, 0), map(currentValueSlider2, 0, 8, 100, 0) * map(currentValueSlider10, 0, 8, 1, 0), map(currentValueSlider2, 0, 8, 100, 0));
    }
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

function startOscillator(){
  osc.start(0.1);
  isStarted = 1;
}

function setSliderValue(val, slider) {
  if(slider == "1")
    currentValueSlider1 = val;
  else if(slider == "1double")
    currentValueSlider1double = val;
  else if(slider == "2")
    currentValueSlider2 = val;
  else if(slider == "2double")
    currentValueSlider2double = val;
  else if(slider == "5")
    currentValueSlider5 = val;
  else if(slider == "6")
    currentValueSlider6 = val;
  else if(slider == "7")
    currentValueSlider7 = val;
  else if(slider == "8")
    currentValueSlider8 = val;
  else if(slider == "9")
    currentValueSlider9 = val;
  else if(slider == "10")
    currentValueSlider10 = val;
}

function getNote(){
  var note =  midiNotesConsidered[0];
  midiNotesConsidered.shift();
  //return midiNotesConsidered[Math.floor(Math.random() * midiNotesConsidered.length)];
  if(midiNotesConsidered.length==1)
    midiNotesConsidered.push(48, 60, 72)
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
  clearGrid(1,0);
  lastCheckedGrid1Cell = cellNr;
  document.getElementById(cellNr).value = "X";
}

function checkGrid2(cellNr) {
  clearGrid(0,1);
  lastCheckedGrid2Cell = cellNr;
  document.getElementById("2_"+cellNr).value = "X";
}

function clearGrid(test1, test2){
  if(test1){
    for(let i = 1; i < 26; i++){
      document.getElementById(i.toString()).value = null;
    }
  }
  if(test2){
    for(let i = 1; i < 26; i++){
      document.getElementById("2_" + i.toString()).value = null;
    }
  }
}

function Test(name){
  this.active = 0;
  this.name = name;

  this.slider1 = null;
  this.slider1double = null;
  this.tension = null;
  this.grid = null;
  
  this.slider2 = null;
  this.slider2double = null;
  this.tension2 = null;
  this.grid2 = null;

  this.slider5 = null;
  this.slider6 = null;
  this.slider7 = null;
  this.slider8 = null;
}

function findTest(name){
  for(let i = 0; i < 22; i++){
    if(tests[i].name == name)
      return tests[i];
  }
}

function saveTestChoices(testName){
  if(radioButtons){
    findTest(testName).slider1double = radiosLeft_value;
    findTest(testName).slider2double = radiosRight_value;
  }
  else if(fullTestSound){
    findTest(testName).slider1double = radiosLeft_value;
    findTest(testName).slider2double = radiosRight_value;
    findTest(testName).slider1double = currentValueSlider1double;
    findTest(testName).slider2double = currentValueSlider2double;
    findTest(testName).slider5 = currentValueSlider5;
    findTest(testName).slider6 = currentValueSlider6;
    findTest(testName).slider7 = currentValueSlider7;
    findTest(testName).slider8 = currentValueSlider8;
  }
  else if(fullTestVisuals){
    findTest(testName).slider1double = currentValueSlider1double;
    findTest(testName).slider2double = currentValueSlider2double;
    findTest(testName).slider5 = currentValueSlider5;
    findTest(testName).slider6 = currentValueSlider6;
    findTest(testName).slider7 = currentValueSlider7;
    findTest(testName).slider8 = currentValueSlider8;
    findTest(testName).slider9 = currentValueSlider9;
    findTest(testName).slider10 = currentValueSlider10;
  }
  else{
    findTest(testName).slider1double = currentValueSlider1double;
    findTest(testName).slider2double = currentValueSlider2double;
  }
  findTest(testName).slider1 = currentValueSlider1;
  findTest(testName).tension = outputSliderTensionLeft.innerHTML;
  findTest(testName).grid = lastCheckedGrid1Cell;
  
  findTest(testName).slider2 = currentValueSlider2;
  findTest(testName).tension2 = outputSliderTensionRight.innerHTML;
  findTest(testName).grid2 = lastCheckedGrid2Cell;
}

//TO DO save to document
function sendTestResults(){
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  let testResults = "<p><b>" + datetime +"</b></p>" + "\n";
  for(let i = 0; i < 20; i++){
    console.log("here1")
    let j = i+1;
    testResults += "TEST" + j + "|" + tests[i].slider1 + "_" + tests[i].slider1double + "_" +  tests[i].tension + "_" + tests[i].grid + "|" + tests[i].slider2 + "_" + tests[i].slider2double + "_" +  tests[i].tension2 + "_" + tests[i].grid2+ "\n<br>";
  }
  for(let i = 20; i < 22; i++){
    console.log("here2")
    let j = i+1;
    testResults += "TEST" + j + "|" + tests[i].slider1 + "_" + tests[i].slider1double + "_" + tests[i].slider5 + "_" + tests[i].slider7 + "_" +   tests[i].tension + "_" + tests[i].grid + "|" + tests[i].slider2 + "_" + tests[i].slider2double +  "_" + tests[i].slider6 + "_" + tests[i].slider8 + "_" +  tests[i].tension2 + "_" + tests[i].grid2+ "\n<br>";
  }
  console.log(testResults);
  
  window.localStorage.setItem('testResults', testResults);
  
  //DOWN ?
  //js_send(datetime, testResults);

  window.location.href="results.html";
}

function sendEmail(results, date) { 
  window.location="mailto:andreianmatos@tecnico.ulisboa.pt?subject=Result"+date+"&body="+results;
}
function submit(){
  saveTestChoices("test22Bol");
  sendTestResults(); // also calls to send email
}


/* AUTOMATIC EMAIL SENDING WITH THE INFORMATION 

<form id="javascript_form">
    <input type="text" name="subject" placeholder="Subject" />
    <textarea name="text" placeholder="Message"></textarea>
    <input type="submit" id="js_send" value="Send" />

    <!-- not required, but we'd appreciate it if you'd link to us somewhere on your site -->
    <p>Powered by <a href="https://postmail.invotes.com" target="_blank">PostMail</a></p>
</form>
*/

//update this with your js_form selector
    var form_id_js = "javascript_form";

    var data_js = {
        "access_token": "w02bm3vjsevjbehuthfg8yab"
    };

    function js_onSuccess() {
        // remove this to avoid redirect
        window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    }

    function js_onError(error) {
        // remove this to avoid redirect
        window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
    }

    function js_send(date, results) {
        
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                js_onSuccess();
            } else
            if(request.readyState == 4) {
                js_onError(request.response);
            }
        };

        data_js['subject'] = "TEST RESULTS | " + date;
        data_js['text'] = results;
        var params = toParams(data_js);

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);

        return false;
    }


    function toParams(data_js) {
        var form_data = [];
        for ( var key in data_js ) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        return form_data.join("&");
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

  chosen = 0;

  // save test choices
  saveTestChoices(currentTestBol);
  //console.log("SAVED FOR TEST" + currentTestBol + " and slider left is " + currentValueSlider1 + " and slider right is " + currentValueSlider2);


  while(!chosen){
    newTestNr = randomIntFromInterval(1,20);
    if(undoneTests.length == 2 && doneFullTests){
      newTestNr = undoneTests[0];
    }
    newTestBol = 'test' + newTestNr + 'Bol';
    if(undoneTests.length == 1 && doneFullTests){
      document.getElementById("testNext").style.display = 'none';
      document.getElementById("updateAnswers").style.display = 'block';
      document.getElementById("lastTest").style.display = 'block';
      document.getElementById("lastTest2").style.display = 'block';
      document.getElementById("submit").disabled = false;
      enableTests();
      newTestNr = undoneTests[0];
      newTestBol = 'test' + newTestNr + 'Bol';
      end = 1;
      chosen = 1;
    }
    else if(undoneTests.length == 1 && !doneFullTests){
      undoneTests.push('21','22');
      newTestNr = undoneTests[0];
      doneFullTests = 1;
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

  if(playingRight)
    playRight();
  if(playingLeft)
    playLeft();

  for(let i=0; i < 22; i++)
    tests[i].active = 0;
  findTest(newTestBol).active = 1;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  //at the end people are reviewing their answers
  if(!end ||(end && chosen)){
    if(end && chosen)
      chosen = 0;
    // clear inputs grid
    clearGrid(1,1);
    //clearTension values
    outputSliderTensionLeft.innerHTML = 1;
    outputSliderTensionRight.innerHTML = 1;
    sliderTensionLeft.value = 1;
    sliderTensionRight.value = 1;
    //check random radio button
    var radiosLeft = document.getElementsByName('radioLeft');
    var radiosRight = document.getElementsByName('radioRight');
    radiosLeft[Math.floor(Math.random() * 4)].checked = true;
    radiosRight[Math.floor(Math.random() * 4 )].checked = true;
    // clear round sliders
    
    /* IS GIVING PROBLEMS DRAWING THE SLIDER
    sliderCircular1.redrawActiveSliderCircularTestBeginning(randomIntFromInterval(-8,8));
    setSliderValue(randomIntFromInterval(-8,8),"1");
    setSliderValue(randomIntFromInterval(-8,8),"1double");
    setSliderValue(randomIntFromInterval(-8,8),"2");
    setSliderValue(randomIntFromInterval(-8,8),"2double");
    setSliderValue(randomIntFromInterval(-8,8),"5");
    setSliderValue(randomIntFromInterval(-8,8),"6");
    setSliderValue(randomIntFromInterval(-8,8),"7");
    setSliderValue(randomIntFromInterval(-8,8),"8");*/
    setSliderValue(initialSlider1,"1");
    setSliderValue(initialSlider1double,"1double");
    setSliderValue(initialSlider2,"2");
    setSliderValue(initialSlider2double,"2double");
    setSliderValue(initialSlider5,"5");
    setSliderValue(initialSlider6,"6");
    setSliderValue(initialSlider7,"7");
    setSliderValue(initialSlider8,"8");
    setSliderValue(initialSlider9,"9");
    setSliderValue(initialSlider10,"10");
  }
  // move on to next test
  currentTest(newTestBol); 
}

function currentTest(newTestBol) {
  if(currentTestBol != null) {
    //console.log(currentTestBol);
    if(currentTestBol.match(/\d+/)[0] > 20)
      document.getElementById(currentTestBol).style.background = "rgb(196,174,173)";
    else if(currentTestBol.match(/\d+/)[0] < 11)
      document.getElementById(currentTestBol).style.background = "#f0d696";
    else  
      document.getElementById(currentTestBol).style.background = "#9bc2b1";
    document.getElementById(currentTestBol).style.color = "#000";
    //document.getElementById(currentTestBol).disabled = false;
  }
  currentTestBol = newTestBol;
  document.getElementById(currentTestBol).style.background = "#000";
  document.getElementById(currentTestBol).style.color = "#fff";
}

function enableTests(){
  for(let i=1; i < 23; i++){
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

/* SLIDERS from https://github.com/tadejf84/js-range-slider */

class sliderCircular {

  /**
   * @constructor
   * 
   * @param {string} DOM selector
   * @param {array} sliderCirculars
   */
  constructor({ DOMselector, sliderCirculars }) {
      this.DOMselector = DOMselector;
      this.container = document.querySelector(this.DOMselector);  // sliderCircular container
      this.sliderCircularWidth = 150;                                     // sliderCircular width
      this.sliderCircularHeight =150;                                    // sliderCircular length
      this.cx = this.sliderCircularWidth / 2;                             // sliderCircular center X coordinate
      this.cy = this.sliderCircularHeight / 2;                            // sliderCircular center Y coordinate
      this.tau = 2 * Math.PI;                                     // Tau constant
      this.sliderCirculars = sliderCirculars;                                     // sliderCirculars array with opts for each sliderCircular
      this.arcFractionSpacing = 0;                             // Spacing between arc fractions
      this.arcFractionLength = 13;                                // Arc fraction length
      this.arcFractionThickness = 25;                             // Arc fraction thickness
      this.arcBgFractionColor = '#D8D8D8';                        // Arc fraction color for background sliderCircular
      this.handleFillColor = '#fff';                              // sliderCircular handle fill color
      this.handleStrokeColor = black;                         // sliderCircular handle stroke color
      this.handleStrokeThickness = 3;                             // sliderCircular handle stroke thickness    
      this.mouseDown = false;                                     // Is mouse down
      this.activesliderCircular = null;                                   // Stores active (selected) sliderCircular
      this.currentValue = null;
  }

  /**
   * Draw sliderCirculars on init
   * 
   */
  draw() {

      // Create legend UI
      //this.createLegendUI();

      // Create and append SVG holder

      let svgContainer, svg;

      if(this.DOMselector === "#app"){
         svgContainer = document.createElement('div');
        svgContainer.classList.add('sliderCircular__data1');
         svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', this.sliderCircularWidth);
        svg.setAttribute('width', this.sliderCircularHeight);
        svgContainer.appendChild(svg);
        this.container.appendChild(svgContainer);
      }
      if(this.DOMselector === "#app2"){
         svgContainer = document.createElement('div');
        svgContainer.classList.add('sliderCircular__data2');
         svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', this.sliderCircularWidth);
        svg.setAttribute('width', this.sliderCircularHeight);
        svgContainer.appendChild(svg);
        this.container.appendChild(svgContainer);
      }
      if(this.DOMselector === "#app3"){
        svgContainer = document.createElement('div');
       svgContainer.classList.add('sliderCircular__data3');
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
       svg.setAttribute('height', this.sliderCircularWidth);
       svg.setAttribute('width', this.sliderCircularHeight);
       svgContainer.appendChild(svg);
       this.container.appendChild(svgContainer);
     }
     if(this.DOMselector === "#app4"){
      svgContainer = document.createElement('div');
     svgContainer.classList.add('sliderCircular__data4');
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
     svg.setAttribute('height', this.sliderCircularWidth);
     svg.setAttribute('width', this.sliderCircularHeight);
     svgContainer.appendChild(svg);
     this.container.appendChild(svgContainer);
    }
    if(this.DOMselector === "#app5"){
      svgContainer = document.createElement('div');
     svgContainer.classList.add('sliderCircular__data5');
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
     svg.setAttribute('height', this.sliderCircularWidth);
     svg.setAttribute('width', this.sliderCircularHeight);
     svgContainer.appendChild(svg);
     this.container.appendChild(svgContainer);
   }
    if(this.DOMselector === "#app6"){
      svgContainer = document.createElement('div');
    svgContainer.classList.add('sliderCircular__data6');
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('height', this.sliderCircularWidth);
    svg.setAttribute('width', this.sliderCircularHeight);
    svgContainer.appendChild(svg);
    this.container.appendChild(svgContainer);
  }
  if(this.DOMselector === "#app7"){
    svgContainer = document.createElement('div');
   svgContainer.classList.add('sliderCircular__data7');
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   svg.setAttribute('height', this.sliderCircularWidth);
   svg.setAttribute('width', this.sliderCircularHeight);
   svgContainer.appendChild(svg);
   this.container.appendChild(svgContainer);
 }
 if(this.DOMselector === "#app8"){
  svgContainer = document.createElement('div');
 svgContainer.classList.add('sliderCircular__data8');
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 svg.setAttribute('height', this.sliderCircularWidth);
 svg.setAttribute('width', this.sliderCircularHeight);
 svgContainer.appendChild(svg);
 this.container.appendChild(svgContainer);
}
if(this.DOMselector === "#app9"){
  svgContainer = document.createElement('div');
 svgContainer.classList.add('sliderCircular__data9');
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 svg.setAttribute('height', this.sliderCircularWidth);
 svg.setAttribute('width', this.sliderCircularHeight);
 svgContainer.appendChild(svg);
 this.container.appendChild(svgContainer);
}
if(this.DOMselector === "#app10"){
  svgContainer = document.createElement('div');
 svgContainer.classList.add('sliderCircular__data10');
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 svg.setAttribute('height', this.sliderCircularWidth);
 svg.setAttribute('width', this.sliderCircularHeight);
 svgContainer.appendChild(svg);
 this.container.appendChild(svgContainer);
}
      

      // Draw sliderCirculars
      this.sliderCirculars.forEach((sliderCircular, index) => this.drawSinglesliderCircularOnInit(svg, sliderCircular, index));

      // Event listeners
      svgContainer.addEventListener('mousedown', this.mouseTouchStart.bind(this), false);
      svgContainer.addEventListener('touchstart', this.mouseTouchStart.bind(this), false);
      svgContainer.addEventListener('mousemove', this.mouseTouchMove.bind(this), false);
      svgContainer.addEventListener('touchmove', this.mouseTouchMove.bind(this), false);
      window.addEventListener('mouseup', this.mouseTouchEnd.bind(this), false);
      window.addEventListener('touchend', this.mouseTouchEnd.bind(this), false);
  }

  /**
   * Draw single sliderCircular on init
   * 
   * @param {object} svg 
   * @param {object} sliderCircular 
   * @param {number} index 
   */
  drawSinglesliderCircularOnInit(svg, sliderCircular, index) {

      // Default sliderCircular opts, if none are set
      sliderCircular.radius = sliderCircular.radius ?? 50;
      sliderCircular.min = sliderCircular.min ?? 0;
      sliderCircular.max = sliderCircular.max ?? 1000;
      sliderCircular.step = sliderCircular.step ?? 50;
      sliderCircular.initialValue = sliderCircular.initialValue ?? 0;
      sliderCircular.color = sliderCircular.color ?? '#FF5733';

      // Calculate sliderCircular circumference
      const circumference = sliderCircular.radius * this.tau;

      // Calculate initial angle
      const initialAngle = Math.floor( ( sliderCircular.initialValue / (sliderCircular.max - sliderCircular.min) ) * 360 )-180;

      // Calculate spacing between arc fractions
      const arcFractionSpacing = this.calculateSpacingBetweenArcFractions(circumference, this.arcFractionLength, this.arcFractionSpacing);

      // Create a single sliderCircular group - holds all paths and handle
      const sliderCircularGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      sliderCircularGroup.setAttribute('class', 'sliderCircularSingle');
      sliderCircularGroup.setAttribute('data-sliderCircular', index);
      sliderCircularGroup.setAttribute('transform', 'rotate(-90,' + this.cx + ',' + this.cy + ')');
      sliderCircularGroup.setAttribute('rad', sliderCircular.radius);
      svg.appendChild(sliderCircularGroup);
      
      // Draw background arc path
      this.drawArcPath(this.arcBgFractionColor, sliderCircular.radius, 360, arcFractionSpacing, 'bg', sliderCircularGroup);

      // Draw active arc path
      this.drawArcPath(sliderCircular.color, sliderCircular.radius, initialAngle, arcFractionSpacing, 'active', sliderCircularGroup);

      // Draw handle
      this.drawHandle(sliderCircular, initialAngle, sliderCircularGroup);
  }

  /**
   * Output arch path
   * 
   * @param {number} cx 
   * @param {number} cy 
   * @param {string} color 
   * @param {number} angle 
   * @param {number} singleSpacing 
   * @param {string} type 
   */
  drawArcPath( color, radius, angle, singleSpacing, type, group ) {

      // sliderCircular path class
      const pathClass = (type === 'active') ? 'sliderCircularSinglePathActive' : 'sliderCircularSinglePath';

      // Create svg path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.classList.add(pathClass);
      path.setAttribute('d', this.describeArc(this.cx, this.cy, radius, 0, angle));
      path.style.stroke = color;
      path.style.strokeWidth = this.arcFractionThickness;
      path.style.fill = 'none';
      path.setAttribute('stroke-dasharray', this.arcFractionLength + ' ' + singleSpacing);
      group.appendChild(path);
  }

  /**
   * Draw handle for single sliderCircular
   * 
   * @param {object} sliderCircular 
   * @param {number} initialAngle 
   * @param {group} group 
   */
  drawHandle(sliderCircular, initialAngle, group) {

      // Calculate handle center
      const handleCenter = this.calculateHandleCenter(initialAngle * this.tau / 360, sliderCircular.radius);

      // Draw handle
      const handle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      handle.setAttribute('class', 'sliderCircularHandle');
      handle.setAttribute('cx', handleCenter.x);
      handle.setAttribute('cy', handleCenter.y);
      handle.setAttribute('r', this.arcFractionThickness / 2);
      handle.style.stroke = this.handleStrokeColor;
      handle.style.strokeWidth = this.handleStrokeThickness;
      handle.style.fill = this.handleFillColor;
      group.appendChild(handle);
  }

  /**
   * Create legend UI on init
   * 
   */
  createLegendUI() {

      // Create legend
      const display = document.createElement('ul');
      display.classList.add('sliderCircular__legend');

      // Legend heading
      const heading = document.createElement('h2');
      heading.innerText = 'Legend';
      display.appendChild(heading);

      // Legend data for all sliderCirculars
      this.sliderCirculars.forEach((sliderCircular, index) => {
          const li = document.createElement('li');
          li.setAttribute('data-sliderCircular', index);
          const firstSpan = document.createElement('span');
          firstSpan.style.backgroundColor = sliderCircular.color ?? '#FF5733';
          firstSpan.classList.add('colorSquare');
          const secondSpan = document.createElement('span');
          secondSpan.innerText = sliderCircular.displayName ?? 'Unnamed value';
          const thirdSpan = document.createElement('span');
          thirdSpan.innerText = sliderCircular.initialValue ?? 0;
          thirdSpan.classList.add('sliderCircularValue');
          li.appendChild(firstSpan);
          li.appendChild(secondSpan);
          li.appendChild(thirdSpan);
          display.appendChild(li);
      });

      // Append to DOM
      this.container.appendChild(display);
  }

  /**
   * Redraw active sliderCircular
   * 
   * @param {element} activesliderCircular
   * @param {obj} rmc
   */
  redrawActivesliderCircular(rmc) {
    //console.log(this.activesliderCircular);
      const activePath = this.activesliderCircular.querySelector('.sliderCircularSinglePathActive');
      const radius = +this.activesliderCircular.getAttribute('rad');
      const currentAngle = this.calculateMouseAngle(rmc) * 0.999;

      // Redraw active path
      activePath.setAttribute('d', this.describeArc(this.cx, this.cy, radius, 0, this.radiansToDegrees(currentAngle)));

      // Redraw handle
      const handle = this.activesliderCircular.querySelector('.sliderCircularHandle');
      const handleCenter = this.calculateHandleCenter(currentAngle, radius);
      handle.setAttribute('cx', handleCenter.x);
      handle.setAttribute('cy', handleCenter.y);

      // Update legend
      //this.updateLegendUI(currentAngle);

      this.updateSliderValues(currentAngle);

  }


   /** ATTEMPT : COME BACK
   * Redraw sliderCircular AT THE BEGINNING OF A TEST WITH RANDOM VALUE
   * 
   * @param {element} activesliderCircular
   * @param {obj} rmc
   *
    redrawActiveSliderCircularTestBeginning(newRandomValue) {

      let container;

      if(this.DOMselector === "#app"){
        container = document.querySelector('.sliderCircular__data1');
      }
      if(this.DOMselector === "#app2"){
        container = document.querySelector('.sliderCircular__data2');
      }
      if(this.DOMselector === "#app3"){
        container = document.querySelector('.sliderCircular__data3');
      }
      if(this.DOMselector === "#app4"){
        container = document.querySelector('.sliderCircular__data4');
      }
      if(this.DOMselector === "#app5"){
        container = document.querySelector('.sliderCircular__data5');
      }
      if(this.DOMselector === "#app6"){
        container = document.querySelector('.sliderCircular__data6');
      }
      if(this.DOMselector === "#app7"){
        container = document.querySelector('.sliderCircular__data7');
      }
      if(this.DOMselector === "#app8"){
        container = document.querySelector('.sliderCircular__data8');
      }
      
      let sliderCircularGroups = Array.from(container.querySelectorAll('g'));

      const activePath = sliderCircularGroups[0].querySelector('.sliderCircularSinglePathActive');
      const radius = +sliderCircularGroups[0].getAttribute('rad');
       
      const currentAngle = Math.floor( (newRandomValue / (sliderCircular.max - sliderCircular.min) ) * 360 )-180;
 
      // Redraw handle
      const handle = sliderCircularGroups[0].querySelector('.sliderCircularHandle');
      const handleCenter = this.calculateHandleCenter(currentAngle, radius);
      handle.setAttribute('cx', handleCenter.x);
      handle.setAttribute('cy', handleCenter.y);

      // Update legend
      //this.updateLegendUI(currentAngle);

      this.updateSliderValues(currentAngle);
  
    } */

  /**
   * MY FUNCTION - ANDREIA
   * 
   * @param {number} currentAngle 
   */
  updateSliderValues(currentAngle) {
    const targetsliderCircular = this.activesliderCircular.getAttribute('data-sliderCircular');
    const currentsliderCircular = this.sliderCirculars[targetsliderCircular];
    const currentsliderCircularRange = currentsliderCircular.max - currentsliderCircular.min;
    let currentValue = currentAngle / this.tau * currentsliderCircularRange;
    const numOfSteps =  Math.round(currentValue / currentsliderCircular.step);
    currentValue = currentsliderCircular.min + numOfSteps * currentsliderCircular.step;

    // corresponds to the 1st slider of the Left
    if(this.DOMselector === "#app"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider1 = currentValue;
    }
    // corresponds to the 2nd slider of the Left
    else if(this.DOMselector === "#app3"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider1double = currentValue;
    }

    // corresponds to the 1st slider of the Right
    else if(this.DOMselector === "#app2"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider2 = currentValue;
    }
    // corresponds to the 2nd slider of the Right    
    else if(this.DOMselector === "#app4"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider2double = currentValue;
    }

    // corresponds to the 3rd slider of the Left    
    else if(this.DOMselector === "#app5"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider5 = currentValue;
    }

    // corresponds to the ? slider of the Right    
     else if(this.DOMselector === "#app6"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider6 = currentValue;
    }

    // corresponds to the 4rd slider of the Left    
    else if(this.DOMselector === "#app7"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider7 = currentValue;
    }

    // corresponds to the ? slider of the Right    
    else if(this.DOMselector === "#app8"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider8 = currentValue;
    }
     // corresponds to the ? slider of the Right    
     else if(this.DOMselector === "#app9"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider9 = currentValue;
    }
    // corresponds to the ? slider of the Right    
    else if(this.DOMselector === "#app10"){
      if(targetsliderCircular == 0 && typeof currentValue === 'number')
        currentValueSlider10 = currentValue;
    }
}

  /**
   * Update legend UI
   * 
   * @param {number} currentAngle 
   */
  updateLegendUI(currentAngle) {
      const targetsliderCircular = this.activesliderCircular.getAttribute('data-sliderCircular');
      const targetLegend = document.querySelector(`li[data-sliderCircular="${targetsliderCircular}"] .sliderCircularValue`);
      const currentsliderCircular = this.sliderCirculars[targetsliderCircular];
      const currentsliderCircularRange = currentsliderCircular.max - currentsliderCircular.min;
      let currentValue = currentAngle / this.tau * currentsliderCircularRange;
      const numOfSteps =  Math.round(currentValue / currentsliderCircular.step);
      currentValue = currentsliderCircular.min + numOfSteps * currentsliderCircular.step;
      targetLegend.innerText = currentValue;
  }

  /**
   * Mouse down / Touch start event
   * 
   * @param {object} e 
   */
  mouseTouchStart(e) {
      if (this.mouseDown) return;
      this.mouseDown = true;
      const rmc = this.getRelativeMouseOrTouchCoordinates(e);
      this.findClosestsliderCircular(rmc);
      this.redrawActivesliderCircular(rmc);
  }

  /**
   * Mouse move / touch move event
   * 
   * @param {object} e 
   */
  mouseTouchMove(e) {
      if (!this.mouseDown) return;
      e.preventDefault();
      const rmc = this.getRelativeMouseOrTouchCoordinates(e);
      this.redrawActivesliderCircular(rmc);
  }

  /**
   * Mouse move / touch move event
   * Deactivate sliderCircular
   * 
   */
  mouseTouchEnd() {
      if (!this.mouseDown) return;
      this.mouseDown = false;
      this.activesliderCircular = null;
  }

  /**
   * Calculate number of arc fractions and space between them
   * 
   * @param {number} circumference 
   * @param {number} arcBgFractionLength 
   * @param {number} arcBgFractionBetweenSpacing 
   * 
   * @returns {number} arcFractionSpacing
   */
  calculateSpacingBetweenArcFractions(circumference, arcBgFractionLength, arcBgFractionBetweenSpacing) {
      const numFractions = Math.floor((circumference / arcBgFractionLength) * arcBgFractionBetweenSpacing);
      const totalSpacing = circumference - numFractions * arcBgFractionLength;
      return totalSpacing / numFractions;
  }

  /**
   * Helper functiom - describe arc
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} radius 
   * @param {number} startAngle 
   * @param {number} endAngle 
   * 
   * @returns {string} path
   */
  describeArc (x, y, radius, startAngle, endAngle) {
      let path,
          endAngleOriginal = endAngle, 
          start, 
          end, 
          arcSweep;

      if(endAngleOriginal - startAngle === 360)
      {
          endAngle = 359;
      }

      start = this.polarToCartesian(x, y, radius, endAngle);
      end = this.polarToCartesian(x, y, radius, startAngle);
      arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

      path = [
          'M', start.x, start.y,
          'A', radius, radius, 0, arcSweep, 0, end.x, end.y
      ];

      if (endAngleOriginal - startAngle === 360) 
      {
          path.push('z');
      } 

      return path.join(' ');
  }

  /**
   * Helper function - polar to cartesian transformation
   * 
   * @param {number} centerX 
   * @param {number} centerY 
   * @param {number} radius 
   * @param {number} angleInDegrees 
   * 
   * @returns {object} coords
   */
   polarToCartesian (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = angleInDegrees * Math.PI / 180;
      const x = centerX + (radius * Math.cos(angleInRadians));
      const y = centerY + (radius * Math.sin(angleInRadians));
      return { x, y };
  }

  /**
   * Helper function - calculate handle center
   * 
   * @param {number} angle 
   * @param {number} radius
   * 
   * @returns {object} coords 
   */
  calculateHandleCenter (angle, radius) {
      const x = this.cx + Math.cos(angle) * radius;
      const y = this.cy + Math.sin(angle) * radius;
      return { x, y };
  }

  /**
   * Get mouse/touch coordinates relative to the top and left of the container
   *  
   * @param {object} e
   * 
   * @returns {object} coords
   */ 
  getRelativeMouseOrTouchCoordinates (e) {
    let containerRect;
      if(this.DOMselector === "#app")
        containerRect = document.querySelector('.sliderCircular__data1').getBoundingClientRect();
      if(this.DOMselector === "#app2")
        containerRect = document.querySelector('.sliderCircular__data2').getBoundingClientRect();
      if(this.DOMselector === "#app3")
        containerRect = document.querySelector('.sliderCircular__data3').getBoundingClientRect();
      if(this.DOMselector === "#app4")
        containerRect = document.querySelector('.sliderCircular__data4').getBoundingClientRect();
      if(this.DOMselector === "#app5")
        containerRect = document.querySelector('.sliderCircular__data5').getBoundingClientRect();
      if(this.DOMselector === "#app6")
      containerRect = document.querySelector('.sliderCircular__data6').getBoundingClientRect();
      if(this.DOMselector === "#app7")
        containerRect = document.querySelector('.sliderCircular__data7').getBoundingClientRect();
      if(this.DOMselector === "#app8")
        containerRect = document.querySelector('.sliderCircular__data8').getBoundingClientRect();
      if(this.DOMselector === "#app9")
        containerRect = document.querySelector('.sliderCircular__data9').getBoundingClientRect();
      if(this.DOMselector === "#app10")
        containerRect = document.querySelector('.sliderCircular__data10').getBoundingClientRect();
          
      let x, 
          y, 
          clientPosX, 
          clientPosY;

      // Touch Event triggered
      if (e instanceof TouchEvent) 
      {
          clientPosX = e.touches[0].pageX;
          clientPosY = e.touches[0].pageY;
      }
      // Mouse Event Triggered
      else 
      {
          clientPosX = e.clientX;
          clientPosY = e.clientY;
      }

      // Get Relative Position
      x = clientPosX - containerRect.left;
      y = clientPosY - containerRect.top;

      return { x, y };
  }

  /**
   * Calculate mouse angle in radians
   * 
   * @param {object} rmc 
   * 
   * @returns {number} angle
   */
  calculateMouseAngle(rmc) {
      const angle = Math.atan2(rmc.y - this.cy, rmc.x - this.cx);

      if (angle > - this.tau / 2 && angle < - this.tau / 4) 
      {
          return angle + this.tau * 1.25;
      } 
      else 
      {
          return angle + this.tau * 0.25;
      }
  }

  /**
   * Helper function - transform radians to degrees
   * 
   * @param {number} angle 
   * 
   * @returns {number} angle
   */
  radiansToDegrees(angle) {
      return angle / (Math.PI / 180);
  }

  /**
   * Find closest sliderCircular to mouse pointer
   * Activate the sliderCircular
   * 
   * @param {object} rmc
   */
  findClosestsliderCircular(rmc) {
      let container;
      const mouseDistanceFromCenter = Math.hypot(rmc.x - this.cx, rmc.y - this.cy);
      if(this.DOMselector === "#app"){
        container = document.querySelector('.sliderCircular__data1');
      }
      if(this.DOMselector === "#app2"){
        container = document.querySelector('.sliderCircular__data2');
      }
      if(this.DOMselector === "#app3"){
        container = document.querySelector('.sliderCircular__data3');
      }
      if(this.DOMselector === "#app4"){
        container = document.querySelector('.sliderCircular__data4');
      }
      if(this.DOMselector === "#app5"){
        container = document.querySelector('.sliderCircular__data5');
      }
      if(this.DOMselector === "#app6"){
        container = document.querySelector('.sliderCircular__data6');
      }
      if(this.DOMselector === "#app7"){
        container = document.querySelector('.sliderCircular__data7');
      }
      if(this.DOMselector === "#app8"){
        container = document.querySelector('.sliderCircular__data8');
      }
      if(this.DOMselector === "#app9"){
        container = document.querySelector('.sliderCircular__data9');
      }
      if(this.DOMselector === "#app10"){
        container = document.querySelector('.sliderCircular__data10');
      }
      
      let sliderCircularGroups = Array.from(container.querySelectorAll('g'));

      // Get distances from client coordinates to each sliderCircular
      const distances = sliderCircularGroups.map(sliderCircular => {
          const rad = parseInt(sliderCircular.getAttribute('rad'));
          return Math.min( Math.abs(mouseDistanceFromCenter - rad) );
      });

      // Find closest sliderCircular
      const closestsliderCircularIndex = distances.indexOf(Math.min(...distances));
      this.activesliderCircular = sliderCircularGroups[closestsliderCircularIndex];
  }
}

