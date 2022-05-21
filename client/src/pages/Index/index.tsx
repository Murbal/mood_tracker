import { Box, Fab, Grid, Modal, useTheme } from '@mui/material';
import BarCharIcon from '@mui/icons-material/BarChart';
import { FC, useCallback, useState } from 'react';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { MoodEntryCard } from '../../components/MoodEntry';
import { MoodSummary } from '../../components/MoodSummary';
import { useEntries } from './fetch';

const IndexPage: FC = () => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const theme = useTheme();
  const { data: entries, loading, error, refetch } = useEntries();

  const toggleSummary = useCallback(() => {
    setIsSummaryOpen((v) => !v);
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <Error message={error?.message} />
      <Grid container spacing={2}>
        {entries?.map((v) => (
          <Grid container item xs={12} justifyContent="center" key={v.date}>
            <Grid item xs={10} md={7} lg={6} xl={5}>
              <MoodEntryCard
                user="Emirhan"
                {...v}
                onSubmit={async () => {
                  await refetch();
                }}
              />
            </Grid>
          </Grid>
        ))}
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
