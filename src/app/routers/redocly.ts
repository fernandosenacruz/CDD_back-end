import { Router } from 'express';

const router: Router = Router();

router.get('/redocly', (_req, res) => {
  return res.sendFile(process.cwd() + '/index.html');
});

export default router;