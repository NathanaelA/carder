"use strict";

var suits = ['Spade', 'Club', 'Diamond', 'Heart'];
var cardsFaces = ['Ace','2','3','4','5','6','7','8','9','10','Jack', 'Queen', 'King'];
var colors = ['black', 'black', 'red', 'red'];

var cards = {
    Spade: ['a','b','c','d','e','f','g','h','i','j','k','l','m'],
    Club: ['n','o','p','q','r','s','t','u','v','w','x','y','z'],
    Diamond: ['A','B','C','D','E','F','G','H','I','J','K','L','M'],
    Heart: ['N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
};


var currentSuit = 0;
var currentCard = 0;

exports.cardCount = function() {
    return suits.length * cards.length;
};

exports.resetDeck = function() {
    currentSuit = 0;
    currentCard = 0;
};

exports.getCurrentCard = function() {
    return {id: (currentSuit * 13)+currentCard, suit: suits[currentSuit], value: cardsFaces[currentCard], color: colors[currentSuit], font: cards[suits[currentSuit]][currentCard]};
};

exports.nextCard = function() {
    currentCard++;
    if (currentCard > 13) {
        currentCard = 0;
        currentSuit++;
        if (currentSuit > 3) {
            currentSuit = 0;
        }
    }
    return exports.getCurrentCard();
};


exports.priorCard = function() {
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
    currentSuit = rnd(suits.length);
    currentCard = rnd(cardsFaces.length);
    return exports.getCurrentCard();
};

