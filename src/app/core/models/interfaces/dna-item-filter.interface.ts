export interface DNAItemFilter {
  description: string;
  id: string;
  type: string;
  gene: number;
  start: number;
  length: number;
  values?: string[] | {
    key: string;
    value: number | number[];
  }[];
}
