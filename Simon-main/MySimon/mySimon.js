let order = []; //order of computer lights
let playerOrder = []; //order of playerpresses
let flash; //integer number of flashes that have appeared in game
let turn; //keeps track of turn
let good; //Boolean to keep tabs of player being good
let compTurn; // Boolean tracks computer/player turn
let intervalId;
let delay = 200;
let delay2 = 800
let greenPush = "7";
let redPush = "9";
let yellowPush = "1";
let bluePush = "3";
let timerReset = 15; //Set Game timer

const turnCounter = document.querySelector("#turn");
const greenButton = document.querySelector("#green0");
const redButton = document.querySelector("#red1");
const yellowButton = document.querySelector("#yellow3");
const blueButton = document.querySelector("#blue2");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const customizeButton = document.querySelector("#customize");

startButton.addEventListener('click', (event) => {
    clearInterval(intervalId);
    play();
});

stopButton.addEventListener('click', (event) => {
    clearInterval(intervalId);
    initialize();
    // alert('Thanks for playing. Goodbye.');
    document.getElementById("message").innerHTML = "Thanks for playing. Goodbye!";
});

customizeButton.addEventListener('click', (event) => {
    greenPush = prompt("What key do you want to use to press the green button?");
    document.getElementById("greenValue").innerHTML = greenPush;
    redPush = prompt("What key do you want to use to press the red button?");
    document.getElementById("redValue").innerHTML = redPush;
    yellowPush = prompt("What key do you want to use to press the yellow button?");
    document.getElementById("yellowValue").innerHTML = yellowPush;
    bluePush = prompt("What key do you want to use to press the blue button?");
    document.getElementById("blueValue").innerHTML = bluePush;
});

function play() {
    initialize();
    document.getElementById("turnTotal").innerHTML = turn;
    order.push(Math.floor(Math.random() * 4 + 1));
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    delay -= 50;
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();

        timer.start(1000);
        timer.reset(timerReset);
        // alert('Your Turn! Give your best try!');
        document.getElementById("message").innerHTML = "Your Turn! Give your best try!";
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) buttonActions(greenButton, "greenClip", "lightgreen");
            if (order[flash] == 2) buttonActions(redButton, "redClip", "tomato");
            if (order[flash] == 3) buttonActions(yellowButton, "yellowClip", "yellow");
            if (order[flash] == 4) buttonActions(blueButton, "blueClip", "lightskyblue");
            flash++;
        }, delay)
    }
}

function buttonActions(buttonChange, clip, changeColor) {
    let audio = document.getElementById(clip);
    audio.play();
    buttonChange.style.backgroundColor = changeColor;
}

function clearColor() {
    greenButton.style.backgroundColor = "darkgreen";
    redButton.style.backgroundColor = "darkred";
    yellowButton.style.backgroundColor = "goldenrod";
    blueButton.style.backgroundColor = "darkblue";
}

greenButton.addEventListener('click', (event) => {
    onClick(1, "greenClip", "lightgreen", greenButton);

    timer.reset(timerReset);
})

redButton.addEventListener('click', (event) => {
    onClick(2, "redClip", "tomato", redButton);

    timer.reset(timerReset);
})

yellowButton.addEventListener('click', (event) => {
    onClick(3, "yellowClip", "yellow", yellowButton);

    timer.reset(timerReset);
})

blueButton.addEventListener('click', (event) => {
    onClick(4, "blueClip", "lightskyblue", blueButton);

    timer.reset(timerReset);
})



