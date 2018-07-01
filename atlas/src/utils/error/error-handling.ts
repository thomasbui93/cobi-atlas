import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('API issue', err.stack);
    res.status(500).json({
        error: 'Unable to process your request. Please check the log file for more information'
    });
};