import { Request, Response, NextFunction } from 'express';

const responseHandler = (result: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = result.statusCode || 500;
  const message = result.message || 'Something went wrong!';
  const data = result.data || '';
  const success =  [200, 201, 204].some(s => s === result.statusCode) ? true : false;

  res.status(statusCode).json({
    success,
    message,
    data
  });
};


export class ErrorResponse extends Error{
    statusCode: number;
    constructor(message: any, statusCode:number){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}

export default responseHandler;

