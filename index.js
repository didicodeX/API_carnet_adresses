// Charger les variables d'environnement
require("dotenv").config(); 

// Lancer l'application
const app = require('./app');

// Connecter la base de données
require('./config/database.config')();


// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Documentation Swagger : http://localhost:${PORT}/docs`);
});