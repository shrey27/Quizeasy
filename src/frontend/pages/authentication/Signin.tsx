import './authentication.css';
import { useState, Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SIGNUP, HOMEPAGE } from '../../routes';
import { signInHandler } from '../../service/userActions';
import { useAppDispatch, regexArray, useAppSelector } from '../../utility';
import { Loader } from '../../components';
import { useTheme } from '../../context';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailDetails, setEmailDetails] = useState({
    email: 'carljamy@gmail.com', password: 'carljamy1234'
  })
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loader = useAppSelector(state => state.users.loader);
  const { theme } = useTheme();

  const location: any = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const validateFields = () => {
    const { email, password } = emailDetails;
    let errors: string[] = [];
    if (!email || !regexArray.email.test(email)) {
      errors.push('emailError');
    }
    if (password.length < 8) {
      errors.push('passwordError');
    }
    if (errors.length) {
      setError(true);
      return false;
    } return true;
  }

  const onSignInHandler = (e: any) => {
    e.preventDefault();
    const { email, password } = emailDetails;
    if (validateFields()) {
      dispatch(signInHandler(email, password, navigate, HOMEPAGE, theme === 'dark' ? 'dark' : 'light', from));
    }
  };

  return (
    <Fragment>
      {loader ? <Loader /> : < div className='card authentication shdw' >
        {error && (
          <h1 className='alert text cen md sb'>Enter the details in proper format</h1>
        )}
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
              onFocus={() => setError(false)}
            />
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
                onFocus={() => setError(false)}
              />
              <i
                className='fa-solid fa-eye input__eye'
                onClick={() => setShowPassword((e) => !e)}
              ></i>
            </div>
          </div>
          <button
            type='submit'
            className='btn btn--wide btn--auth--solid sb'
            onClick={onSignInHandler}
          >
            SIGNIN
          </button>
        </form>
        <div className='signin__links'>
          <Link to={SIGNUP} className='forgot sm'>
            Forgot Password?
          </Link>
          <Link to={SIGNUP} className='forgot sm fl-rt'>
            Sign Up
          </Link>
        </div>
      </div >}
    </Fragment >
  );
}
