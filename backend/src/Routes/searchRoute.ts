import { Router } from 'express';
import { searchController } from '../Controller/searchController';

const router = Router();

router.post('/', searchController);

export default router;
