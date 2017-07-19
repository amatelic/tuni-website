import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { testing } from './logic/audio-testing';
import { Sound, notes } from '../../../../lib/audio';

const keys = {
  a: 1, s: 2, d: 3, f: 4, g: 5, h: 6, j: 7
};

@Component({
    template: require('./sound-creator.html'),
    name: 'sound-creator',
    props: {}
})


export class SoundCreatorComponent extends Vue {
  notes: any;
  sound: Sound;

  constructor() {
    super();
    this.sound = new Sound();
    // this.sound.start();

    window.addEventListener('keyup', (e) => {
      const key = keys[e.key];
      if (key) {
        console.log(key,  this.playingNotes)
        // this.sound.freq = thisplayingNotes[key].value;
      }
    });
  }
  data() {
    return {
      notes: notes
    };
  }

  get playingNotes() {
    return Object.keys(this.notes)
            .filter((d) => {
               return !d.match('#') && !(d === 'C8');
            })
            .sort()
            .map(key => ({
              name: key,
              value: this.notes[key]
            }));
  }

  play(note: number) {
    this.sound.freq = note;
  }

  playIndex(index) {
    this.sound.freq = this.playingNotes[index].value;
  }
}
