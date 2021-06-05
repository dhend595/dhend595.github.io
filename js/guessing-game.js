class Game {
    constructor() {
        this.playersGuess = null;
        this.winningNumber = generateWinningNumber();
        this.pastGuesses = [];
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    isLower() {
        if (this.playersGuess < this.winningNumber) {
            return true;
        } else {
            return false;
        }
    }

    playersGuessSubmission(aNum) {
        if (aNum > 100 || aNum < 1 || isNaN(aNum)) {
            document.getElementById('message').innerHTML = `Sorry, ${aNum} isn't valid.`;
            throw `That is an invalid guess.`;
        } else {
            this.playersGuess = aNum;
        }
        return this.checkGuess();
    }

    checkGuess() {

        let messageDisplay = '';

        if (parseInt(this.playersGuess) === this.winningNumber) {
            messageDisplay = 'You Win! Press Restart to play again!';
            document.getElementById('submit').disabled = true;
            document.getElementById('hint').disabled = true;
        }
        else if(this.pastGuesses.includes(this.playersGuess)) {
            messageDisplay = 'You have already guessed that number!';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length === 5) {
                messageDisplay = `You Lose. The winning number was ${this.winningNumber}!`;
            } else {
                let diffNum = this.difference();
                if(diffNum < 10 && this.playersGuess < this.winningNumber) {
                    messageDisplay = "You're burning up! (Too low!)" ;
                }
                else if(diffNum < 10 && this.playersGuess > this.winningNumber) {
                    messageDisplay = "You're burning up! (Too high!)" ;
                }
                else if(diffNum < 25 && this.playersGuess < this.winningNumber) {
                    messageDisplay = "You're lukewarm. (Too low!)";
                }
                else if(diffNum < 25 && this.playersGuess > this.winningNumber) {
                    messageDisplay = "You're burning up! (Too high!)" ;
                }
                else if(diffNum < 50 && this.playersGuess < this.winningNumber) {
                    messageDisplay = "You're a bit chilly. (Too low!)";
                }
                else if(diffNum < 50 && this.playersGuess > this.winningNumber) {
                    messageDisplay = "You're a bit chilly. (Too high!)";
                }
                else {
                    messageDisplay = "You're ice cold!";
                }
            }
        }
        document.getElementById('message').innerHTML = messageDisplay;
        document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
    }

    provideHint() {
        const hintArr = [
            this.winningNumber,
            generateWinningNumber(),
            generateWinningNumber(),
        ];
        return shuffle(hintArr);
    }
}

function generateWinningNumber() {
    let correctGuess = Math.floor(Math.random() * 100) + 1;
    return correctGuess;
}

function shuffle(array) {
    for (i = array.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[random];
        array[random] = temp;
    }
    return array;
}

function newGame() {
    return new Game();
}

function playGame() {
    const game = newGame();

    const button = document.getElementById('submit');
    const hintButton = document.getElementById('hint');
    const inputEnter = document.getElementById('player-input');

    button.addEventListener('click', function() {
        const playersGuess = document.getElementById('player-input').value;
        document.querySelector('input').value = '';

        game.playersGuessSubmission(playersGuess);
    });

    // inputEnter.addEventListener('keyup', function(e) {
    //     if(e.keyCode === 13) {
    //         const playersGuess = document.getElementById('player-input').value;
    //         document.querySelector('input').value = '';

    //         game.playersGuessSubmission(playersGuess);
    //     }
    // });

    hintButton.addEventListener('click', function() {
        const hints = game.provideHint();
        document.getElementById('message').innerHTML = `The winning number is either ${hints[0]}, ${hints[1]}, or ${hints[2]}!`;
    });
}

function refreshPage() {
    window.location.reload();
}

playGame();