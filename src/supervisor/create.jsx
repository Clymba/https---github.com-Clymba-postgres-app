import React, { useState, useEffect } from 'react';

const CreateSupervisorForm = () => {
  const [formData, setFormData] = useState({
    code_supervisor: '',
    fk_code_user: '',
    education: '',
    profile_education: '',
    time_hours: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user');
      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      setError('An error occurred while fetching users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/supervisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Supervisor created successfully');
        // Perform any additional actions on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create supervisor');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred while creating supervisor');
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
        Code Supervisor:
        <input
          type="text"
          name="code_supervisor"
          value={formData.code_supervisor}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        User Code:
        <select name="fk_code_user" value={formData.fk_code_user} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.code_user} value={user.code_user}>
              {user.code_user}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Education:
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Profile Education:
        <input
          type="text"
          name="profile_education"
          value={formData.profile_education}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Time Hours:
        <input
          type="text"
          name="time_hours"
          value={formData.time_hours}
          onChange={handleChange}
        />
      </label>
      <br />
      {error && <p>Error: {error}</p>}
      <button type="submit">Create Supervisor</button>
    </form>
  );
};

export default CreateSupervisorForm;
