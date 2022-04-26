import { createContext, useContext, useState } from 'react';

type userType = {
  email: string;
  name: string;
  uid: string;
  authProvider: string;
  quizzesTaken: [];
  score: number;
} | null;

type AuthContextType = {
  authToken: string;
  setAuthToken: (arg0: string) => void;
  authUser: userType;
  setAuthUser: (arg0: userType) => void;
};

const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageAuth = localStorage.getItem("authToken");
  const localStorageUser = localStorage.getItem("authUser");
  const [authToken, setAuthToken] = useState<string>(
    localStorageAuth ? localStorageAuth : ""
  );
  const [authUser, setAuthUser] = useState(
    localStorageUser ? JSON.parse(localStorageUser) : null
  );
  return (
    <AuthenticationContext.Provider
      value={{ authToken, setAuthToken, authUser, setAuthUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthCtx = () => useContext(AuthenticationContext);

export { useAuthCtx, AuthenticationProvider };
