const prisma = require('../../prisma-client');

class ContenuRepository {
  async findAll() {
    return prisma.contenu.findMany({
      orderBy: {
        date_publication: 'desc'
      }
    });
  }

  async findById(id_contenu) {
    return prisma.contenu.findUnique({
      where: {
        id_contenu
      }
    });
  }

  async findPremiumById(id_contenu) {
    return prisma.contenu.findFirst({
      where: {
        id_contenu,
        premium: true
      }
    });
  }

  async create(data) {
    return prisma.contenu.create({
      data
    });
  }

  async update(id_contenu, data) {
    return prisma.contenu.update({
      where: { id_contenu },
      data
    });
  }

  async delete(id_contenu) {
    return prisma.contenu.delete({
      where: { id_contenu }
    });
  }
}

module.exports = new ContenuRepository();