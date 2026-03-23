const atelierRepository = require('../repositories/AtelierRepository');
const inscriptionAtelierRepository = require('../repositories/InscriptionAtelierRepository');

class AtelierService {
  async getAllAteliers() {
    return atelierRepository.findAll();
  }

  async getAtelierById(id_atelier) {
    return atelierRepository.findById(id_atelier);
  }

  async inscrireUtilisateur(id_utilisateur, id_atelier) {
    const atelier = await atelierRepository.findById(id_atelier);

    if (!atelier) {
      throw new Error('Atelier introuvable.');
    }

    const inscriptionExistante =
      await inscriptionAtelierRepository.findByUtilisateurAndAtelier(
        id_utilisateur,
        id_atelier
      );

    if (inscriptionExistante) {
      throw new Error('Vous êtes déjà inscrit à cet atelier.');
    }

    const nbInscriptions =
      await inscriptionAtelierRepository.countConfirmedByAtelier(id_atelier);

    if (nbInscriptions >= atelier.nombre_places) {
      throw new Error('Cet atelier est complet.');
    }

    return inscriptionAtelierRepository.create({
      id_utilisateur,
      id_atelier,
      date_inscription: new Date(),
      statut: 'en_attente'
    });
  }
}

module.exports = new AtelierService();