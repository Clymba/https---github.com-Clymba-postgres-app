import React, { useState, useEffect } from 'react';

const CreateGroupForm = () => {
  const [formData, setFormData] = useState({
    code_group: '',
    fk_code_course: '',
    name_c: '' 
  });
  const [courseOptions, setCourseOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseOptions();
  }, []);

  const fetchCourseOptions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/course');
      if (response.ok) {
        const data = await response.json();
        setCourseOptions(data);
      } else {
        setError('Failed to fetch course options');
      }
    } catch (error) {
      setError('An error occurred while fetching course options');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Group created successfully');
        // Perform any additional actions on success
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create group');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while creating the group');
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
        Code group:
        <input
          type="text"
          name="code_group"
          value={formData.code_group}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        fk_code_course:
        <select
          name="fk_code_course"
          value={formData.fk_code_course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          {courseOptions.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code_course}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        name_c:
        <input
          type="text"
          name="name_c"
          value={formData.name_c}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Create group</button>
    </form>
  );
};

export default CreateGroupForm;