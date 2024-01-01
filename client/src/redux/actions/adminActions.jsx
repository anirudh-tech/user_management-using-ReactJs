import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
import {toast} from 'react-hot-toast'


export const setFetchedUser = (users) => {
    return{
        type: 'FETCH_USER',
        payload: users
    }
}



export const fetchUserAction = () => {
    return (dispatch) => {
        axios.get('/admin/fetchUsers', { withCredentials: true }).then((response) => {
            if (response.data.status === 'ok') {
              dispatch(setFetchedUser(response?.data?.users));
            }
          });
    }
}

export const saveUserAction = (userId, editedName, editedEmail) => {
    return (dispatch) => {
        const userData = {editedEmail, editedName}
        axios.post(`/admin/saveUser/${userId}`, userData,  { withCredentials: true })
        .then((result) => {
            if(result.data.status === 'ok'){
                dispatch(fetchUserAction())
                toast.success("successfully edited")

            } else {
                toast.error(result.data.message)
            }
        })
        .catch((error) => {
            toast.error(result.data.status)
        })
    }
}

export const deleteUserAction = (userId) => {
    return (dispatch) => {
        axios.delete(`/admin/deleteUser/${userId}`, { withCredentials: true})
        .then((result) => {
            if(result.data.status === 'ok') {
                dispatch(fetchUserAction())
                toast.success('successfully deleted')
            } else {
                toast.error(result.data.message)
            }
        })
        .catch((error) => {
            toast.error(error.message)
        })
    }
}

export const addUser = (userData) => {
    return (dispatch) => {
        axios.post('/admin/addUser',userData, { withCredentials: true})
        .then((result) => {
            if(result.data.status === 'ok') {
                dispatch(fetchUserAction())
                toast.success('successfully added user')
            }else{
                toast.error(result.data.message)
            }
        })
        .catch((error) => {
            toast.error(error.message)
        })
    }
}