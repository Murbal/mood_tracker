import { isPlainObject } from './utils/typeGuards';
import { Assert, createAssert, createTypeGuard } from './utils/validator';

export enum Mood {
  HAPPY = 'HAPPY',
  ANGRY = 'ANGRY',
  SAD = 'SAD',
}
/** has to be in following date format: YYYY-MM-DD */
export type MoodEntryDate = string;
export interface MoodEntry {
  date: MoodEntryDate;
  description: string;
  mood: Mood;
}
export type MoodEntryUpdateInput = Partial<MoodEntry>;

/** regex for format YYYY-MM-DD */
const MOOD_ENTRY_DATE_REGEX = /^\d\d\d\d-\d\d-\d\d$/;
/** checks if provided value is a valid MoodEntryDate */
export const isMoodEntryDate = createTypeGuard<MoodEntryDate>(
  (maybeMoodEntryDate) => {
    return (
      typeof maybeMoodEntryDate === 'string' &&
      maybeMoodEntryDate.match(MOOD_ENTRY_DATE_REGEX) !== null &&
      !isNaN(new Date(maybeMoodEntryDate).getTime()) // checks if date is convertible to JS date
    );
  }
);
export const assertMoodEntryDate: Assert<MoodEntryDate> = createAssert(
  'Invalid MoodEntryDate',
  isMoodEntryDate
);

/** only does a shallow check if structure is matching a MoodEntry's */
export const isMoodEntry = createTypeGuard<MoodEntry>((maybeMoodEntry) => {
  if (!isPlainObject(maybeMoodEntry)) {
    return false;
  }

  const keys = Object.keys(maybeMoodEntry);

  return (
    keys.length === 3 &&
    Object.keys(maybeMoodEntry).every(
      (key) => key === 'description' || key === 'mood' || key === 'date'
    )
  );
});
export const assertMoodEntry: Assert<MoodEntry> = createAssert(
  'Invalid MoodEntry',
  isMoodEntry
);

export const isMoodEntryUpdateInput = createTypeGuard<MoodEntryUpdateInput>(
  (maybeMoodEntryUpdateInput) => {
    return (
      isPlainObject(maybeMoodEntryUpdateInput) &&
      Object.keys(maybeMoodEntryUpdateInput).every(
        (key) => key === 'description' || key === 'mood'
      )
    );
  }
);
export const assertMoodEntryUpdateInput: Assert<MoodEntryUpdateInput> =
  createAssert('Invalid MoodEntryUpdateInput', isMoodEntryUpdateInput);
