// 1. deposit some money
// 2. detemine the no of lines to bet
// 3. collect the bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give user their winning money
// 7. play again

// ---------------STEP 1---------------//

const prompt = require("prompt-sync")(); //require command gonna call the pakage we use to take user input and using a set of paranthesis ahead it will help us to access the function that we're gonna use to get user input.

const ROWS = 3;
const COLS = 3;

//number of symbols
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

//multiplier value of each symbol
const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

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

//---------------STEP 4--------------//

//SYMBOL_COUNT= no of symbols we have, put possible symboles we use in the list/array, randomly select from the array and remove that symbol from the array.
//in js, array is reference variable, i.e. we can add and manipulate the array without changing the reference to the array or itself. reason we took symbol array under const.
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = []; // each nested array is the column in slot machine
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols]; //copy the element of symbols array into the reelSymbol array. Because, for each nested array in 'reels', we have total available symbols in 'symbol' array. So, we'll create another variable 'reelSymbol' under the for loop for column (because each nested array represents a column) and copy it so that we can delete the symbols once used by the column and other manipulations in this 'reelSymbol'. this variable will restore it's value after every rows operations.
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have the balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    console.log(reels);
    console.log(rows);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("YOU WON, $$" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again ? (y/n) ");
    if (playAgain != "y") break;
  }
};

game();
