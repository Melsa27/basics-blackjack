// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
// for the main function to perform different logic on user input, for example when a player decides to hit or stand, we may wish to consider using a new game mode.
// ---------------
//First Version: Compare Initial Hands to Determine Winner
//Second Version: Add Player Hit or Stand
//Third Version: Add Dealer Hit or Stand
//Fourth Version: Add Variable Ace Values
// ----------------

// ===== First verions =====//

//assign var to different game mode
var gameMode_gameStart = "game start";
var gameMode_cardsDrawn = "Cards drawn";
var gameMode_compareResults = "compare cards";
var gameMode_showResults = "show game results";
var gameMode_reset = "reset";
var currentGameMode = gameMode_gameStart; // initial game mode
//Player and Computer's hand
var playerHand = [];
var dealerHand = [];
//Var to deck created and shuffled
var deck;
var shuffledDeck;
// Keep track of when the game ends to prevent further moves
var gameOver = false;

// The maximum valid sum in Blackjack is 21.
// name a constant integer value so that our logic is clear
var TWENTY_ONE = 21;
// Dealer always hits until she reaches a sum greater than 16.
var dealerHitThreshold = 16;
// If player has chosen to stand, then player can no longer hit until game is over
var playerHasChosenToStand = false;

// -----Game Functions --------//
//1 ----function to check for blackJack---//
var checkForBlackJack = function () {
  //check player hand
  var playerCardOne = playerHand[0];
  var playerCardTwo = playerHand[1];
  var isBlackJack = false;
  //Change it to true only when there is a blackjack condition
  //First card ace, second card 10 or picture and vice versa

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};
//----end of 1---//

//2 -----function to check for player handvalue ----//
var calculateTotalPlayerHandValue = function (playerHand) {
  var totalPlayerHandValue = 0;
  var index = 0;
  while (index < playerHand.length) {
    if (
      playerHand[index].name == "jack" ||
      playerHand[index].name == "queen" ||
      playerHand[index].name == "king"
    ) {
      totalPlayerHandValue = totalPlayerHandValue + 10;
    } else {
      totalPlayerHandValue = totalPlayerHandValue + playerHand[index].rank;
    }
    index = index + 1;
  }
  return totalPlayerHandValue;
};
// ----end of 2 ----//

//3------function to check for dealer handvalue -----//
var calculateTotalDealerHandValue = function (dealerHand) {
  var totalDealerHandValue = 0;
  var index = 0;
  while (index < dealerHand.length) {
    if (
      dealerHand[index].name == "Jack" ||
      dealerHand[index].name == "Queen" ||
      dealerHand[index].name == "King"
    ) {
      totalDealerHandValue = totalDealerHandValue + 10;
    } else {
      totalDealerHandValue = totalDealerHandValue + dealerHand[index].rank;
    }
    index = index + 1;
  }
  return totalDealerHandValue;
};
//-----end of 3------//

// @@@@----Main function ---------@@@@@//

