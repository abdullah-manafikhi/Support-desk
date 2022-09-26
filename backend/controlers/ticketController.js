const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


    //  desc    get user tickets
    //  @route  GET api/tickets
    //  @access private
    const getTickets = asyncHandler( async (req , res) => {

        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const tickets = await Ticket.find({user: req.user.id})
        res.status(200).json(tickets)
    })

    //  desc    get user single ticket
    //  @route  GET api/tickets/:id
    //  @access private
    const getSingleTicket = asyncHandler( async (req , res) => {

        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        //checking if this ticket exists
        if(!ticket){
            res.status(404)
            throw Error('Ticket is not found')
        }
        //Checking wether the user is authorized for getting the ticket or not
        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('Not Authorized')
        }

        res.status(200).json(ticket)
    })

    //  desc    create new tickets
    //  @route  POST api/tickets
    //  @access private
    const createTicket = asyncHandler( async (req , res) => {
        //Getting the product and the description from the requenst body
        const {product, description} = req.body

        //if there is something missed throw an error
        if(!product || !description){
            res.status(400)
            throw new Error('Please enter the product and a description')
        }

         //Get user using the id in the JWT
         const user = await User.findById(req.user.id)

         if(!user){
             res.status(401)
             throw new Error('User not found')
         }

         const ticket = await Ticket.create({
             product,
             description,
             user: req.user.id,
             status: 'new'
         })

        res.status(201).json(ticket)
    })

    //  desc    Delete a ticket
    //  @route  DELETE api/tickets/:id
    //  @access private
    const deleteTicket = asyncHandler( async (req , res) => {

        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        //checking if this ticket exists
        if(!ticket){
            res.status(404)
            throw Error('Ticket is not found')
        }
        //Checking wether the user is authorized for deleting the ticket or not
        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('Not Authorized')
        }

        await ticket.remove()

        res.status(200).json({success: true})
    })

    //  desc    Update a ticket
    //  @route  PUT api/tickets/:id
    //  @access private
    const updateTicket = asyncHandler( async (req , res) => {

        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const ticket = await Ticket.findById(req.params.id)

        //checking if this ticket exists
        if(!ticket){
            res.status(404)
            throw Error('Ticket is not found')
        }
        //Checking wether the user is authorized for deleting the ticket or not
        if(ticket.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('Not Authorized')
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json(updatedTicket)
    })


    module.exports = {
        getTickets,
        getSingleTicket,
        createTicket,
        deleteTicket,
        updateTicket
    }