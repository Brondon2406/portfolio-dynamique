import express from 'express';
import cors from 'cors';
import { profileData } from './profileData.json';
import { updateProfile } from './controllers/profileController';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Route pour récupérer les données du profil
app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

// Route pour mettre à jour le profil (admin)
app.post('/api/admin/update-profile', updateProfile);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
