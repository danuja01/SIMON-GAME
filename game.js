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
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }

  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("#level-title").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var clrSound = new Audio("sounds/" + name + ".mp3");
  clrSound.play();
}

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}
