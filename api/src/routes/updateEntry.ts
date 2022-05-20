import { Request, Response } from 'express';
import {
  assertMoodEntryDate,
  assertMoodEntryUpdateInput,
  MoodEntryUpdateInput,
} from '../moodEntry';
import { moodStorage } from '../storage';

type Params = Required<Pick<MoodEntryUpdateInput, 'date'>>;
type Body = Omit<MoodEntryUpdateInput, 'date'>;

const updateEntryRoute = (req: Request<Params, Body>, res: Response) => {
  const date = req.params.date;

  assertMoodEntryUpdateInput(req.body);
  assertMoodEntryDate(date);

  const updatedEntry = moodStorage.updateEntry(date, req.body);

  res.json(updatedEntry);
};

export default updateEntryRoute;
