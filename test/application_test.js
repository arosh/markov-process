"use strict";
var assert = require("power-assert");
var markov_process_1 = require("../assets/markov_process");
var EPSILON = 2.2204460492503130808472633361816E-16;
describe("State", function () {
    var s;
    beforeEach(function () {
        s = new markov_process_1.State("s1");
        s.addTransition("s2", 1);
        s.addTransition("s3", 2);
    });
    it("#normalize で正規化できること", function () {
        s.normalize();
        assert(Math.abs(1.0 / 3 - s.transition[0].prob) < EPSILON);
        assert(Math.abs(2.0 / 3 - s.transition[1].prob) < EPSILON);
    });
    it("#chooseNextState で選択できること", function () {
        assert("s2" === s.chooseNextState(0.0));
        assert("s2" === s.chooseNextState(0.3));
        assert("s3" === s.chooseNextState(1.0 / 3));
        assert("s3" === s.chooseNextState(1.0 - EPSILON));
    });
});