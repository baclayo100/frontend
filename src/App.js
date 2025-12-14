import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/api/students');
    setStudents(res.data);
  };

  const addStudent = async () => {
    await axios.post('http://localhost:5000/api/students', { name, age });
    setName('');
    setAge('');
    fetchStudents();
  };

  return (
    <div className="container mt-5">
      <h1>Student List</h1>
      <div className="mb-3">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="form-control mb-2"/>
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} className="form-control mb-2"/>
        <button className="btn btn-primary" onClick={addStudent}>Add Student</button>
      </div>
      <ul className="list-group">
        {students.map(s => (
          <li key={s.id} className="list-group-item">{s.name} - {s.age} years old</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
