import { Box, Fab, Grid, Modal, useTheme } from '@mui/material';
import BarCharIcon from '@mui/icons-material/BarChart';
import { FC, useCallback, useMemo, useState } from 'react';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { MoodEntryCard } from '../../components/MoodEntry';
import { MoodSummary } from '../../components/MoodSummary';
import { Mood, useEntries } from './fetch';
import { shiftDateToStartOfDay } from '../../utils/date/range';
import { formatDateToIso } from '../../utils/date';

const IndexPage: FC = () => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const theme = useTheme();
  const { data: entries, loading, error, refetch } = useEntries();

  const toggleSummary = useCallback(() => {
    setIsSummaryOpen((v) => !v);
  }, []);

  const isTodayMissing = useMemo(
    () =>
      !entries?.some(
        (entry) =>
          shiftDateToStartOfDay(new Date(entry.date)).getTime() ===
          shiftDateToStartOfDay(new Date()).getTime()
      ),
    [entries]
  );

  const entriesJsx = useMemo(() => {
    const fetchedEntriesJsx = entries?.map((entry) => (
      <Grid container item xs={12} justifyContent="center" key={entry.date}>
        <Grid item xs={10} md={7} lg={6} xl={5}>
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

    if (!isTodayMissing) {
      return fetchedEntriesJsx;
    }

    return (
      <>
        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={10} md={7} lg={6} xl={5}>
            <MoodEntryCard
              isCreate
              user="Emirhan"
              date={formatDateToIso(new Date())}
              description=""
              mood={Mood.HAPPY}
              onSubmit={async () => {
                await refetch();
              }}
            />
          </Grid>
        </Grid>
        {fetchedEntriesJsx}
      </>
    );
  }, [entries, isTodayMissing, refetch]);

  return (
    <div>
      {loading && <Loading />}
      <Error message={error?.message} />
      <Grid container spacing={2}>
        {entries != null && entriesJsx}
      </Grid>
      <Fab
        color="primary"
        onClick={toggleSummary}
        sx={{
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <BarCharIcon fontSize="large" />
      </Fab>
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
