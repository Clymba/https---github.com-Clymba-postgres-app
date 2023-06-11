import React, { useState } from 'react';

const CreateUserForm = () => {
  const [code_user, setCodeUser] = useState('');
  const [fk_code_category, setCategory] = useState('');
  const [e_mail, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [name_, setName] = useState('');
  const [famille, setFamille] = useState('');
  const [patronymique, setPatronymique] = useState('');
  const [biography, setBiography] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = {
      code_user,
      fk_code_category,
      e_mail,
      gender,
      name_,
      famille,
      patronymique,
      biography
    };

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
        return response.json();
      })
      .then(data => {
        console.log('User created:', data);
        // Handle success
        // ...
      })
      .catch(error => {
        console.error('Error creating user:', error);
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
          <label>Category:</label>
          <input type="text" value={fk_code_category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={e_mail} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name_} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Famille:</label>
          <input type="text" value={famille} onChange={(e) => setFamille(e.target.value)} />
        </div>
        <div>
          <label>Patronymique:</label>
          <input type="text" value={patronymique} onChange={(e) => setPatronymique(e.target.value)} />
        </div>
        <div>
          <label>Biography:</label>
          <input type="text" value={biography} onChange={(e) => setBiography(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
