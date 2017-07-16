import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';
import { ImportComponent } from './Import/import';
import { TableComponent } from './Table/table';
import { MLAlgorithemComponent } from './ml-algorithem/ml-algorithem';

@Component({
    template: require('./pipeline.html'),
    components: {
      'pipe-import': ImportComponent,
      'pipe-table': TableComponent,
      'pipe-ml': MLAlgorithemComponent,
    }
})


export class PipelineComponent extends Vue {
  collection: any;

  data() {
    return {
      collection: undefined,
    };
  }
  receive(data) {
    console.log(data);
    this.collection = data;
  }
}
