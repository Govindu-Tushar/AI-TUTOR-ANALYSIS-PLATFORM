import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

/**
 * Express error handling middleware to gracefully return JSON formatted errors.
 */
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  console.error(`[API Server Error] ${err.message}`, err.stack);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
