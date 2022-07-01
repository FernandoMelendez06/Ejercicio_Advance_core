import { useDispatch, useSelector } from "react-redux";



import { clearErrorMessage, onChecking, onLogin, onLogout } from "../stores/auth/authSlice";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import Swal from 'sweetalert2';



export const useAuthStore = () => {


    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    const startLogin = async( username, password ) => {

            dispatch( onChecking() );

            const endpoint = `login/buscar/${ username }`
            const resp = await fetchSinToken ( endpoint,{}, 'GET');
            const body = await resp.json();   
            // console.log(body)

            if ( body.ok ) {

                    try {

                        const resp = await fetchSinToken ('auth',{ username , password }, 'POST');
                        const body = await resp.json(); 
                        if ( body.access_token ) {
                            localStorage.setItem('token',body.access_token);
                            localStorage.setItem('token-init-date', new Date().getTime() );
                            console.log(body.access_token);
                            dispatch( onLogin({ name: body.name, uid: body.uid }) ); 
                        }

                    } catch (error) {
                        
                        Swal.fire('Error', body.error , 'error')
                        // console.log(body.error);
                        dispatch( onLogout('Credenciales incorrectas') );
                        setTimeout(() => {
                            dispatch( clearErrorMessage() );
                        }, 10);
                    }

             }else {

                Swal.fire('Error', body.msg , 'error')
                dispatch( onLogout('Problemas con el login') );
                setTimeout(() => {
                    dispatch( clearErrorMessage() );
                }, 10);

             }
    


        }


  
    const startRegister = async( username, email, password  ) => {

            dispatch( onChecking() );
            
            
            const resp = await fetchSinToken ('auth/register', { username, email , password }, 'POST');
            const body = await resp.json();


            console.log( body )
            
             if ( body.ok ) {

                    Swal.fire( 'Bien!', body.msg, 'success' )

                    dispatch( onChecking() );
                    try {
                        const resp = await fetchSinToken ('auth',{ username , password }, 'POST');
                        const body = await resp.json(); 

                        if ( body.access_token) {
                                localStorage.setItem('token',body.access_token);
                                localStorage.setItem('token-init-date', new Date().getTime() );
                                dispatch( onLogin({ name: body.name, uid: body.uid }) );
                            }
                    } catch (error) {

                        dispatch( onLogout('Problemas con el ingreso') );
                        setTimeout(() => {
                            dispatch( clearErrorMessage() );
                        }, 10);
                        
                    }
                       
                }
           

            if ( body.ok === false) {
                 
                dispatch( onLogout( body.msg|| '--' ) );
                setTimeout(() => {

                    dispatch( clearErrorMessage() );
                }, 10);

                }
            

        }




    const checkAuthToken = async() => {

        const token = localStorage.getItem( 'token' );
        if ( !token ) return dispatch( onLogout() );

        try {
            
            const resp = await fetchConToken( 'auth' );
            const body = await resp.json();
            localStorage.setItem('token',body.access_token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: body.name, uid: body.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch( onLogout() );
    }

    

    const ListaUsuarios = async() => {

 
        const resp = await fetchConToken ('dashboard/lista/usuarios', { }, 'GET');
        const body = await resp.json();
        return(body.user);
    }

    

    const BuscarUsuarios = async( username ) => {
        
        
        const endpoint = `dashboard/buscar/${ username }`;
        const resp = await fetchConToken ( endpoint, {}, 'GET');
        const body = await resp.json();   
        return(body);

    }

    const ActualizarUsuarios = async( username, email, password ) => {

        
        console.log( username,email,password )
        const resp = await fetchConToken ( '/dashboard/edit/profile', { username, email, password }, 'PUT');
        const body = await resp.json();   
        console.log(body)
     
        // return(body);
    }

    const DeleteUsuario = async( username, password ) => {

        
        console.log( username, password);
        const resp = await fetchConToken ( '/dashboard/edit/delete', { username, password }, 'DELETE');
        const body = await resp.json();   
        console.log(body)
     
        // return(body);
    }




    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 

        //* Métodos
        DeleteUsuario,
        ActualizarUsuarios,
        ListaUsuarios,
        BuscarUsuarios,
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }


}