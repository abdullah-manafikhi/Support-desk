import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        //Redirect when logedin
        if(isSuccess && user){
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2){
            toast.error('Passwords do not match')
        }
        else{
            dispatch(register({name, email, password}))
        }
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder='Enter your Name'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
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
                    <input 
                        type="password" 
                        placeholder='Confirm password'
                        className='form-control'
                        id='password2'
                        value={password2}
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

export default Register