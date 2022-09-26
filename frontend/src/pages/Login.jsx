import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            console.log(message)
            toast.error(message)
        }

        //Redirect when logedin
        if(isSuccess || user){
            navigate('/')
        }

       // dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login({email, password}))
        
    }

    if(isLoading){
        return (<Spinner />)
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please Login to get support</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder='Enter your Email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder='Enter password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <button onSubmit={onSubmit} className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login