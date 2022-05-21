import { Grid } from '@mui/material';
import { FC } from 'react';
import { Error } from '../../components/Error';
import { Loading } from '../../components/Loading';
import { MoodEntryCard } from '../../components/MoodEntry';
import { useEntries } from './fetch';

const IndexPage: FC = () => {
  const { data: entries, loading, error, refetch } = useEntries();

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
    </div>
  );
};

export default IndexPage;
