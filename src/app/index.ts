import 'express-async-errors';

import cors from 'cors';
import Express, { Application } from 'express';

import errorMiddleware from './middlewares/error';
import { redocly, apiDocs, swagger, login, users, posts } from './routers';

const App: Application = Express();

App.use(Express.json(), cors());

App.use('/', swagger, redocly, apiDocs, login, users, posts, errorMiddleware);

export default App;