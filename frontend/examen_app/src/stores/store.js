import { authSlice } from './auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';





export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer
       
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})





