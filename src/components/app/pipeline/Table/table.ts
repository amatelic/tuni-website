import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

@Component({
    template: require('./table.html'),
    props: {
      collection: {
        default: () => ({
          header: [],
          body: []
        })
      }
    }
})

export class TableComponent extends Vue {
  collection: any;

  get body() {
    return this.collection.body;
  }

  get header() {
    return this.collection.header[0];
  }
}
