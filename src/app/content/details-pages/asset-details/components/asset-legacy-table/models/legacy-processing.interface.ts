export interface DecodedLegacy {
  data: string;
  description?: string;
  player?: string;
}
export interface JsonDecodeStep extends DecodedLegacy {
  isJson: boolean;
}
