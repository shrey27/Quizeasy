import './authentication.css';
import { Fragment, useState } from 'react';
import { useAuthCtx } from '../../context';
import { Link } from 'react-router-dom';
import { SIGNIN } from '../../routes';
import { testCredentials } from '../../utility/constants';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [emailDetails, setEmailDetails] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState({ nameError: false, emailError: false, passwordError: false, cnfPasswordError: false })

  const {
    authUser
  } = useAuthCtx();

  const onSignUpHandler = () => {
    // e.preventDefault();
  };

  const onUsingTestCredentials = () => {
    // e.preventDefault();
  };

  return (
    <Fragment>
      {false && (
        <div className='card authentication'>
          <h1 className='alert tag cen md sb'>Error</h1>
        </div>
      )}
      <div className='card authentication shdw'>
        <h1 className='lg sb cen xs-s mg-full'>SIGN UP</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='authentication__input'>
            <label htmlFor='name__signup' className='label'>
              Enter Your Name
            </label>
            <input
              className='input sm-s'
              type='text'
              name='name__signup'
              id='name__signup'
              placeholder='Enter your Name'
              autoComplete='off'
              aria-autocomplete='none'
              value={emailDetails.username}
              onChange={(e) =>
                setEmailDetails({ ...emailDetails, username: e.target.value })
              }
              onFocus={() => setError({ ...error, nameError: false })}
              required
            />
            {error.nameError && <h1 className='input__error'>Please enter the name</h1>}
          </div>
          <div className='authentication__input'>
            <label htmlFor='email__signup' className='label'>
              Enter Your Email ID
            </label>
            <input
              className='input sm-s'
              type='email'
              name='email__signup'
              id='email__signup'
              placeholder='Enter Email'
              autoComplete='off'
              aria-autocomplete='none'
              value={emailDetails.email}
              onChange={(e) =>
                setEmailDetails({ ...emailDetails, email: e.target.value })
              }
              onFocus={() => setError({ ...error, emailError: false })}
              required
            />
            {error.emailError && <h1 className='input__error'>Please enter the email in correct format</h1>}
          </div>
          <div className='authentication__input'>
            <label htmlFor='password__signup' className='label'>
              Enter Password
            </label>
            <div className='input__container'>
              <input
                className='input input__password sm-s'
                type={showPassword ? 'text' : 'password'}
                name='password__signup'
                id='password__signup'
                autoComplete='off'
                placeholder='Enter Password'
                value={emailDetails.password}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, password: e.target.value })
                }
                onFocus={() => setError({ ...error, passwordError: false })}
                required
              />
              <i
                className='fa-solid fa-eye input__eye'
                onClick={() => setShowPassword((e) => !e)}
              ></i>
            </div>
            {error.passwordError && <h1 className='input__error'>Please enter atleast 8 chars long password</h1>}
          </div>

          <div className='authentication__input'>
            <label htmlFor='cnf__password__signup' className='label'>
              Confirm Password
            </label>
            <div className='input__container'>
              <input
                className='input input__password sm-s'
                type={showCnfPassword ? 'text' : 'password'}
                name='cnf__password__signup'
                id='cnf__password__signup'
                autoComplete='off'
                placeholder='Re-enter Password'
                value={emailDetails.confirmPassword}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, confirmPassword: e.target.value })
                }
                onFocus={() => setError({ ...error, cnfPasswordError: false })}
                required
              />
              <i
                className='fa-solid fa-eye input__eye'
                onClick={() => setShowCnfPassword((e) => !e)}
              ></i>
            </div>
            {error.cnfPasswordError && <h1 className='input__error'>Password and confirm password should match</h1>}
          </div>
          <button
            type='submit'
            className='btn btn--wide btn--auth--solid sb'
            onClick={onSignUpHandler}
          >
            SIGN UP
          </button>
          <button
            className='btn btn--wide btn--auth sb'
            onClick={onUsingTestCredentials}
          >
            TEST-CREDENTIALS
          </button>
        </form>
        <div className='signin__links'>
          <Link to={SIGNIN} className='already sm'>
            Already have an account?
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
