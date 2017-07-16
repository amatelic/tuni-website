import Matrix from './DecisonMatrix';

// Checking information gain

export function uniqueCounts(rows: Matrix, index?: number): any {
  let results: any = {};
  //Get unique count for specifi feature
  index = index || (rows.shape[1] - 1);

  for (let row of rows.values) {
    let r = row[index].toString(); // Problems with booleans

    if (!results[r]) {
      results[r] = 0;
    }

    results[r] += 1;
  };
  return results;
}

export function  giniimpurity(rows: Matrix, index?: number): number {
  let total = rows.shape[0];
  let count = uniqueCounts(rows, index);
  let imp = 0;
  for (let k1 of Object.keys(count)) {
    let p1 = count[k1] / total;
    for (let k2 of Object.keys(count)) {
      if (k1 === k2) continue;
      let p2 = count[k2] / total;
      imp += p1 * p2;
    }
  }
  return imp;
}

export function entropy(rows: Matrix, index?: number): number {
    const mt :any = Math;
    let { log2 } = mt;
    let total = rows.shape[0];
    let results = uniqueCounts(rows, index);
    let ent = 0;
    for (let r of Object.keys(results)) {
        let p = results[r] / total;
        ent -= p * log2(p);
    }

  return ent;
}