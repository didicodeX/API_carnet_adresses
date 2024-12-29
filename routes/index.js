const router = require("express").Router();
const contactRoutes = require("./contact.routes");
const userRoutes = require("./user.routes");

router.use("/contacts", contactRoutes);
router.use("/users", userRoutes);

module.exports = router;
