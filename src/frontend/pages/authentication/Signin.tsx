import './authentication.css';
import { useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNUP } from '../../routes';
import { signInHandler } from '../../service/userActions';
import { useAppDispatch } from '../../utility/hooks';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailDetails, setEmailDetails] = useState({
    email: 'carljones@gmail.com', password: 'carljones1234'
  })
  const [error, setError] = useState({ emailError: false, passwordError: false })
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSignInHandler = (e: any) => {
    e.preventDefault();
    const { email, password } = emailDetails;
    dispatch(signInHandler(email, password));
    navigate('/homepage')
  };

  return (
    <Fragment>
      {
        false && (
          <div className='card authentication'>
            <h1 className='alert tag cen md sb'>Error</h1>
          </div>
        )
      }
      < div className='card authentication shdw' >
        <h1 className='lg sb cen xs-s mg-full'>SIGNIN</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='authentication__input'>
            <label htmlFor='email__signin' className='label'>
              Enter Your Email ID
            </label>
            <input
              className='input'
              type='email'
              name='email__signin'
              id='email__signin'
              placeholder='Enter Email'
              autoComplete='off'
              value={emailDetails.email}
              onChange={(e) => setEmailDetails({ ...emailDetails, email: e.target.value })}
              onFocus={() => setError({ ...error, emailError: false })}
              required
            />
            {error.emailError && <h1 className='input__error'>Enter the email in correct format</h1>}
          </div>
          <div className='authentication__input'>
            <label htmlFor='password__signin' className='label'>
              Enter Password
            </label>
            <div className='input__container'>
              <input
                className='input input__password'
                type={showPassword ? 'text' : 'password'}
                name='password__signin'
                id='password__signin'
                autoComplete='off'
                placeholder='Password'
                value={emailDetails.password}
                onChange={(e) => setEmailDetails({ ...emailDetails, password: e.target.value })}
                onFocus={() => setError({ ...error, passwordError: false })}
                required
              />
              <i
                className='fa-solid fa-eye input__eye'
                onClick={() => setShowPassword((e) => !e)}
              ></i>
            </div>
            {error.passwordError && <h1 className='input__error'>Enter the password in correct format</h1>}
          </div>
          <button
            type='submit'
            className='btn btn--wide btn--auth--solid sb'
            onClick={onSignInHandler}
          >
            SIGNIN
          </button>
          {/* <button
            className='btn btn--wide btn--auth sb'
            onClick={onSignInTestCredentials}
          >
            GUEST-USER
          </button> */}
        </form>
        <div className='signin__links'>
          <Link to={SIGNUP} className='forgot sm'>
            Forgot Password?
          </Link>
          <Link to={SIGNUP} className='forgot sm fl-rt'>
            Sign Up
          </Link>
        </div>
      </div >
    </Fragment >
  );
}
