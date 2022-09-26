import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tickets/'

//Create neww Ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)
    return response.data
}

//Get all Tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}


//Get a single Ticket
const getSingleTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + ticketId, config)
    return response.data
}


//Close a Ticket
const closeTicket = async (ticketId, token) => {
    console.log(ticketId)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + ticketId, {status: 'closed'}, config)
    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getSingleTicket,
    closeTicket
}

export default ticketService