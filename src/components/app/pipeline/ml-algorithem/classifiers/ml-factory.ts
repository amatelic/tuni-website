import { DecisonTree } from './decison-tree/DecisonTree';
import { ML } from './ml-abstract';
import { has } from 'lodash';

const ML_MAP = {
  'decison-tree': DecisonTree
};

export const supportedML = Object.keys(ML_MAP);

export function MLFactory(type: string, config?: any): ML {
  if (!has(ML_MAP, type)) {
    return;
  }
  return new ML_MAP[type](config);
}
