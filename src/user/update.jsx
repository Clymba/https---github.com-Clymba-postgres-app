import React, { useState } from 'react';

const UpdateUserForm = () => {
  const [code_user, setCodeUser] = useState('');
  const [name_, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!code_user || !name_) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    const updatedUser = {
      code_user,
      name_,
    };

    fetch(`http://localhost:8080/api/user/${code_user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User updated:', data);
        // Handle success
        // ...
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        // Handle error
        // ...
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Code User:</label>
          <input type="text" value={code_user} onChange={(e) => setCodeUser(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name_} onChange={(e) => setName(e.target.value)} />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
