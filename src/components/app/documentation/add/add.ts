import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

@Component({
    template: require('./add.html'),
})


export class AddDocumentComponent extends Vue {
  collection: any;

  add() {
    const codeEl = this.$refs.code as any;
    const data = codeEl.innerHTML;
    if (data) {
      this.$emit('add', this.transform(data));
    }

  }

  transform(data) {
    return {
      type: 'code',
      message: data
    };
  }
}
