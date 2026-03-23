const atelierService = require('../services/AtelierService');
const atelierValidator = require('../validators/AtelierValidator');

exports.index = async (req, res) => {
  try {
    const ateliers = await atelierService.getAllAteliers();

    res.render('ateliers/liste', {
      title: 'Ateliers',
      ateliers
    });
  } catch (error) {
    console.error('Erreur lors du chargement des ateliers :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.show = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).send('Identifiant invalide');
    }

    const atelier = await atelierService.getAtelierById(id);

    if (!atelier) {
      return res.status(404).send('Atelier introuvable');
    }

    res.render('ateliers/detail', {
      title: atelier.titre,
      atelier
    });
  } catch (error) {
    console.error('Erreur lors de l’affichage de l’atelier :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.inscriptionForm = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).send('Identifiant invalide');
    }

    const atelier = await atelierService.getAtelierById(id);

    if (!atelier) {
      return res.status(404).send('Atelier introuvable');
    }

    res.render('ateliers/inscription', {
      title: 'Inscription à un atelier',
      atelier,
      errors: []
    });
  } catch (error) {
    console.error('Erreur lors du chargement du formulaire :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.inscriptionStore = async (req, res) => {
  try {
    const id_atelier = parseInt(req.params.id, 10);

    const errors = atelierValidator.validateInscription({ id_atelier });

    const atelier = await atelierService.getAtelierById(id_atelier);

    if (!atelier) {
      return res.status(404).send('Atelier introuvable');
    }

    if (errors.length > 0) {
      return res.status(422).render('ateliers/inscription', {
        title: 'Inscription à un atelier',
        atelier,
        errors
      });
    }

    const inscription = await atelierService.inscrireUtilisateur(
      req.session.user.id_utilisateur,
      id_atelier
    );

    return res.redirect(`/paiement/atelier/${inscription.id_inscription}`);
  } catch (error) {
    console.error('Erreur lors de l’inscription à l’atelier :', error);

    const atelier = await atelierService.getAtelierById(parseInt(req.params.id, 10));

    return res.status(400).render('ateliers/inscription', {
      title: 'Inscription à un atelier',
      atelier,
      errors: [error.message]
    });
  }
};