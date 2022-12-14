import React, { useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth,createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'
import Spinner from '../components/Spinner'

const SignUp = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    password: '',
  })
  const { name, email, password } = formData
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({ 
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword
      (
        auth, 
        email, 
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } 
    catch (error) {
      toast.error("Something went wrong with Registration")
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>
            Welcome Back!!
          </p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              className='showPassword'
              alt='show password'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>
              Sign Up
            </p>
            <button className='signUpButton' >
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className="registerLink" disabled={loading}>
          Sign In Instead
        </Link>
      </div>
      {loading && <Spinner />}
    </>
  )
}

export default SignUp