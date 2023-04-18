import { Router } from 'express';
import { searchController } from '../Controllers/searchController';

const router = Router();

router.post('/', searchController);

export default router;
