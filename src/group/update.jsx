import React, { useState } from 'react';

const UpdateGroupForm = () => {
  const [formData, setFormData] = useState({
    code_group: '',
    name_c: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/group`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('group updated successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update group');
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
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code group to update:
        <input
          type="text"
          name="code_group"
          value={formData.code_group}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        name_c:
        <input
          type="text"
          name="name_c"
          value={formData.ty}
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