import { Request, Response } from 'express';
import { moodStorage } from '../storage';

const entriesRoute = (req: Request, res: Response) => {
  res.json(moodStorage.getEntries());
};

export default entriesRoute;
