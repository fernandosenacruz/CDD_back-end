import { Router } from 'express';

const router: Router = Router();

router.get('/swagger', (_req, res) => {
  return res.sendFile(process.cwd() + '/swagger.json');
});

export default router;