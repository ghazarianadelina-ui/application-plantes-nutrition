const prisma = require('../../prisma-client');

class UtilisateurRepository {
  async findByEmail(email) {
    return prisma.utilisateur.findUnique({
      where: { email }
    });
  }

  async findById(id_utilisateur) {
    return prisma.utilisateur.findUnique({
      where: { id_utilisateur }
    });
  }

  async create(data) {
    return prisma.utilisateur.create({
      data
    });
  }

  async findAll() {
    return prisma.utilisateur.findMany({
      orderBy: {
        date_inscription: 'desc'
      }
    });
  }
}

module.exports = new UtilisateurRepository();