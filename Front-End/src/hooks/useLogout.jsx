import React from 'react'
import {useAuthContext} from './useAuthContext';
import { googleLogout } from "@react-oauth/google";

googleLogout();

export const useLogout = () => {
 const {dispatch}= useAuthContext()
const logout=()=>{
    //remove user from storage
    localStorage.removeItem('user')
    localStorage.clear();
    //dispatch logout action
    dispatch({type:'LOGOUT'})
    googleLogout();
}

return {logout}

}