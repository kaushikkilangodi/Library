import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
// import { response } from 'express';
import { GetLoggedInUserDetails, GetUserDetails } from '../apicalls/users';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';

function ProtectedRoute({ children }) {

    const navigate = useNavigate();
    const {user}=useSelector(state=>state.users)
    const dispatch= useDispatch();

    const validateUserToken = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetLoggedInUserDetails()
            dispatch(HideLoading());
            if (response.success) {
                dispatch(SetUser(response.data));
            }
            else {
                message.error(response.message);
            }
        } catch (error) {

            message.error(error.message)
            // navigate('/login');

        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }
        else {
            validateUserToken();
        }

    }, []);
    
    return(
    <div>
        {user &&(
            <div className='p-1'>
            <div className='header p-3 bg-primary flex justify-between rounded items-center'>
                <h1 className='text-2xl text-white font-bold cursor-pointer'
                onClick={()=>navigate('/')}>
                    MCA LIBRARY
                </h1>
                <div className='flex item-center gap-1 bg-white p-1 rounded '>
                <i className="ri-shield-user-line "></i>
               <span className='text-sm underline '
               onClick={()=> navigate("/profile")}>
                {user.name.toUpperCase()}
               
               </span>
               <i className="ri-logout-box-r-line ml-2 cursor-pointer"
               onClick={()=>{
                localStorage.removeItem("token");
                navigate('/login');
               }}></i>
                </div>
            </div>
            <div className='content mt-1'>
                {children}
            </div>
            </div>
      )  }
    </div>
    );
}

export default ProtectedRoute;