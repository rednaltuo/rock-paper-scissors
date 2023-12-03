const RESULT = {
    WIN: 1,
    TIE: 0,
    LOSS: -1
}

const WEAPONS = ['ROCK', 'PAPER', 'SCISSORS'];

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function calcRoundResult(playerChoice, computerChoice) {
    if (playerChoice == computerChoice)
        return RESULT.TIE;
    /**
     *  Observing the list [rock, paper, scissors] reveals a pattern:
     *  each weapon is beaten by its successor and beats its second successor
     *  (if we imagine that the end of the list wraps back to the beginning).
     *  By calculating the difference between the indexes of every ordered
     *  pair of different weapons, we can see that when (weapon2 - weapon1)
     *  is equal to 2 or -1, weapon1 wins; weapon2 wins in all other cases.
     */
    const difference = computerChoice - playerChoice;
    if (difference == 2 || difference == -1)
        return RESULT.WIN;
    return RESULT.LOSS;
}

function playRound(playerSelection) {
    let round = {};
    round.playerChoice = WEAPONS.indexOf(playerSelection);
    round.computerChoice = getComputerChoice();
    round.result = calcRoundResult(round.playerChoice, round.computerChoice);
    return round;
}

function displayRoundResult(round) {
    const playerWeapon = WEAPONS[round.playerChoice];
    const computerWeapon = WEAPONS[round.computerChoice];
    switch (round.result) {
    case RESULT.WIN:
        console.log(`You win! ${playerWeapon} beats ${computerWeapon}!`);
        break;
    case RESULT.LOSS:
        console.log(`You lose! ${computerWeapon} beats ${playerWeapon}!`);
        break;
    default:
        console.log('Tie! Re-play the round!');
    }
}

function game() {
    let playerWins = 0;
    for (let i=1; i<=5; i++) {
        let round;
        do {
            const playerSelection = prompt(`Round ${i}. Choose your weapon: `).toUpperCase();
            round = playRound(playerSelection);
            displayRoundResult(round);
        } while (round.result == RESULT.TIE);
        if (round.result == RESULT.WIN)
            playerWins++;
    }
    if (playerWins > 2) 
        console.log('You win the game!');
    else
        console.log('You lose the game!');
}

game();