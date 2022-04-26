import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { LANDING } from '../../routes';

export function Navbar() {
    const { pathname } = useLocation();
    return <div>
        <nav className="navbar">
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
                    <button className='btn btn--cancel--solid sm sb'>Login<i className="fa-solid fa-arrow-right-to-bracket"></i></button>
                </div>
            </section>
        </nav>
    </div>
}