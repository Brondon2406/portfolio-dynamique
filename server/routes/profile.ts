import express from 'express';
import { getProfile } from '../controllers/profileController';

const router = express.Router();

// GET /api/profile - Récupérer les données du profil
router.get('/', getProfile);

export default router;