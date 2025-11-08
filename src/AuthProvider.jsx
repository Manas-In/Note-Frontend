

import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [IsLogin, setIsLogin] = useState(!!localStorage.getItem("accessTokon"));
//   const [isLogin, setIsLogin] = useState(!!localStorage.getItem("access"));

  
  return (
    <>
   <AuthContext.Provider value={{ IsLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
export { AuthContext };
