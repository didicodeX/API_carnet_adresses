const mongoose = require('mongoose');

// Connexion à MongoDB
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Arrête le serveur en cas d'erreur
  }
};
