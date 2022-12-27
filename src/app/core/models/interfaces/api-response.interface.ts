export interface ApiResponse<T> {
  data: T;
  meta: APIResponseMeta;
}

export interface APIResponseMeta {
  page: number;
  perPage: number;
  total: number;
}
