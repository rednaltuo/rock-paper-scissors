let weapons = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    return weapons[Math.floor(Math.random() * 3)];
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection)
        return false;
    let indexDifference = weapons.indexOf(computerSelection) - weapons.indexOf(playerSelection);
    if (indexDifference == 2 || indexDifference == -1)
        return `You win! ${capitalize(playerSelection)} beats ${computerSelection}`;
    return `You lose! ${capitalize(computerSelection)} beats ${playerSelection}`;
}

function game() {
    let playerWins = 0;
    for (let i=1; i<=5; i++) {
        let isTie;
        do {
            isTie = false;
            let playerSelection = prompt(`Round ${i}. Choose your weapon: `).trim().toLowerCase();
            let roundResult = playRound(playerSelection, getComputerChoice());
            if (!roundResult) {
                isTie = true;
                console.log('Tie!');
            }
            else {
                console.log(roundResult);
                if (roundResult[4] == 'w')
                    playerWins++;
            }
        } while (isTie);
    }
    if (playerWins > 2) 
        console.log('You win!');
    else
        console.log('You lose!');
}

game();
