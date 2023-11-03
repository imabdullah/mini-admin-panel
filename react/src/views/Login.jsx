import React, { useRef, useState } from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';



// Export Login as a React component
export default function Login() {


  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null)
  const { setUser, setToken } = useStateContext()

  const onSubmit = (ev) => {
    console.log("here");
    ev.preventDefault()
    setErrors(null)
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(payload);
    axiosClient.post('/login', payload).then(({ data }) => {
      setToken(data.token)
      setUser(data.user)
    }).catch(err => {
      const response = err.response
      if (response && response.status === 422) {
        console.log(response)
        setErrors(response.data)
        console.log(errors)
      }
    })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>
            Login to Mini Admin Panel
          </h1>
          {errors && <div className='alert'>
            <p>{errors.message}</p>

          </div>
          }
          <input ref={emailRef} type='email' placeholder='Email' />
          <input ref={passwordRef} type='password' placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered?
          </p>
        </form>
      </div>
    </div>
  );
}

