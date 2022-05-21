import { useAppAxios } from '../../axios';
import { Mood } from '../../pages/Index/fetch';

export type MoodSummary = Record<Mood, number>;

export const useMoodSummary = () => {
  const [{ data, loading, error }] = useAppAxios<MoodSummary>(
    '/entries/summary',
    { useCache: false }
  );

  return {
    data,
    loading,
    error,
  };
};
