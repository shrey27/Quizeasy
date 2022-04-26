import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { LANDING } from '../../routes';
import { useTheme } from '../../context';

export function Navbar() {
    const { pathname } = useLocation();
    const { theme, switchTheme } = useTheme();
    return <div>
        <nav className="navbar shadow">
            <section className="start">
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
                    }<button className='btn btn--cancel--solid sm sb' >Login<i className="fa-solid fa-arrow-right-to-bracket"></i></button>
                </div>
            </section>
        </nav>
    </div >
}