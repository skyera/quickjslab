import * as std from 'std';
import * as os from 'os';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
    const secretNumber = getRandomInt(1, 100);
    let guesses = 0;
    let guess;

    std.printf("Welcome to Guess the Number!\n");
    std.printf("I'm thinking of a number between 1 and 100.\n");

    while (true) {
        std.printf("Enter your guess: ");
        std.out.flush();
        guess = Math.floor(Math.random() * 100) + 1;
        std.printf("%d\n", guess);
        guesses++;

        if (guess < secretNumber) {
            std.printf("Too low! Try again.\n");
        } else if (guess > secretNumber) {
            std.printf("Too high! Try again.\n");
        } else {
            std.printf("Congratulations! You got it in %d guesses!\n", guesses);
            break;
        }
        os.sleep(500);
    }
}

playGame();
