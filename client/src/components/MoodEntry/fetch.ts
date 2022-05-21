import { useAppAxios } from '../../axios';

export const useMoodEntry = (date: string) => {
  const [editAxiosBundle, editMoodEntry] = useAppAxios(
    {
      method: 'PATCH',
      url: `/entries/${date}`,
    },
    { manual: true }
  );

  const someLoading = editAxiosBundle.loading;
  const someError = editAxiosBundle.error;

  return {
    loading: someLoading,
    error: someError,
    editMoodEntry,
  };
};
