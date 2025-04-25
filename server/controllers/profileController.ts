import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const profileDataPath = path.join(__dirname, '../profileData.json');

// Récupérer les données du profil
export const getProfile = async (req: Request, res: Response) => {
  try {
    const data = await readFile(profileDataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Erreur lors de la lecture des données du profil:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données du profil' });
  }
};

// Mettre à jour les données du profil
export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Dans un environnement de production, vous devriez ajouter une authentification ici
    const newProfileData = req.body;
    
    // Validation de base
    if (!newProfileData || !newProfileData.basics) {
      return res.status(400).json({ error: 'Données de profil invalides' });
    }
    
    // Écrire les nouvelles données dans le fichier
    await writeFile(profileDataPath, JSON.stringify(newProfileData, null, 2), 'utf8');
    res.json({ success: true, message: 'Profil mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
  }
};

// Authentification simple (à améliorer en production)
export const authenticate = (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Remplacez ces valeurs par vos propres identifiants ou utilisez un système d'authentification plus sécurisé
  const validUsername = 'admin';
  const validPassword = 'admin123';
  
  if (username === validUsername && password === validPassword) {
    // En production, utilisez JWT ou une autre méthode sécurisée
    res.json({ success: true, token: 'admin-token' });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
};