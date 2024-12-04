const express = require('express');
const { adminUsers } = require('../models');
const router = express.Router();

// Création d'un utilisateur admin
router.post('/adminUsers', async (req, res) => {
  try {
    const adminUser = await adminUsers.create(req.body);
    res.status(201).json(adminUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur admin' });
  }
});

// Mise à jour d'un utilisateur admin
router.put('/adminUsers/:recordId', async (req, res) => {
  try {
    const updatedUser = await adminUsers.update(req.body, {
      where: { id: req.params.recordId },
      returning: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur admin' });
  }
});

// Suppression d'un utilisateur admin
router.delete('/adminUsers/:recordId', async (req, res) => {
  try {
    await adminUsers.destroy({
      where: { id: req.params.recordId },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur admin' });
  }
});

// Obtenir la liste des utilisateurs admin
router.get('/adminUsers', async (req, res) => {
  try {
    const users = await adminUsers.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs admin' });
  }
});

// Obtenir le nombre d’utilisateurs admin
router.get('/adminUsers/count', async (req, res) => {
  try {
    const count = await adminUsers.count();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre d’utilisateurs admin' });
  }
});

// Obtenir un utilisateur admin
router.get('/adminUsers/:recordId', async (req, res) => {
  try {
    const user = await adminUsers.findByPk(req.params.recordId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur admin' });
  }
});

// Exporter la liste des utilisateurs admin
router.get('/adminUsers.csv', async (req, res) => {
  try {
    const users = await adminUsers.findAll();
    // Ajoutez ici votre logique d’export en CSV
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l’exportation des utilisateurs admin' });
  }
});

// Supprimer une liste d’utilisateurs admin
router.delete('/adminUsers', async (req, res) => {
  try {
    await adminUsers.destroy({
      where: {},
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression des utilisateurs admin' });
  }
});

module.exports = router;
