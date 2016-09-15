"use strict";
/* jshint mocha: true */
/* global describe, assert, it */

var cards = require('../cards.js');
 
describe('Cards', function() {
	describe("current card", function() { 
		it ('should return spades', function() { 
			cards.resetDeck();
			var result = cards.getCurrentCard();
			assert.equal(result.suit, "Spade"); 
			assert.equal(result.value, "Ace");
		});
	});

	describe("next card", function() {
		it ('should return the 2 of spades', function() {
			cards.resetDeck();
			var result = cards.nextCard();
			assert.equal(result.suit, "Spade");
			assert.equal(result.value, "2");
		});
		it ('should return the 3 of spades', function() {
			cards.resetDeck();
			for (var i=0;i<54;i++) { cards.nextCard(); }
			var result = cards.getCurrentCard();
			assert.equal(result.suit, "Spade");
			assert.equal(result.value, "3");
		});
	});

	describe("prior card", function() {
		it ('should return the King of Hearts', function() {
			cards.resetDeck();
			var result = cards.priorCard();
			assert.equal(result.suit, "Heart");
			assert.equal(result.value, "King");
		});
	});

	describe("should return special", function() {
		it ('should return special', function() {
			cards.setJoker();
			var results = cards.getCurrentCard();
			assert.equal(results.value, "Joker");
		});
	});

	describe("random card", function() {
		it ('should return a random card', function() {
			var lastCard = cards.randomCard(), nextCard;
			for (var i = 0; i < 5; i++) {
				nextCard = cards.randomCard();
				if (nextCard.suit !== lastCard.suit && nextCard.value !== lastCard.value) {
					break;
				}
			}
			assert.notEqual(nextCard.id, lastCard.id, "Random card failed");
			assert.notEqual(nextCard.value, lastCard.value, "Random card failed");
			assert.notEqual(nextCard.suit, lastCard.suit, "Random card failed");
		});
	});
});





