import * as _ from "lodash";

interface Edge {
    src: State;
    dst: State;
    prob: number;
}

export class State {
    key: string;
    transition: Edge[];
    constructor(key: string) {
        this.key = key;
        this.transition = [];
    }
    addTransition(dst: State, prob: number) {
        this.transition.push({
            src: this,
            dst: dst,
            prob: prob,
        });
    }
    normalize() {
        let sum = 0;
        for (let i = 0; i < this.transition.length; i++) {
            sum += this.transition[i].prob;
        }
        for (let i = 0; i < this.transition.length; i++) {
            this.transition[i].prob /= sum;
        }
    }
    chooseNextState(randomNumber: number): State {
        this.normalize();
        const cumsum: number[] = [];
        let prev = 0.0;
        for (let i = 0; i < this.transition.length; i++) {
            cumsum.push(prev + this.transition[i].prob);
            prev = cumsum[cumsum.length - 1];
        }
        for (let i = 0; i < this.transition.length; i++) {
            if (randomNumber < cumsum[i]) {
                return this.transition[i].dst;
            }
        }
        return null;
    }
}

class SamplePath {
    currentState: State;
    constructor(initialState: State) {
        this.currentState = initialState;
    }
    move() {
        // [0, 1)
        const p = Math.random();
        this.currentState = this.currentState.chooseNextState(p);
    }
}

export class MarkovProcess {
    numSamples: number;
    stateSet: State[];
    samples: SamplePath[];
    constructor(numSamples: number) {
        this.numSamples = numSamples;
    }
    setInitialStateUniformly() {
        this.samples = [];
        for (let i = 0; i < this.numSamples; i++) {
            this.samples.push(new SamplePath(_.sample(this.stateSet)));
        }
    }
}
