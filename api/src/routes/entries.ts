import { Request, Response } from 'express';
import { moodStorage } from '../storage';

const entriesRoute = (req: Request, res: Response) => {
  res.json(moodStorage.getEntries({ dateSort: 'DESC' }));
};

export default entriesRoute;
