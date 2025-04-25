import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const profile = {
  name: "Fopa Tiwa Brondon",
  title: "Développeur Java & Architecte de solutions hospitalières",
  projects: [
    {
      name: "GUDMES",
      description: "Plateforme de gestion hospitalière conforme aux normes de santé.",
    },
    {
      name: "Portefeuille dynamique",
      description: "Site portfolio avec backoffice dynamique.",
    }
  ]
};

app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));