import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
    if (password !== repeatPassword) {
        return setErrors(["Password and Confirm Password field must match"])
    }


  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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

          <form onSubmit={onSignUp}>

          <h3>Sign up for <strong>Grammr</strong></h3>
          <p>A place to post images about grammar</p><p> and punctuation!?</p>
              <div className="errors">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <input
                  placeholder='User Name'
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>
                <input
                  placeholder='Email'
                  type='email'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <input
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <input
                  placeholder='Confirm Password'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <button className= 'confirm-button' type='submit'>Sign Up</button>
              <div className='redirect'>
        <p>Already have an account?
          <a href='/login'> Log in here.</a>
        </p>
          </div>
            </form>
            </div>
          </div>

      </div>

      </div>
        </>
  );
};

export default SignUpForm;
