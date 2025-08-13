export interface BaseResponse<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T,
}