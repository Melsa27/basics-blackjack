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

//assign var to different game mode
var gameMode_gameStart = "game start";
// var gameMode_cardsDrawn = "Cards drawn";
var gameMode_compareResults = "compare cards";
var gameMode_showResults = "show game results";
var gameMode_hitOrStand = "Choose Hit or stand";
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
// The dealer has to hit if their hand is below 17.
var dealerHitThreshold = 17;

// -----Game Functions --------//
//1 ----function to check for blackJack---//
var checkForBlackJack = function (handArray) {
  //check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;
  //Change it to true only when there is a blackjack condition
  //First card ace, second card 10 or picture and vice versa

  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "Ace")
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
  var aceCounter = 0;
  while (index < playerHand.length) {
    if (
      playerHand[index].name == "Jack" ||
      playerHand[index].name == "Queen" ||
      playerHand[index].name == "King"
    ) {
      totalPlayerHandValue = totalPlayerHandValue + 10;
    } else if (playerHand[index].name == "Ace") {
      totalPlayerHandValue = totalPlayerHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalPlayerHandValue = totalPlayerHandValue + playerHand[index].rank;
    }
    index = index + 1;
  }
  //Reset index for ace counter
  index = 0;
  //Loop for number of ace and dedect 10 if totalhandvalue >21
  while (index < aceCounter) {
    if (totalPlayerHandValue > 21) {
      totalPlayerHandValue = totalPlayerHandValue - 10;
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
  var aceCounter = 0;
  //Loop through to add up the ranks
  while (index < dealerHand.length) {
    if (
      dealerHand[index].name == "Jack" ||
      dealerHand[index].name == "Queen" ||
      dealerHand[index].name == "King"
    ) {
      totalDealerHandValue = totalDealerHandValue + 10;
    } else if (dealerHand[index].name == "Ace") {
      totalDealerHandValue = totalDealerHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalDealerHandValue = totalDealerHandValue + dealerHand[index].rank;
    }
    index = index + 1;
  }
  //Reset index for ace counter
  index = 0;
  //Loop for number of ace and dedect 10 if totalhandvalue >21
  while (index < aceCounter) {
    if (totalDealerHandValue > 21) {
      totalDealerHandValue = totalDealerHandValue - 10;
    }
    index = index + 1;
  }
  return totalDealerHandValue;
};
//-----end of 3------//

// @@@@@@@@@@@@@@@@@@@@@@ - Main Function - @@@@@@@@@@@@@@@@@@@@@@@//

var main = function (input) {
  var myOutputValue = "";
  //When click submit at the start
  deck = createNewDeck();
  console.log("This is shuffledDeck", deck);

  if (currentGameMode == gameMode_gameStart) {
    console.log("game mode 1", currentGameMode);

    //Player and computer pick 2 cards from shuffled deck
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    console.log("This is dealerHand at start", dealerHand);

    //The cards are analyzed for Blackjack
    // Winner will be annouced and game ends here if anyone has Blackjack

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    // var playerHasBlackJack = true;
    // var dealerHasBlackJack = true;

    console.log("Does player have blackjack?", playerHasBlackJack);
    console.log("Does dealer has blackjack?", dealerHasBlackJack);

    //Scenario 1: When both blackjack - Tie
    if (playerHasBlackJack == true && dealerHasBlackJack == true) {
      var myImage =
        '<img src="https://c.tenor.com/FEQRi1Y4PZgAAAAd/swing-grey-cat.gif"/>';

      return (myOutputValue = `WHAT!? Its a tie! <b>Both Blackjack!!!</b> <br> ${getCardsOutput()} <br><br> <center> ${myImage} <br>Please <b>refresh page</b> to play again!`);
    }

    //Scenario 2: When player blackjack - Playwer wins
    if (playerHasBlackJack == true && dealerHasBlackJack == false) {
      var myImage =
        '<img src="https://c.tenor.com/2P40C7wvid4AAAAd/cat-mochi-mochi-peach-cat.gif"/>';
      return (myOutputValue = `<b>Player</b> has <b>Blackjack</b> and wins! <br> ${getCardsOutput()} <br><br> <center> ${myImage} <br> Please <b>refresh page</b> to play again!`);
    }
    //Scenario 3: When dealer blackjack - Dealer Wins
    if (playerHasBlackJack == false && dealerHasBlackJack == true) {
      var myImage =
        '<img src="https://c.tenor.com/sjnrOgJ_uagAAAAd/cute-cat-crying.gif"/>';
      return (myOutputValue = `<b>Dealer</b> has <b>Blackjack</b> and wins! <br> ${getCardsOutput()} <br><br> <center> ${myImage} <br> Please <b>refresh page</b> to play again!`);
    } else {
      //no blackjack, games continue
      var totalPlayerHandValue = calculateTotalPlayerHandValue(playerHand);
      var totalDealerHandValue = calculateTotalDealerHandValue(dealerHand);

      console.log("game mode 2", currentGameMode);
      var playerHandDisplayed = convertPlayerHandToString(playerHand);
      console.log("This is playerhand", playerHand);
      console.log("This is dealerhand", dealerHand[1]);
      //Switch game mode to display player's cards and to choose hit or stand
      currentGameMode = gameMode_hitOrStand;
      var myImage =
        '<img src = "https://c.tenor.com/BB3sZELhyQgAAAAj/ermm-hmmm.gif"/>';

      myOutputValue = `Player, this is your hand: ${playerHandDisplayed}.  You are at ${totalPlayerHandValue} right now! <br><br> This is one of the Dealer's card: ${dealerHand[1].rank} of ${dealerHand[1].suit} . <br><br><b> Please input either "h" for hit or "s" for stand, then press Submit</b> <br><br><center>${myImage}</center>`;
      return myOutputValue;
    }

    // The player decides whether to hit or stand, using the submit button to submit their choice.
  } else if (currentGameMode == gameMode_hitOrStand) {
    console.log("game mode 2", currentGameMode);
    // validation
    if (input !== "h" && input !== "s") {
      return 'Please input either "h" for hit or "s" for stand as possible moves';
    }
    // player hit or stand -------------------------------------------------
    if (input == "h") {
      //--------if under 21, then hit again - return if they want to hit or stand again
      playerHand.push(deck.pop());
      var playerHandDisplayed = convertPlayerHandToString(playerHand);
      console.log("This is player hand after 1 hit", playerHand);
      // myOutputValue = `Player, this is your hand ${playerHandDisplayed} `;
    }
    if (input == "s") {
      var playerHandDisplayed = convertPlayerHandToString(playerHand);
      console.log("This is player hand after 1 hit", playerHand);
      // myOutputValue = `Player, this is your hand ${playerHandDisplayed} `;
    }
    //Calculate current total ---------------------------------------------
    var totalPlayerHandValue = calculateTotalPlayerHandValue(playerHand);
    var totalDealerHandValue = calculateTotalDealerHandValue(dealerHand);

    // Player hit or stand again if value is less than 17 -----------------

    // computer hit or stand -------------------------------------------------
    while (totalDealerHandValue < dealerHitThreshold) {
      // dealer draw a card
      dealerHand.push(deck.pop());
      console.log("This is dealerHand after drawing third card", dealerHand);
      totalDealerHandValue = calculateTotalDealerHandValue(dealerHand);
    }
    // compare and decide winner ------------------------------------------------

    if (totalPlayerHandValue > 21 && totalDealerHandValue <= 21) {
      var myImage =
        '<img src="https://c.tenor.com/M_5Qg9ok3HQAAAAd/cat-pout.gif"/>';
      myOutputValue = `<b>Dealer wins</b> with ${totalDealerHandValue}! Player bust with ${totalPlayerHandValue}. <br><br> <center> ${myImage}   <br><br> Press "submit" to have another go!`;
    }
    if (totalPlayerHandValue <= 21 && totalDealerHandValue > 21) {
      var myImage =
        '<img src="https://c.tenor.com/906nGAL7Xw0AAAAi/mochi-peachcat-cute-cat.gif"/>';

      myOutputValue = `<b>Player wins</b> with ${totalPlayerHandValue}! Dealer bust with ${totalDealerHandValue}. <br><br> <center> ${myImage}     <br><br> Press "submit" to have another go!`;
    }
    if (totalPlayerHandValue > 21 && totalDealerHandValue > 21) {
      var myImage =
        '<img src="https://c.tenor.com/akjDxmuk7o4AAAAd/cute-cat.gif"/>';
      myOutputValue = `BOOOOOM! No one wins! Dealer bust with ${totalDealerHandValue}. Player bust with ${totalPlayerHandValue}! <br><br> <center> ${myImage} <br><br> Press "submit" to have another go!`;
    }
    if (totalDealerHandValue < 21 && totalPlayerHandValue < 21) {
      if (totalPlayerHandValue == totalDealerHandValue) {
        var myImage =
          '<img src="https://c.tenor.com/WiQQRwR2QFAAAAAj/cute-panda.gif"/>';
        myOutputValue = `<b>Its a tie!!</B> <br> ${getCardsOutput()}<br><br> <center> ${myImage} Press "submit" to have another go!</center>  `;
      }
      if (totalPlayerHandValue > totalDealerHandValue) {
        var myImage =
          '<img src="https://c.tenor.com/0_6RNy6eYZcAAAAd/yay-mochi.gif"/>';
        myOutputValue = `<b>Player wins!</b> <br> ${getCardsOutput()}<br><br> <center> ${myImage}   Press "submit" to have another go!</center>`;
      }
      if (totalDealerHandValue > totalPlayerHandValue) {
        var myImage =
          '<img src="https://c.tenor.com/yhMZIW9G7BkAAAAj/peachcat-cat.gif"/>';

        myOutputValue = `<b>Dealer wins!</b> <br> ${getCardsOutput()} <br><br> <center> ${myImage} <br><br> Press "submit" to have another go!</center>`;
      }
    }
  }
  resetGame();
  return myOutputValue;
};

//===Helper Function 1 - Make a Card Deck
//make 52 cards
//rank 1-13
//1-4 suits hearts, diamonds, clubs, spades
//1-10 and jack, queen, king and ace
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts ♥", "Diamonds ♦", "Clubs ♣", "Spades ♠"];

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
    if (index == 0) {
      cards += playerhand[index].name + " of " + playerhand[index].suit;
    } else {
      cards += ", " + playerhand[index].name + " of " + playerhand[index].suit;
    }
    console.log("This is playerHand", playerHand[index]);
    index = index + 1;
  }
  return cards;
};

var convertDealerHandToString = function (dealerHand) {
  var index = 0;
  var cards = "";

  while (index < dealerHand.length) {
    if (index == 0) {
      cards = dealerHand[index].name + " of " + dealerHand[index].suit;
    } else {
      cards =
        cards + "," + dealerHand[index].name + " of " + dealerHand[index].suit;
    }
    index = index + 1;
  }
  return cards;
};

var getCardsOutput = function () {
  return `Player has: ${convertPlayerHandToString(
    playerHand
  )} with sum ${calculateTotalPlayerHandValue(playerHand)}. <br>
    Dealer has: ${convertDealerHandToString(
      dealerHand
    )} with sum ${calculateTotalDealerHandValue(dealerHand)}.`;
};

var resetGame = function () {
  currentGameMode = gameMode_gameStart;
  playerHand = [];
  dealerHand = [];
};
