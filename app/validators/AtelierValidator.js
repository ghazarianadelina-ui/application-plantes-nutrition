class AtelierValidator {
  validateInscription(data) {
    const errors = [];

    if (!data.id_atelier || isNaN(parseInt(data.id_atelier, 10))) {
      errors.push('Atelier invalide.');
    }

    return errors;
  }
}

module.exports = new AtelierValidator();