import React, { useState } from 'react';

const Func = () => {
  const [education, setEducation] = useState('');
  const [supervisors, setSupervisors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/supervisors/education/${education}`);
      const data = await response.json();
      setSupervisors(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleChange = (e) => {
    setEducation(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Education:
          <input type="text" value={education} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Get Supervisors</button>
      </form>

      <h3>Supervisors:</h3>
      <ul>
        {supervisors.map((supervisor) => (
          <li key={supervisor.code_supervisor}>{supervisor.code_supervisor}</li>
        ))}
      </ul>
    </div>
  );
};

export default Func;