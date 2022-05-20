import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import env from './env';
import createEntryRoute from './routes/createEntry';
import entriesRoute from './routes/entries';
import summaryRoute from './routes/summary';
import updateEntryRoute from './routes/updateEntry';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/entries', createEntryRoute);
app.patch('/entries/:date', updateEntryRoute);
app.get('/entries/summary', summaryRoute);
app.get('/entries', entriesRoute);

app.listen(env.PORT, () => {
  console.log(`listening on port ${env.PORT}`);
});
