import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {logout, reset} from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
 
function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            {user ? (<button className='btn' onClick={() => onLogout()}> <FaSignOutAlt /> Log Out</button>) : (
                <>
                    <li>
                        <Link to='/login'>
                        <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/Register'>
                        <FaUser /> Register
                        </Link>
                    </li> 
                </>
            )}
              
        </ul>
    </header>
  )
}

export default Header