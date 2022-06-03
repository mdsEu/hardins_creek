import express from "express";
import { Interface } from "readline";
import Pagination from '../../server/middlewares/type/pagination';

declare global {
  namespace Express {
    interface Request {
      pagination?: Pagination
    }
  }
}
