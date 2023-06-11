import React, { useState } from 'react';

const DeleteGroupForm = () => {
  const [codegroup, setCodegroup] = useState('');
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/group/${codegroup}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('group deleted successfully');
        // Perform any additional actions on success
      } else {
        console.log('Failed to delete group');
        // Handle error cases
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Такого значения не существует или введен не тот тип данных');
      // Handle network or other errors
    }
  };

  const handleChange = (e) => {
    setCodegroup(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code group:
        <input
          type="text"
          value={codegroup}
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