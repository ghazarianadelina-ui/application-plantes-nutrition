const inscriptionAtelierRepository = require('../repositories/InscriptionAtelierRepository');
const abonnementRepository = require('../repositories/AbonnementRepository');
const donRepository = require('../repositories/DonRepository');
const paiementService = require('../services/PaiementService');

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

    return res.render('paiements/atelier', {
      title: 'Paiement atelier',
      inscription,
      errors: []
    });
  } catch (error) {
    console.error('Erreur lors du chargement du paiement atelier :', error);
    return res.status(500).send('Erreur serveur');
  }
};

exports.atelierStore = async (req, res) => {
  try {
    const id_inscription = parseInt(req.params.id, 10);

    if (isNaN(id_inscription)) {
      return res.status(400).send('Identifiant invalide');
    }

    const { paiement, inscription } = await paiementService.payerInscription(
      id_inscription,
      req.session.user.id_utilisateur
    );

    return res.render('paiements/confirmation', {
      title: 'Paiement confirmé',
      paiement,
      inscription,
      abonnement: null,
      don: null
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

exports.abonnementForm = async (req, res) => {
  try {
    const id_abonnement = parseInt(req.params.id, 10);

    if (isNaN(id_abonnement)) {
      return res.status(400).send('Identifiant invalide');
    }

    const abonnement = await abonnementRepository.findById(id_abonnement);

    if (!abonnement) {
      return res.status(404).send('Abonnement introuvable');
    }

    if (abonnement.id_utilisateur !== req.session.user.id_utilisateur) {
      return res.status(403).send('Accès refusé.');
    }

    return res.render('paiements/abonnement', {
      title: 'Paiement abonnement',
      abonnement,
      errors: []
    });
  } catch (error) {
    console.error('Erreur chargement paiement abonnement :', error);
    return res.status(500).send('Erreur serveur');
  }
};

exports.abonnementStore = async (req, res) => {
  try {
    const id_abonnement = parseInt(req.params.id, 10);

    if (isNaN(id_abonnement)) {
      return res.status(400).send('Identifiant invalide');
    }

    const { paiement, abonnement } = await paiementService.payerAbonnement(
      id_abonnement,
      req.session.user.id_utilisateur
    );

    return res.render('paiements/confirmation', {
      title: 'Paiement confirmé',
      paiement,
      inscription: null,
      abonnement,
      don: null
    });
  } catch (error) {
    console.error('Erreur paiement abonnement :', error);

    const abonnement = await abonnementRepository.findById(
      parseInt(req.params.id, 10)
    );

    return res.status(400).render('paiements/abonnement', {
      title: 'Paiement abonnement',
      abonnement,
      errors: [error.message]
    });
  }
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

    return res.render('paiements/don', {
      title: 'Paiement du don',
      don,
      errors: []
    });
  } catch (error) {
    console.error('Erreur lors du chargement du paiement du don :', error);
    return res.status(500).send('Erreur serveur');
  }
};

exports.donStore = async (req, res) => {
  try {
    const id_don = parseInt(req.params.id, 10);

    if (isNaN(id_don)) {
      return res.status(400).send('Identifiant invalide');
    }

    const { paiement, don } = await paiementService.payerDon(
      id_don,
      req.session.user.id_utilisateur
    );

    return res.render('paiements/confirmation', {
      title: 'Paiement confirmé',
      paiement,
      inscription: null,
      abonnement: null,
      don
    });
  } catch (error) {
    console.error('Erreur lors du paiement du don :', error);

    const don = await donRepository.findById(parseInt(req.params.id, 10));

    return res.status(400).render('paiements/don', {
      title: 'Paiement du don',
      don,
      errors: [error.message]
    });
  }
};