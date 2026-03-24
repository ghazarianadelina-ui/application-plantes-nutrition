const prisma = require('../../prisma-client');

class InscriptionAtelierRepository {
  async findByUtilisateurAndAtelier(id_utilisateur, id_atelier) {
    return prisma.inscriptionAtelier.findFirst({
      where: {
        id_utilisateur,
        id_atelier
      }
    });
  }

  async countConfirmedByAtelier(id_atelier) {
    return prisma.inscriptionAtelier.count({
      where: {
        id_atelier,
        statut: 'confirmée'
      }
    });
  }

  async create(data) {
    return prisma.inscriptionAtelier.create({
      data
    });
  }

  async updateStatut(id_inscription, statut) {
    return prisma.inscriptionAtelier.update({
      where: {
        id_inscription
      },
      data: {
        statut
      }
    });
  }

  async findById(id_inscription) {
    return prisma.inscriptionAtelier.findUnique({
      where: {
        id_inscription
      },
      include: {
        atelier: true,
        utilisateur: true
      }
    });
  }
}

 

module.exports = new InscriptionAtelierRepository();