import {Request,  Response, NextFunction} from 'express';

const pagination = (req: Request, res: Response, next: NextFunction) => {
  const page : number = parseInt(req.query.page as string) || 1;
  const limit : number = parseInt(req.query.limit as string) || 10;
  const {query = "" } = req.query;
  let queries = '';

  if (query !== '') {
    queries = JSON.parse(JSON.parse(query as string));
  }

  req.pagination = {
    page,
    limit,
    queries
  };

  next();
}


export default pagination;
