export interface DNAField {
    description: string;
    gene: number;
    id: string;
    length: number;
    start: number;
    type: string;
    values?: string[];
}

export interface AssetDNAField {
    description: string;
    gene: number;
    id: string;
    length: number;
    start: number;
    type: string;
    value?: string;
}