import * as netaptic from 'neataptic';
import { Sound, notes, SoundTrack } from '../../../../../lib/audio';
import { collection } from '../../data';
const  { Neat, methods, Config, architect, Network, Node } = netaptic;

function generatRandomNote(notes: any): () => number {
 const notesArray = Object.keys(notes);
 return (note?: string) => {
  const soundRandom = Math.round(Math.random() * notesArray.length);
  return notes[note || notesArray[soundRandom]];
 };
}

const generator = generatRandomNote(notes);
const track = Array.apply(null, Array(20))
                .map(_ => ({ note: generator()}));


export function testing() {
  // Remove extra notes
  let ALL_NOTES = track.reduce((notes, n) => {
    if (notes.indexOf(n.note) === -1) {
      notes.push(n.note);
    }
    return notes;

  }, []);


  const onehot = encodeForNL(ALL_NOTES);
  const NL_DATA = prepareDataSet(track, onehot);
  let network = new architect.LSTM(ALL_NOTES.length, 10, ALL_NOTES.length);

  console.log('Network conns', network.connections.length, 'nodes', network.nodes.length);
  console.log('Dataset size:', ALL_NOTES.length);
  console.log('Characters:', Object.keys(onehot).length);

  network.train(NL_DATA, {
    log: 1,
    rate: 0.1,
    cost: methods.cost.MSE,
    error: 0.01,
    clear: true
  });

  let output = network.activate(NL_DATA[0].input);

  let predicted = [];
  let time = 0;

  for (let i = 0; i < 100; i++) {
    let max = Math.max.apply(null, output);
    let index = output.indexOf(max);

    let zeros = Array.apply(null, Array(ALL_NOTES.length)).map(Number.prototype.valueOf, 0);
    zeros[index] = 1;

    predicted.push({ note: ALL_NOTES[index], time: time});
    time += 0.5;
    output = network.activate(zeros);
  }




}

function prepareDataSet(collection: any[], onehot: any) {
  // Prepare the data-set
  let dataSet = [];

  let previous = collection[0].note;
  for (let i = 1 ; i < collection.length; i++) {
    let next = collection[i].note;
    dataSet.push({ input: onehot[previous], output: onehot[next] });
    previous = next;
  }

  return dataSet;
}


function encodeForNL(collection: any[]): any {
  let onehot = {};
  for (let i = 0; i < collection.length; i++) {
    console.log('Const ' + i, collection[i])
    let zeros = Array.apply(null, Array(collection.length)).map(Number.prototype.valueOf, 0);
    zeros[i] = 1;

    let character = collection[i];
    onehot[character] = zeros;
  }
  return onehot;
}


export function randomGenerator(): Array<SoundTrack> {
    // Remove extra notes
  let ALL_NOTES = track.reduce((notes, n) => {
    if (notes.indexOf(n.note) === -1) {
      notes.push(n.note);
    }
    return notes;

  }, []);

  const onehot = encodeForNL(ALL_NOTES);
  const NL_DATA = prepareDataSet(track, onehot);

  let network = new architect.LSTM(ALL_NOTES.length, 10, ALL_NOTES.length);
  console.log('Transformed data', onehot);
  console.log('Transformed data', NL_DATA);
  console.log('Network conns', network.connections.length, 'nodes', network.nodes.length);
  console.log('Dataset size:', ALL_NOTES.length);
  console.log('Characters:', Object.keys(onehot).length);

  network.train(NL_DATA, {
    log: 1,
    rate: 0.1,
    cost: methods.cost.MSE,
    error: 0.01,
    clear: true
  });

  let output = network.activate(NL_DATA[0].input);

  let predicted = [];
  let time = 0;

  for (let i = 0; i < 100; i++) {
    let max = Math.max.apply(null, output);
    let index = output.indexOf(max);

    let zeros = Array.apply(null, Array(ALL_NOTES.length)).map(Number.prototype.valueOf, 0);
    zeros[index] = 1;

    predicted.push({ note: ALL_NOTES[index], time: time});
    time += 0.5;
    output = network.activate(zeros);
  }

  return predicted;
}


export function randomByKeyboard(track) {
  const ALL_NOTES = track.map(v => v.value);

  const onehot = encodeForNL(ALL_NOTES);
  const NL_DATA = prepareDataSetManual(track, onehot);

  let network = new architect.LSTM(ALL_NOTES.length, 10, ALL_NOTES.length);
  console.log('Network conns', network.connections.length, 'nodes', network.nodes.length);
  console.log('Dataset size:', ALL_NOTES.length);
  console.log('Characters:', Object.keys(onehot).length);

  network.train(NL_DATA, {
    log: 1,
    rate: 0.1,
    cost: methods.cost.MSE,
    error: 0.01,
    clear: true
  });

  let output = network.activate(NL_DATA[0].input);

  let predicted = [];
  let time = 0;


  for (let i = 0; i < 100; i++) {
    let max = Math.max.apply(null, output);
    let index = output.indexOf(max);

    let zeros = Array.apply(null, Array(ALL_NOTES.length)).map(Number.prototype.valueOf, 0);
    zeros[index] = 1;

    predicted.push({ note: ALL_NOTES[index], time: time});
    time += 0.5;
    output = network.activate(zeros);
  }

  return predicted;

}

function prepareDataSetManual(collection: any[], onehot: any) {
  console.log('Manual', collection, onehot);
  // Prepare the data-set
  let dataSet = [];

  let previous = collection[0].value;
  for (let i = 1 ; i < collection.length; i++) {
    let next = collection[i].value;
    dataSet.push({ input: onehot[previous], output: onehot[next] });
    previous = next;
  }

  return dataSet;
}
