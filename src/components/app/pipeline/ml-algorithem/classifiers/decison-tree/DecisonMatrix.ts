import * as _ from 'lodash';

// TODO implement slecting multiple row like python [1, :]

export interface IVectorConstructor {
    values: number[];
    labels: string[];
}

export type DecisonNodeType = string | number;

export default class Matrix {
    private _values: Array<Array<DecisonNodeType>>;
    private _labels: string[];
    private _size: number;
    private _shape: number[];

    constructor(values: Array<Array<DecisonNodeType>> = [], labels?: string[]) {

        if  (!_.isArray(values)) {
            throw new Error('Value property is not an array');
        }

        if(labels) {
            this._labels = labels;
        }

        this.setMatrixSize(values);
        this._values = values;
    }

    private setMatrixSize(values: Array<Array<DecisonNodeType>>) {
        const mtx = _.map(values,  value => _.size(value));

        if (_.uniq(mtx).length > 1) {
            throw new Error('Rows are not the same size')
        }

        this._shape = [_.size(mtx), (mtx[0] | 0)];
        this._size = _.size(mtx) * (mtx[0] | 0);
    }

    get shape(): number[] {
        return this._shape;
    }

    get size(): number {
        return this._size;
    }

    get labels(): string[] {
        return this._labels;
    }

    set labels(labels: string[]) {
        this._labels = labels;
    }

    getLabelIndex(name: string) {
        console.log(typeof name, this._labels, this._labels.indexOf(name))
        return this._labels.indexOf(name);
    }

    get values(): Array<Array<DecisonNodeType>> {
        return this._values;
    }

    set values(values: Array<Array<DecisonNodeType>>) {
        this._values = values;
    }

    get(x: number, y: number): DecisonNodeType {
        const [sX, sY] = this._shape;
        if (sX < x || sY < y) {
            throw new Error(' Out of bound');
        }

        return this._values[x][y];
    }

    set(values: DecisonNodeType[][]) {
        this._values = values;
    }

    append(row: number, value: DecisonNodeType) {
        this._values[row].push(value);
    }

    insert(value: Array<DecisonNodeType>) {
        this._values.push(value);
        this.setMatrixSize(this._values);
    }
}
