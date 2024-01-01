import axios from 'axios'
import {toast} from 'react-hot-toast'
axios.defaults.baseURL = 'http://localhost:3000';

export const userSetAction = (userData) => {
    return {
        type: 'REGISTER_USER',
        payload: userData
    }
}

export const userLogoutAction = () =>{
    return {
        type:'LOGOUT_USER',
        payload:'',
    }
}


export const registerUserAction = (userData,navigate) => {
    return (dispatch) => {
        axios.post("/user/signup",userData, { withCredentials: true })
        .then((result) =>{
            if(result.data.status === 'ok') {
                const userData = result.data.data
                dispatch(userSetAction(userData))
                toast.success("successfully registered")
                console.log('reached here',userData)
                navigate('/',{replace: true})
            } else {
                toast.error(result.data.message);
            }
        })
        .catch((error) =>{
            toast.error(error.message);
        })
    }
}
export const loginUserAction = (userData, navigate) => {
    return (dispatch) => {
        axios.post("user/login",userData, {withCredentials: true})
        .then((result) => {
            if(result.data.status === 'ok') {
                const userData = result.data.data
                dispatch(userSetAction(userData))
            } else {
                toast.error(result.data.message);
            }
        })
    }
}

export const logoutUserAction = (navigate) => {
    return (dispatch) => {
        axios.get("/user/logout", { withCredentials: true }).then(() => {
            dispatch(userLogoutAction())
            navigate('/')
        })
    }
}
