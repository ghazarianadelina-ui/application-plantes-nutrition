const utilisateurRepository = require('../repositories/UtilisateurRepository');

exports.profil = async (req, res) => {
  const user = await utilisateurRepository.findById(req.session.user.id_utilisateur);

  if (!user) {
    return res.redirect('/connexion');
  }

  res.render('utilisateur/profil', {
    title: 'Mon profil',
    utilisateur: user
  });
};

exports.abonnements = (req, res) => {
  res.render('utilisateur/mes_abonnements', {
    title: 'Mes abonnements'
  });
};

exports.inscriptions = (req, res) => {
  res.render('utilisateur/mes_inscriptions', {
    title: 'Mes inscriptions'
  });
};

exports.paiements = (req, res) => {
  res.render('utilisateur/mes_paiements', {
    title: 'Mes paiements'
  });
};