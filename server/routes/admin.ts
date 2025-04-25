import express from 'express';
import { updateProfile, authenticate } from '../controllers/profileController';

const router = express.Router();

// POST /api/admin/login - Authentification de l'administrateur
router.post('/login', authenticate);

// POST /api/admin/update-profile - Mettre à jour les données du profil
router.post('/update-profile', updateProfile);

export default router;