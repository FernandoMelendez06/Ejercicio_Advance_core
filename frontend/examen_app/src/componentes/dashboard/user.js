import React from 'react'

export const User = ( props ) => {
 
    return (

        <div className="col-lg-4">
              <div className="text-center card-box  "></div>
                <div className="member-card pt-2 pb-2">
                  <div className="thumb-lg member-thumb mx-auto text-pink">
                      <img src={props.img}
                          className="rounded-circle img-thumbnail"
                          alt="profile-image" />
                  </div> 

                    <div className="">
                        <h1 className="text-muted"> {props.username} </h1>
                        <p className="text-muted">Id: { props.id}</p>
                        <p className="text-muted">Email: {props.email}</p>
                        <p className="text-muted">Creado: {props.Creado}</p>
                        <p className="text-muted">Modificacion: { props.Modificacion }</p>
                        
                          {  props.Deshabilitado === true ?
                                <p className="text-muted">Deshabilitado </p> : <p className="text-muted"> Habilitado </p>
                          }
                    </div>
                </div>
          </div>
     )
}




 
    
 
