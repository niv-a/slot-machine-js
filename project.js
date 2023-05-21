// 1. deposit some money
// 2. detemine the no of lines to bet
// 3. collect the bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give user their winning money
// 7. play again

// ---------------STEP 1---------------//

const prompt = require("prompt-sync")(); //require command gonna call the pakage we use to take user input and using a set of paranthesis ahead it will help us to access the function that we're gonna use to get user input.

//while(true) is used to keep asking the user input untill they provide the valid input amount.
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the deposite amount: ");
    const numberDepositAmount = parseFloat(depositAmount); //converting user input to int because prompt is take it as a string by default

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid Deposit Amount. Try Again.");
    } else {
      return numberDepositAmount;
    }
  }
};

//---------------STEP 2---------------//

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the no. of lines (1-3) to bet on: ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines. Try Again");
    } else {
      return numberOfLines;
    }
  }
};

//---------------STEP 3---------------//

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet > balance / lines || numberBet <= 0) {
      console.log("Bet amount is not possible. Try Again");
    } else {
      return numberBet;
    }
  }
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
