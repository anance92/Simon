let order = []; //order of computer lights
let playerOrder = []; //order of playerpresses
let flash; //integer number of flashes that have appeared in game
let turn; //keeps track of turn
let good; //Boolean to keep tabs of player being good
let compTurn;// Boolean tracks computer/player turn
let intervalId;
let delay = 200;
let delay2 = 800
let greenPush = "7";
let redPush = "9";
let yellowPush = "1";
let bluePush = "3";

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

function play(){
	initialize();
	document.getElementById("turnTotal").innerHTML = turn;
	order.push(Math.floor(Math.random()*4 + 1));
	compTurn = true;	
	intervalId = setInterval(gameTurn, 800);
}

function gameTurn(){
		delay -= 50;
	if (flash == turn){
		clearInterval(intervalId);
		compTurn = false;
		clearColor();
	}
	
	if (compTurn){
		clearColor();
		setTimeout(() => {
			if (order[flash] == 1) buttonActions(greenButton,"greenClip","lightgreen");
			if (order[flash] == 2) buttonActions(redButton, "redClip", "tomato");
			if (order[flash] == 3) buttonActions(yellowButton, "yellowClip", "yellow");
			if (order[flash] == 4) buttonActions(blueButton, "blueClip", "lightskyblue");
			flash++;
		}, delay)
	}
}

function buttonActions(buttonChange, clip, changeColor){
	let audio = document.getElementById(clip);
	audio.play();
	buttonChange.style.backgroundColor = changeColor;
}

function clearColor(){
    greenButton.style.backgroundColor = "darkgreen";
	redButton.style.backgroundColor = "darkred";
	yellowButton.style.backgroundColor = "goldenrod";
	blueButton.style.backgroundColor = "darkblue";
}

greenButton.addEventListener('click', (event) => {
	onClick(1, "greenClip", "lightgreen",greenButton);
})

redButton.addEventListener('click', (event) => {
	onClick(2, "redClip", "tomato", redButton);
})

yellowButton.addEventListener('click', (event) => {
	onClick(3, "yellowClip", "yellow", yellowButton);
})

blueButton.addEventListener('click', (event) => {
	onClick(4, "blueClip", "lightskyblue", blueButton);
})



function check(){
	if (playerOrder[playerOrder.length- 1] != order[playerOrder.length - 1])
			good = false;
	
	if (good == false){
		flashColor();
		let high = Number(document.getElementById("highScore").innerHTML);
		console.log(high);
		if(turn > high){
			document.getElementById("highScore").innerHTML = turn;
		}
		let audio = document.getElementById("wrongClip");
		clearInterval(intervalId);
		audio.play();
		alert('Wrong one Try again');
		document.getElementById("turnTotal").innerHTML = 0;
	}
	
	if (turn == playerOrder.length && good){
		turn++;
		playerOrder = [];
		compTurn = true;
		flash = 0;
		document.getElementById("turnTotal").innerHTML = turn;
		order.push(Math.floor(Math.random()*4 + 1));
		intervalId = setInterval(gameTurn, 800);
	}
}

function flashColor(){
	greenButton.style.backgroundColor = "lightgreen";
	redButton.style.backgroundColor = "tomato";
	yellowButton.style.backgroundColor = "yellow";
	blueButton.style.backgroundColor = "lightskyblue";	
}

function initialize(){
	flashColor();
	clearColor();
	win = false;
	order = [];
	playerOrder=[];
	flash = 0;
	intervalId = 0;
	turn = 1;
	good = true;
	document.getElementById("turnTotal").innerHTML = 0;
}
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  
  switch(event.key){
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

function onClick(num, clip, color, buttonChange){
	playerOrder.push(num);
		check();
		buttonActions(buttonChange,clip,color)
		if(!win){
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