import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
// import { Perceptron } from './projects/perceptron';
// import { LSTM } from './projects/ltsm';
// import { testing } from './projects/testing';
import { Sound, soundTest } from '../../lib/audio';

@Component({
    template: require('./example.html'),
})


export class ExampleComponent extends Vue {
  collection: any;

  data() {
    return {};
  }

  mounted() {
    soundTest();
    // testing();
    // let trainingSet = [
    //   { input: [0, 0], output: [0] },
    //   { input: [0, 1], output: [1] },
    //   { input: [1, 0], output: [1] },
    //   { input: [1, 1], output: [0] },
    // ];

    // const lstm = new LSTM(2, 6, 1);
    // const perceptron = new Perceptron(2, 3, 1);
    // perceptron.train(trainingSet);
    // lstm.train(trainingSet);

    // console.log(perceptron.activate([1, 1]));
    // console.log(lstm.activate([1, 1]));
  }
}
