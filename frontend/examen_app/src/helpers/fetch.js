const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`; //direccionhtpps +endpint
    // console.log (url);
    
    // console.log( data)
    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        console.log ('entro');
        return fetch( url, {
            
            method,
            headers: {
                
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify( data )
        });
    }
}


export const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';
    const JWTtoken = `JWT ${token}`

    console.log(JWTtoken);
    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'Authorization': JWTtoken
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': JWTtoken
            },
            body: JSON.stringify( data )
        });
    }
}




