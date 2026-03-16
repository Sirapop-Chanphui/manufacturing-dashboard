import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, setState] = useState({
        loading: null,
        getUserLoading: null,
        error: null,
        user: null,
    });

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setState((prevState) => ({
                ...prevState,
                user: null,
                getUserLoading: false,
            }));
            return;
        }

        try {
          
            setState((prevState) => ({ ...prevState, getUserLoading: true }));
            const response = await axios.get(`${API_BASE_URL}/auth/get-user`);
            setState((prevState) => ({ ...prevState, user: response.data.data, getUserLoading: false, }));
        } catch (error) {
            setState((prevState) => ({ ...prevState, error: error.message, user: null, getUserLoading: false, }));
            throw error.response?.data || { message: "fetch user failed" };
        } 
    };

    const login = async (data) => {
        try {
            setState((prevState) => ({
                ...prevState,
                loading: true,
                error: null,
            }));

            const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            await fetchUser();

            return response.data;
        } catch (error) {

            throw error.response?.data || { message: "Login failed" };
        } finally {
            setState((prev) => ({
                ...prev,
                loading: false,
            }));
        }
    };

    useEffect(() => {
        fetchUser(); // Load user on initial app load
    }, []);

    // Register user
    const register = async (data) => {
        try {
            setState((prev) => ({ ...prev, loading: true }));

            const response = await axios.post(
                `${API_BASE_URL}/auth/register`,
                data
            );

            return response.data;

        } catch (error) {
            throw error.response?.data || { message: "Registration failed" };
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    //log out
    const logout = () => {

        localStorage.removeItem("token");
    
      // reset auth state
      setState({
        loading: null,
        error: null,
        user: null,
      });

      };


    const isAuthenticated = Boolean(state.user);

    return (
        <AuthContext.Provider
            value={{
                state,
                user: state.user,
                register,
                login,
                logout,
                fetchUser,
                isAuthenticated,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
