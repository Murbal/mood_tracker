import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import {
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Mood, MoodEntry } from '../../pages/Index/fetch';
import { formatDateToIso } from '../../utils/date';
import { Error } from '../Error';
import { Loading } from '../Loading';
import { MoodPicker } from '../MoodPicker';
import { MoodEntryUpdateInput, useMoodEntry } from './fetch';

export interface MoodEntryContainerProps extends MoodEntry {
  user: string;
  onSubmit: () => Promise<void> | void;
  onClose?: () => void;
  isCreate?: boolean;
}

export const MoodEntryCard: FC<MoodEntryContainerProps> = ({
  user,
  date,
  description,
  mood,
  onSubmit,
  onClose,
  isCreate = false,
}) => {
  const [isEdit, setIsEdit] = useState(isCreate);
  const [moodEditValue, setMoodEditValue] = useState(mood);
  const [descriptionEditValue, setDescriptionEditValue] = useState(description);
  const [descriptionError, setDescriptionError] = useState<string | null>();

  const theme = useTheme();
  const { loading, error, editMoodEntry, createMoodEntry } = useMoodEntry(date);

  const resetEditState = useCallback(() => {
    setDescriptionEditValue(description);
    setMoodEditValue(mood);
  }, [description, mood]);

  const toggleEditMode = useCallback(
    (skipReset = false) => {
      setIsEdit((isEdit) => {
        const isExitingEdit = isEdit;
        if (isExitingEdit && !skipReset) {
          resetEditState();
        }

        onClose?.();
        return !isEdit;
      });
    },
    [resetEditState, onClose]
  );

  const handleEditButtonClick = useCallback(
    () => toggleEditMode(),
    [toggleEditMode]
  );

  const handleMoodChange = useCallback((newMood: Mood) => {
    setMoodEditValue(newMood);
  }, []);

  const getDescriptionErrorMessage = useCallback(
    (description: string, skipRequiredCheck?: boolean) => {
      const errorMessage =
        description.length > 100
          ? 'Max 100 characters'
          : description.length === 0 && !skipRequiredCheck
          ? 'Required'
          : null;

      return errorMessage;
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescriptionError(
        getDescriptionErrorMessage(event.target.value, isCreate)
      );

      setDescriptionEditValue(event.target.value);
    },
    [descriptionError, getDescriptionErrorMessage, isCreate]
  );

  const submit = useMemo(
    () => async () => {
      const descriptionErrorMessage =
        getDescriptionErrorMessage(descriptionEditValue);
      if (descriptionErrorMessage) {
        setDescriptionError(descriptionErrorMessage);
      }

      const updateInput: MoodEntryUpdateInput = {
        mood: moodEditValue,
        description: descriptionEditValue,
      };

      if (isCreate) {
        await createMoodEntry({ data: { ...updateInput, date } });
      } else {
        await editMoodEntry({ data: updateInput });
      }
      await onSubmit();

      toggleEditMode(true);
    },
    [
      moodEditValue,
      descriptionEditValue,
      date,
      editMoodEntry,
      createMoodEntry,
      toggleEditMode,
      onSubmit,
      getDescriptionErrorMessage,
    ]
  );

  const editButtonJsx = useMemo(
    () => (
      <IconButton onClick={handleEditButtonClick}>
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
            multiline
            minRows={4}
            value={descriptionEditValue}
            onChange={handleDescriptionChange}
            error={!!descriptionError}
            helperText={descriptionError}
            InputProps={{ sx: { padding: theme.spacing(1) } }}
          />
        ) : (
          <Typography variant="body2" display="block">
            {descriptionEditValue}
          </Typography>
        )}
      </Grid>
    ),
    [
      descriptionEditValue,
      isEdit,
      handleDescriptionChange,
      theme,
      descriptionError,
    ]
  );

  const dateSectionJsx = useMemo(
    () => (
      <Grid item xs={12}>
        <Typography variant="body1" color="gray">
          {formatDateToIso(new Date(date))}
        </Typography>
      </Grid>
    ),
    [date]
  );

  const submitSectionJsx = useMemo(
    () => (
      <Grid container item xs={12} justifyContent="end">
        <IconButton onClick={submit} disabled={!!descriptionError}>
          <SendIcon />
        </IconButton>
      </Grid>
    ),
    [submit, descriptionError]
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
