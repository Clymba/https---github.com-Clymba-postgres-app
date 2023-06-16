import React, { useState } from 'react';

const UpdateSupervisorForm = () => {
  const [formData, setFormData] = useState({
    code_supervisor: '',
    education: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/supervisor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Supervisor updated successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update supervisor');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while updating supervisor');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code Supervisor to update:
        <input
          type="text"
          name="code_supervisor"
          value={formData.code_supervisor}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Education:
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Update Supervisor</button>
    </form>
  );
};

export default UpdateSupervisorForm;