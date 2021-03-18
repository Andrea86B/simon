let buttonColor = ['red','blue','green','yellow'];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

let redAudio = new Audio("sounds/red.mp3");
let blueAudio = new Audio("sounds/blue.mp3");
let greenAudio = new Audio("sounds/green.mp3");
let yellowAudio = new Audio("sounds/yellow.mp3");
let wrong = new Audio("sounds/wrong.mp3");

$(document).on("keypress",function(){
    if(gameStarted == false){
        nextSequence();
        gameStarted = true;
    }
})

$(document).on("click",function(){
    if(gameStarted == false){
        nextSequence();
        gameStarted = true;
    }
})

let nextSequence = () => {
    level++;
    $('h1').text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(200).fadeIn(200);
}

$(".btn").on("click", function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level-1);
})

let animatePress = (currentColor) => {
    let img = $("#"+currentColor + " img");
    let imgSrc = img.attr("src");
    let path = imgSrc.substr(0,imgSrc.indexOf('.')) + "Highlighted.svg";
    img.attr("src",path);
    setTimeout(function(){img.attr("src",imgSrc)},400)
}

let playSound = (name) => {
    switch(name){
        case "red":
            redAudio.play();
            break;
        case "blue":
            blueAudio.play();
            break;
        case "yellow":
            yellowAudio.play();
            break;
        case "green":
            greenAudio.play();
            break;
    }
}

let checkAnswer = (currentLevel) => {
    if(userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]){
        if(userClickedPattern.length == gamePattern.length){
            userClickedPattern = [];
            setTimeout(function(){nextSequence()},1000);
        }
    } else {
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

let startOver = () => {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

$("#showRules").on("click", function(){
    $("#rules").slideToggle();
})
