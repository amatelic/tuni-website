import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';

@Component({
    template: require('./slider.html'),
    props: ['items', 'filters']
})


export class SliderComponent extends Vue {
  private _items: any[];
  public activeComponent: any;
  public selectedFilter = '';
  public items: any[];

  constructor() {
    super();
  }


  data() {
    return {
      activeComponent: undefined
    };
  }

  get projects(): any[] {
    return (!this.selectedFilter) ? this.items :
      this.items.filter(project => {
        return project.tags.indexOf(this.selectedFilter) !== -1;
      });
  }

  selectProject(component) {
    this.activeComponent = component;
  }

  remove() {
    this.activeComponent = undefined;
  }

  filterBy(filter: string) {
    this.selectedFilter =  (filter === 'all') ? '' : filter;
  }
}
