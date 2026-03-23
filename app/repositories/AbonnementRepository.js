const prisma = require('../../prisma-client');

class AbonnementRepository {
  async create(data) {
    return prisma.abonnement.create({
      data
    });
  }

  async findActifByUtilisateur(id_utilisateur) {
    return prisma.abonnement.findFirst({
      where: {
        id_utilisateur,
        statut: 'actif'
      },
      orderBy: {
        date_debut: 'desc'
      }
    });
  }

  async findById(id_abonnement) {
    return prisma.abonnement.findUnique({
      where: {
        id_abonnement
      }
    });
  }

  async updateStatut(id_abonnement, statut) {
    return prisma.abonnement.update({
      where: {
        id_abonnement
      },
      data: {
        statut
      }
    });
  }
}

module.exports = new AbonnementRepository();