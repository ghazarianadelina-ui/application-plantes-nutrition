const donRepository = require('../repositories/DonRepository');

class DonService {
  async creerDon(id_utilisateur, montant, type_don) {
    const montantNumber = parseFloat(montant);

    if (isNaN(montantNumber) || montantNumber <= 0) {
      throw new Error('Le montant du don est invalide.');
    }

    if (!['ponctuel', 'recurrent'].includes(type_don)) {
      throw new Error('Le type de don est invalide.');
    }

    return donRepository.create({
      montant: montantNumber,
      date_don: new Date(),
      type_don,
      id_utilisateur
    });
  }
}

module.exports = new DonService();