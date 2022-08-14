import type { Request, Response, NextFunction } from "express";

/**
 * Custom error handler to standardize error objects
 * returned to the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    res.header("Content-Type", 'application/json'); //TODO Responses from the endpoint should be in JSON format.

    const status = err.status || 400;
    res.status(status).json({error: `${err.message}`});;
};
