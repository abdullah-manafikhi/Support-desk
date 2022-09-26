const express = require('express')
const router = express.Router()
const {getTickets, getSingleTicket, createTicket, deleteTicket, updateTicket} = require('../controlers/ticketController')
const noteRouter = require('./noteRoutes')
const {protect} = require('../middleware/authMiddleware')

// Re-route into note router
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getSingleTicket).delete(protect, deleteTicket).put(protect, updateTicket)

    
module.exports = router