import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./table-info.html'),
    props: ['data']

})

export class TableInfoComponent extends Vue {
  data() {
    return {
      data: []
    };
  }
  get items() {
    return Object.keys(this.data).map(prop => {
      return `${prop} - ${this.data[prop]}`;
    });
  }


  close() {
    this.$emit('close');
  }
}
