// -----------------------------------------------------
// Silly Simple Card Class
// -----------------------------------------------------

"use strict";

// 4 Suits
var suits = ['Spade', 'Club', 'Diamond', 'Heart'];
var cardPip = ['q', 'w', 'e', 'r'];
var cardOffset = [0,1,2,3];

var cardValue = ['1','2','3','4','5','6','7','8','9','0','a','s','d'];
var faces = [/* jack */'c','v', /*queen*/'!', '@', /*king*/'#', '$'];

var cardsFaces = ['Ace','2','3','4','5','6','7','8','9','10','Jack', 'Queen', 'King'];
var colors = ['black', 'black', 'red', 'red'];


var currentSuit = 0;
var currentCard = 0;
var isJoker = false;

exports.setJoker = function() {
    isJoker = true;
    return exports.getCurrentCard();
};

exports.cardCount = function() {
    return suits.length * cardsFaces.length;
};

exports.resetDeck = function() {
    isJoker = false;
    currentSuit = 0;
    currentCard = 0;
};

exports.getCurrentCard = function() {
    if (isJoker) {
        return {
            id: 53,
            suit: 'Joker',
            pip: '4',
            face: '',
            value: 'Joker',
            cardValue: 'Joker',
            color: 'black',
            offset: 4
        };
    }
    var hasFace = currentCard > 9;
    return {
        id: (currentSuit * 13) + currentCard,
        suit: suits[currentSuit],
        pip: cardPip[currentSuit],
        face: hasFace ? (currentSuit === 3 ? faces[((currentCard-10)*2)+1] : faces[((currentCard-10)*2)+rnd(1)]) : '',
        cardValue: cardValue[currentCard],
        value: cardsFaces[currentCard],
        color: colors[currentSuit],
        offset: [cardOffset[currentSuit]] 
    };
};

// 4 Suit's, 13 Cards in each Suit
exports.nextCard = function() {
     isJoker = false;
    currentCard++;
    if (currentCard > 12) {
        currentCard = 0;
        currentSuit++;
        if (currentSuit > 3) {
            currentSuit = 0;
        }
    }
    return exports.getCurrentCard();
};


// 4 Suit's, 13 Cards in each Suit
exports.priorCard = function() {
    isJoker = false;
    currentCard--;
    if (currentCard < 0) {
        currentCard = cardsFaces.length-1;
        currentSuit--;
        if (currentSuit < 0) {
            currentSuit = suits.length-1;
        }
    }
    return exports.getCurrentCard();
};

function rnd(max) {
   return Math.floor(Math.random() * max);
}

exports.randomCard = function() {
    isJoker = false;
    currentSuit = rnd(suits.length);
    currentCard = rnd(cardsFaces.length);
    return exports.getCurrentCard();
};

exports.pokerHand1 = function() {
    var hand = [];
    for (var i=0;i<5;i++) {
        hand.push(exports.randomCard());
    }
    return hand;
};

exports.pokerHand2 = function() {
    var hand = [];
    do {
        var rndCard = exports.randomCard();
        var found = false;
        for (var j=0;j<hand.length;j++) {
            if (rndCard.id === hand[j].id) {
                found = true;
            }
        }
        if (!found) {
            hand.push(rndCard);
        }
    } while (hand.length < 5);
    return hand;
};