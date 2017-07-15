 import { notes } from './notes';
 export { notes } from './notes';


interface SoundTrack {
  note: number;
  time: number;
}

type soundTypes = 'sine' | 'square' | 'triangle' | 'sawtooth';

export class Sound {
  context: AudioContext;
  oscillator:  OscillatorNode;
  gain:  GainNode;
  config: {
    frequence: number,
    type: soundTypes,
  };

  constructor(parameters?: any) {
    this.context = new AudioContext();
    this.config = {
      frequence: 440,
      type: 'sine'
    };
    this.oscillator = this.context.createOscillator();
    this.gain = this.context.createGain();
    this.connect();
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

  private connect() {
    this.oscillator.connect(this.gain);
    this.gain.connect(this.context.destination);
  }

  start() {
    this.oscillator.start(0);
  }

  stop() {
    this.gain.gain.exponentialRampToValueAtTime(
        0.00001, this.context.currentTime + 0.04
    );
  }

  get currentTime() {
    return this.context.currentTime;
  }

  sound(tracks: Array<SoundTrack>) {
    // this.oscillator.start(0);
    let prev: SoundTrack = { note: 0, time: 0 };
    for (let track of tracks) {
      const gain = this.context.createGain();
      const oscillator = this.context.createOscillator();
      oscillator.connect(gain);

      oscillator.frequency.value = track.note;
      gain.connect(this.context.destination);
      oscillator.start(this.currentTime + prev.time);
      gain.gain.exponentialRampToValueAtTime(
        1, this.currentTime + prev.time
      );
      oscillator.stop(this.currentTime + track.time);
      gain.gain.exponentialRampToValueAtTime(
        0.00001, this.currentTime + track.time
      );
      prev = track;
    }

  }
}
