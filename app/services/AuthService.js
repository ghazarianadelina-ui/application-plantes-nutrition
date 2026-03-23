const bcrypt = require('bcrypt');
const utilisateurRepository = require('../repositories/UtilisateurRepository');

class AuthService {
  async register({ nom, prenom, email, mot_de_passe }) {
    const existingUser = await utilisateurRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('Un compte existe déjà avec cet email.');
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const newUser = await utilisateurRepository.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      role: 'utilisateur',
      statut: 'actif',
      date_inscription: new Date()
    });

    return newUser;
  }

  async login({ email, mot_de_passe }) {
    const user = await utilisateurRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    const passwordMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!passwordMatch) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    if (user.statut !== 'actif') {
      throw new Error('Votre compte n’est pas actif.');
    }

    return user;
  }
}

module.exports = new AuthService();