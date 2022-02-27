// before 

function start() {
}   

// other functions 

function show(item){
  if(document.getElementById(item).style.display == "none"){
    document.getElementById(item).style.display="block";

  }
  else{
    document.getElementById(item).style.display="none";
  }
}



function notification(){
  var x = document.getElementById("txt");
  var s;
  var popup = document.getElementById("donePopup");
  var soundType;

  if(localStorage.getItem("groupType") == 'A'){
    setTimeout(() => {  x.style.display = "block"; x.innerHTML = "<b>Emma</b>: Hello There …";}, 120000);
    setTimeout(() => {  x.style.display = "none";}, 125000);
    setTimeout(() => {  x.style.display = "block"; x.innerHTML = "<b>Sam</b>: It’s 18h56…" }, 480000);
    setTimeout(() => {  x.style.display = "none";}, 485000);
    setTimeout(() => {  x.style.display = "block"; x.innerHTML = "<b>Maggie</b>: Orange is great …"},  660000);
    setTimeout(() => {  x.style.display = "none";},  665000);
    setTimeout(() => {  x.style.display = "block"; x.innerHTML = "<b>Mark</b>: Meet Wednesday ?"}, 780000);
    setTimeout(() => {  x.style.display = "none";}, 785000);  
  }

  if(localStorage.getItem("groupType") != 'A'){

    if(localStorage.getItem("groupType") == 'B'){
    soundType = "sound1";
    }
    if(localStorage.getItem("groupType") == 'C'){
    soundType = "sound2";
    }

    setTimeout(() => {  s = document.getElementById(soundType); s.play(); x.style.display = "block"; x.innerHTML = "<b>Emma</b>: Hello There …";}, 120000);
    setTimeout(() => {  x.style.display = "none";}, 125000); 
    setTimeout(() => {  s = document.getElementById(soundType); s.play(); x.style.display = "block"; x.innerHTML = "<b>Sam</b>: It’s 18h56…" }, 480000);
    setTimeout(() => {  x.style.display = "none";}, 485000);
    setTimeout(() => {  s = document.getElementById(soundType); s.play(); x.style.display = "block"; x.innerHTML = "<b>Maggie</b>: Orange is great …"},  660000);
    setTimeout(() => {  x.style.display = "none";},  665000);
    setTimeout(() => {  s = document.getElementById(soundType); s.play(); x.style.display = "block"; x.innerHTML = "<b>Mark</b>: Meet Wednesday ?"}, 780000);
    setTimeout(() => {  x.style.display = "none";}, 785000);  
  }

  // pop up after video is over, put size of video in miliseconds
  setTimeout(() => { popup.style.display = "block"; popup.innerHTML = '<p>The video is over!</p><a type="button" class="custombutton" href="endPage.html">NEXT</a>';}, 940000);
}

function groupSetting(group) {
  localStorage.setItem("groupType", group);
}