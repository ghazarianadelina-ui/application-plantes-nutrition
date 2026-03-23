exports.requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/connexion');
  }

  if (req.session.user.role !== 'admin') {
    return res.status(403).send('Accès refusé.');
  }

  next();
};