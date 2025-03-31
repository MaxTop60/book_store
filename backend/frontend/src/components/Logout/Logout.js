import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Logout = () => {
    useEffect(()=> {

        (async () => {
          try{
            localStorage.clear();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/book_store/auth'
          }catch(e){
            console.log('logout not work',e)
          }
        })();
    },[]);

    return (
        <></>
    )
}
 
export default Logout;