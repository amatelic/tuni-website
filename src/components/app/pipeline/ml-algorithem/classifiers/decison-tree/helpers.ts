

export function sum(obj: any) {
  return Object.keys(obj)
  .reduce(function(sum, key) {
    return sum + parseFloat(obj[key]);
  }, 0);
}

//Method for spliting the data
export const toNumber = (value: string | number) => (typeof value === 'number') ? value : parseInt(value);
export const splitByNumber =  (column: number, value: number) =>  (row: Array<any>) => row[column] >= value;
export const splitByString = (column: number, value: number) => (row: Array<any>) => row[column] === value;
