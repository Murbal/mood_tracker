import { Request, Response } from 'express';
import {
  assertMoodEntryDate,
  assertMoodEntryUpdateInput,
  MoodEntryUpdateInput,
} from '../moodEntry';
import { moodStorage } from '../storage';

export const updateEntryRoute = (
  req: Request<MoodEntryUpdateInput>,
  res: Response
) => {
  const { date, ...moodEntryUpdateInput } = req.body;

  assertMoodEntryUpdateInput(moodEntryUpdateInput);
  assertMoodEntryDate(date);

  const updatedEntry = moodStorage.updateEntry(date, moodEntryUpdateInput);

  res.json(updatedEntry);
};
