 import { notes } from './notes';
 export { notes } from './notes';


export interface SoundTrack {
  note: number;
  time: number;
}

type soundTypes = 'sine' | 'square' | 'triangle' | 'sawtooth';

export class Sound {
  context: AudioContext;
  oscillator:  OscillatorNode;
  gainNode:  GainNode;
  config: {
    frequence: number,
    type: soundTypes,
  };

  constructor(parameters?: any) {
    this.context = new AudioContext();
  }

  setup() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  get freq() {
    return this.config.frequence;
  }

  set freq(value: any) {
    this.oscillator.frequency.value = value;
    this.config.frequence = value;
  }

  get type() {
    return this.config.type;
  }

  set type(value: soundTypes) {
    this.oscillator.type = value;
    this.config.type = value;
  }

  start(value) {
    this.setup();
    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);

    this.oscillator.start(this.context.currentTime);
    // this.start(this.context.currentTime);
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
    this.oscillator.stop(this.context.currentTime + 1);
  }

}
