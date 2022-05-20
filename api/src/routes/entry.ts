import { Request, Response } from 'express';
import { assertMoodEntryDate, MoodEntry } from '../moodEntry';
import { moodStorage } from '../storage';

type Params = Pick<MoodEntry, 'date'>;

const entryRoute = (req: Request<Params>, res: Response) => {
  assertMoodEntryDate(req.params.date);

  res.json(moodStorage.getEntry(req.params.date));
};

export default entryRoute;
