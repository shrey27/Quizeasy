import "./App.css";
import { useEffect, lazy } from "react";
import { Navbar } from "./frontend/components";
import { useTheme } from "./frontend/context";
import { userActions } from "./frontend/store/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsersHandler } from "./frontend/service/userActions";
import { useAppDispatch } from "./frontend/utility";
import { useLocation } from "react-router-dom";

const LazyComponent = lazy(() => import("./LazyComponent"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localStorageAuth = localStorage.getItem("authToken");
    if (localStorageAuth) {
      dispatch(userActions.getToken(localStorageAuth));
      const localStorageUser = localStorage.getItem("authUser");
      dispatch(
        userActions.getUser(
          localStorageUser ? JSON.parse(localStorageUser) : null
        )
      );
    }
    dispatch(getAllUsersHandler());
  }, [dispatch]);

  return (
    <div className="App" app-theme={theme} data-theme={`"${theme}"`}>
      <ScrollToTop />
      <Navbar />
      <LazyComponent />
      <ToastContainer style={{ fontWeight: "500", fontSize: "1.15rem" }} />
    </div>
  );
}

export default App;
