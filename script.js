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
var gameMode_Name = "Get name";
var gameMode_gameStart = "game start";
// var gameMode_cardsDrawn = "Cards drawn";
var gameMode_compareResults = "compare cards";
var gameMode_showResults = "show game results";
var gameMode_hitOrStand = "Choose Hit or stand";
var gameMode_reset = "reset";
var currentGameMode = gameMode_Name; // initial game mode
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
//Hit 21 to win
var toWinGame = 21;
//Username
var userName = "";
//Count score
var winCount = 0;
var totalPlay = 0;
var pointsToStart = 100;

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

  if (pointsToStart > 0) {
    if (currentGameMode == gameMode_Name) {
      //set the name
      console.log("This is current game mode before name", currentGameMode);
      userName = "Player " + input;
      //now that we have the name, switch the mode
      currentGameMode = gameMode_gameStart;
      var myImage = '<img src="https://c.tenor.com/sW_xgchdo6kAAAAj/nya.gif"/>';
      return (myOutputValue = `Hello ${userName}! Click <b>submit</b> to start the game! <br><br><b><u><center>Rules</u></b><br>Objective is to get 21 points or as close to 21 as possible without exceeding. <br>You start with ${pointsToStart} points. <br>Winning will add 10 points and losing will deduct 10 points.<br> If anyone gets 21, its sudden death, person with 21 wins all. Game over! <br><br> ${myImage}</center>`);
    }

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

        return (myOutputValue = `WHAT!? Its a tie! <b>Both Blackjack!!! Game over!</b> <br> ${getCardsOutput()} <br> <br><br> <center> ${myImage} <br>GAME OVER! Please <b>refresh page</b> to play again!`);
      }

      //Scenario 2: When player blackjack - Playwer wins
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        var myImage =
          '<img src="https://c.tenor.com/2P40C7wvid4AAAAd/cat-mochi-mochi-peach-cat.gif"/>';
        return (myOutputValue = `<b>${userName}</b> has <b>Blackjack</b> and wins! GAME OVER! <br> ${getCardsOutput()} <br><br> <center> ${myImage} <br> GAME OVER! Please <b>refresh page</b> to play again!`);
      }
      //Scenario 3: When dealer blackjack - Dealer Wins
      else if (playerHasBlackJack == false && dealerHasBlackJack == true) {
        var myImage =
          '<img src="https://c.tenor.com/sjnrOgJ_uagAAAAd/cute-cat-crying.gif"/>';
        return (myOutputValue = `<b>Dealer</b> has <b>Blackjack</b> and wins! GAME OVER! <br> ${getCardsOutput()} <br><br> <center> ${myImage} <br> GAME OVER! Please <b>refresh page</b> to play again!`);
      }

      //Scenario 4:
      // if (playerHasBlackJack == false && dealerHasBlackJack == false)
      else {
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

        myOutputValue = `${userName}, this is your hand: ${playerHandDisplayed}.  You are at ${totalPlayerHandValue} right now! <br><br> This is one of the Dealer's card: ${dealerHand[1].rank} ${dealerHand[1].suit} . <br><br><b> Please input either "h" for hit or "s" for stand, then press Submit</b> <br><br><center>${myImage}</center>`;
        // return myOutputValue;
      }
      return myOutputValue;
      // The player decides whether to hit or stand, using the submit button to submit their choice.
    } else if (currentGameMode == gameMode_hitOrStand) {
      console.log("game mode 2", currentGameMode);
      // validation
      if (input !== "h" && input !== "H" && input !== "s" && input !== "S") {
        return 'Please input either "h" for hit or "s" for stand as possible moves';
      }
      // player hit or stand -------------------------------------------------
      if (input == "h" || input == "H") {
        playerHand.push(deck.pop());
        var playerHandDisplayed = convertPlayerHandToString(playerHand);

        //--------if under 21 after throwing another card - return if they want to hit or stand again
        var totalPlayerHandValue = calculateTotalPlayerHandValue(playerHand);
        if (totalPlayerHandValue <= toWinGame) {
          var myImage =
            '<img src="https://c.tenor.com/KayBlLo95RoAAAAd/peach-cat.gif"/>';

          myOutputValue = `${userName}, this is your hand: ${playerHandDisplayed}.  You are at ${totalPlayerHandValue} right now! <br><br> This is one of the Dealer's card: ${dealerHand[1].name} ${dealerHand[1].suit} . <br><br><b> Please input either "h" for hit or "s" for stand, then press Submit</b> <br><br><center>${myImage}</center>`;
          return myOutputValue;
        }

        var playerHandDisplayed = convertPlayerHandToString(playerHand);
        console.log("This is player hand after 1 hit", playerHand);
        // myOutputValue = `Player, this is your hand ${playerHandDisplayed} `;
      }
      if (input == "s" || input == "S") {
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
      console.log(
        "This is playerHandvalue and dealer hand value",
        totalPlayerHandValue,
        totalDealerHandValue
      );
      //Scenario 1, player>21, dealer<21 or dealer = 21 -> Dealer wins
      if (totalPlayerHandValue > 21 && totalDealerHandValue <= 21) {
        console.log("Run A");
        pointsToStart = pointsToStart - 10;
        var myImage =
          '<img src="https://c.tenor.com/M_5Qg9ok3HQAAAAd/cat-pout.gif"/>';
        myOutputValue = `<b>Dealer wins</b> with ${totalDealerHandValue}! ${userName} bust with ${totalPlayerHandValue}.<br> ${getCardsOutput()}<br><br>Total Points:${pointsToStart} <br> <center> ${myImage}   <br><br> Press "submit" to have another go!`;
      }
      //Scenario 2, player<21 OR player = 21, dealer>21 bust -> Player wins
      if (totalPlayerHandValue <= 21 && totalDealerHandValue > 21) {
        console.log("Run B");
        pointsToStart = pointsToStart + 10;
        var myImage =
          '<img src="https://c.tenor.com/906nGAL7Xw0AAAAi/mochi-peachcat-cute-cat.gif"/>';
        myOutputValue = `<b>${userName} wins</b> with ${totalPlayerHandValue}! Dealer bust with ${totalDealerHandValue}. <br> ${getCardsOutput()} <br><br>Total Points:${pointsToStart} <br> <center> ${myImage}     <br><br> Press "submit" to have another go!`;
      }
      //Scenario 3, player & dealer bust -> No winner
      if (totalPlayerHandValue > 21 && totalDealerHandValue > 21) {
        console.log("Run C");
        var myImage =
          '<img src="https://c.tenor.com/akjDxmuk7o4AAAAd/cute-cat.gif"/>';
        myOutputValue = `BOOOOOM! No one wins! Dealer bust with ${totalDealerHandValue}. ${userName} bust with ${totalPlayerHandValue}! <br> ${getCardsOutput()} <br><br>Total Points:${pointsToStart} <br> <center> ${myImage} <br><br> Press "submit" to have another go!`;
      }
      //Scenario 4, player =21, dealer < 21 -> player wins
      if (totalPlayerHandValue == 21 && totalDealerHandValue < 21) {
        console.log("Run D");
        pointsToStart = pointsToStart + 10;
        var myImage =
          '<img src="https://c.tenor.com/B90M86eYw0cAAAAj/cute-mochi-mochi.gif"/>';
        myOutputValue = `<b>Player wins with ${totalPlayerHandValue}!</b> <br> ${getCardsOutput()} <br><br>Total Points:${pointsToStart} <br> <center> ${myImage} <br><br> Press "submit" to have another go!</center>`;
      }
      //Scemario 5, player <21, dealer = 21 -> dealer wins
      if (totalPlayerHandValue < 21 && totalDealerHandValue == 21) {
        console.log("Run E");
        pointsToStart = pointsToStart - 10;
        var myImage =
          '<img src="https://c.tenor.com/pJNWy-sz-fEAAAAj/peach-cat-crying.gif"/>';
        myOutputValue = `<b>Dealer wins with ${totalDealerHandValue}!</b> <br> ${getCardsOutput()} <br><br>Total Points:${pointsToStart} <br> <center> ${myImage} <br><br> Press "submit" to have another go!</center>`;
      }

      if (totalDealerHandValue < 21 && totalPlayerHandValue < 21) {
        console.log("Run F");
        if (totalPlayerHandValue == totalDealerHandValue) {
          console.log("Run F1");
          var myImage =
            '<img src="https://c.tenor.com/WiQQRwR2QFAAAAAj/cute-panda.gif"/>';
          myOutputValue = `<b>Its a tie!!</B> <br> ${getCardsOutput()} <br><br> Total Points:${pointsToStart} <br> <center> ${myImage} Press "submit" to have another go!</center>  `;
        }

        if (totalPlayerHandValue > totalDealerHandValue) {
          console.log("Run F2");
          pointsToStart = pointsToStart + 10;
          var myImage =
            '<img src="https://c.tenor.com/0_6RNy6eYZcAAAAd/yay-mochi.gif"/>';
          myOutputValue = `<b>${userName} wins!</b> <br> ${getCardsOutput()}<br><br> Total Points:${pointsToStart} <br> <center> ${myImage}   Press "submit" to have another go!</center>`;
        }
        if (totalDealerHandValue > totalPlayerHandValue) {
          console.log("Run F3");
          pointsToStart = pointsToStart - 10;
          var myImage =
            '<img src="https://c.tenor.com/yhMZIW9G7BkAAAAj/peachcat-cat.gif"/>';

          myOutputValue = `<b>Dealer wins!</b> <br> ${getCardsOutput()} <br><br> Total Points:${pointsToStart} <br> <center> ${myImage} <br><br> Press "submit" to have another go!</center>`;
        }
      }
    }
    resetGame();
    return myOutputValue;
  } else {
    resetGame();
    var myImage =
      '<img src="https://c.tenor.com/1mTPXADa0yMAAAAi/cry-miss.gif"/>';
    return `<b>YOU HAVE NO POINTS LEFT! HOW IS THAT POSSIBLE !?!</b> <br>Fun Fact: The odds of this happening are 1 in 510! <br>Better luck next time ... though I will stay away from any form of gambling if I am you. #JustSaying <br><br><center>${myImage} <I>Please refresh page to start new game`;
  }
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
  var suits = ["♥", "♦", "♣", "♠"];

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
      cards += playerhand[index].name + playerhand[index].suit;
    } else {
      cards += ", " + playerhand[index].name + playerhand[index].suit;
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
      cards = dealerHand[index].name + dealerHand[index].suit;
    } else {
      cards = cards + "," + dealerHand[index].name + dealerHand[index].suit;
    }
    index = index + 1;
  }
  return cards;
};

var getCardsOutput = function () {
  return `${userName} has: ${convertPlayerHandToString(
    playerHand
  )} . Total: ${calculateTotalPlayerHandValue(playerHand)}. <br>
    Dealer has: ${convertDealerHandToString(
      dealerHand
    )} . Total: ${calculateTotalDealerHandValue(dealerHand)}.`;
};

var resetGame = function () {
  currentGameMode = gameMode_gameStart;
  playerHand = [];
  dealerHand = [];
};
