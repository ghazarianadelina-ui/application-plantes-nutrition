const paiementRepository = require('../repositories/PaiementRepository');
const inscriptionAtelierRepository = require('../repositories/InscriptionAtelierRepository');

class PaiementService {
  generateReference(prefix = 'PAY') {
    const random = Math.floor(Math.random() * 1000000);
    return `${prefix}-${Date.now()}-${random}`;
  }

  async payerInscription(id_inscription) {
    const inscription = await inscriptionAtelierRepository.findById(id_inscription);

    if (!inscription) {
      throw new Error('Inscription introuvable.');
    }

    if (inscription.statut === 'confirmée') {
      throw new Error('Cette inscription est déjà confirmée.');
    }

    const paiementExistant = await paiementRepository.findByInscription(id_inscription);

    if (paiementExistant) {
      throw new Error('Un paiement existe déjà pour cette inscription.');
    }

    const paiement = await paiementRepository.create({
      reference_paiement: this.generateReference('ATELIER'),
      montant: inscription.atelier.prix,
      date_paiement: new Date(),
      statut: 'payé',
      id_inscription: id_inscription
    });

    await inscriptionAtelierRepository.updateStatut(id_inscription, 'confirmée');

    return paiement;
  }
}

module.exports = new PaiementService();