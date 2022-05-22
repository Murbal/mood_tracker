import { Button, ButtonProps, Grid } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';
import { Mood, MoodEntry } from '../pages/Index/fetch';
import { ThemeMood } from '../theme';

interface Props extends Pick<MoodEntry, 'mood'> {
  onChange: (mood: Mood) => void;
  edit?: boolean;
}

const SELECTABLE_MOODS: Mood[] = [Mood.HAPPY, Mood.SAD, Mood.ANGRY];

export const MoodPicker: FC<Props> = ({ mood, edit = false, onChange }) => {
  const createHandleClick = useCallback(
    (mood: Mood) => {
      return () => onChange(mood);
    },
    [onChange]
  );

  const renderMood = useMemo(
    // eslint-disable-next-line react/display-name
    () => (moodToRender: Mood) => {
      const isActive = moodToRender === mood;
      const disabled = edit ? false : isActive ? false : true;
      const variant: ButtonProps['variant'] = isActive
        ? 'contained'
        : 'outlined';

      return (
        <Grid item xs={12} key={moodToRender}>
          <Button
            fullWidth
            variant={variant}
            disabled={disabled}
            color={ThemeMood[moodToRender]}
            onClick={createHandleClick(moodToRender)}
          >
            {moodToRender}
          </Button>
        </Grid>
      );
    },
    [mood, edit, createHandleClick]
  );

  const moodPickerButtonsJsx = useMemo(
    () => SELECTABLE_MOODS.map(renderMood),
    [renderMood]
  );

  return (
    <Grid container item spacing={1}>
      {moodPickerButtonsJsx}
    </Grid>
  );
};
