var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function() {

  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound("sounds/" + userChoosenColour + ".mp3");
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        userClickedPattern=[];
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");

    var audio =new Audio("sounds/wrong.mp3");
    audio.play();
    
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

    restart();
  }
}

function restart(){
  gamePattern=[];
  started=false;
  level=0;
  userClickedPattern=[]
}

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  randomNumber = Math.floor(Math.random() * 4);
  var randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);

  $("#" + randomColour).fadeOut().fadeIn();

  playSound("sounds/" + randomColour + ".mp3");
  //animatePress(randomColour);
}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  var active = document.querySelector("." + currentColour);
  setTimeout(function() {
    active.classList.remove("pressed");
  }, 100);
}
