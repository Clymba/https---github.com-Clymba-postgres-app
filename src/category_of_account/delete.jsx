import React, { useState } from 'react';

const DeleteCategoryForm = () => {
  const [code_сategory, setCodeCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code_сategory) {
      setError('Please enter the category code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/category_of_account/${code_сategory}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Category deleted successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete category');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while deleting the category');
    }
  };

  const handleChange = (e) => {
    setCodeCategory(e.target.value);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code Category:
        <input
          type="text"
          value={code_сategory}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Delete Category</button>
    </form>
  );
};

export default DeleteCategoryForm;