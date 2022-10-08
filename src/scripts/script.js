var url = window.location.href;
var lastPart = url.substr(url.lastIndexOf('#') + 1);

var bus = new File("./data/" + lastPart);

// See if the file exists
if(bus.exists()){
  alert('The file exists');
}else{
  alert('The file does not exist');
}

if (lastPart === "") {
   // Show your overlay
}