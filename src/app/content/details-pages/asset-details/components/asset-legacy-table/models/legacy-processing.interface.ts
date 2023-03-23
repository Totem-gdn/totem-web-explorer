export interface DecodedLegacy {
  data: string;
  description?: string;
}
export interface JsonDecodeStep extends DecodedLegacy {
  isJson: boolean;
}
