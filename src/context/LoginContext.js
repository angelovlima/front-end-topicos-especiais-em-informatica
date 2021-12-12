import React, { createContext, useState } from "react";

export const LoginContext = createContext({})

export function LoginProvider({children}){
    const [isLogado, setIsLogado] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [token, setToken] = useState(null)

    function defineToken(token){
        setToken(token)
    }

    function loginFeito(){
        setIsLogado(true)
    }

    function changeAdmin(){
        setAdmin(true)
    }

    return(
        <LoginContext.Provider value={{
            changeAdmin,
            loginFeito,
            defineToken,
            isLogado,
            admin,
            token
        }}>
            {children}
        </LoginContext.Provider>
    )
}