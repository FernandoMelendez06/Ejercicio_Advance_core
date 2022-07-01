import React, { useEffect, useState } from 'react'


import { useNavigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { User } from './user';




export const DashboardScreen = (  ) => {


  const { startLogout, ListaUsuarios } = useAuthStore();
    
  const [ usuario, setUser] = useState([]);

  const navigate = useNavigate();


  const onListaUsuarios = async() => {

      const arreglo = await ListaUsuarios();
       
       setUser( arreglo );
    //    console.log(arreglo);
  } 

  const onLogout = () => {
      startLogout();
      navigate('/auth/login', {
          replace: true
      });
  }

  
  


  return (

      <div>
           
        
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
           

                  <div className="navbar-collapse">
                      <div className="navbar-nav">

                          <button
                              className="nav-item nav-link btn"
                              onClick={ onListaUsuarios }
                          >
                              LISTA USUARIOS
                          </button>
      
                          <NavLink 
                              className={ ({isActive}) => `nav-item nav-link  ${ isActive ? 'active':'' }` }
                              to="/dashboard/search"
                          >
                              Search
                          </NavLink>

                    
                                     
                      </div>
                  </div>

                  <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                      <ul className="navbar-nav ml-auto">
                        
                          <span className="nav-item nav-link text-primary">
                              Fernando
                          </span>

                          <button
                              className="nav-item nav-link btn"
                              onClick={ onLogout }
                          >
                              Logout
                          </button>

                      </ul>
                  </div>
             </nav>


              <div className="row text-white ">

                {         
                  usuario.map((user1) => ( 
                                                        
                        <User key = {user1.id} { ...user1 } /> 
                  ))

                }
                
             </div>
    </div>
  )
}
