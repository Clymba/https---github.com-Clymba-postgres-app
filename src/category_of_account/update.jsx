import React, { useState } from 'react';

const UpdateCategoryForm = () => {
  const [formData, setFormData] = useState({
    code_category: '',
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
      const response = await fetch(`http://localhost:8080/api/category_of_account`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Category updated successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update category');
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
        Code Category to update:
        <input
          type="text"
          name="code_category"
          value={formData.code_category}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name_c"
          value={formData.name_c}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Update Category</button>
    </form>
  );
};

export default UpdateCategoryForm;