import React, { useState } from 'react';

const DeleteGroupForm = () => {
  const [code_group, setCodegroup] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code_group) {
      setError('Please enter the group code');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/group/${code_group}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('group deleted successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete group');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while deleting the group');
    }
  };

  const handleChange = (e) => {
    setCodegroup(e.target.value);
  setError('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code group:
        <input
          type="text"
          value={code_group}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Delete group</button>
    </form>
  );
};

export default DeleteGroupForm;