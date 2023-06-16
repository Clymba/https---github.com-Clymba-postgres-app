import React, { useState } from 'react';

const DeleteUserForm = () => {
  const [codeuser, setCodeuser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codeuser) {
      setError('Please enter the user code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user/${codeuser}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('user deleted successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete user');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while deleting user');
    }
  };

  const handleChange = (e) => {
    setCodeuser(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code user to delete:
        <input
          type="text"
          value={codeuser}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Delete user</button>
    </form>
  );
};

export default DeleteUserForm;