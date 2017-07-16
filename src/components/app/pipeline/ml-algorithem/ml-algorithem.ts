import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';
import { supportedML, MLFactory } from './classifiers/ml-factory';
import Matrix from './classifiers/decison-tree/DecisonMatrix';

interface IMLDropDown {
  label: string;
  type: string;
}

const dropDown = supportedML
                  .map(d => ({
                    label: d.replace('-', ' '),
                    value: d
                  }));

@Component({
    template: require('./ml-algorithem.html'),
    props: {
    collection: {
        default: () => ({
          header: [],
          body: []
        })
      }
    }
})

export class MLAlgorithemComponent extends Vue {
  collection: any;
  options: Array<IMLDropDown>;
  selected: string;

  data() {
    return {
      options: dropDown,
      selected: '',
    };
  }

  get matrix(): Matrix {
    return new Matrix(this.collection.body, this.collection.header[0]);
  }


  get predict() {
    const ml = MLFactory(this.selected);
    if (ml) {

      ml.train(this.matrix, 'location');
      return ml.predict(['google', 'yes', 20, 'None']);
    }
    return 'Nothing selected';
  }

}
