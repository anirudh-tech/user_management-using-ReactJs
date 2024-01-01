import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    // if (user) {
    //   user.role == "admin"
    //     ? navigate("/admin/dashboard")
    //     : navigate("/user/home");
    // } else {
    //   navigate("/");
    // }
  }, [user]);
  return (
    <LoginForm/>
  )
}

export default Login