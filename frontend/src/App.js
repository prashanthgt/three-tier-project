import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(() => setStudents([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, age: age ? parseInt(age) : null, course };
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(saved => {
        setStudents([...students, saved]);
        setName(''); setAge(''); setCourse('');
      })
      .catch(err => alert('Error saving student'));
  };

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', marginTop: '30px' }}>
      <h1 style={{ color: '#2E86C1' }}>🎓 Student Management</h1>

      <form onSubmit={handleSubmit} style={{ display: 'inline-block', background: '#F7F9F9', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ padding:8, margin:6, borderRadius:4 }} />
        <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} style={{ padding:8, margin:6, borderRadius:4 }} />
        <input placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} style={{ padding:8, margin:6, borderRadius:4 }} />
        <div>
          <button type="submit" style={{ padding:'8px 16px', marginTop:8, background:'#28B463', color:'white', border:'none', borderRadius:4 }}>Add Student</button>
        </div>
      </form>

      <h2 style={{ color: '#8E44AD', marginTop: 30 }}>📋 Student List</h2>
      <table style={{ margin:'auto', width:'60%', borderCollapse:'collapse', background:'#FEFEFE' }}>
        <thead style={{ background:'#D6EAF8' }}>
          <tr>
            <th style={{ padding:12 }}>ID</th>
            <th style={{ padding:12 }}>Name</th>
            <th style={{ padding:12 }}>Age</th>
            <th style={{ padding:12 }}>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id || s.id}>
              <td style={{ padding:10, borderTop:'1px solid #eee' }}>{s._id || s.id || '-'}</td>
              <td style={{ padding:10, borderTop:'1px solid #eee' }}>{s.name}</td>
              <td style={{ padding:10, borderTop:'1px solid #eee' }}>{s.age ?? '-'}</td>
              <td style={{ padding:10, borderTop:'1px solid #eee' }}>{s.course ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
