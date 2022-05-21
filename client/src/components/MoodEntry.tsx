import { Card, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { MoodEntry } from '../pages/Index/fetch';
import { MoodPicker } from './MoodPicker';

export interface MoodEntryContainerProps extends MoodEntry {
  user: string;
  edit: boolean;
}

export const MoodEntryCard: FC<MoodEntryContainerProps> = ({
  user,
  edit,
  date,
  description,
  mood,
}) => {
  return (
    <Card sx={{ padding: (theme) => theme.spacing(2) }}>
      <Grid container>
        <Grid item xs={12} justifyContent="space-between">
          <Typography variant="h4">{user}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="gray">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body2" display="block">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Mood</Typography>
          <MoodPicker
            mood={mood}
            edit={edit}
            onChange={(v) => console.log(v)}
          />
        </Grid>
        <Grid item xs={12} justifyItems="end"></Grid>
      </Grid>
    </Card>
  );
};
