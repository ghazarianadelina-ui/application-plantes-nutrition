const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');
const contenuController = require('../app/controllers/ContenuController');
const atelierController = require('../app/controllers/AtelierController');
const authController = require('../app/controllers/AuthController');
const utilisateurController = require('../app/controllers/UtilisateurController');
const { requireAuth } = require('../app/middlewares/AuthMiddleware');
const { requireAbonne } = require('../app/middlewares/AbonneMiddleware');
const paiementController = require('../app/controllers/PaiementController');
const abonnementController = require('../app/controllers/AbonnementController');
const donController = require('../app/controllers/DonController');

router.get('/', homeController.index);

router.get('/contenus', contenuController.index);
router.get('/contenus/:id', contenuController.show);

router.get('/ateliers', atelierController.index);
router.get('/ateliers/:id', atelierController.show);
router.get('/contenus/premium/:id', requireAbonne, contenuController.premiumShow);
router.post('/ateliers/:id/inscription', requireAuth, atelierController.inscriptionStore);

router.get('/connexion', authController.login);
router.post('/connexion', authController.authenticate);

router.get('/inscription', authController.register);
router.post('/inscription', authController.store);

router.get('/deconnexion', authController.logout);

router.get('/profil', requireAuth, utilisateurController.profil);
router.get('/mes-abonnements', requireAuth, utilisateurController.abonnements);
router.get('/mes-inscriptions', requireAuth, utilisateurController.inscriptions);
router.get('/mes-paiements', requireAuth, utilisateurController.paiements);

router.get('/paiement/atelier/:id', requireAuth, paiementController.atelierForm);
router.post('/paiement/atelier/:id', requireAuth, paiementController.atelierStore);

router.get('/abonnement', abonnementController.offres);
router.post('/abonnement', requireAuth, abonnementController.subscribe);
router.get('/paiement/abonnement/:id', requireAuth, paiementController.abonnementForm);
router.post('/paiement/abonnement/:id', requireAuth, paiementController.abonnementStore);

router.get('/don', requireAuth, donController.create);
router.post('/don', requireAuth, donController.store);
router.get('/paiement/don/:id', requireAuth, paiementController.donForm);
router.post('/paiement/don/:id', requireAuth, paiementController.donStore);

module.exports = router;