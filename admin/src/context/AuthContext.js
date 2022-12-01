import {createContext, useReducer} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
};

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_START': 
            return {
                user: null,
                loading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null
            }    
        default: 
            return state;
        
    }
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
    const {user, loading, error} = state;
    
    const PK = process.env.REACT_APP_PUBLIC_API;
    useEffect(()=> {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    const login = async (user) => {
        dispatch({
            type: "LOGIN_START",
            payload: loading
        })
        try {
            const res = await axios.post(`${PK}/auth/login`, user);
            console.log(res.data.details)
            if(res.data.isAdmin){
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.details
                })
            }
            return res.data;
        } catch (error) {
            dispatch({ 
                type: "LOGIN_FAILURE",
                payload: error
            })
        }
    }

    const register = async (user) => {
        dispatch({ type: 'LOGIN_START'});
        try {
            const res = await axios.post(`${PK}/auth/register`, user);
            if(res.data){
                dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            }
            return res.data;
        } catch (error) {
            dispatch({type: 'LOGIN_FAILURE', payload: error})
        }
    }

    const AuthContextData = {
        user,
        loading,
        error,
        login,
        register,
        dispatch
    }

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;