import { Button, ButtonProps, Grid } from '@mui/material';
import { darken, lighten, SystemCssProperties } from '@mui/system';
import { FC, useCallback, useMemo } from 'react';
import { Mood, MoodEntry } from '../pages/Index/fetch';

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

      const isHappy = moodToRender === Mood.HAPPY;
      const isSad = moodToRender === Mood.SAD;
      const isAngry = moodToRender === Mood.ANGRY;

      const moodColor: SystemCssProperties['color'] = isHappy
        ? '#009600'
        : isSad
        ? '#0078cf'
        : isAngry
        ? '#a80202'
        : undefined;
      const color = isActive ? 'white' : moodColor;
      const backgroundColor = isActive ? moodColor : undefined;
      const backgroundColorHover = moodColor
        ? isActive
          ? darken(moodColor, 0.1)
          : lighten(moodColor, 0.9)
        : undefined;
      const borderColorHover = backgroundColorHover
        ? darken(backgroundColorHover, 0.5)
        : undefined;

      return (
        <Grid item xs={12} key={moodToRender}>
          <Button
            fullWidth
            variant={variant}
            disabled={disabled}
            onClick={createHandleClick(moodToRender)}
            sx={{
              color,
              backgroundColor,
              borderColor: moodColor,
              ':hover': {
                backgroundColor: backgroundColorHover,
                borderColor: borderColorHover,
              },
            }}
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
