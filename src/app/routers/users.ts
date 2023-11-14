import { Router } from 'express';

const router: Router = Router();

router.get('/');

router.get('/:id');

router.post('/post');

router.put('/:id');

router.delete('/:id');

export default router;