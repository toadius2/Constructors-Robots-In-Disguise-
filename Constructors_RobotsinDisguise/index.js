var inquirer = require("inquirer");

var Word = require("./Word.js");
var figlet = require('figlet');
var chalk = require('chalk');

var guesses = 15;
var points = 0;

var wordsToGuess = ["Forever", "Eagleheart", "Paradise", "Hunting High and Low", "Lost Without a Trace", "The Hands of Time", "If the Story is Over", "Enigma", "Oblivion", "Unbreakable", "A Million Light Years Ago", "Galaxies", "In My Line of Work", "Years Go By", "A Drop in the Ocean"];
var randomWord;
var chosenWord;

function startGame() {

    console.log(chalk.yellow("It's time to play Russian Roulette!̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿ ...Wait! Sorry, time to play Word Guess with songs from Stratovarius! If you don't know them, well, then good luck!"));
}

function chooseRandomWord() {

    randomWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]

    chosenWord = new Word(randomWord);
}

function guessWord() {

    if (guesses > 0 && points < 5) {

        console.log(chosenWord.display());
    

        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (str) {
                    if (str.length != 1) return false;
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }

            }

        ]).then(function (guessedLetter) {

            var guess = guessedLetter.txt;

            chosenWord.checkGuess(guess);

            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log(chalk.red("NOPE! " + guesses + " guesses remaining"))
            } 
            else {
                if (points < 5) {
                console.log(chalk.green("CORRECT!"))
                }
            }

            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 15;
                points++;

                if (points < 5) {
                    console.log(chalk.green("CORRECT! Alright, next song!"));
                    chooseRandomWord();
                }

                else {
                    winGame();
                }
            }

            if (guesses === 0) {
                loseGame();
            }

            guessWord();

        });
    }

}

function loseGame() {
    console.log(chalk.red("GAME OVER!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 15;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.blue("Hmph, fine! Go back to your techno or electronic whatever music, and stay ignorant!"));
                process.exit();
            }
        })
}

function winGame() {

    figlet('YOU WIN!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    })


    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 15;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.blue("Well, fine! At least you won already."))
                process.exit();
            }
        })

}

startGame();
chooseRandomWord();
guessWord();