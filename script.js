const RESULT = Object.freeze({
    WIN: 1,
    TIE: 0,
    LOSS: -1
});

const WEAPONS = ['ROCK', 'PAPER', 'SCISSORS'];

let game;

function newGame() {
    return {
        winsToWin: 3,
        playerWins: 0,
        computerWins: 0,
        currentRound: 1
    }
}

const newGameBtn = document.querySelector('.newGame');
newGameBtn.addEventListener('click', () => {
    resetGame();
    setInfo('Choose your weapon:');
});

const buttonsDiv = document.querySelector('.buttons');
buttonsDiv.addEventListener('click', (e) => {
    if (e.target.className == 'weapon'){
        const round = fight(e.target.value);
        const gameOver = updateGame(round);
        updateInfo(round);
        if (gameOver) {
            const gameOverMessage = document.querySelector('.gameOverMessage');
            gameOverMessage.textContent = gameOver;
            buttonsDiv.replaceChildren();
            buttonsDiv.appendChild(newGameBtn);
        }
    }
});

function updateGame(round) {
    if (round.result == RESULT.TIE)
        return;
    if (round.result == RESULT.WIN) {
        game.playerWins++;
        if (game.playerWins == game.winsToWin) 
            return 'You win the game!';
    }
    else {
        game.computerWins++;
        if (game.computerWins == game.winsToWin) 
            return 'You lose the game!';
    }
    game.currentRound++;
}

function resetGame() {
    game = newGame();
    newGameBtn.remove();
    const gameOverMessage = document.querySelector('.gameOverMessage');
    gameOverMessage.textContent = '';
    const buttonsDiv = document.querySelector('.buttons');
    for (let i = 0; i < 3; i++) {
        const weaponBtn = document.createElement('button');
        weaponBtn.className = 'weapon';
        weaponBtn.value = i;
        weaponBtn.textContent = WEAPONS[i];
        buttonsDiv.appendChild(weaponBtn);
    }
}

function fight(playerChoice) {
    const round = {};
    round.playerChoice = playerChoice;
    round.computerChoice = getComputerChoice();
    round.result = calcRoundResult(round.playerChoice, round.computerChoice);
    return round;
}

function setInfo(messageText) {
    const message = document.querySelector('.message');
    const roundInfo = document.querySelector('.roundInfo');
    const scores = document.querySelector('.scores');
    message.textContent = messageText;
    roundInfo.textContent = `Round ${game.currentRound}`;
    scores.textContent = `${game.playerWins} - ${game.computerWins}`;
}

function updateInfo(round) {
    const message = document.querySelector('.message');

    if (round.result == RESULT.TIE) {
        message.textContent = 'Tie! Re-play the round!';
        return;
    }

    const playerWeapon = WEAPONS[round.playerChoice];
    const computerWeapon = WEAPONS[round.computerChoice];
    if (round.result == RESULT.WIN)
        setInfo(`You win! ${playerWeapon} beats ${computerWeapon}!`);
    else 
        setInfo(`You lose! ${computerWeapon} beats ${playerWeapon}!`);
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

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}