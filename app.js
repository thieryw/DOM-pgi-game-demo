/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL0BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores;
let roundScore;
let activePlayer;
let isGamePlaying;
const dice = document.querySelector(".dice");

gameInit();

document
    .querySelector(".btn-roll")
    .addEventListener("click", function () {

        if (!isGamePlaying) {
            return;
        }

        const diceNumber = Math.floor(Math.random() * 6 + 1);

        dice.style.display = "block";
        dice.src = `dice-${diceNumber}.png`;

        if (diceNumber !== 1) {

            //It is bad practice to assign number to string. innerText is a string.
            document.getElementById(`current-${activePlayer}`).innerText = `${roundScore += diceNumber}`;
            return;
        }

        changeActivePlayer();

    })
    ;

document.querySelector(".btn-hold").addEventListener("click", function () {

    if (!isGamePlaying) {
        return;
    }

    document.getElementById(`score-${activePlayer}`).innerText = scores[activePlayer] += roundScore;

    if (scores[activePlayer] >= 10) {
        gameWon();
        return;
    }

    changeActivePlayer();


});

function gameWon() {

    isGamePlaying = false;

    document.getElementById(`name-${activePlayer}`).innerText = "WINNER !";

    //When declaring helper variable create a scope that restrict
    //their scope, here for classList
    {

        //Equivalent to: const classList= document.querySelector(`.player-${activePlayer}-panel`).classList;
        const { classList } = document.querySelector(`.player-${activePlayer}-panel`);

        classList.add("winner")
        classList.remove("active");

    }

    dice.style.display = "none";
    roundScore = 0;

}

function changeActivePlayer() {

    document.getElementById(`current-${activePlayer}`).innerText = 0;


    for( const i of [0,1]){
        document
            .querySelector(`.player-${i}-panel`)
            .classList
            .toggle("active")
            ;
    }

    roundScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

}


document
    .querySelector(".btn-new")
    .addEventListener("click", gameInit)
    ;

function gameInit() {

    isGamePlaying = true;

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice.style.display = "none";

    //NOTE: Here it is a bit over over engineered but show you
    //some factorization techniques...
    for (const i of [0, 1]) {

        for (const className of [`score-${i}`, `current-${i}`]) {
            document.getElementById(className).innerText = 0;
        }

        {

            const { classList } = document.querySelector(`.player-${i}-panel`);

            classList.remove("winner");

            classList[i === 0 ? "add" : "remove"]("active");

        }

        document.getElementById(`name-${i}`).innerText = `Player ${i + 1}`;

    }


}