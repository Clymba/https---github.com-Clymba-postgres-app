import React, { useState } from 'react';

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    code_user: '',
    name_: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('user updated successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update user');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while updating user');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code user to update:
        <input
          type="text"
          name="code_user"
          value={formData.code_user}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        name_:
        <input
          type="text"
          name="name_"
          value={formData.name_}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;