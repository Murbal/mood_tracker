import { Request, Response } from 'express';
import { Mood, MoodEntry } from '../moodEntry';
import { moodStorage } from '../storage';

type MoodGrouping = Record<Mood, number>;
type Summary = MoodGrouping;

const groupMoods = (entries: MoodEntry[]): MoodGrouping => {
  return entries.reduce<MoodGrouping>(
    (acc, entry) => {
      acc[entry.mood] += 1;

      return acc;
    },
    { HAPPY: 0, SAD: 0, ANGRY: 0 }
  );
};
const buildSummary = (entries: MoodEntry[]): Summary => {
  const moodGrouping = groupMoods(entries);
  const totalEntriesCount = entries.length;

  return Object.entries(moodGrouping).reduce<Summary>(
    (acc, [mood, moodEntriesCount]) => {
      const percentage = Math.round(
        (moodEntriesCount / totalEntriesCount) * 100
      );
      acc[mood as Mood] = percentage;

      return acc;
    },
    { HAPPY: 0, SAD: 0, ANGRY: 0 }
  );
};

const summaryRoute = (req: Request, res: Response) => {
  const entries = moodStorage.getEntries();

  const summary = buildSummary(entries);

  res.json(summary);
};

export default summaryRoute;
