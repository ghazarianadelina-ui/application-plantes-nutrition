const prisma = require('../../prisma-client');

class PaiementRepository {
  async create(data) {
    return prisma.paiement.create({
      data
    });
  }

  async findById(id_paiement) {
    return prisma.paiement.findUnique({
      where: {
        id_paiement
      }
    });
  }

  async findByInscription(id_inscription) {
    return prisma.paiement.findFirst({
      where: {
        id_inscription
      }
    });
  }

  async findByDon(id_don) {
    return prisma.paiement.findFirst({
      where: {
        id_don
      }
    });
  }

  async findAll() {
    return prisma.paiement.findMany({
      orderBy: {
        date_paiement: 'desc'
      }
    });
  }
}

module.exports = new PaiementRepository();
