"use strict";
var cards = require('./cards');
var Observable = require('data/observable').Observable;

var page;
exports.onNavigatingTo = function(args) {
    page = args.object;
    page.bindingContext = new Observable({value: '', card: '', cardStyle: ''});
};

exports.click = function() {
    var card = cards.randomCard();
    page.bindingContext.value = card.color + ' ' + card.value + ' of ' + card.suit+'s' ;
    page.bindingContext.card = card.font;
    page.bindingContext.cardStyle = "cards "+card.color;
};

