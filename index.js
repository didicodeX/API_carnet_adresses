const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/database.config');

// Charger les variables d'environnement
dotenv.config();

// Connecter la base de données
connectDB();

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});