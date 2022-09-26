import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getSingleTicket, closeTicket} from '../features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesRest } from '../features/notes/noteSlice'
import {useParams} from 'react-router-dom'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import NoteItem from '../components/NoteItem'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'
       }
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    
    const {ticket, isError, isLoading, isSuccess, message} = useSelector((state) => state.tickets)
    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getSingleTicket(id))
        dispatch(getNotes(id))
    }, [isError, message, id])

    const onTicketClose = (e) => {
        dispatch(closeTicket(id))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    // create note submit
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, id}))
        closeModal()
    }

    // Open Close Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)


    if(isLoading || notesIsLoading){
        return <Spinner /> 
    }

    if(isError){
        return <h3>Something went wrong</h3>
    }

  return (
    <div className='ticket-page'>
        <header className="ticket-header">
            <BackButton url='/tickets' />
            <h2>
                Ticket Id: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>Date submited: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
            <h3>{ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h3>Description of issue</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>.
        </header>

        {ticket.status !== 'closed' && (
            <button onClick={openModal} className="btn">  <FaPlus /> Add Note</button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentTable='addNote'>
            <h2>Add Note </h2>
            <button onClick={closeModal} className="btn-close">x</button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea 
                        name="noteText" 
                        id="noteText"
                        className="form-control"
                        placeholder="Note Text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn" type='submit'>Add Note</button>
                </div>
            </form>
        </Modal>
 
        {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className="btn btn-danger btn-block">Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket