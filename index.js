var play = true;
var playerArray = [];
var compArray = [];
var interval;
var turn = 1;


const startButton = document.querySelector("#start");
const greenButton = document.querySelector("#green0");
const redButton = document.querySelector("#red1");
const blueButton = document.querySelector("#blue2");
const yellowButton = document.querySelector("#yellow3");

startButton.addEventListener('click', (event) => {
    if(play){
        // Play Simon function goes here
        playSimon();
    }
})

function playSimon() {
    // Play Simon function definition goes here - called when the user presses start
    interval = 0;
    compArray = [];
    playerArray = [];

    // Need to load the compArray
    for (var i = 0; i < 10; i++) {
        compArray.push(Math.floor(Math.random() * 4));
        console.log(compArray[i]);
    }
    
    interval = setInterval(turnFunction, 800);
}

function turnFunction() {
    for(var i = 0; i< turn; i++) {
        if(compArray[i] = 0) {
            // 
        }
        if(compArray[i] = 1) {
            //
        }
        if(compArray[i] = 2) {
            //
        }
        if(compArray[i] = 3) {
            // 
        }
    }
}

greenButton.addEventListener('click', (event) => {
    // If play = true
        // need to push the color selected into the player array (green = 0)
        // need to check that the color selected was true with the CheckColor function
        console.log("You clicked green");
})

redButton.addEventListener('click', (event) => {
    // If play = true
        // need to push the color selected into the player array (red = 1)
        // need to check that the color selected was true with the CheckColor function
        console.log("You clicked red");
})

blueButton.addEventListener('click', (event) => {
    // If play = true
        // need to push the color selected into the player array (blue = 2)
        // need to check that the color selected was true with the CheckColor function
        console.log("You clicked blue");
})

yellowButton.addEventListener('click', (event) => {
    // If play = true
        // need to push the color selected into the player array (yellow = 3)
        // need to check that the color selected was true with the CheckColor function
        console.log("You clicked yellow");
})

function checkColor(){
    // first need to check if the player color is the same number in the sequence as the computer array 
        // i.e. third color in the sequence 


    // second need to check if the color in player array matches the color in the computer array
    // If it is...
        // either you need to continue getting player input
        // or you entered the last one and the computer has to add another and play it back (function?)
    // If it isn't...
        // end game
}