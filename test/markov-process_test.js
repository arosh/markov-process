"use strict";
var assert = require("power-assert");
var markov_process_1 = require("../assets/markov-process");
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
var EPSILON = 2.2204460492503130808472633361816E-16;
describe("State", function () {
    var s1, s2, s3;
    beforeEach(function () {
        s1 = new markov_process_1.State("s1");
        s2 = new markov_process_1.State("s2");
        s3 = new markov_process_1.State("s3");
        s1.addTransition(s2, 1);
        s1.addTransition(s3, 2);
    });
    it("#normalize で正規化できること", function () {
        s1.normalize();
        assert(Math.abs(1.0 / 3 - s1.transition[0].prob) < EPSILON);
        assert(Math.abs(2.0 / 3 - s1.transition[1].prob) < EPSILON);
    });
    it("#chooseNextState で選択できること", function () {
        assert(s2 === s1.chooseNextState(0.0));
        assert(s2 === s1.chooseNextState(0.3));
        assert(s3 === s1.chooseNextState(1.0 / 3));
        assert(s3 === s1.chooseNextState(1.0 - EPSILON));
    });
});
