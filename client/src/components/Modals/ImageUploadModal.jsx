import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ImageUploadModal = ({ onClose, onSave }) => {
    const user = useSelector(state => state.user)
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleUpload = () => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            axios.post(`/user/imageUpload/${user.user.userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    onSave(response.data.data.image);
                    onClose();
                })
                .catch(error => {
                    // Handle error
                });
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <input
                    type="file"
                    name='image'
                    onChange={handleFileChange}
                />
                <button onClick={handleUpload}>Upload Image</button>
            </div>
        </div>
    );
};

export default ImageUploadModal;
