import React, {useState } from 'react'

export const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});

const AuthContextProvider=(props)=>{
    const[token,settoken]=useState(null);

   const userIsLoggedIn=!!token;

    const loginHandler=(token)=>{
        settoken(token);
    }
    const logoutHandler=()=>{
        settoken(null);
    }

    const AuthContextValue={
     token:token,
     isLoggedIn:userIsLoggedIn,
     login:loginHandler,
     logout:logoutHandler,
    }

    return (
        <AuthContext.Provider value={AuthContextValue}>
            {props.children}
        </AuthContext.Provider>
    )

}
  export default AuthContextProvider


