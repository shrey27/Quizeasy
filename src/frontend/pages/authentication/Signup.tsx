import "./authentication.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SIGNIN, HOMEPAGE } from "../../routes";
import { regexArray, useAppDispatch, useAppSelector } from "../../utility";
import { signUpHandler } from "../../service/userActions";
import { Loader } from "../../components";
import { useTheme } from "../../context";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [emailDetails, setEmailDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const loader = useAppSelector((state) => state.users.loader);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const location: any = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const validateFields = () => {
    const { username, email, confirmPassword, password } = emailDetails;
    if (!email || !password || !confirmPassword || !username) {
      setError("FILL ALL THE DETAILS IN PROPER FORMAT");
      return false;
    }
    if (!regexArray.email.test(email)) {
      setError("ENTER EMAIL IN CORRECT FORMAT");
      return false;
    }
    if (password.length < 8) {
      setError("PASSWROD MUST BE 8 CHARS LONG");
      return false;
    }
    if (confirmPassword !== password) {
      setError("PASSWROD AND CONFRIM PASSWORD DO NOT MATCH");
      return false;
    }
    return true;
  };

  const onSignUpHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { username, email, password } = emailDetails;
    if (validateFields()) {
      dispatch(
        signUpHandler(
          username,
          email,
          password,
          navigate,
          HOMEPAGE,
          theme === "dark" ? "dark" : "light",
          from
        )
      );
    }
  };

  const handleGuestCredentials = (e: React.SyntheticEvent) => {
    setEmailDetails({
      username: "Carl James",
      email: "carljamey@gmail.com",
      password: "carljamy1234",
      confirmPassword: "carljamy1234",
    });
  };

  return (
    <div className="signupPage">
      {loader ? (
        <Loader />
      ) : (
        <div className="card authentication shdw">
          {error.length ? <h1 className="alert text cen sm">{error}</h1> : ""}
          <h1 className="lg sb cen xs-s mg-full">SIGN UP</h1>
          <hr />
          <form action="#" className="sm-s">
            <div className="authentication__input">
              <label htmlFor="name__signup" className="label">
                Enter Your Name
              </label>
              <input
                className="input sm-s"
                type="text"
                name="name__signup"
                id="name__signup"
                placeholder="Enter your Name"
                autoComplete="off"
                aria-autocomplete="none"
                value={emailDetails.username}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, username: e.target.value })
                }
                onFocus={() => setError("")}
              />
            </div>
            <div className="authentication__input">
              <label htmlFor="email__signup" className="label">
                Enter Your Email ID
              </label>
              <input
                className="input sm-s"
                type="email"
                name="email__signup"
                id="email__signup"
                placeholder="Enter Email"
                autoComplete="off"
                aria-autocomplete="none"
                value={emailDetails.email}
                onChange={(e) =>
                  setEmailDetails({ ...emailDetails, email: e.target.value })
                }
                onFocus={() => setError("")}
              />
            </div>
            <div className="authentication__input">
              <label htmlFor="password__signup" className="label">
                Enter Password
              </label>
              <div className="input__container">
                <input
                  className="input input__password sm-s"
                  type={showPassword ? "text" : "password"}
                  name="password__signup"
                  id="password__signup"
                  autoComplete="off"
                  placeholder="Enter Password"
                  value={emailDetails.password}
                  onChange={(e) =>
                    setEmailDetails({
                      ...emailDetails,
                      password: e.target.value,
                    })
                  }
                  onFocus={() => setError("")}
                />
                <i
                  className="fa-solid fa-eye input__eye"
                  onClick={() => setShowPassword((e) => !e)}
                ></i>
              </div>
            </div>
            <div className="authentication__input">
              <label htmlFor="cnf__password__signup" className="label">
                Confirm Password
              </label>
              <div className="input__container">
                <input
                  className="input input__password sm-s"
                  type={showCnfPassword ? "text" : "password"}
                  name="cnf__password__signup"
                  id="cnf__password__signup"
                  autoComplete="off"
                  placeholder="Re-enter Password"
                  value={emailDetails.confirmPassword}
                  onChange={(e) =>
                    setEmailDetails({
                      ...emailDetails,
                      confirmPassword: e.target.value,
                    })
                  }
                  onFocus={() => setError("")}
                />
                <i
                  className="fa-solid fa-eye input__eye"
                  onClick={() => setShowCnfPassword((e) => !e)}
                ></i>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn--wide btn--auth--solid sb"
              onClick={onSignUpHandler}
              data-auth_signin="SIGN_UP"
            >
              SIGN UP
            </button>
            <button
              type="button"
              className="btn btn--wide btn--auth sb"
              onClick={handleGuestCredentials}
              data-guest="GUEST_CRED_SIGNUP"
            >
              Guest Credentials
            </button>
          </form>
          <div className="signin__links">
            <Link to={SIGNIN} className="already sm">
              Already have an account?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
