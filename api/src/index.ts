import bodyParser from 'body-parser';
import express from 'express';
import env from './env';
import createEntryRoute from './routes/createEntry';
import { updateEntryRoute } from './routes/updateEntry';

const app = express();

app.use(bodyParser.json());

app.post('/entries', createEntryRoute);
app.patch('/entries', updateEntryRoute);

app.listen(env.PORT, () => {
  console.log(`listening on port ${env.PORT}`);
});
