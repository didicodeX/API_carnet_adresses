const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifier si l'email existe deja
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email deja utilise." });

    // Créer l'utilisateur
    const user = await User.create({ name, email, password });

    // Créer le token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Utilisateur cree avec succes.", token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    // Verifier si l'utilisateur existe
    const user = await User.findOne({email});
    if(!user)
      return res.status(404).json({ message: "Utilisateur introuvable." });

    // Verifier si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    // Créer le token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Utilisateur connecte avec succes.", token });

  }catch(err){
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
}

module.exports = { createUser, loginUser };
