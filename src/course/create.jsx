import React, { useState } from 'react';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    code_course: '', 
    date_of_start: '',
    date_of_end: '', 
    type_of_cousre: '', 
    status_of_course: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('course created successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create course');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while creating the course');
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
        Code course:
        <input
          type="text"
          name="code_course"
          value={formData.code_course}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        date_of_start:
        <input
          type="date"
          name="date_of_start"
          value={formData.date_of_start}
          onChange={handleChange}
        />
        </label>
        <label>
        date_of_end:
        <input
          type="date"
          name="date_of_end"
          value={formData.date_of_end}
          onChange={handleChange}
        />
        </label>
        <label>
        type_of_cousre:
        <input
          type="text"
          name="type_of_cousre"
          value={formData.type_of_cousre}
          onChange={handleChange}
        />
        </label>
        <label>
        status_of_course:
        <input
          type="text"
          name="status_of_course"
          value={formData.status_of_course}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Create course</button>
    </form>
  );
};

export default CreateCourseForm;