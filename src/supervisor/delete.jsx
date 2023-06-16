import React, { useState } from 'react';

const DeleteSupervisorForm = () => {
  const [codeSupervisor, setCodeSupervisor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codeSupervisor) {
      setError('Please enter the supervisor code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/supervisor/${codeSupervisor}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Supervisor deleted successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete supervisor');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while deleting supervisor');
    }
  };

  const handleChange = (e) => {
    setCodeSupervisor(e.target.value);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code Supervisor to delete:
        <input
          type="text"
          value={codeSupervisor}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Delete Supervisor</button>
    </form>
  );
};

export default DeleteSupervisorForm;