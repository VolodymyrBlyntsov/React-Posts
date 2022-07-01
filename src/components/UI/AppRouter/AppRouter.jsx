import React, { useContext } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import Welcome from "../../pages/Welcome";
import Login from "../../pages/Login";
import { privateRoutes, publicRoutes } from "../../router/router";
import { AuthContext } from "../../context";
import Loader from "../Loader/Loader";


const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if(isLoading) {
    return <Loader />
  }

  return (
    isAuth
    
    ? <Routes>
    { privateRoutes.map(route => 
      <Route path={route.path} element={<route.component key={route.path} />} />
    )}

    <Route path="/welcome" element={<Welcome />} /> 
    <Route path="*" element={<Navigate to="/welcome" replace />} />
</Routes>
    : <Routes>
        { publicRoutes.map(route => 
          <Route path={route.path} element={<route.component />} key={route.path} />
        )}

        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRouter