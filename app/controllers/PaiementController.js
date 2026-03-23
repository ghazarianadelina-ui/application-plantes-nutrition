const inscriptionAtelierRepository = require('../repositories/InscriptionAtelierRepository');
const paiementService = require('../services/PaiementService');
const donRepository = require('../repositories/DonRepository');
const paiementRepository = require('../repositories/PaiementRepository');
const prisma = require('../../prisma-client');

exports.atelierForm = async (req, res) => {
  try {
    const id_inscription = parseInt(req.params.id, 10);

    if (isNaN(id_inscription)) {
      return res.status(400).send('Identifiant invalide');
    }

    const inscription = await inscriptionAtelierRepository.findById(id_inscription);

    if (!inscription) {
      return res.status(404).send('Inscription introuvable');
    }

    if (inscription.id_utilisateur !== req.session.user.id_utilisateur) {
      return res.status(403).send('Accès refusé.');
    }

    res.render('paiements/atelier', {
      title: 'Paiement atelier',
      inscription,
      errors: []
    });
  } catch (error) {
    console.error('Erreur lors du chargement du paiement atelier :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.atelierStore = async (req, res) => {
  try {
    const id_inscription = parseInt(req.params.id, 10);

    if (isNaN(id_inscription)) {
      return res.status(400).send('Identifiant invalide');
    }

    const inscription = await inscriptionAtelierRepository.findById(id_inscription);

    if (!inscription) {
      return res.status(404).send('Inscription introuvable');
    }

    if (inscription.id_utilisateur !== req.session.user.id_utilisateur) {
      return res.status(403).send('Accès refusé.');
    }

    const paiement = await paiementService.payerInscription(id_inscription);

    res.render('paiements/confirmation', {
      title: 'Paiement confirmé',
      paiement,
      inscription
    });
  } catch (error) {
    console.error('Erreur lors du paiement atelier :', error);

    const inscription = await inscriptionAtelierRepository.findById(
      parseInt(req.params.id, 10)
    );

    return res.status(400).render('paiements/atelier', {
      title: 'Paiement atelier',
      inscription,
      errors: [error.message]
    });
  }
};

const abonnementRepository = require('../repositories/AbonnementRepository');

exports.abonnementForm = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const abonnement = await abonnementRepository.findById(id);

  res.render('paiements/abonnement', {
    title: 'Paiement abonnement',
    abonnement
  });
};

exports.abonnementStore = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const abonnement = await abonnementRepository.findById(id);

  const paiement = await require('../services/PaiementService').generateReference;

  const paiementService = require('../services/PaiementService');

  const paiementCreated = await paiementService.payerInscription; // on va adapter juste après

  // VERSION SIMPLE :
  const prisma = require('../../prisma-client');

  const newPaiement = await prisma.paiement.create({
    data: {
      reference_paiement: `ABO-${Date.now()}`,
      montant: abonnement.prix,
      date_paiement: new Date(),
      statut: 'payé',
      id_abonnement: id
    }
  });

  await abonnementRepository.updateStatut(id, 'actif');

  res.render('paiements/confirmation', {
    title: 'Paiement confirmé',
    paiement: newPaiement,
    inscription: null
  });
};

exports.donForm = async (req, res) => {
  try {
    const id_don = parseInt(req.params.id, 10);

    if (isNaN(id_don)) {
      return res.status(400).send('Identifiant invalide');
    }

    const don = await donRepository.findById(id_don);

    if (!don) {
      return res.status(404).send('Don introuvable');
    }

    if (don.id_utilisateur !== req.session.user.id_utilisateur) {
      return res.status(403).send('Accès refusé.');
    }

    res.render('paiements/don', {
      title: 'Paiement du don',
      don,
      errors: []
    });
  } catch (error) {
    console.error('Erreur lors du chargement du paiement du don :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.donStore = async (req, res) => {
  try {
    const id_don = parseInt(req.params.id, 10);

    if (isNaN(id_don)) {
      return res.status(400).send('Identifiant invalide');
    }

    const don = await donRepository.findById(id_don);

    if (!don) {
      return res.status(404).send('Don introuvable');
    }

    if (don.id_utilisateur !== req.session.user.id_utilisateur) {
      return res.status(403).send('Accès refusé.');
    }

    const paiementExistant = await paiementRepository.findByDon(id_don);

    if (paiementExistant) {
      throw new Error('Un paiement existe déjà pour ce don.');
    }

    const paiement = await prisma.paiement.create({
      data: {
        reference_paiement: `DON-${Date.now()}`,
        montant: don.montant,
        date_paiement: new Date(),
        statut: 'payé',
        id_don
      }
    });

    res.render('paiements/confirmation', {
      title: 'Paiement confirmé',
      paiement,
      inscription: null,
      don
    });
  } catch (error) {
    console.error('Erreur lors du paiement du don :', error);

    const don = await donRepository.findById(parseInt(req.params.id, 10));

    res.status(400).render('paiements/don', {
      title: 'Paiement du don',
      don,
      errors: [error.message]
    });
  }
};