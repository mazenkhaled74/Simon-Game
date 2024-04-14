var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStarted = false;
function nextSequence()
{
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random()*4);
    var choosenColor = buttonColors[randomNum];
    gamePattern.push(choosenColor);

    $('#' + choosenColor).fadeOut(100).fadeIn(100);
    playSound(choosenColor);
}

function animatePress(color)
{
    $('#' + color).addClass("pressed");
    setTimeout(function(){
        $('#' + color).removeClass("pressed");
    },100);
}

function playSound(name)
{
    var sound = new Audio("sounds/" +name+ ".mp3");
    sound.play();
}

$(".btn").on("click",function(){
    var userChoosenColor = $(this).attr("id");
    userClickPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickPattern.length-1);
});


function startOver()
{
    level = 0;
    gamePattern = [];
    gameStarted = false;
    userClickPattern = [];
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickPattern[currentLevel])
    {
        if (userClickPattern.length === gamePattern.length)
        {
            userClickPattern = [];
            setTimeout(function (){
              nextSequence();
            }, 1000);
        }
    
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


$(document).on('keypress',function(){
    if(!gameStarted)
    {
        nextSequence();
    }
    gameStarted = true;
});
