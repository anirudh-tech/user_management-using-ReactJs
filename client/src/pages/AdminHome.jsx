import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUserAction, fetchUserAction, saveUserAction } from '../redux/actions/adminActions';
import EditUserModal from '../components/Modals/EditUserModal';
import toast, { Toaster } from 'react-hot-toast';
import { logoutUserAction } from '../redux/actions/userActions';
import AddUserModal from '../components/Modals/AddUserModal';

const AdminHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUserAction())
  }, [users, isEditModalOpen, isAddUserModalOpen,searchTerm]);

  const handleDelete = (userId) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this user?');

    if (confirmDeletion) {
      dispatch(deleteUserAction(userId))
    }
  };

  const handleSaveEdit = (userId, editedName, editedEmail) => {
    dispatch(saveUserAction(userId, editedName, editedEmail))
    setEditModalOpen(false)
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleAddUserModal = (userData) => {
    dispatch(addUser(userData))
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleAddUser = () => {
    setAddUserModalOpen(true)
  }

  const handleLogout = () => {
    dispatch(logoutUserAction(navigate))
  }

  // Filter users based on search term
  const filteredUsers = users.users?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto">
        <Toaster />
        <div className='bg-blue-100 h-[80px]'>
          <h1 className="text-3xl text-center p-6 font-serif mb-4">ADMIN DASHBOARD</h1>
        </div>
        <div className='text-right me-6'>
          <button className='bg-blue-500 p-3 mt-3 rounded' onClick={handleLogout} >LOGOUT</button>
        </div>
        <div className='text-right me-6'>
        </div>
        <div className='text-right me-6'>
          <button className='bg-green-500 p-2 mt-3 me-3 rounded' onClick={handleAddUser} >ADD USER</button>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-[300px] p-2 border-green-600 border rounded my-3'
        />
        </div>
        <table className="min-w-[1500px] ms-5 bg-white border my-4 border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-0 border-b">Name</th>
              <th className="py-2 px-0 border-b">Email</th>
              <th className="py-2 px-0 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?._id} className="border-b">
                <td className="py-2 px-4">{user?.username}</td>
                <td className="py-2 px-4">{user?.email}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 mr-2 rounded hover:bg-blue-700"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditModalOpen && (
          <EditUserModal
            user={selectedUser}
            onSave={handleSaveEdit}
            onClose={handleCloseEditModal}
          />
        )}
      </div>
      {isAddUserModalOpen && (
        <AddUserModal onClose={() => setAddUserModalOpen(false)} onSave={handleAddUserModal} />
      )}
    </>
  );
};

export default AdminHome;
