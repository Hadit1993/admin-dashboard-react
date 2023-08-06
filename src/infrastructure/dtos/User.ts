export default interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  state?: string;
  country: string;
  occupation: string;
  phoneNumber?: string;
  transactions: string[];
  role: "user" | "admin" | "superadmin";
}
