import { useLayoutEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/Signup'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { userSetAction } from './redux/actions/userActions'
import Home from './pages/Home'
import AdminHome from './pages/AdminHome'
axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    if (!user.isAuthenticated) {
      axios.get('/user/authentication', { withCredentials: true })
        .then((result) => {
          if (result.data.status === "ok") {
            console.log(result.data.data, "result here")
            const { username, userId, role } = result.data.data
            console.log("heree", result)
            const userData = { username, userId, role }
            dispatch(userSetAction(userData))
          }
        })
    }
  }, [user])
  return (
    <>
      <Routes>
      <Route
          path="*"
          element={
            <h1 className="font-bold text-3xl flex justify-center  h-screen items-center">
              <div>No Page Found</div>
            </h1>
          }
        ></Route>
      {user.isAuthenticated ? (
        <>
          {user.user.role === 'user' ? (
            <Route path="/" element={<Home />} />
          ) : user.user.role === 'admin' ? (
            <Route path="/" element={<AdminHome />} />
          ) : null}
          <Route path="/signup" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
    </Routes>
    </>
  )
}

export default App
