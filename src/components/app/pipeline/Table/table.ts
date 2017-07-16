import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { filter } from 'lodash';
import contextMenu from 'vue-context-menu';
import { filterByIndex } from '../../helpers';
import { TableInfoComponent } from './table-info/table-info';

type filterBool = (row: any[]) => boolean;

interface ITag {
  name: string;
  callback: filterBool;
}

interface ITableData {
  tags: ITag[];
  filter: filterBool;
  view: string;
  data: any;
  modal: any;

}

const isEqual = (value: any) => (rows: any[]) => rows.indexOf(value) !== - 1;

@Component({
    template: require('./table.html'),
    components: {
      'table-info': TableInfoComponent,
      'contextMenu': contextMenu,
    },
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
  tags: ITag[];
  filter: filterBool;

  data(): ITableData {
    return {
      tags: [],
      filter: () => true,
      view: 'table-info',
      data: undefined,
      modal: {},
    };
  }

  get body() {
    return this.collection.body.filter(this.filter);
  }

  get header() {
    return this.collection.header[0];
  }

  // Todo
  // &@TIME = and
  // |@Time = o
  addFilter(e: any) {
    const slice = e.target.value;//.slice('@');
    this.tags.push({
      name: slice,
      callback: isEqual(slice)
    });

    e.target.value = '';
  }

  selectedFilter(e, filter: ITag) {
    e.preventDefault();
    this.filter = filter.callback;
  }

  removeTag(e, index: number) {
    e.stopPropagation();
    this.tags = filter(this.tags, filterByIndex(index));
    this.filter = () => true;
  }

  getColumnInforamtion(index: number) {
    const header = this.collection.header;
    const props = this.collection.body.reduce((obj, values) => {
      const value = values[index];
      if (!obj[value]) {
        obj[value] = 0;
      }
      obj[value]++;
      return obj;
    }, {});

    this.data = props;
  }

  close(event) {
    this.data = event;
  }

  onCtxOpen() {

  }

  remove() {
    console.log(arguments);
  }
}
