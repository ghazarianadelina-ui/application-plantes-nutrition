const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const { requireAdmin } = require('../app/middlewares/AdminMiddleware');

router.get('/', requireAdmin, adminController.dashboard);

/* CONTENUS */
router.get('/contenus', requireAdmin, adminController.contenus);
router.get('/contenus/create', requireAdmin, adminController.createContenu);
router.post('/contenus', requireAdmin, adminController.storeContenu);
router.get('/contenus/:id/edit', requireAdmin, adminController.editContenu);
router.post('/contenus/:id/update', requireAdmin, adminController.updateContenu);
router.post('/contenus/:id/delete', requireAdmin, adminController.deleteContenu);

/* ATELIERS */
router.get('/ateliers', requireAdmin, adminController.ateliers);
router.get('/ateliers/create', requireAdmin, adminController.createAtelier);
router.post('/ateliers', requireAdmin, adminController.storeAtelier);
router.get('/ateliers/:id/edit', requireAdmin, adminController.editAtelier);
router.post('/ateliers/:id/update', requireAdmin, adminController.updateAtelier);
router.post('/ateliers/:id/delete', requireAdmin, adminController.deleteAtelier);

/* UTILISATEURS */
router.get('/utilisateurs', requireAdmin, adminController.utilisateurs);

/* PAIEMENTS */
router.get('/paiements', requireAdmin, adminController.paiements);

module.exports = router;