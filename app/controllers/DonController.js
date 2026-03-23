const donService = require('../services/DonService');
const donValidator = require('../validators/DonValidator');

exports.create = (req, res) => {
  res.render('dons/formulaire', {
    title: 'Faire un don',
    errors: [],
    old: {}
  });
};

exports.store = async (req, res) => {
  try {
    const { montant, type_don } = req.body;

    const errors = donValidator.validate({ montant, type_don });

    if (errors.length > 0) {
      return res.status(422).render('dons/formulaire', {
        title: 'Faire un don',
        errors,
        old: { montant, type_don }
      });
    }

    const don = await donService.creerDon(
      req.session.user.id_utilisateur,
      montant,
      type_don
    );

    return res.redirect(`/paiement/don/${don.id_don}`);
  } catch (error) {
    console.error('Erreur lors de la création du don :', error);

    res.status(400).render('dons/formulaire', {
      title: 'Faire un don',
      errors: [error.message],
      old: req.body
    });
  }
};