/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL0BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//I'll give it a pass here but declaring multiples variables in a single statement
//is generally considered bad practices because it's hard to maintain
// and it's even dangerous in vanilla JS.
let scores, roundScore, activePlayer, isGamePlaying,
    scoreToWin;


const [dice, dice1] = ["", "1"]
    .map(c => document.querySelector(`.dice${c}`))
    ;

gameInit();


function getRandomDiceNumber() {
    return Math.floor(Math.random() * 6 + 1);
}


function hideDices() {

    //YELLOW card on this one. Calling a dice 'i' is 
    // a really poor chose of variable name. 
    // Convention is that i is exclusively for integer.
    for (const dice_ of [dice, dice1]) {
        dice_.style.display = "none";
    }

}




//RED card for giving a function name that start with a capital letter.
//Capital letter are reserved for class constructor.
function drawnTwoSixes() {
    scores[activePlayer] = 0;
    document.getElementById(`score-${activePlayer}`).innerText = 0;
    changeActivePlayer();
}




function gameWon() {

    isGamePlaying = false;

    document.getElementById(`name-${activePlayer}`).innerText = "WINNER !";

    {
        const { classList } = document.querySelector(`.player-${activePlayer}-panel`);
        classList.add("winner");
        classList.remove("active");
    }

    for (const dice_ of [dice, dice1]) {
        dice_.style.display = "none";
    }

    roundScore = 0;
}




function changeActivePlayer() {

    document.getElementById(`current-${activePlayer}`).innerText = 0;

    for (const i of [0, 1]) {
        document.querySelector(`.player-${i}-panel`).classList.toggle("active");
    }

    roundScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

}





function gameInit() {

    isGamePlaying = true;

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    lastDiceNumber = 0;
    scoreToWin = 50;

    hideDices();


    document.getElementById("currentScoreToWin").innerText = 50;
    document.getElementById("scoreToWin").value = 50;

    for (const i of [0, 1]) {


        for (const className of [`score-${i}`, `current-${i}`]) {
            document.getElementById(className).innerText = 0;
        }

        {
            const { classList } = document.querySelector(`.player-${i}-panel`);
            //NON, on utilise les inline if que pour les assignations.
            classList[i===0?"add":"remove"]("active");
            classList.remove("winner");
        }

        document.getElementById(`name-${i}`).innerText = `Player ${i + 1}`;
    }

}




//Mise en forme standard
document
    .getElementById("submitScore")
    .addEventListener("click", () => {

        scoreToWin = document.getElementById("scoreToWin").value;
        document.getElementById("currentScoreToWin").innerText = scoreToWin;

    })
    ;






document
    .querySelector(".btn-roll")
    .addEventListener("click", () => {

        if (!isGamePlaying) {
            return;
        }


        //Pardon d'être aussi stylé
        const [diceNumber, dice1Number] = [,].map(() => getRandomDiceNumber());

        for (const dice_ of [dice, dice1]) {
            dice_.style.display = "block";
            //Carton ROSE pour ce statement non hétéro
            //dice_.src = dice_ === dice ? `dice-${diceNumber}.png` : `dice-${dice1Number}.png`;
            dice_.src = `dice-${dice_ === dice ? diceNumber : dice1Number}.png`;
        }




        if (diceNumber === 1 || dice1Number === 1) {

            changeActivePlayer();
            return;
        }

        if (diceNumber === 6 && dice1Number === 6) {
            DrawnTwoSixes();
            return;
        }




        //The dot come after the carriage return.
        //When you break a statement with carriage return ( a practice that is called chaining )
        //it is the convention that the ';' come on a new line.
        document.getElementById(`current-${activePlayer}`)
            .innerText = roundScore += diceNumber + dice1Number
            ;


    })
    ;



document
    .querySelector(".btn-hold")
    .addEventListener("click", () => {

        if (!isGamePlaying) {
            return;
        }

        document.getElementById(`score-${activePlayer}`)
            .innerText = scores[activePlayer] += roundScore
            ;

        if (scores[activePlayer] >= scoreToWin) {
            gameWon();
            return;
        }

        hideDices();

        changeActivePlayer();


    })
    ;



// It is more clear to directly invoke the function
// otherwise we do not see if gameInit need parameters or not...
document
    .querySelector(".btn-new")
    .addEventListener("click", ()=> gameInit())
    ;



