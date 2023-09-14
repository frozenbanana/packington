import express from 'express';
import usersRoutes from './users';
import packingListRoutes from './packingLists';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/packinglists', packingListRoutes);

export default router;
