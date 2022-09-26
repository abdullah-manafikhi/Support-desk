import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tickets/'

//Create ticket notes
const createNote = async (noteData, token) => {
    console.log(noteData.noteText + "  " + noteData.id)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + noteData.id + '/notes', {text: noteData.noteText}, config)
    return response.data
}

//Get ticket notes
const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + ticketId + '/notes', config)
    return response.data
}

const noteService = {
    getNotes,
    createNote
}

export default noteService