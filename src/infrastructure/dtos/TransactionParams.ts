export default interface TransactionParams {
  page?: number;
  pageSize?: number;
  userId?: string;
  sort?: string;
  minCost?: number;
  maxCost?: number;
}
