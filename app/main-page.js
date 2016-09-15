"use strict";
/* global android */

var cards = require('./cards');
var Observable = require('data/observable').Observable;
var animation = require('ui/animation');

var page, cardStack, side = 0, hasDynamic = false;
exports.onNavigatingTo = function(args) {
    page = args.object;
    page.bindingContext = new Observable({face: '', text: '', value: '1', pip: 'q', color:'black', offset: 0, image: ''});
    cardStack = page.getElementById('card');
    if (global.hasDynamic) {
        hasDynamic = true;
    }
    displayBack();
    side = 0;

};

exports.random = function() { 
    var card = cards.randomCard();
    displayCard(card);
};

exports.next = function() {
    var card = cards.nextCard();
    displayCard(card);
};

exports.prior = function() {
    var card = cards.priorCard();
    displayCard(card);
};


function fadeOut(element, options) {
    if (options === null ||typeof options === 'undefined') { options = {time: 1000, class: 'hidden', remove: true}; }
    if (typeof options.time === 'undefined') { options.time = 1000; }
    if (typeof options.remove === 'undefined') { options.remove = true; }
    if (typeof options.class === 'undefined') { options.class = 'hidden'; }
    if (!element._nativeView) {
        setTimeout(function() {
            fadeOut(element, options);
        }, 50);
        return;
    }

    element.animate({opacity: 0, duration: options.time, iterations: 1, curve: 'easeIn'}).then(function() {
        if (options.remove) { element.classList.toggle(options.class, true); }
        if (typeof options.callback === "function") { options.callback(); }
    });
}

function fadeIn(element, options) {
    if (options === null || typeof options === 'undefined') { options = {time: 1000, class: 'hidden'}; }
    if (typeof options.time === 'undefined') { options.time = 1000; }
    if (typeof options.class === 'undefined') { options.class = 'hidden'; }
    if (!element._nativeView) {
        setTimeout(function() {
            fadeIn(element, options);
        }, 50);
        return;
    }

    element.style.opacity = 0.01;
    element.classList.toggle(options.class, false);
    setTimeout(function() {
        element.animate({opacity: 1.0, duration: options.time, iterations: 1, curve: 'easeIn'}).then(function() {
            if (typeof options.callback === "function") { options.callback(); }
        });
    },50);
}

function fadeMessage(newMessage) {
    var message = page.getElementById('message');
    if (!message) { 
        page.bindingContext.text = newMessage;
        return;
    }
    fadeOut(message, {time: 250, callback: function() {
        page.bindingContext.text = newMessage;
        fadeIn(message, {time: 250});
    }});
}

exports.click = function() {

    //var animation = new android.view.animation.RotateAnimation(0,0, 0.5, 0.5);
    var animation = new android.view.animation.ScaleAnimation(1.0, 0.0, 1.0, 1.0, 400, 0);
    animation.setInterpolator(new android.view.animation.LinearInterpolator());
    animation.setDuration(250);

    var animation2 = new android.view.animation.ScaleAnimation(0.0, 1.0, 1.0, 1.0, 400, 0);
    animation2.setInterpolator(new android.view.animation.LinearInterpolator());
    animation2.setDuration(250);
    animation.setFillAfter(true);
    cardStack.android.startAnimation(animation);
    setTimeout(function() {
        if (side === 0) {
            displayCard(cards.getCurrentCard());
        } else {
            displayBack();
        }
        cardStack.android.clearAnimation();
        cardStack.android.startAnimation(animation2);
    }, 300);

};

function displayBack() {
    fadeMessage('Back of Card');

    if (hasDynamic) {
        var sub = cardStack.getElementsByTagName('GridLayout');
        if (sub.length) {
            cardStack.dynamicUnload(sub[0]);
        }
        cardStack.dynamicLoad("cardviews/Back");
    } else {
        hideAllCards();
        showCard("Back");
    }

    side = 0;
}

exports.joker = function() {
    displayCard(cards.setJoker());
};

function displayCard(card) {
    if (card.cardValue === "Joker") {
        fadeMessage("Joker");
    } else {
        fadeMessage(card.color.toUpperCase() + ' ' + card.value + ' of ' + card.suit + 's');
    }
    page.bindingContext.value = card.cardValue;
    page.bindingContext.pip = card.pip;
    page.bindingContext.color = card.color + ' offset'+card.offset;
    page.bindingContext.face = card.face;

    page.bindingContext.image = '~/images/'+card.suit.toLowerCase()+"_"+card.value.toLowerCase()+".png";

    var sub = cardStack.getElementsByTagName('GridLayout');
    if (hasDynamic) {
        if (sub.length) {
            cardStack.dynamicUnload(sub[0]);
        }
        cardStack.dynamicLoad("cardviews/" + card.value);
    } else {
        hideAllCards();
        showCard(card.value);
    }

    side = 1;

}

/***
 * If we aren't using the DynamicLoad version, we have to hide all the cards
 */
function hideAllCards() {
    var elem, i;
    for (i=2;i<11;i++) {
        elem = page.getElementById("Card"+i);
        elem.classList.toggle('hidden', true);
    }
    var otherCards = ["Ace", "Joker", "Face", "Back"];
    for (i=0; i<otherCards.length; i++) {
            elem = page.getElementById("Card"+otherCards[i]);
            elem.classList.toggle('hidden', true);
    }
}

/**
 * If we aren't using the DynamicLoad version, we have to find the proper layout to show...
 * @param value
 */
function showCard(value) {
    if (value === "Jack" || value === "Queen" || value === "King") {
        value = "Face";
    }
    var elem = page.getElementById("Card"+value);
    elem.classList.toggle("hidden", false);
}