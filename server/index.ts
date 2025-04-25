import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Mon portfolio dynamique backend est prêt !');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});