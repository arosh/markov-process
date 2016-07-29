import React = __React;
import ReactDOM = __React.__DOM;
import {State, MarkovProcess} from "./markov-process";
const numSamples = 8;
const m = new MarkovProcess(numSamples);
m.setInitialStateUniformly();
console.log(m);
