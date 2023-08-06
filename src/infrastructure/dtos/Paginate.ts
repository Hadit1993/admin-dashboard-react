export default interface Paginate<T> {
  data: T[];
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
  sort: { sortBy: string; sortDir: string }[];
}
