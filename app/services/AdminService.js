const contenuRepository = require('../repositories/ContenuRepository');
const atelierRepository = require('../repositories/AtelierRepository');
const utilisateurRepository = require('../repositories/UtilisateurRepository');
const paiementRepository = require('../repositories/PaiementRepository');

class AdminService {
  async getDashboardData() {
    const contenus = await contenuRepository.findAll();
    const ateliers = await atelierRepository.findAll();
    const utilisateurs = await utilisateurRepository.findAll();
    const paiements = await paiementRepository.findAll();

    return {
      totalContenus: contenus.length,
      totalAteliers: ateliers.length,
      totalUtilisateurs: utilisateurs.length,
      totalPaiements: paiements.length
    };
  }

  async getAllContenus() {
    return contenuRepository.findAll();
  }

  async getContenuById(id_contenu) {
    return contenuRepository.findById(id_contenu);
  }

  async createContenu(data) {
    return contenuRepository.create(data);
  }

  async updateContenu(id_contenu, data) {
    return contenuRepository.update(id_contenu, data);
  }

  async deleteContenu(id_contenu) {
    return contenuRepository.delete(id_contenu);
  }

  async getAllAteliers() {
    return atelierRepository.findAll();
  }

  async getAtelierById(id_atelier) {
    return atelierRepository.findById(id_atelier);
  }

  async createAtelier(data) {
    return atelierRepository.create(data);
  }

  async updateAtelier(id_atelier, data) {
    return atelierRepository.update(id_atelier, data);
  }

  async deleteAtelier(id_atelier) {
    return atelierRepository.delete(id_atelier);
  }

  async getAllUtilisateurs() {
    return utilisateurRepository.findAll();
  }

  async getAllPaiements() {
    return paiementRepository.findAll();
  }
}

module.exports = new AdminService();