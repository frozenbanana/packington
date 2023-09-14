import express from 'express';
import * as packingListsController from '../controllers/packingListController';

const router = express.Router();

router.post('/', packingListsController.create);
router.get('/', packingListsController.fetchAll);
// ... more packing list routes

export default router;
