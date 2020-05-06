/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL0BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, isGamePlaying,
scoreToWin;

const dice = document.querySelector(".dice");
const dice1 = document.querySelector(".dice1");

gameInit();



function getRandomDiceNumber(){
    return Math.floor(Math.random() * 6 + 1);
}


function hideDices(){

    for(const i of [dice, dice1]){
        i.style.display = "none";
    }

}




function DrawnTwoSixes(){
        
    scores[activePlayer] = 0;
    document.getElementById(`score-${activePlayer}`).innerText = 0;
    changeActivePlayer();
}




function gameWon(){

    isGamePlaying = false;

    document.getElementById(`name-${activePlayer}`).innerText = "WINNER !";

    {
        const {classList} = document.querySelector(`.player-${activePlayer}-panel`);
        classList.add("winner");
        classList.remove("active");
    }

    for(const i of [dice, dice1]){
        i.style.display = "none";
    }

    roundScore = 0;
}




function changeActivePlayer(){

    document.getElementById(`current-${activePlayer}`).innerText = 0;

    for(const i of [0, 1]){
        document.querySelector(`.player-${i}-panel`).classList.toggle("active");
    }

    roundScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

}





function gameInit(){

    isGamePlaying = true;

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    lastDiceNumber = 0;
    scoreToWin = 50;

    hideDices();


    document.getElementById("currentScoreToWin").innerText = 50;
    document.getElementById("scoreToWin").value = 50;

    for(const i of [0, 1]){


        for(const className of [`score-${i}`, `current-${i}`]){
            document.getElementById(className).innerText = 0;
        }

        {
            const {classList} = document.querySelector(`.player-${i}-panel`);
            i === 0 ? classList.add("active") : classList.remove("active");
            classList.remove("winner");
        }

        document.getElementById(`name-${i}`).innerText = `Player ${i + 1}`;
    }

}




document.getElementById("submitScore").addEventListener("click", () =>{

    scoreToWin = document.getElementById("scoreToWin").value;
    document.getElementById("currentScoreToWin").innerText = scoreToWin;

});






document.querySelector(".btn-roll").addEventListener("click", () =>{

    if(!isGamePlaying){
        return;
    }

    const diceNumber = getRandomDiceNumber();
    const dice1Number = getRandomDiceNumber();

    for(const i of [dice, dice1]){
        i.style.display = "block";
        i.src = i === dice ? `dice-${diceNumber}.png` : `dice-${dice1Number}.png`;
    }




    if(diceNumber === 1 || dice1Number === 1){

        changeActivePlayer();
        return;
    }

    if(diceNumber === 6 && dice1Number === 6){
        DrawnTwoSixes();
        return;
    }



    document.getElementById(`current-${activePlayer}`).
        innerText = roundScore += diceNumber + dice1Number;


});



document.querySelector(".btn-hold").addEventListener("click", () =>{

    if(!isGamePlaying){
        return;
    }

    

    document.getElementById("score-" + activePlayer).innerText = scores[activePlayer] += roundScore;

    if(scores[activePlayer] >= scoreToWin){
        gameWon();
        return;
    }

    hideDices();

    changeActivePlayer();

    
});




document.querySelector(".btn-new").addEventListener("click", gameInit);



