import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';

function Register() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate('/login');

      }
      else {
        message.error(response.message);

      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);

    }
  };
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
      navigate('/');
    }
  },[]);
  return (
    <>
      <div className="h-screen bg-primary flex item-center justify-center">
        <div className="authentication-form bg-white p-3 rounded">
          <h1 className='text-secondary text-2xl font-bold mb-1'>
            MCA LIBRARY - REGISTER
          </h1>
          <Form layout='vertical' onFinish={onFinish} >
            <Form.Item label='Name' name='name'
             rules={[
              {
                required:true,
                message:'Please input your name',
              },
            ]}>
              <input type='text' placeholder='Name' />
            </Form.Item>
            <Form.Item label='USN' name='usn'
             rules={[
              {
                required:true,                          //usn
                message:'Please input your USN',
              },
            ]}>
              <input type='usn' placeholder='USN' />
            </Form.Item>
            <Form.Item label='Email' name='email'
             rules={[
              {
                required:true,
                message:'Please input your email',
              },
            ]}>
              <input type='email' placeholder='Email' />
            </Form.Item>
            <Form.Item label='Phone number' name='phone'
             rules={[
              {
                required:true,
                message:'Please input your number',
              },
            ]}>
              <input type='number' placeholder='Phone number' />
            </Form.Item>

            <Form.Item label='Password' name='password'>
              <input type='password' placeholder='password' />
            </Form.Item>

            <div className='text-center at-2 flex flex-coloumn gap-1 ' >
              <Button title='Register' type='submit' />
              <Link to='/login'
                className='text-primary text-sm underline'>Already have an account? Click here to Login</Link>

            </div>

          </Form>

        </div>
      </div>
    </>
  )
}

export default Register   