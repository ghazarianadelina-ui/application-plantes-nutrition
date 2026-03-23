const adminService = require('../services/AdminService');

exports.dashboard = async (req, res) => {
  try {
    const stats = await adminService.getDashboardData();

    res.render('admin/dashboard', {
      title: 'Dashboard Admin',
      stats
    });
  } catch (error) {
    console.error('Erreur dashboard admin :', error);
    res.status(500).send('Erreur serveur');
  }
};

/* ===================== CONTENUS ===================== */

exports.contenus = async (req, res) => {
  try {
    const contenus = await adminService.getAllContenus();

    res.render('admin/contenus/index', {
      title: 'Gestion des contenus',
      contenus
    });
  } catch (error) {
    console.error('Erreur liste contenus admin :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.createContenu = (req, res) => {
  res.render('admin/contenus/create', {
    title: 'Ajouter un contenu',
    errors: [],
    old: {}
  });
};

exports.storeContenu = async (req, res) => {
  try {
    const { titre, description, rubrique, premium, path } = req.body;

    await adminService.createContenu({
      titre,
      description,
      rubrique,
      premium: premium === 'on',
      path: path || '',
      date_publication: new Date(),
      id_utilisateur_admin: req.session.user.id_utilisateur
    });

    res.redirect('/admin/contenus');
  } catch (error) {
    console.error('Erreur création contenu admin :', error);
    res.status(400).render('admin/contenus/create', {
      title: 'Ajouter un contenu',
      errors: [error.message],
      old: req.body
    });
  }
};

exports.editContenu = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const contenu = await adminService.getContenuById(id);

    if (!contenu) {
      return res.status(404).send('Contenu introuvable');
    }

    res.render('admin/contenus/edit', {
      title: 'Modifier un contenu',
      contenu,
      errors: []
    });
  } catch (error) {
    console.error('Erreur édition contenu admin :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.updateContenu = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { titre, description, rubrique, premium, path } = req.body;

    await adminService.updateContenu(id, {
      titre,
      description,
      rubrique,
      premium: premium === 'on',
      path: path || ''
    });

    res.redirect('/admin/contenus');
  } catch (error) {
    console.error('Erreur update contenu admin :', error);
    res.status(400).send('Erreur lors de la mise à jour');
  }
};

exports.deleteContenu = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await adminService.deleteContenu(id);
    res.redirect('/admin/contenus');
  } catch (error) {
    console.error('Erreur suppression contenu admin :', error);
    res.status(400).send('Erreur lors de la suppression');
  }
};

/* ===================== ATELIERS ===================== */

exports.ateliers = async (req, res) => {
  try {
    const ateliers = await adminService.getAllAteliers();

    res.render('admin/ateliers/index', {
      title: 'Gestion des ateliers',
      ateliers
    });
  } catch (error) {
    console.error('Erreur liste ateliers admin :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.createAtelier = (req, res) => {
  res.render('admin/ateliers/create', {
    title: 'Ajouter un atelier',
    errors: [],
    old: {}
  });
};

exports.storeAtelier = async (req, res) => {
  try {
    const { titre, description, date_atelier, lieu, nombre_places, prix } = req.body;

    await adminService.createAtelier({
      titre,
      description,
      date_atelier: new Date(date_atelier),
      lieu,
      nombre_places: parseInt(nombre_places, 10),
      prix: parseFloat(prix)
    });

    res.redirect('/admin/ateliers');
  } catch (error) {
    console.error('Erreur création atelier admin :', error);
    res.status(400).render('admin/ateliers/create', {
      title: 'Ajouter un atelier',
      errors: [error.message],
      old: req.body
    });
  }
};

exports.editAtelier = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const atelier = await adminService.getAtelierById(id);

    if (!atelier) {
      return res.status(404).send('Atelier introuvable');
    }

    res.render('admin/ateliers/edit', {
      title: 'Modifier un atelier',
      atelier,
      errors: []
    });
  } catch (error) {
    console.error('Erreur édition atelier admin :', error);
    res.status(500).send('Erreur serveur');
  }
};

exports.updateAtelier = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { titre, description, date_atelier, lieu, nombre_places, prix } = req.body;

    await adminService.updateAtelier(id, {
      titre,
      description,
      date_atelier: new Date(date_atelier),
      lieu,
      nombre_places: parseInt(nombre_places, 10),
      prix: parseFloat(prix)
    });

    res.redirect('/admin/ateliers');
  } catch (error) {
    console.error('Erreur update atelier admin :', error);
    res.status(400).send('Erreur lors de la mise à jour');
  }
};

exports.deleteAtelier = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await adminService.deleteAtelier(id);
    res.redirect('/admin/ateliers');
  } catch (error) {
    console.error('Erreur suppression atelier admin :', error);
    res.status(400).send('Erreur lors de la suppression');
  }
};

/* ===================== UTILISATEURS ===================== */

exports.utilisateurs = async (req, res) => {
  try {
    const utilisateurs = await adminService.getAllUtilisateurs();

    res.render('admin/utilisateurs/index', {
      title: 'Gestion des utilisateurs',
      utilisateurs
    });
  } catch (error) {
    console.error('Erreur liste utilisateurs admin :', error);
    res.status(500).send('Erreur serveur');
  }
};

/* ===================== PAIEMENTS ===================== */

exports.paiements = async (req, res) => {
  try {
    const paiements = await adminService.getAllPaiements();

    res.render('admin/paiements/index', {
      title: 'Gestion des paiements',
      paiements
    });
  } catch (error) {
    console.error('Erreur liste paiements admin :', error);
    res.status(500).send('Erreur serveur');
  }
};