const { Router } = require('express');

const router = Router();

const ContactController = require('./app/controllers/ContactController');

router.get('/contacts', ContactController.index);

router.get('/contact/:id', ContactController.show);

router.delete('/contact/:id', ContactController.delete);

router.post('/contacts', ContactController.store);

module.exports = router;
