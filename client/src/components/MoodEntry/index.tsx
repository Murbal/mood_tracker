import {
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Mood, MoodEntry } from '../../pages/Index/fetch';
import { MoodPicker } from '../MoodPicker';
import { useMoodEntry } from './fetch';
import { Loading } from '../Loading';
import { Error } from '../Error';

export interface MoodEntryContainerProps extends MoodEntry {
  user: string;
  onSubmit: () => Promise<void> | void;
}

export const MoodEntryCard: FC<MoodEntryContainerProps> = ({
  user,
  date,
  description,
  mood,
  onSubmit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [moodEditValue, setMoodEditValue] = useState(mood);
  const [descriptionEditValue, setDescriptionEditValue] = useState(description);

  const theme = useTheme();
  const { loading, error, editMoodEntry } = useMoodEntry(date);

  const resetEditState = useCallback(() => {
    setDescriptionEditValue(description);
    setMoodEditValue(mood);
  }, [description, mood]);

  const toggleEditMode = useCallback(() => {
    setIsEdit((isEdit) => {
      const isExitingEdit = isEdit;
      if (isExitingEdit) {
        resetEditState();
      }

      return !isEdit;
    });
  }, [resetEditState]);

  const handleMoodChange = useCallback((newMood: Mood) => {
    setMoodEditValue(newMood);
  }, []);

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescriptionEditValue(event.target.value);
    },
    []
  );

  const submit = useMemo(
    () => async () => {
      await editMoodEntry({
        data: { mood: moodEditValue, description: descriptionEditValue },
      });
      await onSubmit();

      toggleEditMode();
    },
    [
      moodEditValue,
      descriptionEditValue,
      editMoodEntry,
      toggleEditMode,
      onSubmit,
    ]
  );

  const editButtonJsx = useMemo(
    () => (
      <IconButton onClick={toggleEditMode}>
        {isEdit ? <CloseIcon /> : <EditIcon />}
      </IconButton>
    ),
    [isEdit]
  );

  const headerSectionJsx = useMemo(
    () => (
      <Grid container item xs={12} justifyContent="space-between">
        <Typography variant="h4">{user}</Typography>
        {editButtonJsx}
      </Grid>
    ),
    [user, editButtonJsx]
  );

  const moodSectionJsx = useMemo(
    () => (
      <Grid item xs={12}>
        <Typography variant="h6">Mood</Typography>
        <MoodPicker
          mood={moodEditValue}
          edit={isEdit}
          onChange={handleMoodChange}
        />
      </Grid>
    ),
    [moodEditValue, isEdit, handleMoodChange]
  );

  const descriptionSectionJsx = useMemo(
    () => (
      <Grid item xs={12}>
        <Typography variant="h6">Description</Typography>
        {isEdit ? (
          <TextField
            fullWidth
            value={descriptionEditValue}
            onChange={handleDescriptionChange}
            inputProps={{ style: { padding: theme.spacing(1) } }}
          />
        ) : (
          <Typography variant="body2" display="block">
            {descriptionEditValue}
          </Typography>
        )}
      </Grid>
    ),
    [descriptionEditValue, isEdit, handleDescriptionChange, theme]
  );

  const dateSectionJsx = useMemo(
    () => (
      <Grid item xs={12}>
        <Typography variant="body1" color="gray">
          {new Date(date).toLocaleDateString()}
        </Typography>
      </Grid>
    ),
    [date]
  );

  const submitSectionJsx = useMemo(
    () => (
      <Grid container item xs={12} justifyContent="end">
        <IconButton onClick={submit}>
          <SendIcon />
        </IconButton>
      </Grid>
    ),
    [submit]
  );

  return (
    <>
      {loading && <Loading />}
      <Error message={error?.message} />
      <Card sx={{ padding: theme.spacing(2) }}>
        <Grid container spacing={1}>
          {headerSectionJsx}
          {dateSectionJsx}
          {descriptionSectionJsx}
          {moodSectionJsx}
          {isEdit && submitSectionJsx}
        </Grid>
      </Card>
    </>
  );
};
