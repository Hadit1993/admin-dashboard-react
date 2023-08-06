import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../infrastructure/axiosConfig";
import User from "../../infrastructure/dtos/User";
import ProductWithStats from "../../infrastructure/dtos/ProductWithStats";
import Paginate from "../../infrastructure/dtos/Paginate";
import Transaction from "../../infrastructure/dtos/Transaction";
import TransactionParams from "../../infrastructure/dtos/TransactionParams";

export const globalApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "Products", "Customers", "Transactions"],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId) => ({ url: `/general/users/${userId}`, method: "GET" }),
      providesTags: ["User"],
    }),
    getProducts: builder.query<ProductWithStats[], void>({
      query: () => ({ url: `/client/products`, method: "GET" }),
      providesTags: ["Products"],
    }),

    getCustomers: builder.query<User[], void>({
      query: () => ({ url: "/client/customers", method: "GET" }),
    }),
    getTransactions: builder.query<Paginate<Transaction>, TransactionParams>({
      query: (params) => ({
        url: "/client/transactions",
        params,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
} = globalApi;
