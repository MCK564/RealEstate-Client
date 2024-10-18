import React from "react";
import { axiosInstance, setAuthToken } from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthenticationContext = React.createContext();

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = React.useState(loadUserFromLocalStorage());

  const login = async (form) => {

    const respone = await axiosInstance.post("auth/login", form);
    const { data } = respone;
    // parse jwt token
    const { accessToken } = data;
    const userFromToken = jwtDecode(accessToken);
    // set user to state
    setUser(userFromToken);
    localStorage.setItem("user", JSON.stringify(userFromToken));
    setAuthToken(accessToken);
  };

  const register = async (form) => {
    return await axiosInstance.post("/auth/register", form);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticationContext };
