import Matrix from './DecisonMatrix';


export type scoreFn = (rows: Matrix, index?: number) => number;

export interface DecisonTreeParams {
    scoreFn: scoreFn;
}

export type DecisonNodeType = string | number;


export interface DecisonNodeParams {
    col?: string | number;
    value?: DecisonNodeType;
    results?: DecisonNodeType;
    tb?: DecisonNode;
    fb?: DecisonNode;
};

export interface IDynamiceProperty {
    [key: string]: DecisonNodeParams | number | string;
}


export interface DecisonNode {
    col: number | string;
    value: DecisonNodeType | null;
    results: DecisonNodeType | null;
    tb: DecisonNode | null;
    fb: DecisonNode | null;
}
