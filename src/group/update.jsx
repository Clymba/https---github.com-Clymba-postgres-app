import React, { useState } from 'react';

const UpdateGroupForm = () => {
  const [formData, setFormData] = useState({
    code_group: '',
    name_c: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/group', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Group updated successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to update group');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Такого значения не существует или попытка обновить не тот тип данных');
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
        Code_group:
        <input
          type="number"
          name="code_group"
          value={formData.code_group}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name_c:
        <input
          type="text"
          name="name_c"
          value={formData.name_c}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Update Group</button>
    </form>
  );
};

export default UpdateGroupForm;