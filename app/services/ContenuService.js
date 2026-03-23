const contenuRepository = require('../repositories/ContenuRepository');

class ContenuService {
  async getAllContenus() {
    return contenuRepository.findAll();
  }

  async getContenuById(id_contenu) {
    return contenuRepository.findById(id_contenu);
  }

  async getPremiumContenuById(id_contenu) {
    return contenuRepository.findPremiumById(id_contenu);
  }
}

module.exports = new ContenuService();