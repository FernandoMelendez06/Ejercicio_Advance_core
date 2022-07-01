import React, { useEffect } from 'react'

import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';



export const RegisterScreen = () => {
 
  
  
  const { errorMessage, startRegister } = useAuthStore();



  const [ formValues, handleInputChange ] = useForm ({

       username:'',
       email: '',
       password:'',
       password2:''
       
      })

  const { username, email, password , password2 } = formValues;


  const handleRegister = (e) => {

   e.preventDefault();

     if ( password !== password2 ) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        startRegister( username, email, password );

  }

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire( 'Error en la autenticación', errorMessage, 'error');
    }    
  }, [ errorMessage ])

 

  return (


    <div className='auth__main'>
      
      <div className = "auth__box-container">
        
        
        <h1 className='auth__tittle'>Registro Usuario </h1>

            <form onSubmit = { handleRegister }>

              {/* {
                  errorMessage &&
                  (
                    <div className='auth__alert-error'>
                          { errorMessage }
                    </div> 
                  )
              } */}

              <input
                type='text'
                placeholder='Username'
                name='username'
                className='auth__input'
                autoComplete='off'
                values = { username }
                onChange = { handleInputChange }
              />
            
              <input
                  type='text'
                  placeholder='Email'
                  name='email'
                  className='auth__input'
                  autoComplete='off'
                  values = { email }
                  onChange = { handleInputChange }
                />

              <input
                type='password'
                placeholder='Password'
                name='password'
                className='auth__input'
                autoComplete='off'
                values = { password }
                onChange = { handleInputChange }
              
              />

              <input
                type='password'
                placeholder='Confirmar Password'
                name='password2'
                className='auth__input'
                autoComplete='off'
                values = { password2 }
                onChange = { handleInputChange }
              />


              <button
                type="submit"
                className='btn btn-primary mb-5'
              >
              Registrar
              </button>
  
  
            </form>

            <Link className='link' to= '/auth/login'>
                ya tiene una cuenta?
            </Link>



      </div>

    </div>
  )
}
