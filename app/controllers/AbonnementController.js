const abonnementService = require('../services/AbonnementService');

exports.offres = (req, res) => {
  res.render('abonnements/offre', {
    title: 'Abonnements'
  });
};

exports.subscribe = async (req, res) => {
  try {
    const { type_formule } = req.body;

    const abonnement = await abonnementService.creerAbonnement(
      req.session.user.id_utilisateur,
      type_formule
    );

    return res.redirect(`/paiement/abonnement/${abonnement.id_abonnement}`);
  } catch (error) {
    console.error('Erreur abonnement :', error);

    res.render('abonnements/offre', {
      title: 'Abonnements',
      errors: [error.message]
    });
  }
};