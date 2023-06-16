import React, { useState, useEffect } from 'react';

const CreateUserForm = () => {
  const [code_user, setCodeUser] = useState('');
  const [fk_code_category, setCategory] = useState('');
  const [e_mail, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [name_, setName] = useState('');
  const [family, setFamily] = useState('');
  const [patronymique, setPatronymic] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/category_of_account');
      if (response.ok) {
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      setError('Создано существующее значение');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code_user || !fk_code_category || !e_mail || !gender || !name_ || !family || !patronymique) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code_user: code_user,
          fk_code_category: fk_code_category,
          e_mail: e_mail,
          gender,
          name_,
          famille: family,
          patronymique
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred while creating the user');
      }

      const data = await response.json();
      console.log('User created:', data);
      setCodeUser('');
      setCategory('');
      setEmail('');
      setGender('');
      setName('');
      setFamily('');
      setPatronymic('');
      setError('');
    } catch (error) {
      console.error('Error creating user:', error.message);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Code User:
        <input type="text" value={code_user} onChange={(e) => setCodeUser(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={fk_code_category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.code_category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Email:
        <input type="email" value={e_mail} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Gender:
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
      </label>
      <label>
        Name:
        <input type="text" value={name_} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Family:
        <input type="text" value={family} onChange={(e) => setFamily(e.target.value)} />
      </label>
      <label>
        Patronymic:
        <input type="text" value={patronymique} onChange={(e) => setPatronymic(e.target.value)} />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;