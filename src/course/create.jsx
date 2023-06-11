import React, { useState } from 'react';

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    code_course: '',
    date_of_start: '',
    date_of_end: '',
    type_of_cousre: '',
    status_of_course: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Course added successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to add course');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Введено ошибочное или пустое поле');
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
        Code_course:
        <input
          type="text"
          name="code_course"
          value={formData.code_course}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date_of_start:
        <input
          type="date"
          name="date_of_start"
          value={formData.date_of_start}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date_of_end:
        <input
          type="date"
          name="date_of_end"
          value={formData.date_of_end}
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
      <label>
        Status_of_course:
        <input
          type="text"
          name="status_of_course"
          value={formData.status_of_course}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourseForm;