import { Layer, Network, Trainer } from 'synaptic';

export class Perceptron extends Network {
  inputLayer: Layer;
  hiddenLayer: Layer;
  outputLayer: Layer;
  trainer: Trainer;
  constructor(input: number, hidden: number, output: number) {
    super();
    this.inputLayer = new Layer(input);
    this.hiddenLayer = new Layer(hidden);
    this.outputLayer = new Layer(output);

    // connect the layers
    this.inputLayer.project(this.hiddenLayer);
    this.hiddenLayer.project(this.outputLayer);

    // set the layers
    this.set({
        input: this.inputLayer,
        hidden: [this.hiddenLayer],
        output: this.outputLayer
    });
  }

  train(data: Array<INetworkData>, config?: any) {
    this.trainer = new Trainer(this);
    this.trainer.train(data);
  }
}


interface INetworkData {
  input: number[];
  output: number[];
}
