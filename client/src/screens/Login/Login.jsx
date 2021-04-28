import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login(props) {

  const [formData, setFormData] = useState({
    email_address: '',
    password: ''
  })

  const { email_address, password } = formData;
  const { handleLogin } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }
  return (
    <div className='login-container'>
      <Link to='/'> Adnat </Link>

      <h2> Log in </h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData);

      }}>
        <label htmlFor='email'> Email
          <input
            name='email_address'
            value={email_address}
            required
            onChange={handleChange}
          />
        </label>
        
        <label htmlFor='password'> Password
          <input 
            type='password'
            name='password'
            value={password}
            required
            onChange={handleChange}/>
        </label>

        <input
          type='checkbox'
          value='false'
          // onClick={handleRememberMe}
        />
        
        <button
          type='submit'>
          Login</button>
        
        <Link to='/register'>
          Sign Up
        </Link>

        <Link to=''>
          Forgot your password?
        </Link>


      </form>



    </div>
  )
}
