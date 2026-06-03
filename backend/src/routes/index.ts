import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import authRoutes from './authRoutes';

const router = Router();

router.get('/health', healthController);
router.use('/auth', authRoutes);

export default router;
