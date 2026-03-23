const prisma = require('../../prisma-client');

class AtelierRepository {
  async findAll() {
    return prisma.atelier.findMany({
      orderBy: {
        date_atelier: 'asc'
      }
    });
  }

  async findById(id_atelier) {
    return prisma.atelier.findUnique({
      where: {
        id_atelier
      }
    });
  }

  async create(data) {
    return prisma.atelier.create({
      data
    });
  }

  async update(id_atelier, data) {
    return prisma.atelier.update({
      where: { id_atelier },
      data
    });
  }

  async delete(id_atelier) {
    return prisma.atelier.delete({
      where: { id_atelier }
    });
  }
}

module.exports = new AtelierRepository();