import dotenv from 'dotenv';
dotenv.config();

import { isNumberParsable } from './utils/typeGuards';
import { Assert, createAssert } from './utils/validator';

const assertPort: Assert<string> = createAssert(
  'Env variable "PORT" must be a string parsable to a number',
  isNumberParsable
);

const PORT = process.env.PORT;
assertPort(PORT);

const parsedPort = parseInt(PORT, 10);

export default { PORT: parsedPort } as const;
