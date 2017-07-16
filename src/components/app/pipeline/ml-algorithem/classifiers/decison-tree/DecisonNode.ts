import Matrix, { DecisonNodeType } from './DecisonMatrix';
import { entropy, giniimpurity, uniqueCounts } from './Measure';
import { isArray, isNumber } from 'lodash';
import { DecisonNodeParams, IDynamiceProperty, scoreFn } from './Decison-interfaces';
import { toNumber, splitByNumber, splitByString, sum } from './helpers';


export class DecisonNode {
    public col: number | string;
    public value: DecisonNodeType | null;
    public results: DecisonNodeType | null;
    public tb: DecisonNode | null;
    public fb: DecisonNode | null;

    constructor({ col = -1, value = null, results = null,
        tb = null, fb = null }: DecisonNodeParams) {
        this.col = col;
        this.value = value;
        this.results = results;
        this.tb = tb;
        this.fb = fb;
    }


}


export function divideset(rows: Matrix, column: number, value: any): [Matrix, Matrix] {
    // Seperate data in two categories
    const nodeTree1 = new Matrix([]);
    const nodeTree2 = new Matrix([]);

    // Function for spliting the value
    let splitFunction = (!isNaN(parseFloat(value)))
        ? splitByNumber(column, value)
        : splitByString(column, value);

    for (let row of rows.values) {
        splitFunction(row) ? nodeTree1.insert(row) : nodeTree2.insert(row);
    }

    return [nodeTree1, nodeTree2];
}

export function classify(observation: Array<DecisonNodeType>, tree: DecisonNode): DecisonNodeType | void {
    let branch;
    if (tree.results !== null) {
        return tree.results;
    } else {
        let v = observation[toNumber(tree.col)];

        if (tree.value && !isNaN(+tree.value)) {
            branch = (v >= tree.value) ? tree.tb : tree.fb;
        } else {
            branch = (v === tree.value) ? tree.tb : tree.fb;
        }

        if (branch) {
            return classify(observation, branch);
        }
    }
}

export function mdclassify(observation: any, tree: DecisonNode): any | DecisonNodeType {
    if (tree.results !== null) {
        return tree.results;
    } else {
        let v = observation[toNumber(tree.col)];
        if (v === null && tree.tb && tree.fb) {
            let tr = mdclassify(observation, tree.tb);
            let fr = mdclassify(observation, tree.fb);
            let tcount = sum(tr);
            let fcount = sum(fr);
            let tw = (tcount) / (tcount + fcount);
            let fw = (fcount) / (tcount + fcount);
            let results: IDynamiceProperty = {};

            for (let k in tr) {
                results[k] = tr[k] * tw;
            }

            for (let k in fr) {
                results[k] = fr[k] * fw;
            }

            return results;

        } else {
            let branch;
            if (tree.value && !isNaN(parseFloat(v))) {
                branch = (v >= tree.value) ? tree.tb : tree.fb;
            } else {
                branch = (v === tree.value) ? tree.tb : tree.fb;
            }

            if (branch) {
                return mdclassify(observation, branch);
            }
        }
    }
}

export function buildTree(data: Matrix, featureIndex: number = data.shape[1], fn: scoreFn = entropy): DecisonNode {
    if (data.size === 0) {
        return new DecisonNode({});
    }

    const currentScore = fn(data);

    // Set up some variable to track the best criteria
    let bestGain = 0.0;
    let bestCriteria;
    let bestSets;

    let columnCount = data.shape[1] - 1;

    const filterByIndex = (i: number) => (data: Array<any>) => data.map((rows: Array<any>) => {
        return rows.filter((_: any, index: number) => featureIndex !== index);
    });

    const features = filterByIndex(featureIndex)(data.values);
    // Use all feature except selected feature
    for (let col = 0; col < columnCount; col++) {
        // Generate the list of different values in the column
        let featureValues: IDynamiceProperty = {};
        for (let row of features) {
            const value = row[col].toString();
            featureValues[value] = 1;
        }

        // Go over features
        for (let feature of Object.keys(featureValues)) {
            // console.log('Featuere', feature)
            let [set1, set2] = divideset(data, col, feature);

            // Information gain
            let p = set1.shape[0] / data.shape[0];
            let gain = currentScore - p * fn(set1, featureIndex) - (1 - p) * fn(set2, featureIndex);
            if (gain > bestGain && set1.shape[0] > 0 && set2.shape[0] > 0) {
                bestGain = gain;
                bestCriteria = [col, feature];
                bestSets = [set1, set2];
            }

        }
    }


    if (bestGain > 0 && isArray(bestSets) && isArray(bestCriteria)) {
        let trueBranch = buildTree(bestSets[0], featureIndex, fn);
        let falseBranch = buildTree(bestSets[1], featureIndex, fn);
        return new DecisonNode({
            col: bestCriteria[0],
            value: isNumber(bestCriteria[1]) ? toNumber(bestCriteria[1]) : bestCriteria[1],
            tb: trueBranch,
            fb: falseBranch,
        });
    } else {
        return new DecisonNode({ results: uniqueCounts(data, featureIndex) });
    }
}

export function printTree(tree: DecisonNode, indent = '') {
    indent = indent || '';
    if (tree.results !== null) {
        console.log(indent + JSON.stringify(tree.results));
    } else {
        console.log(`Column:${tree.col}: Value:${tree.value} ?`);
        if (tree.tb) {
            console.log(indent + 'T->');
            printTree(tree.tb, indent + '  ');
        }
        if (tree.fb) {
            console.log(indent + 'F->');
            printTree(tree.fb, indent + '  ');
        }
    }
}
