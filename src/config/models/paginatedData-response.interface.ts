export interface PaginatedDataResponse<T> {
  data: T[];
  offset: number;
  total: number;
}
