console.log("opening title");

$(document).ready(function() {
  document.getElementById('player').play().catch((error)=>{
    //remove normal text 
    document.getElementById("opening_text").style.display = "none";

    //display error text 
    document.getElementById("audio_error_text").style.display = "block";

  });
  
  //3 seconds transition time
  var transitiontime = 5000;
  //first text container
  $("#text1").fadeIn(2200);
  setTimeout(function() {
    $("#text2").fadeIn(2200);
    //second textcontainer
    setTimeout(function() {
      $("#textcontainer1").remove();
      $("#textcontainer2").fadeIn(2200);

      setTimeout(function() {
        $("#textcontainer2").remove();
        $("#textcontainer3").fadeIn(2200);

        setTimeout(function() {
          $("#textcontainer3").remove();
          $("#textcontainer4").fadeIn(2200);

          setTimeout(function() {
            $("#textcontainer4").remove();
            $("#textcontainer5").fadeIn(2200);
          }, transitiontime);
        }, transitiontime);
      }, transitiontime);
    }, transitiontime);
  }, transitiontime);
});

function reload() {
  window.location.reload(false);
}
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (!isChrome){
    $('#iframeAudio').remove()
}
else {
    $('#playAudio').remove() // just to make sure that it will not have 2x audio in the background 
}





var socket = io().connect()