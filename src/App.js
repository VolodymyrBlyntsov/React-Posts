import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import './styles/App.css'
import AppRouter from "./components/UI/AppRouter/AppRouter";
import { AuthContext } from "./components/context";

function App(props) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if(localStorage.getItem('auth')) {
        setIsAuth(true)
      }
      setIsLoading(false);
    }, [])

    return (
      <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    )
}

export default App;
