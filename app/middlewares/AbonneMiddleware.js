const prisma = require('../../prisma-client');

exports.requireAbonne = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/connexion');
  }

  const now = new Date();

  const abonnementActif = await prisma.abonnement.findFirst({
    where: {
      id_utilisateur: req.session.user.id_utilisateur,
      statut: 'actif',
      date_debut: { lte: now },
      OR: [
        { date_fin: null },
        { date_fin: { gte: now } }
      ]
    }
  });

  if (!abonnementActif) {
    return res.status(403).render('contenus/premium.twig', {
      title: 'Contenu premium',
      message: 'Ce contenu est réservé aux abonnés.'
    });
  }

  next();
};