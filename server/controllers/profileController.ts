import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const updateProfile = (req: Request, res: Response) => {
  const updatedProfile = req.body;
  const filePath = path.join(__dirname, '../profileData.json');

  // Mise à jour des données JSON
  fs.writeFile(filePath, JSON.stringify(updatedProfile, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
    res.status(200).json({ message: 'Profil mis à jour avec succès' });
  });
};
