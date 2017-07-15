import { notes } from './notes';

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

  sound(tracks: Array<SoundTrack>) {
    // this.oscillator.start(0);
    let prev: SoundTrack = { note: 0, time: 0 };
    for (let track of tracks) {
      const oscillator = this.context.createOscillator();
      oscillator.frequency.value = track.note;
      oscillator.connect(this.context.destination);
      oscillator.start(this.currentTime + prev.time);
      oscillator.stop(this.currentTime + track.time);
      prev = track;
    }

  }

  get currentTime() {
    return this.context.currentTime;
  }

  public playNotes(sound: SoundTrack) {
    this.oscillator.frequency.value = sound.note;
    this.gain.gain.setValueAtTime(1, this.currentTime);

    this.gain.gain.exponentialRampToValueAtTime(0.001, sound.time + 1);
    // this.oscillator.stop(sound.time + 1);
    // this.stopNotes(sound.time);
  }

  public stopNotes(time) {
    this.gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    this.oscillator.stop(time + 0.5);
  }
}

function generatRandomNote(notes: any): () => number {
 const notesArray = Object.keys(notes);
 return (note?: string) => {
  const soundRandom = Math.round(Math.random() * notesArray.length);
  return notes[note || notesArray[soundRandom]];
 };
}

export function soundTest() {
  const sound = new Sound();
  const generateNote = generatRandomNote(notes);

  sound.sound([
    { note: 293.66, time: 0.5 },
    { note: 329.63, time: 1 },
    { note: 349.23, time: 1.5 },
    { note: 392.00, time: 2 },
    { note: 440.00, time: 2.5 },
    { note: 493.88, time: 3 },
    { note: 523.25, time: 3.5 },
    { note: 293.66, time: 4. },
    { note: 329.63, time: 4.5 },
    { note: 349.23, time: 5 },
    { note: 392.00, time: 5.5 },
    { note: 440.00, time: 6 },
    { note: 493.88, time: 6.5 },
    { note: 523.25, time: 7 },
  ]);
}
