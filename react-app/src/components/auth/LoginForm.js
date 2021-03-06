import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
// import './login.css'
import './signup.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();

      let demoEmail = 'demo@aa.io'
      let demoPassword = 'password'

    return dispatch(login(demoEmail, demoPassword));
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='page'>
      <div className='background'>
        <div className='card-container'>
          <div className='content-container'>


      <form className='form' onSubmit={onLogin}>
      <h3>Log in to Grammr</h3>
      <p>A place to post images about grammar and punctuation!?</p>

        <ul className="errors">
          {errors.map((error, ind) => (
            <li key={ind}>{error}</li>
          ))}
        </ul>
        <div>
          {/* <label htmlFor='email'>Email</label> */}
          <br></br>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          {/* <label htmlFor='password'>Password</label> */}
          <br></br>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
          <button className="logbutton" type='submit'>Login</button>
          <div className='redirect'>
            <p>Don't have an account?
              <a href='/sign-up'> Sign up here.</a>
            </p>
          </div>
      </form>
          <div className='demoButton'>
          <form onSubmit={demoUser}>
                <button className='demoButton' type='submit'>Demo User</button>
          </form>
          </div>
      </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
