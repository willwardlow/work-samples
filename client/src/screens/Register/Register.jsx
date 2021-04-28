import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register(props) {

  const [formData, setFormData] = useState({
    name: '',
    email_address: '',
    password: '',
  })
  const [passwordConfirm,  setPasswordConfirm] = useState('')
  const { name, email_address, password} = formData;
  const { handleRegister } = props;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
    
  }
  return (
    <div className='register-container'>
      <Link to='/'>
        Adnat
      </Link>

      <h2>
        Sign Up
      </h2>

      <form className='register-form'
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== passwordConfirm) {
            alert('Password and Password Confirm must match')
          } else {
            handleRegister(formData);
          }}}>
        <label htmlFor='name'
          > Name
          <input
            type='text'
            name='name'
            value={name}
            required
            onChange={handleChange}
          />
        </label>

        <label htmlFor='email'
        > Email
        <input
            type='email'
            name='email_address'
            value={email_address}
            required
            onChange={handleChange}
          />
        </label>

        <label htmlFor='password'>
          Password (6 characters minimum):
           <input
            type='password'
            name='password'
            value={password}
            required
            onChange={handleChange}
            />
        </label>

        <label htmlFor='password-confirm'>
          Password confirmation
           <input
            type='password'
            name='passwordConfirm'
            value={passwordConfirm}
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            />
        </label>

        <button
        type='submit'> Sign Up </button>
      </form>
      
      <Link to='login'>
        Log in
      </Link>



    </div>
  )
}