function check() {
    if (playerOrder[playerOrder.length - 1] != order[playerOrder.length - 1])
        good = false;

    if (good == false) {
        flashColor();
        let high = Number(document.getElementById("highScore").innerHTML);
        console.log(high);
        if (turn > high) {
            document.getElementById("highScore").innerHTML = turn;
        }
        let audio = document.getElementById("wrongClip");
        clearInterval(intervalId);
        audio.play();
        // alert('Wrong one, Try again. Select Start or End Game.');
        document.getElementById("message").innerHTML = "Wrong one. Try again. Select Start or End Game.";
        document.getElementById("turnTotal").innerHTML = 0;
    }

    if (turn == playerOrder.length && good) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        document.getElementById("turnTotal").innerHTML = turn;
        order.push(Math.floor(Math.random() * 4 + 1));
        intervalId = setInterval(gameTurn, 800);

        setTimeout(function() { document.getElementById("message").innerHTML = "Correct!"; }, 1);
    }
}

function flashColor() {
    greenButton.style.backgroundColor = "lightgreen";
    redButton.style.backgroundColor = "tomato";
    yellowButton.style.backgroundColor = "yellow";
    blueButton.style.backgroundColor = "lightskyblue";
}

function initialize() {
    flashColor();
    clearColor();
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    good = true;
    document.getElementById("turnTotal").innerHTML = 0;
}
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case greenPush:
            onClick(1, "greenClip", "lightgreen", greenButton);
            break;
        case redPush:
            onClick(2, "redClip", "tomato", redButton);
            break;
        case yellowPush:
            onClick(3, "yellowClip", "yellow", yellowButton);
            break;
        case bluePush:
            onClick(4, "blueClip", "lightskyblue", blueButton);
            break;
    }
});

function onClick(num, clip, color, buttonChange) {
    playerOrder.push(num);
    check();
    buttonActions(buttonChange, clip, color)
    if (!win) {
        setTimeout(() => {
            clearColor();
        }, 300);
    }

}
// function winGame(){
// flashColor();
// on = false;
// win = true;
// }

//JS Timer - addition
function _timer(callback) {
    var time = 0; //  The default time of the timer
    var mode = 1; //    Mode: count up or count down
    var status = 0; //    Status: timer is running or stoped
    var timer_id; //    This is used by setInterval function

    // this will start the timer ex. start the timer with 1 second interval timer.start(1000) 
    this.start = function(interval) {
        interval = (typeof(interval) !== 'undefined') ? interval : 1000;

        if (status == 0) {
            status = 1;
            timer_id = setInterval(function() {
                switch (mode) {
                    default: if (time) {
                            time--;
                            generateTime();
                            if (typeof(callback) === 'function') callback(time);
                        }
                    break;

                    case 1:
                            if (time < 86400) {
                                time++;
                                generateTime();
                                if (typeof(callback) === 'function') callback(time);
                            }
                        break;
                }
            }, interval);
        }
    }

    //  Same as the name, this will stop or pause the timer ex. timer.stop()
    this.stop = function() {
        if (status == 1) {
            status = 0;
            clearInterval(timer_id);
        }
    }

    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset = function(sec) {
        sec = (typeof(sec) !== 'undefined') ? sec : 0;
        time = sec;
        generateTime(time);
    }

    // Change the mode of the timer, count-up (1) or countdown (0)
    this.mode = function(tmode) {
        mode = tmode;
    }

    // This methode return the current value of the timer
    this.getTime = function() {
        return time;
    }

    // This methode return the current mode of the timer count-up (1) or countdown (0)
    this.getMode = function() {
        return mode;
    }

    // This methode return the status of the timer running (1) or stoped (1)
    this.getStatus = function() {
        return status;
    }

    // This methode will render the time variable to hour:minute:second format
    function generateTime() {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;

        second = (second < 10) ? '0' + second : second;
        minute = (minute < 10) ? '0' + minute : minute;
        hour = (hour < 10) ? '0' + hour : hour;

        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
        $('div.timer span.hour').html(hour);
    }
}

// example use
var timer;

$(document).ready(function(e) {
    timer = new _timer(
        function(time) {
            if (time == 0) {
                timer.stop();
                // alert('Time out! You lose. Select Start or End Game');
                document.getElementById("message").innerHTML = "Time out! You lose. Select Start or End Game";
            }
        }
    );
    timer.reset(0);
    timer.mode(0)
});