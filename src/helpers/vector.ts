
export default class Vector {
  private _vector: number[];
  constructor(vector: number[]) {
    this._vector = vector;
  }

  get size() {
    return this._vector.length;
  }


  get = (index) => {
    return this._vector[index];
  }
}
