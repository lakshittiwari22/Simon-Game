var buttonColors = ["red","blue", "green", "yellow" ];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// detect keypress.............................
$(document).keypress(function(){
    
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



//detect mouse click.......................
$("[type = button]").click( function(){

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    buttonAnimation(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);

});

//matching answes..................
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {                                                         //for wrong answers
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//creating sequence...........................
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(4*Math.random());

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
   
}



function playSound( key ){

switch (key) {
    case 'red':
        var audio = new Audio("./sounds/red.mp3");
        audio.play();
        break;

    case 'blue':
        var audio = new Audio("./sounds/blue.mp3");
        audio.play() ;
        break;

    case 'green':
        var audio = new Audio("./sounds/green.mp3");
        audio.play();
        break;

    case 'yellow':
        var audio = new Audio("./sounds/yellow.mp3");
        audio.play();
        break;

    case 'wrong':
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        break;


    default: console.log(key);
        break;
}

}

function buttonAnimation(key){

    $("#" + key).addClass("pressed");

    setTimeout(function(){
        $("#" + key).removeClass("pressed");
    },100);
}

//restart game.......................
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }