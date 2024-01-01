import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUserAction } from '../redux/actions/userActions'
import axios from 'axios'
import ImageUploadModal from '../components/Modals/ImageUploadModal'
axios.defaults.baseURL = 'http://localhost:3000';


function Home() {
    const user = useSelector(state => state.user)
    // const [image, setImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null)
    useLayoutEffect(() => {
        axios.get(`/user/userDetails/${user.user.userId}`)
            .then((result) => {
                if (result.data.status === 'ok') {
                    setUserDetails(result.data.data.user)
                }
                console.log(userDetails, "user details")
            })
    }, [user])

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    // const updateProfileImage = () => {
    //     document.getElementById('fileInput').click();
    // };

    // const handleFileChange = (e) => {
    //     const selectedImage = e.target.files[0];
    //     setImage(selectedImage);
    // }

    // const handleUpload = () => {
    //     if (image) {
    //         const formData = new FormData();
    //         formData.append('image', image);
    //         axios.post(`/user/imageUpload/${user.user.userId}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //             .then(response => {
    //                 console.log(response.data.data.image, "responseee")
    //                 setUserDetails((prevUserDetails) => ({
    //                     ...prevUserDetails,
    //                     image: response.data.data.image,
    //                 }));
    //             })
    //             .catch(error => {
    //             });
    //     }
    // };
    const handleUpload = (newImage) => {
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            image: newImage,
        }));
    };

    const handleLogout = () => {
        dispatch(logoutUserAction(navigate))
    }
    return (
        <>
        <div className='w-full min-h-screen flex bg-slate-200 items-center justify-center'>
            <div className='w-[500px] h-3/4 py-8 rounded shadow bg-white flex flex-col items-center justify-center'>
                <img
                className='w-[120px] rounded-full'
                    src={
                        userDetails?.image
                        ? `http://localhost:3000/uploads/${userDetails?.image}`
                        : "/images/profile.jpeg"
                    }
                    alt=""
                    onClick={openModal}
                    style={{ cursor: 'pointer' }}
                />
                <button className='bg-blue-400 p-2 my-2 rounded hover:bg-blue-700' onClick={openModal}> Upload Image </button>
                <h4 className='font-semibold'>Name : {userDetails?.username} </h4>
                <h4>Email : {userDetails?.email} </h4>
                <h4>Account created at :{userDetails?.createdAt} </h4>
                    <button className='my-5 bg-red-500 p-3 rounded' onClick={handleLogout}> LOGOUT </button>
                {isModalOpen && (
                    <ImageUploadModal onClose={closeModal} onSave={handleUpload} />
                )}
            </div>
        </div>
        </>
        
    )
}

export default Home