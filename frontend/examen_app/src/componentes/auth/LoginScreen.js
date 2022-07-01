import React from 'react';
import { Link } from "react-router-dom";

import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';



export const LoginScreen = () => {
  

  
  const { startLogin } = useAuthStore();


  const [ formValues, handleInputChange ] = useForm ({

       username:'',
       password:'',
    });


    const {username, password } = formValues;


    const handleLogin = (e) => {
  
      e.preventDefault();
      startLogin( username, password);
     
    }


  return (
    

    <div className='auth__main'>

      
        <div className = "auth__box-container">
          
          <h3 className ='auth__tittle'>Login</h3>

          <form onSubmit = { handleLogin }>

            <input
              type='text'
              placeholder='Username'
              name='username'
              className='auth__input'
              value = { username }
              onChange = { handleInputChange }
            />
          

            <input
              type='password'
              placeholder='Password'
              name='password'
              className='auth__input'
              value = { password }
              onChange = { handleInputChange }
            
            />
            
            <button
              type="submit"
              className='btn btn-primary'
            >
            Ingresar
            </button>

          </form>

          <Link className='link' to= '/auth/register'>
            Registrar una nueva cuenta
          </Link>


        </div>
      
        
    </div> 
  )
}
