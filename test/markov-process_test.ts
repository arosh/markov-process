import * as assert from "power-assert";
import {State, MarkovProcess} from "../assets/markov-process";

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
const EPSILON = 2.2204460492503130808472633361816E-16;

describe("State", () => {
    let s1: State, s2: State, s3: State;
    beforeEach(() => {
        s1 = new State("s1");
        s2 = new State("s2");
        s3 = new State("s3");
        s1.addTransition(s2, 1);
        s1.addTransition(s3, 2);
    });
    it("#normalize で正規化できること", () => {
        s1.normalize();
        assert(Math.abs(1.0 / 3 - s1.transition[0].prob) < EPSILON);
        assert(Math.abs(2.0 / 3 - s1.transition[1].prob) < EPSILON);
    });
    it("#chooseNextState で選択できること", () => {
        assert(s2 === s1.chooseNextState(0.0));
        assert(s2 === s1.chooseNextState(0.3));
        assert(s3 === s1.chooseNextState(1.0 / 3));
        assert(s3 === s1.chooseNextState(1.0 - EPSILON));
    });
});

describe("MarkovProcess", () => {
    it("#setInitialStateUniformly でnumSamples個の要素がセットされること", () => {
        const numSamples = 8;
        const m = new MarkovProcess(numSamples);
        m.setInitialStateUniformly();
        assert(numSamples === m.samples.length);
    });
});
