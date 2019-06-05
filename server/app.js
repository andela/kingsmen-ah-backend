import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/api/users';
import errorHandler from './middlewares/errorHandler';

const debugged = debug('app');
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/v1/auth', authRoutes);
app.use('*', (req, res) => res.status(404).send({
  status: 404,
  message: 'Page Not Found'
}));
app.use(errorHandler);

app.listen(port, () => {
  debugged(`Listening from port ${port}`);
});

export default app;
