Créer une API REST avec MongoDB et Express nécessite une structure de projet bien organisée pour la maintenabilité et la lisibilité. Voici une structure de répertoire simple mais efficace pour un projet :

---

### **Structure de répertoire**

```
project/
├── src/
│   ├── config/
│   │   └── database.js      # Configuration de la base de données MongoDB
│   ├── controllers/
│   │   ├── userController.js  # Logique métier des utilisateurs
│   ├── models/
│   │   ├── userModel.js       # Modèle MongoDB pour les utilisateurs
│   ├── routes/
│   │   ├── userRoutes.js      # Routes pour les utilisateurs
│   ├── middlewares/
│   │   └── logger.js          # Exemple de middleware personnalisé
│   ├── app.js                 # Configuration de l'application Express
│   └── index.js               # Point d'entrée principal
├── package.json               # Dépendances et scripts
├── .env                       # Variables d'environnement (MongoDB URI, etc.)
└── README.md                  # Documentation
```

---

### **Étape 1 : Configuration de la base de données**
**Fichier : `src/config/database.js`**

```javascript
const mongoose = require('mongoose');

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Arrête le serveur en cas d'erreur
  }
};

module.exports = connectDB;
```

---

### **Étape 2 : Modèle Mongoose**
**Fichier : `src/models/userModel.js`**

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Ajoute automatiquement createdAt et updatedAt

module.exports = mongoose.model('User', userSchema);
```

---

### **Étape 3 : Logique métier**
**Fichier : `src/controllers/userController.js`**

```javascript
const User = require('../models/userModel');

// Obtenir tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    // ou utiliser await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
};
```

---

### **Étape 4 : Définir les routes**
**Fichier : `src/routes/userRoutes.js`**

```javascript
const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// Routes CRUD pour les utilisateurs
router.get('/', getUsers);     // Obtenir tous les utilisateurs
router.post('/', createUser);  // Ajouter un nouvel utilisateur

module.exports = router;
```

---

### **Étape 5 : Configuration Express**
**Fichier : `src/app.js`**

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json()); // Analyse les requêtes JSON

// Routes principales
app.use('/api/users', userRoutes);

// Middleware de base pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
```

---

### **Étape 6 : Point d’entrée**
**Fichier : `src/index.js`**

```javascript
const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

// Connecter la base de données
connectDB();

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### **Étape 7 : Variables d'environnement**
**Fichier : `.env`**

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase
```

---

### **Étape 8 : Installation des dépendances**
**Commandes :**

```bash
npm init -y
npm install express mongoose dotenv body-parser
```

---

### **Étape 9 : Lancer l’API**
1. Assure-toi que **MongoDB** est configuré (MongoDB Atlas ou localement).
2. Démarre le serveur avec :

```bash
node src/index.js
```

3. Teste les endpoints avec Postman ou Swagger (`/api/users`).

---

### **Endpoint CRUD généré :**

| **Méthode** | **Route**         | **Description**            |
|-------------|-------------------|----------------------------|
| GET         | `/api/users`      | Obtenir tous les utilisateurs |
| POST        | `/api/users`      | Ajouter un nouvel utilisateur |

---

Avec cette structure, ton projet reste propre, maintenable et extensible ! 🚀