import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserAction } from '../../redux/actions/userActions';

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(user) {
            navigate('/')
        }
    },[user])
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

      const handleChange = (e) => {
        const {name , value} = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value}))
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUserAction(formData, navigate))

    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-gray-900 to-white items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96 font-serif">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='text-center'>
                    <button
                        type="submit"
                        className="bg-blue-500 text-center text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                    </div>
                    <p className='text-center mt-4'>Dont have an Account ? </p>
                    <p onClick={() => navigate('/signup')} className='text-center text-blue-500 underline cursor-pointer hover:text-blue-950 '>Signup</p>
                </form>
            </div>
        </div>
    )
}

export default LoginForm