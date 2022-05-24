let black;
let white;

const Y_AXIS = 1;
const X_AXIS = 2;

var osc, audioContext, isStarted = 0;    
let radiosSound, radiosSound_value;


function setup() {

  // define colors
  black = color('rgb(17, 17, 17)');
  white = color('rgb(245, 245, 245)'); 

  //sound prep
  osc = new p5.Oscillator();
  env = new p5.Envelope();

  radiosSound = document.getElementsByName('radiosSoundCheck');
  radiosSound[2].checked = true;
}

function draw() {

  radiosSound = document.getElementsByName('radiosSoundCheck');
  for(var i = 0; i < radiosSound.length; i++){
    if(radiosSound[i].checked)
      radiosSound_value = radiosSound[i].value;
  }

  let attackLevel = 1.0;
  let releaseLevel = 0;
  let attackTime = 0.001;
  let decayTime = 0.2;
  let decayLevel = 0.1; // decay level  0.0 to 1.0
  let susPercent = 0.2;
  let releaseTime = 0;

  if(radiosSound_value == "1.1")
    osc.setType('sine');
  else if(radiosSound_value == "1.2")
    osc.setType('square');

  console.log(radiosSound_value)

  osc.amp(env);

  // C - G - D - A - E (before) C2 C3 C4 (now)
  if (frameCount % 100 == 0){
    osc.freq(midiToFreq(int(random(36, 48, 60))));
    env.set(attackTime, attackLevel, decayTime, decayLevel, releaseTime);
    env.setRange(attackLevel, releaseLevel);
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.play();
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
  osc.start(0,5);
  isStarted = 1;
}

function stopOscillator(){
  osc.stop(0,5);
  isStarted = 0;
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