var main = function () {
  var myOutputValue = "";
  //When click submit at the start
  if ((currentGameMode = gameMode_gameStart)) {
    var deck = createNewDeck();
    console.log("This is shuffledDeck", deck);

    //Player and computer pick 2 cards from shuffled deck
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    // console.log("This is player hand", playerHand);
    // console.log("This is computer hand", dealerHand);

    //Switch game mode
    currentGameMode = gameMode_cardsDrawn;
    myOutputValue =
      "Both player and dealer has drawn 2 cards, please press submit to continue";
  }

  //When submit clicked for second time after cards drawnn.

  if (currentGameMode == gameMode_cardsDrawn) {
    console.log("game mode 1", currentGameMode);

    //The cards are analyzed for Blackjack
    // Winner will be annouced and game ends here if anyone has Blackjack

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("Does player have blackjack?", playerHasBlackJack);
    console.log("Does dealer has blackjack?", dealerHasBlackJack);

    //Scenario 1: When both blackjack - Tie
    if (playerHasBlackJack == true && dealerHasBlackJack == true) {
      return (myOutputValue = "Its a tie. Both Blackjack!");
    }
    //Scenario 2: When player blackjack - Playwer wins
    if (playerHasBlackJack == true && dealerHasBlackJack == false) {
      return (myOutputValue =
        "Player has Blackjack and wins. Please refresh to play again.!");
    }
    //Scenario 3: When dealer blackjack - Dealer Wins
    if (playerHasBlackJack == false && dealerHasBlackJack == true) {
      return (myOutputValue =
        "Dealer has Blackjack and wins. Please refresh to play again.!");
    } else {
      //no blackjack, games continue
      var totalPlayerHandValue = calculateTotalPlayerHandValue(playerHand);
      var totalDealerHandValue = calculateTotalDealerHandValue(dealerHand);

      if (totalPlayerHandValue == totalDealerHandValue) {
        myOutputValue = `Its a tie <br> ${getCardsOutput()}<br> Please press refresh to start again!`;
        console.log(
          "its a tie, this is player total value and dealer total value",
          totalPlayerHandValue,
          totalDealerHandValue,
          getCardsOutput()
        );
      }
      if (totalPlayerHandValue > totalDealerHandValue) {
        myOutputValue = `"Player wins!" <br> ${getCardsOutput()}<br> Please press refresh to start again!`;

        console.log(
          "Player wins! This is player total value and dealer total value",
          totalPlayerHandValue,
          totalDealerHandValue,
          getCardsOutput()
        );
      }
      if (totalDealerHandValue > totalPlayerHandValue) {
        myOutputValue = `"Dealer wins!" <br> ${getCardsOutput()}<br> Please press refresh to start again!`;
        //  ${totalPlayerHandValue}, ${totalDealerHandValue}`;
        console.log(
          "Dealer wins! This is player total value and dealer total value",
          totalPlayerHandValue,
          totalDealerHandValue,
          getCardsOutput()
        );
      }
    }
    //Change gamemode to show results
    currentGameMode = gameMode_showResults;
    return myOutputValue;
  }
};

//Scenario 4a: Same value - Tie
//Scenario 4b: Player value > dealer value - player wins
//Scenario 4c: Dealer value > player value - dealer wins

//change game mode
//output message

// var playerCard = deck.pop().name + " of " + deck.pop().suit;
// console.log("This is the last card:", deck.pop());
// var myOutputValue = `This is your card: ${playerCard}`;
// console.log("Selected card", playerCard);
// return myOutputValue;

//===Helper Function 1 - Make a Card Deck
//make 52 cards
//rank 1-13
//1-4 suits hearts, diamonds, clubs, spades
//1-10 and jack, queen, king and ace
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // console.log("This is the curent suit", currentSuit);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter from 2 to 10
      var cardName = rankCounter;
      // console.log("This is the cardName", cardName);

      //These are special cases where card name is not from 2 to 10. If rank is 1 (ace), 11 (jack), 12 (Queen), or 13(King), set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // console.log("This is the card", card);
      // // Add the new card to the deck
      cardDeck.push(card);

      // console.log("This is the card deck", cardDeck);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
}

// ===Helper Function 2 - Simulates card shuffling
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

//===Helper function 3 - creates a deck and shuffles
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//====Helper function 4 -- Convert object to string
// Convert hand to a string where objects within the array are stringified
var convertPlayerHandToString = function (playerhand) {
  var index = 0;
  var cards = " ";

  while (index < playerhand.length) {
    var cards =
      cards + "," + playerhand[index].name + " of " + playerhand[index].suit;
    console.log("This is playerHand", playerHand[index]);
    index = index + 1;
  }
  return cards;
};

var convertDealerHandToString = function (dealerHand) {
  var index = 0;
  var cards = " ";

  while (index < dealerHand.length) {
    var cards =
      cards + "," + dealerHand[index].name + " of " + dealerHand[index].suit;
    index = index + 1;
  }
  return cards;
};

var getCardsOutput = function () {
  return `Player has: ${convertPlayerHandToString(
    playerHand
  )} with sum ${calculateTotalPlayerHandValue(playerHand)}. <br>
    Computer has: ${convertDealerHandToString(
      dealerHand
    )} with sum ${calculateTotalDealerHandValue(dealerHand)}.`;
};
