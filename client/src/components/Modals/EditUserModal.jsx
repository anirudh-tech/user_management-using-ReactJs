import React, { useState } from 'react';

const EditUserModal = ({ user, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleSave = () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      console.error("Name and Email are required");
      return;
    }
    onSave(user._id, editedName, editedEmail);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <div className="mb-4">
          <label htmlFor="editedName" className="block text-sm font-semibold text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="editedName"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="editedEmail" className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="editedEmail"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
          >
            Save
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
