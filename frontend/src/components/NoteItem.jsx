import {useSelector} from 'react-redux'

function NoteItem({note}) {

    const {user} = useSelector((state) => state.auth)

  return (
    <div className='note' style={{
        backGroundColor: note.staff ? 'rgba(0,0,0,0.7)' : '#ffff',
        color: note.staff ? '#fff' : '#000',

    }}>
    <h4>Note from {note.staff ? <span>Staff</span> : <span>{user.name }</span> }</h4>  
    <p>{note.text}</p>
    <div className="note-date">
        {new Date(note.createdAt).toLocaleString('en-US')}
    </div>
    </div>
  )
}

export default NoteItem