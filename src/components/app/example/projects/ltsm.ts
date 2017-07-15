import { Layer, Network, Trainer } from 'synaptic';

export class LSTM extends Network {
  inputLayer: Layer;
  inputGate: Layer;
  forgetGate: Layer;
  memoryCell: Layer;
  outputGate: Layer;
  outputLayer: Layer;
  trainer: Trainer;
  constructor(input1: number, blocks: number, output1: number) {
    super();
    // create the layers
    this.inputLayer = new Layer(input1);
    this.inputGate = new Layer(blocks);
    this.forgetGate = new Layer(blocks);
    this.memoryCell = new Layer(blocks);
    this.outputGate = new Layer(blocks);
    this.outputLayer = new Layer(output1);

    // connectios from input layer
    let input = this.inputLayer.project(this.memoryCell);
    this.inputLayer.project(this.inputGate);
    this.inputLayer.project(this.forgetGate);
    this.inputLayer.project(this.outputGate);

    // connections from memory cell
    let output = this.memoryCell.project(this.outputLayer);

    // self-connection
    let self = this.memoryCell.project(this.memoryCell);

  	// peepholes
    this.memoryCell.project(this.inputGate);
    this.memoryCell.project(this.forgetGate);
    this.memoryCell.project(this.outputGate);

    // gates
    this.inputGate.gate(input, Layer.gateType.INPUT);
    this.forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
    this.outputGate.gate(output, Layer.gateType.OUTPUT);

    // input to output direct connection
    this.inputLayer.project(this.outputLayer);

    // set the layers of the neural network
    this.set({
      input: this.inputLayer,
      hidden: [this.inputGate, this.forgetGate, this.memoryCell, this.outputGate],
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
