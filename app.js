/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL0BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, isGamePlaying;

dice = document.querySelector(".dice");

gameInit();

document.querySelector(".btn-roll").addEventListener("click", function(){

    if(!isGamePlaying){
        return;
    }

    var diceNumber = Math.floor(Math.random() * 6 + 1);

    dice.style.display = "block";
    dice.src = "dice-" + diceNumber + ".png";

    if(diceNumber !== 1){

        document.getElementById("current-" + activePlayer).innerText = roundScore += diceNumber;
        return;
    }

    changeActivePlayer();


});

document.querySelector(".btn-hold").addEventListener("click", function(){

    if(!isGamePlaying){
        return;
    }

    

    document.getElementById("score-" + activePlayer).innerText = scores[activePlayer] += roundScore;

    if(scores[activePlayer] >= 10){
        gameWon();
        return;
    }

    changeActivePlayer();

    
});

function gameWon(){

    isGamePlaying = false;

    document.getElementById("name-" + activePlayer).innerText = "WINNER !";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    dice.style.display = "none";
    roundScore = 0;



}

function changeActivePlayer(){

    document.getElementById("current-" + activePlayer).innerText = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    roundScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

}


document.querySelector(".btn-new").addEventListener("click", gameInit);



function gameInit(){

    isGamePlaying = true;


    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice.style.display = "none";
    document.getElementById("score-0").innerText = 0;
    document.getElementById("score-1").innerText = 0;
    document.getElementById("current-0").innerText = 0;
    document.getElementById("current-1").innerText = 0;
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.getElementById("name-0").innerText = "Player 1";
    document.getElementById("name-1").innerText = "Player 2";

}