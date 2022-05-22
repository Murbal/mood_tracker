import { Box, Fab, Grid, GridProps, Modal, useTheme } from '@mui/material';
import BarCharIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import { FC, useCallback, useMemo, useState } from 'react';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { MoodEntryCard } from '../../components/MoodEntry';
import { MoodSummary } from '../../components/MoodSummary';
import { Mood, useEntries } from './fetch';
import { formatDateToIso } from '../../utils/date';

const moodEntryGridBreakpoints: Pick<GridProps, 'xs' | 'md' | 'lg' | 'xl'> = {
  xs: 10,
  md: 7,
  lg: 6,
  xl: 5,
};

const IndexPage: FC = () => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isCreateEntry, setIsCreateEntry] = useState(false);

  const theme = useTheme();
  const { data: entries, loading, error, refetch } = useEntries();

  const toggleSummary = useCallback(() => {
    setIsSummaryOpen((v) => !v);
  }, []);

  const entriesJsx = useMemo(() => {
    return entries?.map((entry) => (
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        key={`${entry.date}-${entry.description}-${entry.mood}`}
      >
        <Grid item {...moodEntryGridBreakpoints}>
          <MoodEntryCard
            {...entry}
            user="Emirhan"
            onSubmit={async () => {
              await refetch();
            }}
          />
        </Grid>
      </Grid>
    ));
  }, [entries, refetch]);

  return (
    <div>
      {loading && <Loading />}
      <Error message={error?.message} />
      <Grid container spacing={2}>
        {isCreateEntry && (
          <Grid container item xs={12} justifyContent="center">
            <Grid item {...moodEntryGridBreakpoints}>
              <MoodEntryCard
                isCreate
                user="Emirhan"
                date={formatDateToIso(new Date())}
                description=""
                mood={Mood.HAPPY}
                onSubmit={async () => {
                  await refetch({}, { useCache: false });
                }}
                onClose={() => setIsCreateEntry(false)}
              />
            </Grid>
          </Grid>
        )}
        {entriesJsx}
      </Grid>
      <Box
        sx={{
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <Grid container spacing={1}>
          <Grid item>
            <Fab color="primary" onClick={toggleSummary}>
              <BarCharIcon fontSize="large" />
            </Fab>
          </Grid>
          <Grid item>
            <Fab color="primary" onClick={() => setIsCreateEntry(true)}>
              <AddIcon fontSize="large" />
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <Modal open={isSummaryOpen} onClose={toggleSummary}>
        <Box
          sx={{
            top: '50%',
            left: '50%',
            width: '50%',
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            padding: theme.spacing(4),
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <MoodSummary />
        </Box>
      </Modal>
    </div>
  );
};

export default IndexPage;
