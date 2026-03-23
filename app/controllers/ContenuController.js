const contenuService = require('../services/ContenuService');

exports.index = async (req, res) => {
  try {
    const contenus = await contenuService.getAllContenus();

    res.render('contenus/liste', {
      title: 'Contenus',
      contenus
    });
  } catch (error) {
    console.error('Erreur lors du chargement des contenus :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.show = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).send('Identifiant invalide');
    }

    const contenu = await contenuService.getContenuById(id);

    if (!contenu) {
      return res.status(404).send('Contenu introuvable');
    }

    if (contenu.premium) {
      return res.redirect(`/contenus/premium/${contenu.id_contenu}`);
    }

    res.render('contenus/detail', {
      title: contenu.titre,
      contenu
    });
  } catch (error) {
    console.error('Erreur lors de l’affichage du contenu :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.premiumShow = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).send('Identifiant invalide');
    }

    const contenu = await contenuService.getPremiumContenuById(id);

    if (!contenu) {
      return res.status(404).send('Contenu premium introuvable');
    }

    res.render('contenus/detail', {
      title: contenu.titre,
      contenu
    });
  } catch (error) {
    console.error('Erreur lors de l’affichage du contenu premium :', error);
    res.status(500).send('Erreur serveur');
  }
};