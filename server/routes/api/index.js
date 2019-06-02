import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../config/swagger';
import userRoutes from './users';

const apiRoutes = express.Router();

apiRoutes.use('/', userRoutes);

// swagger-ui-express for API endpoint documentation
apiRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default apiRoutes;
