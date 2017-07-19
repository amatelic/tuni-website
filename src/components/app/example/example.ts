import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { Sound } from '../../lib/audio';
import { TextTesting } from './projects/testing';
import { SoundCreatorComponent } from './projects/sound-creator/sound-creator';
import { SliderComponent } from '../../slider/slider';
import { collection, filters } from './projects/data';


@Component({
    template: require('./example.html'),
    components: {
      'slider': SliderComponent,
    }
})


export class ExampleComponent extends Vue {
  collection: any;
  filters: string[];

  data() {
    return {
      collection: collection,
      filters: filters
    };
  }
}
