import React, { useState } from 'react';

const DeleteCourseForm = () => {
  const [codeCourse, setCodeCourse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/course/${codeCourse}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Course deleted successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to delete course');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('Такого значения не существует или введен не тот тип данных');
    }
  };

  const handleChange = (e) => {
    setCodeCourse(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code_course to delete:
        <input
          type="text"
          value={codeCourse}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Delete Course</button>
    </form>
  );
};

export default DeleteCourseForm;