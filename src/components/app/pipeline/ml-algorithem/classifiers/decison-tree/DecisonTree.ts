import Matrix, { DecisonNodeType } from "./DecisonMatrix";
import { entropy, giniimpurity, uniqueCounts } from './Measure';
import { isArray, isNumber } from 'lodash';
import { DecisonNode, buildTree, classify, printTree  } from './DecisonNode';
import { DecisonNodeParams, IDynamiceProperty, scoreFn } from "./Decison-interfaces";
import { ML } from '../ml-abstract';

export { Matrix };

export class DecisonTree implements ML {
    private scoreFn: scoreFn;
    private tree: DecisonNode;
    constructor({ scoreFn = entropy } = {}) {
        this.scoreFn = scoreFn;
    }

    train(matrix: Matrix, label: string) {
        const tmpIndex = matrix.getLabelIndex(label);
        if (tmpIndex === -1) {
            throw new Error('Label doesn\'t  exist');
        }


        this.tree = buildTree(matrix, tmpIndex, this.scoreFn);
    }

    predict(inputs: DecisonNodeType[]) {
        return classify(inputs, this.tree)
    }

    print() {
        console.log(this.tree)
        console.log(`******** Decison tree ********`)
        printTree(this.tree);
        console.log(`***********************`)
    }
}

