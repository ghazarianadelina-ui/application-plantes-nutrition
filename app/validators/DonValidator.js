class DonValidator {
  validate(data) {
    const errors = [];

    const montant = parseFloat(data.montant);

    if (isNaN(montant) || montant <= 0) {
      errors.push('Le montant doit être supérieur à 0.');
    }

    if (!data.type_don || !['ponctuel', 'recurrent'].includes(data.type_don)) {
      errors.push('Le type de don est invalide.');
    }

    return errors;
  }
}

module.exports = new DonValidator();