const prisma = require('../../prisma-client');

class DonRepository {
  async create(data) {
    return prisma.don.create({
      data
    });
  }

  async findById(id_don) {
    return prisma.don.findUnique({
      where: {
        id_don
      }
    });
  }

  async findAllByUtilisateur(id_utilisateur) {
    return prisma.don.findMany({
      where: {
        id_utilisateur
      },
      orderBy: {
        date_don: 'desc'
      }
    });
  }
}

module.exports = new DonRepository();