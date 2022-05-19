import { Request, Response } from 'express';
import { assertMoodEntry, assertMoodEntryDate } from '../moodEntry';
import { moodStorage } from '../storage';

const createEntryRoute = (req: Request, res: Response) => {
  assertMoodEntry(req.body);
  console.log(req.body.date);
  assertMoodEntryDate(req.body.date);

  const addedEntry = moodStorage.addEntry(req.body);

  res.json(addedEntry);
};

export default createEntryRoute;
