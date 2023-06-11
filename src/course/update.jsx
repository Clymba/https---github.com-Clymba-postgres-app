import React, { useState } from 'react';

const UpdateCourseForm = () => {
  const [formData, setFormData] = useState({
    code_course: '',
    type_of_cousre: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/course`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Course updated successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to update course');
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
        Code_course to update:
        <input
          type="text"
          name="code_course"
          value={formData.code_course}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
      Type_of_cousre:
        <input
          type="text"
          name="type_of_cousre"
          value={formData.type_of_cousre}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Update Course</button>
    </form>
  );
};

export default UpdateCourseForm;