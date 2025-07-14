const router = require("express").Router();
const contactRoutes = require("./contact.routes");
const userRoutes = require("./user.routes");
const authenticateUser = require("../middlewares/auth.middleware");

// Protéger les routes de contact avec le middleware auth
router.use("/contacts", authenticateUser, contactRoutes);

// Routes utilisateur (certaines peuvent être publiques)
router.use("/users", userRoutes);

router.get("/", async (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Carnet d'adresses</title>
</head>

<body>
  <h1>Bienvenue sur l'api carnet d'adresse</h1>
  <p>Pour tester aller sur
    <a href="http://localhost:4000/docs/">http://localhost:4000/docs/</a>
  </p>
  <p>vous pouvez aussi utiliser Postman ou curl.</p>
</body>

</html>`);
});
module.exports = router;
