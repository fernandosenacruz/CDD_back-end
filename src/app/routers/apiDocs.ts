import { Router } from 'express';
import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';

const router: Router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;