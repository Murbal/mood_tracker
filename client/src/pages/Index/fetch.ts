import { useAppAxios } from '../../axios';

export enum Mood {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
}

export interface MoodEntry {
  date: string;
  description: string;
  mood: Mood;
}

export const useEntries = () => {
  const [{ error, loading, data }, refetch] = useAppAxios<MoodEntry[]>({
    method: 'GET',
    url: '/entries',
  });

  return {
    loading,
    error,
    data,
    refetch,
  };
};
