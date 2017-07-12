import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { filter } from 'lodash';
import { filterByIndex } from '../../helpers';

type filterBool = (row: any[]) => boolean;

interface ITag {
  name: string;
  callback: filterBool;
}

interface ITableData {
  tags: ITag[];
  filter: filterBool;
}

const isEqual = (value: any) => (rows: any[]) => rows.indexOf(value) !== -1

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
  tags: ITag[];
  filter: filterBool;

  data(): ITableData {
    return {
      tags: [],
      filter: () => true
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
    console.log(filter)
    this.filter = filter.callback;
  }

  removeTag(e, index: number) {
    e.stopPropagation();
    this.tags = filter(this.tags, filterByIndex(index));
    this.filter = () => true;
  }
}
