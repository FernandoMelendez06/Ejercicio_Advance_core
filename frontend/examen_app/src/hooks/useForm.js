import React, { useState } from 'react'


export const useForm = ( initialvalues = {} ) => {
 
    const [formValues, setvalues] = useState(initialvalues);


    const reset = ()=> {

        setvalues(initialvalues);
    };


    const handleInputChange = (e)=>{

        setvalues({
            ...formValues, [e.target.name]:e.target.value

        });

    };

    return [formValues, handleInputChange,reset];

}