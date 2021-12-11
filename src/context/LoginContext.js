import React, { createContext, useState } from "react";

export const LoginContext = createContext({})

export function LoginProvider({children}){
    const [isLogado, setIsLogado] = useState(false)
    const [admin, setAdmin] = useState(false)

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
            isLogado,
            admin
        }}>
            {children}
        </LoginContext.Provider>
    )
}