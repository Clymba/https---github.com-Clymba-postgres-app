import React, { useState } from 'react';

const DeleteCourseForm = () => {
  const [code_course, setCodecourse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code_course) {
      setError('Please enter the course code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/course/${code_course}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('course deleted successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete course');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while deleting the course');
    }
  };

  const handleChange = (e) => {
    setCodecourse(e.target.value);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code course:
        <input
          type="text"
          value={code_course}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Delete course</button>
    </form>
  );
};

export default DeleteCourseForm;