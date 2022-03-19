const { Router } = require('express');

const router = Router();

const ContactController = require('./app/controllers/ContactController');

router.get('/contacts', ContactController.index);

module.exports = router;
