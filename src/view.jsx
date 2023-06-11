import React, { useState, useEffect } from 'react';

function TeacherCountForm() {
  const [teacherCount, setTeacherCount] = useState(null);

  useEffect(() => {
    fetchTeacherCount();
  }, []);

  const fetchTeacherCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/view_teacher_count');
      const data = await response.json();

      setTeacherCount(data[0].teacher_count); // Updated line
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Teacher Count</h3>
      {teacherCount !== null ? (
        <p>Number of Teachers: {teacherCount}</p>
      ) : (
        <p className='Loading'>Loading...</p>
      )}
      <button onClick={fetchTeacherCount}>Refresh</button>
    </div>
  );
}

export default TeacherCountForm;