import * as netaptic from 'neataptic';
const  { Neat, methods, Config, architect, Network, Node } = netaptic;
// Text to learn

let text = `this is only a basic test to see if i am right. Or is this a basic test to se if i am wrong. Who nows. That's the big question`;

text = text.toLowerCase();
let characters = text.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; });


// One-hot encode them
let onehot = {};

for(let i = 0; i < characters.length; i++){
  let zeros = Array.apply(null, Array(characters.length)).map(Number.prototype.valueOf, 0);
  zeros[i] = 1;

  let character = characters[i];
  onehot[character] = zeros;
}

// Prepare the data-set
let dataSet = [];

let previous = text[0];
for(let i = 1 ; i < text.length; i++){
  let next = text[i];

  dataSet.push({ input: onehot[previous], output: onehot[next] });
  previous = next;
}

export function testing() {
  console.log(characters);
  console.log(onehot);
  writeSentence();
}

// Create the network
console.log(architect, netaptic)
let network = new architect.LSTM(characters.length, 10, characters.length);

function writeSentence() {
  let sum = '';
  let output = network.activate(dataSet[0].input);
  console.log(`Output: ${output}`);
  for (let i = 0; i < 100; i++){
    let max = Math.max.apply(null, output);
    let index = output.indexOf(max);

    let zeros = Array.apply(null, Array(characters.length)).map(Number.prototype.valueOf, 0);
    zeros[index] = 1;

    let character = Object.keys(onehot).find(key => onehot[key].toString() === zeros.toString());
    sum += character;
    output = network.activate(zeros);
  }
  console.log(sum);
}

  console.log('Network conns', network.connections.length, 'nodes', network.nodes.length);
  console.log('Dataset size:', dataSet.length);
  console.log('Characters:', Object.keys(onehot).length);

  network.train(dataSet, {
    log: 1,
    rate: 0.1,
    cost: methods.cost.MSE,
    error: 0.005,
    clear: true
  });

