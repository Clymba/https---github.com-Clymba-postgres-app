import React, { useState } from 'react';

const DeleteUserForm = () => {
  const [codeUser, setCodeUser] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User deleted successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete user');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while deleting the user');
    }
  };

  const handleChange = (e) => {
    setCodeUser(e.target.value);
  };

  return (
    <div>
      <label>
        Code_user to delete:
        <input
          type="text"
          value={codeUser}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUserForm;