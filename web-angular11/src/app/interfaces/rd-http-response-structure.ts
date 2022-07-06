export interface RdHttpResponseStructure {
  respData?: {
    status: string
  };
  respResultsets: Array<Array<any>>;
  respCode: string;
}
