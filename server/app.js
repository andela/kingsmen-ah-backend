import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes';
import swaggerSpec from './config/swagger';

const debugged = debug('app');
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', apiRoutes);
// swagger-ui-express for API endpoint documentation
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  debugged(`Listening from port ${port}`);
});

export default app;
