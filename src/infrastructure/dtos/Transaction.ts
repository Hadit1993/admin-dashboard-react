export default interface Transaction {
  id: string;
  userId: string;
  cost: number;
  products: string[];
  createdAt: Date;
  updatedAt: Date;
}
