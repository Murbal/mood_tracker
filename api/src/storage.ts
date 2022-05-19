import { MoodEntry, MoodEntryDate, MoodEntryUpdateInput } from './moodEntry';
import { isNil } from './utils/typeGuards';

class MoodStorage {
  protected static instance: MoodStorage;
  protected moodEntries = new Map<MoodEntryDate, MoodEntry>();

  constructor() {
    if (!MoodStorage.instance) {
      MoodStorage.instance = this;
    }

    return MoodStorage.instance;
  }

  public addEntry(entry: MoodEntry): MoodEntry {
    this.moodEntries.set(entry.date, entry);

    const addedEntry = this.moodEntries.get(entry.date);
    if (!addedEntry) {
      throw new Error(`Entry with date ${entry.date} did not get saved`);
    }

    return addedEntry;
  }

  public updateEntry(
    entryDate: MoodEntryDate,
    entryUpdateData: Omit<MoodEntryUpdateInput, 'date'>
  ): MoodEntry {
    const entryToUpdate = this.moodEntries.get(entryDate);
    if (isNil(entryToUpdate)) {
      throw new Error(`No entry with date ${entryDate}`);
    }

    const updatedEntry: MoodEntry = { ...entryToUpdate, ...entryUpdateData };

    this.addEntry(updatedEntry);

    return updatedEntry;
  }
}

export const moodStorage = new MoodStorage();
