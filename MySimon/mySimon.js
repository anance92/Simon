let order = []; //order of computer lights
let playerOrder = []; //order of playerpresses
let flash; //integer number of flashes that have appeared in game
let turn; //keeps track of turn
let good; //Boolean to keep tabs of player being good
let compTurn;// Boolean tracks computer/player turn
let intervalId;

const turnCounter = document.querySelector("#turn");
const greenButton = document.querySelector("#green0");
const redButton = document.querySelector("#red1");
const yellowButton = document.querySelector("#yellow3");
const blueButton = document.querySelector("#blue2");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

startButton.addEventListener('click', (event) => {
	play();
});

stopButton.addEventListener('click', (event) => {
	win = false;
	order = [];
	playerOrder=[];
	flash = 0;
	intervalId = 0;
	turn = 1;
	good = false;
});

function play(){
	win = false;
	order = [];
	playerOrder=[];
	flash = 0;
	intervalId = 0;
	turn = 1;
	good = true;
	order.push(Math.floor(Math.random()*4 + 1));
	compTurn = true;	
	intervalId = setInterval(gameTurn, 800);
}

function gameTurn(){
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
		}, 200)
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
	playerOrder.push(1);
	check();
	buttonActions(greenButton,"greenClip","lightgreen")
	if(!win){
		setTimeout(() => {
			clearColor();
		}, 300);
	}
})

redButton.addEventListener('click', (event) => {
	playerOrder.push(2);
	check();
	buttonActions(redButton, "redClip", "tomato");
	if(!win){
		setTimeout(() => {
			clearColor();
		}, 300);
	}
})

yellowButton.addEventListener('click', (event) => {
	playerOrder.push(3);
	check();
	buttonActions(yellowButton, "yellowClip", "yellow");
	if(!win){
		setTimeout(() => {
			clearColor();
		}, 300);
	}
})

blueButton.addEventListener('click', (event) => {
	playerOrder.push(4);
	check();
	buttonActions(blueButton, "blueClip", "lightskyblue");
	if(!win){
		setTimeout(() => {
			clearColor();
		}, 300);
	}
})

function check(){
	if (playerOrder[playerOrder.length- 1] != order[playerOrder.length - 1])
			good = false;
	
	if (good == false){
		flashColor();		
		let audio = document.getElementById("wrongClip");
		audio.play();
		alert('Wrong one Try again');
	}
	
	if (turn == playerOrder.length && good){
		turn++;
		playerOrder = [];
		compTurn = true;
		flash = 0;
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

// function winGame(){
	// flashColor();
	// on = false;
	// win = true;
// }