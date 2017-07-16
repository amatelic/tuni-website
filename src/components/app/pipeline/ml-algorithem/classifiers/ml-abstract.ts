import Matrix from './decison-tree/DecisonMatrix';
import { DecisonNodeType } from './decison-tree/Decison-interfaces';

export abstract class ML {
  abstract train(matrix: Matrix, label: DecisonNodeType): void;
  abstract predict(inputs: any[]): any;
}
