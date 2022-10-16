import express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import authenticate from '../middleware/authenticate';
import application from '../constant/application';
import route from '../route';
import joiErrorHandler from '../middleware/joiErrorHandler';
import * as errorHandler from '../middleware/apiErrorHandler';

require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(authenticate);
app.use(application.url.base, route);

// error handler
app.use(joiErrorHandler);
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.errorHandler);

export default app;
