import { Grid, LinearProgress, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { Mood } from '../../pages/Index/fetch';
import { ThemeMood } from '../../theme';
import { Error } from '../Error';
import { Loading } from '../Loading';
import { MoodSummary as TMoodSummary, useMoodSummary } from './fetch';

export const MoodSummary: FC = () => {
  const { data, loading, error } = useMoodSummary();

  const moodPercentages = useMemo<TMoodSummary>(
    () => ({
      HAPPY: data?.HAPPY ?? 0,
      SAD: data?.SAD ?? 0,
      ANGRY: data?.ANGRY ?? 0,
    }),
    [data]
  );

  const moodPercentagesJsx = useMemo(
    () =>
      Object.entries(moodPercentages).map(([mood, percentage]) => (
        <Grid container item xs={12} spacing={1} key={mood}>
          <Grid item xs={11}>
            <LinearProgress
              value={percentage}
              variant="determinate"
              sx={{ height: 20 }}
              color={ThemeMood[mood as Mood]}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="caption" display="inline">
              {percentage}%
            </Typography>
          </Grid>
        </Grid>
      )),
    [moodPercentages]
  );

  return (
    <>
      {loading && <Loading />}
      <Error message={error?.message} />
      <Grid container justifyItems="center">
        {moodPercentagesJsx}
      </Grid>
    </>
  );
};
