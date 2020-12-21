console.log("opening title");

$(document).ready(function() {
  $("#lobbyMusic")
    .get(0)
    .play();
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





var socket = io().connect()