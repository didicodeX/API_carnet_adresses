const Contact = require("../models/contact.model");

const createContact = async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, error: "Name and phone are required" });
  }
  try {
    const contact = await Contact.create({ ...req.body, userId: req.user.userId });
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.userId });
    if (contacts.length === 0) {
      return res.status(200).json({ success: true, message: "Aucun contact trouvé." });
    }
    res.status(200).json({ success: true, message: "Contacts récupérés avec succès.", data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des contacts", error });
  }
};

const getContactById = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!contact) {
    return res.status(404).json({ success: false, message: "Contact non trouvé", error: "Contact not found" });
  }
  res.status(200).json({ success: true, message: "Contact récupéré avec succès.", data: contact });
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
