class AuthValidator {
  validateRegister(data) {
    const errors = [];

    if (!data.nom || data.nom.trim().length < 2) {
      errors.push('Le nom est obligatoire.');
    }

    if (!data.prenom || data.prenom.trim().length < 2) {
      errors.push('Le prénom est obligatoire.');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('L’email est invalide.');
    }

    if (!data.mot_de_passe || data.mot_de_passe.length < 6) {
      errors.push('Le mot de passe doit contenir au moins 6 caractères.');
    }

    return errors;
  }

  validateLogin(data) {
    const errors = [];

    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('L’email est invalide.');
    }

    if (!data.mot_de_passe || data.mot_de_passe.length < 6) {
      errors.push('Le mot de passe est invalide.');
    }

    return errors;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

module.exports = new AuthValidator();