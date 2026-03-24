const paiementRepository = require('../repositories/PaiementRepository');
const inscriptionAtelierRepository = require('../repositories/InscriptionAtelierRepository');
const abonnementRepository = require('../repositories/AbonnementRepository');
const donRepository = require('../repositories/DonRepository');

class PaiementService {
  generateReference(prefix = 'PAY') {
    const random = Math.floor(Math.random() * 1000000);
    return `${prefix}-${Date.now()}-${random}`;
  }

  async payerInscription(id_inscription, id_utilisateur) {
    const inscription = await inscriptionAtelierRepository.findById(id_inscription);

    if (!inscription) {
      throw new Error('Inscription introuvable.');
    }

    if (inscription.id_utilisateur !== id_utilisateur) {
      throw new Error('Accès refusé.');
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
      id_inscription
    });

    await inscriptionAtelierRepository.updateStatut(id_inscription, 'confirmée');

    return { paiement, inscription };
  }

  async payerAbonnement(id_abonnement, id_utilisateur) {
    const abonnement = await abonnementRepository.findById(id_abonnement);

    if (!abonnement) {
      throw new Error('Abonnement introuvable.');
    }

    if (abonnement.id_utilisateur !== id_utilisateur) {
      throw new Error('Accès refusé.');
    }

    const paiementExistant = await paiementRepository.findByAbonnement(id_abonnement);

    if (paiementExistant) {
      throw new Error('Un paiement existe déjà pour cet abonnement.');
    }

    const paiement = await paiementRepository.create({
      reference_paiement: this.generateReference('ABO'),
      montant: abonnement.prix,
      date_paiement: new Date(),
      statut: 'payé',
      id_abonnement
    });

    await abonnementRepository.updateStatut(id_abonnement, 'actif');

    return { paiement, abonnement };
  }

  async payerDon(id_don, id_utilisateur) {
    const don = await donRepository.findById(id_don);

    if (!don) {
      throw new Error('Don introuvable.');
    }

    if (don.id_utilisateur !== id_utilisateur) {
      throw new Error('Accès refusé.');
    }

    const paiementExistant = await paiementRepository.findByDon(id_don);

    if (paiementExistant) {
      throw new Error('Un paiement existe déjà pour ce don.');
    }

    const paiement = await paiementRepository.create({
      reference_paiement: this.generateReference('DON'),
      montant: don.montant,
      date_paiement: new Date(),
      statut: 'payé',
      id_don
    });

    return { paiement, don };
  }
}

module.exports = new PaiementService();