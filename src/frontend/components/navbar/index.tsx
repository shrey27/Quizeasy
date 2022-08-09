import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HOMEPAGE, LANDING, SIGNIN, LEADERBOARD } from "../../routes";
import { useTheme } from "../../context";
import { useAppSelector, useAppDispatch } from "../../utility";
import { signOutHandler } from "../../service/userActions";
import { SignoutModal } from "../modal/SignoutModal";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [signoutModal, setSignoutModal] = useState(false);
  const { theme, switchTheme } = useTheme();
  const token = useAppSelector((state) => state.users.token);
  const dispatch = useAppDispatch();

  const handleDispatch = () => dispatch(signOutHandler(navigate, LANDING));

  const handleAuthentication = () => {
    if (token) {
      setSignoutModal(true);
    } else {
      navigate(SIGNIN);
    }
  };

  return (
    <div>
      {signoutModal && (
        <SignoutModal
          setSignoutModal={setSignoutModal}
          handleDispatch={handleDispatch}
        />
      )}
      <nav className="navbar shadow">
        <section className="begin">
          <Link to={LANDING}>
            <img
              className="box__image"
              src="https://res.cloudinary.com/apollo27/image/upload/v1651258405/logo_lvwf0l.png"
              alt="logo"
            />
          </Link>
        </section>
        {/* {pathname === '/homepage' && <section className="middle cen sm-s">
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
            </section>} */}
        <section className="end sm-s">
          <div className="menu">
            {theme === "light" ? (
              <button
                className="btn--navbar sm sb"
                onClick={switchTheme}
                data-dark="DARK_THEME"
              >
                <i className="fa-solid fa-moon"></i>
              </button>
            ) : (
              <button
                className="btn--navbar sm sb"
                onClick={switchTheme}
                data-light="LIGHT_THEME"
              >
                <i className="fa-solid fa-sun"></i>
              </button>
            )}
            {token && (
              <Link to={HOMEPAGE} className="btn--navbar sm sb">
                <i className="fa-solid fa-house"></i>
              </Link>
            )}
            {token && (
              <Link to={LEADERBOARD} className="btn--navbar sm sb">
                <i className="fa-solid fa-trophy"></i>
              </Link>
            )}
            <button
              className="btn btn--cancel--solid sm sb"
              name="auth"
              data-auth={token ? "LOGOUT" : "LOGIN"}
              onClick={handleAuthentication}
            >
              <span className="logout__mobile">
                {token ? "Logout" : "Login"}
              </span>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </div>
        </section>
      </nav>
    </div>
  );
}
