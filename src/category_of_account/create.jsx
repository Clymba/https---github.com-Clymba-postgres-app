import React, { useState } from 'react';

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    code_category: '',
    name_c: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/category_of_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Category created successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create category');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while creating the category');
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
        Code Category:
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
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CreateCategoryForm;