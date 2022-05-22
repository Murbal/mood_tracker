import { useAppAxios } from '../../axios';
import { MoodEntry } from '../../pages/Index/fetch';

export type MoodEntryUpdateInput = Omit<MoodEntry, 'date'>;

export const useMoodEntry = (date: string) => {
  const [editAxiosBundle, editMoodEntry] = useAppAxios<
    MoodEntry,
    MoodEntryUpdateInput
  >(
    {
      method: 'PATCH',
      url: `/entries/${date}`,
    },
    { manual: true }
  );
  const [createAxiosBundle, createMoodEntry] = useAppAxios<
    MoodEntry,
    MoodEntry
  >(
    {
      method: 'POST',
      url: '/entries',
    },
    { manual: true }
  );

  const someLoading = editAxiosBundle.loading || createAxiosBundle.loading;
  const someError = editAxiosBundle.error ?? createAxiosBundle.error;

  return {
    loading: someLoading,
    error: someError,
    editMoodEntry,
    createMoodEntry,
  };
};
