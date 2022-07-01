import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";



import { DashboardScreen } from '../componentes/dashboard/DashboardScreen';
// import { DeletePage } from '../componentes/dashboard/DeletePage';
import { LoginScreen } from '../componentes/auth/LoginScreen';
import { RegisterScreen } from '../componentes/auth/RegisterScreen';
import { SearchPage } from '../componentes/dashboard/SearchPage';
import { useAuthStore } from '../hooks/useAuthStore';
// import { UpdatePage } from '../componentes/dashboard/UpdatePage';



export const AppRouter = () => {

  

   const { status, checkAuthToken } = useAuthStore();
   // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

   useEffect(() => {
       checkAuthToken();
   }, [])
   


   if ( status === 'checking' ) {
       return (
           <h3>Cargando...</h3>
       )
   }
   
  
  return  (
    

        <Routes>
                
                {
                ( status === 'not-authenticated')  

                    ? (
                        <>
                            <Route path="/auth/login" element={ <LoginScreen /> } />
                            <Route path="/auth/register" element={ <RegisterScreen /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <DashboardScreen /> } />
                            {/* <Route path="/dashboard/update/delete" element={<DeletePage />} /> */}
                            <Route path="/dashboard/search" element={<SearchPage />} />
                            {/* <Route path="/dashboard/update" element={<UpdatePage />} /> */}
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }
        
        </Routes>
      )
}
