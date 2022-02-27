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
