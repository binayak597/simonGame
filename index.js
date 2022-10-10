var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["green", "red", "yellow", "blue"];
var started=false;
var level=0;

//detect any key from keyboard, after the action

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});

//waiting for click response on the buttons

$(".btn").click(function(){
  var userChoosenColor=$(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key To Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }


}

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(color)
{
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color)
{
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  }, 100);
}

function startOver()
{
  gamePattern=[];
  started=false;
  level=0;
}
