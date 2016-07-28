"use strict";
var State = (function () {
    function State(key) {
        this.key = key;
        this.transition = [];
    }
    State.prototype.addTransition = function (dst, prob) {
        this.transition.push({
            src: this,
            dst: dst,
            prob: prob
        });
    };
    State.prototype.normalize = function () {
        var sum = 0;
        for (var i = 0; i < this.transition.length; i++) {
            sum += this.transition[i].prob;
        }
        for (var i = 0; i < this.transition.length; i++) {
            this.transition[i].prob /= sum;
        }
    };
    State.prototype.chooseNextState = function (randomNumber) {
        this.normalize();
        var cumsum = [];
        var prev = 0.0;
        for (var i = 0; i < this.transition.length; i++) {
            cumsum.push(prev + this.transition[i].prob);
            prev = cumsum[cumsum.length - 1];
        }
        for (var i = 0; i < this.transition.length; i++) {
            if (randomNumber < cumsum[i]) {
                return this.transition[i].dst;
            }
        }
        return null;
    };
    return State;
}());
exports.State = State;
var SamplePath = (function () {
    function SamplePath() {
    }
    SamplePath.prototype.move = function () {
        // [0, 1)
        var p = Math.random();
        this.currentState = this.currentState.chooseNextState(p);
    };
    return SamplePath;
}());
var MarkovProcess = (function () {
    function MarkovProcess() {
    }
    return MarkovProcess;
}());
