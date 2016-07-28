import React = __React;
import ReactDOM = __React.__DOM;

interface Edge {
    src: string;
    dst: string;
    prob: number;
}

export class State {
    key: string;
    transition: Edge[];
    constructor(key: string) {
        this.key = key;
        this.transition = [];
    }
    addTransition(dst: string, prob: number) {
        this.transition.push({
            src: this.key,
            dst: dst,
            prob: prob,
        })
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
    chooseNextState(randomNumber: number): string {
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
    move() {
        const p = Math.random();

    }
}

class MarkovProcess {
    stateSet: string[];
    samples: SamplePath[];
}
