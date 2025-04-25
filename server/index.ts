import express from 'express';
import cors from 'cors';
import { join } from 'path';
import profileRoutes from './routes/profile';
import adminRoutes from './routes/admin';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'https://portfolio-dynamique-1.onrender.com',
    'http://localhost:5173', // Pour le développement local
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;