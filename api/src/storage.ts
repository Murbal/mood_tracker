import { MoodEntry, MoodEntryDate, MoodEntryUpdateInput } from './moodEntry';
import { pipe } from './utils/pipe';
import { isNil } from './utils/typeGuards';
import { Maybe } from './utils/types';

type Order = 'ASC' | 'DESC';
interface GetEntriesOpts {
  dateSort?: Order;
}

const createMoodEntrySortPipe =
  (order: Order) =>
  (entries: MoodEntry[]): MoodEntry[] => {
    return entries.sort((a, b) => {
      const first = order === 'DESC' ? b : a;
      const second = order === 'DESC' ? a : b;

      return new Date(first.date).getTime() - new Date(second.date).getTime();
    });
  };

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

  public getEntries(opts?: GetEntriesOpts): MoodEntry[] {
    const entries = Array.from(this.moodEntries.values());

    const pipes: CallableFunction[] = [];

    if (opts?.dateSort) {
      pipes.push(createMoodEntrySortPipe(opts.dateSort));
    }

    return pipe(pipes, entries);
  }

  public getEntry(date: MoodEntryDate): Maybe<MoodEntry> {
    return this.moodEntries.get(date);
  }
}

export const moodStorage = new MoodStorage();
