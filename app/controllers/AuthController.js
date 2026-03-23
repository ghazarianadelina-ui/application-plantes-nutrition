const authService = require('../services/AuthService');
const authValidator = require('../validators/AuthValidator');

exports.login = (req, res) => {
  res.render('auth/login', {
    title: 'Connexion',
    errors: [],
    old: {}
  });
};

exports.authenticate = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const errors = authValidator.validateLogin({ email, mot_de_passe });

    if (errors.length > 0) {
      return res.status(422).render('auth/login', {
        title: 'Connexion',
        errors,
        old: { email }
      });
    }

    const user = await authService.login({ email, mot_de_passe });

    req.session.user = {
      id_utilisateur: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      statut: user.statut
    };

    if (user.role === 'admin') {
      return res.redirect('/admin');
    }

    return res.redirect('/profil');
  } catch (error) {
    return res.status(401).render('auth/login', {
      title: 'Connexion',
      errors: [error.message],
      old: { email: req.body.email }
    });
  }
};

exports.register = (req, res) => {
  res.render('auth/register', {
    title: 'Inscription',
    errors: [],
    old: {}
  });
};

exports.store = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe } = req.body;

    const errors = authValidator.validateRegister({
      nom,
      prenom,
      email,
      mot_de_passe
    });

    if (errors.length > 0) {
      return res.status(422).render('auth/register', {
        title: 'Inscription',
        errors,
        old: { nom, prenom, email }
      });
    }

    const user = await authService.register({
      nom,
      prenom,
      email,
      mot_de_passe
    });

    req.session.user = {
      id_utilisateur: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      statut: user.statut
    };

    return res.redirect('/profil');
  } catch (error) {
    return res.status(400).render('auth/register', {
      title: 'Inscription',
      errors: [error.message],
      old: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email
      }
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/connexion');
  });
};