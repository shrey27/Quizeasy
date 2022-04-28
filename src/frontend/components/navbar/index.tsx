import './navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LANDING, SIGNIN } from '../../routes';
import { useTheme } from '../../context';
import { useAppSelector, useAppDispatch } from '../../utility';
import { signOutHandler } from '../../service/userActions';
import { SignoutModal } from '../modal/SignoutModal';
import { useState } from 'react';

export function Navbar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [signoutModal, setSignoutModal] = useState(false);
    const { theme, switchTheme } = useTheme();
    const token = useAppSelector((state) => state.users.token);
    const dispatch = useAppDispatch();

    const handleDispatch = () => dispatch(signOutHandler(navigate, LANDING));

    const handleAuthentication = () => {
        if (token) {
            setSignoutModal(true);
        }
        else {
            navigate(SIGNIN);
        }
    }

    return <div>
        {signoutModal && <SignoutModal setSignoutModal={setSignoutModal} handleDispatch={handleDispatch} />}
        <nav className="navbar shadow">
            <section className="begin">
                <Link to={LANDING}>
                    <img className="box__image" src='logo.png' alt='logo' />
                </Link>
            </section>
            {pathname === '/homepage' && <section className="middle cen sm-s">
                <div className="search--ctr">
                    <i className="fas fa-search search--btn"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input no--bdr"
                        id="user-name"
                        name="user-name"
                        autoComplete="off"
                    />
                </div>
            </section>}
            <section className="end sm-s">
                <div className="menu">
                    {theme === 'light' ? <button className='btn btn--auth--solid sm sb' onClick={switchTheme}><i className="fa-solid fa-moon"></i></button>
                        : <button className='btn btn--dark sm sb' onClick={switchTheme}><i className="fa-solid fa-sun"></i></button>
                    }<button className='btn btn--cancel--solid sm sb'
                        onClick={handleAuthentication}>{token ? 'Logout' : 'Login'}
                        <i className="fa-solid fa-arrow-right-to-bracket"></i></button>
                </div>
            </section>
        </nav>
    </div >
}