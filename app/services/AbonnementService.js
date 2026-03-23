const abonnementRepository = require('../repositories/AbonnementRepository');

class AbonnementService {
  async creerAbonnement(id_utilisateur, type_formule) {
    const maintenant = new Date();

    let prix = 0;
    let duree = 0;

    if (type_formule === 'mensuel') {
      prix = 9.99;
      duree = 30;
    } else if (type_formule === 'annuel') {
      prix = 99.99;
      duree = 365;
    } else {
      throw new Error('Formule invalide.');
    }

    const date_fin = new Date(maintenant);
    date_fin.setDate(date_fin.getDate() + duree);

    return abonnementRepository.create({
      type_formule,
      prix,
      date_debut: maintenant,
      date_fin,
      statut: 'en_attente',
      id_utilisateur
    });
  }
}

module.exports = new AbonnementService();