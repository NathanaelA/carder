"use strict";
/* jshint mocha: true */
/* global describe, assert, it */

var nsAppium = require("nativescript-dev-appium");

describe("Carder app tests", function () {
    this.timeout(100000);
    var driver;

    before(function () {
        driver = nsAppium.createDriver();
    });

    after(function () {
        return driver
        .quit()
        .finally(function () {
            console.log("Driver quit successfully");
        });
    });

    it("should find an the card title", function () {
        return driver
            .elementByAccessibilityId("message")
            .text().should.become('Back of Card');
    });

    it("should flip the card over", function() {

        var spade = 'q';
        var xpath =  "//"+nsAppium.xpath("Label")+"[@text='"+spade+"']";

        return driver.elementByAccessibilityId("card")
            .should.eventually.exist
            .tap()
            .elementsByXPath(xpath).should.eventually.have.length(3);

    });

    it("should increase in value", function() {

        var spade = 'q';
        var xpath =  "//"+nsAppium.xpath("Label")+"[@text='"+spade+"']";

        return driver.elementByAccessibilityId("next")
            .should.eventually.exist
            .tap()
            .elementsByXPath(xpath).should.eventually.have.length(4);

    });

    it("should become hearts", function() {

        var heart = 'r';
        var xpath =  "//"+nsAppium.xpath("Label")+"[@text='"+heart+"']";


        return driver.elementByAccessibilityId("prior")
            .should.eventually.exist
            .tap().tap()
            .elementsByXPath(xpath).should.eventually.have.length(2);

    });

});
