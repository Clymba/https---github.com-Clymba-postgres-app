import React, { useState, useEffect } from 'react';

const CreateGroupForm = () => {
  const [formData, setFormData] = useState({
    code_group: '',
    fk_code_course: '',
    name_c: '',
  });

  const [courseOptions, setCourseOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch course options from API and update the state
    fetchCourseOptions();
  }, []);

  const fetchCourseOptions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/course');
      const data = await response.json();
      setCourseOptions(data);
    } catch (error) {
      console.log('Error:', error);
      setError('Failed to fetch course options');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create group');
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
        Code_group:
        <input
          type="number"
          name="code_group"
          value={formData.code_group}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Fk_code_course:
        <select
          name="fk_code_course"
          value={formData.fk_code_course}
          onChange={handleChange}
        >
          <option value="">Select a course</option>
          {courseOptions.map((course) => (
            <option key={course.code_course} value={course.code_course}>
              {course.code_course}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Name_c:
        <input
          type="text"
          name="name_c"
          value={formData.name_c}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Create Group</button>
    </form>
  );
};

export default CreateGroupForm;