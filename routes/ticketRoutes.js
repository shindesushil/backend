const express = require('express')

const {
    createTicket, getTickets
} = require('../controllers/ticketController')

const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router.post('/', createTicket)
router.get('/:id', getTickets)

module.exports = router