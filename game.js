const buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;


function playSound(name) {
    let chosenColourSound = new Audio(`sounds/${name}.mp3`);
    chosenColourSound.play();
};

function animatePress(currentColour) {
    $(`#${currentColour}`).css({"background-color": "grey", "box-shadow": "0 0 20px white"});
    setTimeout(function() {
        $(`#${currentColour}`).css({"background-color": currentColour, "box-shadow": "none"});
      }, "100");
};

function nextSequence() {

    // Math.random() * (max - min) + min
    // Or let random = Math.round(Math.random()*3)
    let randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $(`#${randomChosenColour}`).delay(10).fadeOut().fadeIn().fadeOut().fadeIn();
    level += 1;
    $("#level-title").text(`Level ${level}`);
}


$(document).on("keypress", function(e) {
    
    if ($("#level-title").text() === "Press A Key to Start") {
        nextSequence();
    }
    
});

let i = 0;
$(".btn").on("click", function(e) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    
    if (userClickedPattern[i] == gamePattern[i]) {
        playSound(userChosenColour);
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern.length = 0;
            i = 0;
        }
        else {
            i += 1;
        }
        
            
    } else {
        $("body").css({"background-color": "red", "opacity": "0.8"})
        setTimeout(function() {
            $("body").css({"background-color": "#011F3F", "opacity": "1"});
        }, "200");
        playSound("wrong");
        userClickedPattern.length = 0;
        gamePattern.length = 0;
        level = 0;
        i = 0;
        $("#level-title").text(`Game Over, Press Any Key to Restart`);
        $(document).on("keypress", function(e) {
                nextSequence();
        });
    }
  
});