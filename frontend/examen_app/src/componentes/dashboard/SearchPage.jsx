import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm';
import { User } from './user';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

import Swal from 'sweetalert2';


// import { HeroCard } from '../components';
// import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  // const location = useLocation();
  const { startLogout, BuscarUsuarios , ActualizarUsuarios , DeleteUsuario } = useAuthStore();
  // const { q = '' } = queryString.parse( location.search );
  const [ usuario, setUser] = useState([]);
  // const heroes = getHeroesByName(q);

  // const showSearch = (q.length === 0);
  // const showError  = (q.length > 0) && heroes.length === 0;


  const [  searchText, onInputChange ] = useForm({
     username: '',
  });


  const [ formValues, handleInputChange ] = useForm ({

    update_email:'',
    update_password:'',
  });

  const [ formValuesdelete, handleInputChangedelete ] = useForm ({

    password_administrador:'',
  
  });


  const { update_email, update_password } = formValues;
  const { password_administrador } = formValuesdelete;
  const { username } = searchText;


  const onSearchSubmit =  async(e) => {

    e.preventDefault();
    console.log('entro por aki')
    console.log( username )


    const user = await BuscarUsuarios(username);

    if (user.msg){

      Swal.fire('Eror', user.msg, 'error');

    }

    setUser( user );

    console.log(user);

    // if ( searchText.trim().length <= 1 ) return;
    // navigate(`?q=${ searchText }`);
  }

  const handleUpdate = (e) => {
  
    e.preventDefault();
    console.log( username, update_email, update_password);
    const user = ActualizarUsuarios(username, update_email, update_password);
    
  }

  const handleDelete = (e) => {
  
    e.preventDefault();
    console.log( username);
    const delete_usuario = DeleteUsuario( username, password_administrador);
  }

  const onLogout = () => {
    startLogout();
    navigate('/auth/login', {
        replace: true
    });
  }

  // useEffect(() => {
    
  // }, [])



  return (
    <>
      <h1>Buscador de Usuario</h1> 
      <hr />

      <div className="row " >

          <div className="col-5">
            <h4>Buscar Usuario </h4>
            <hr />

             <button
                className="btn"
                onClick={ onLogout }
                > 
                Logout
              </button>


            <form onSubmit= { onSearchSubmit }>

              <input 
                type="text"
                placeholder="Username"
                className="form-control"
                name="username"
                autoComplete="off"
                value={ username }
                onChange={ onInputChange }
              />

              {/* <button className="btn btn-outline-primary mt-1">
                 esto
              </button> */}

            </form>

            <hr />
            <div className="col-7">


            <h4>Modificar Usuario </h4>
            <hr />

            
                <form onSubmit = { handleUpdate }>

                            <input
                            type='text'
                            placeholder='Nuevo Correo'
                            name='update_email'
                            className='auth__input'
                            value = { update_email }
                            onChange = { handleInputChange }
                            />


                            <input
                            type='password'
                            placeholder='Nueva contraseña'
                            name='update_password'
                            className='auth__input'
                            value = { update_password }
                            onChange = { handleInputChange }

                            />

                            <button
                            type="submit"
                            className='btn btn-primary'
                            // disabled={ true }
                            >
                              Actualizar Datos
                            </button>

                </form>

             <hr /> 

            </div>

            <div className="col-7">
                <h4>Borrar Usuario </h4>
                <hr />

                <form onSubmit = { handleDelete }>

                       <input
                        type='password'
                        placeholder='Password Administrador'
                        name='password_administrador'
                        className='auth__input'
                        value = {  password_administrador}
                        onChange = { handleInputChangedelete }
                        />

                        <button
                        type="submit"
                        className='btn btn-danger'
                        // disabled={ true }
                        >
                          Borrar Usuario
                        </button>

                </form>

            </div>


          </div>

                <div className="col-7">
                  <h4>Resultado</h4>
                  <hr />

               


                    <div className="row text-white ">

                      {                                               
                              <User  key = {usuario.id} { ...usuario } /> 
                      } 

                      </div>


                </div>

          
      </div>
      

    </>
  )
}
