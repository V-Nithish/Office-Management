import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '', image: null });

  useEffect(() => {
    axios.get('http://localhost:8080/show')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('role', formData.role);
    data.append('password', formData.password);
    data.append('image', formData.image);

    axios.post('http://localhost:8080/upload', data)
      .then(() => alert('Employee added successfully'))
      .catch(error => alert('Error adding employee: ' + error.message));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-4">Employee Management</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" type="text" placeholder="Name" onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <input name="role" type="text" placeholder="Role" onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input name="image" type="file" onChange={handleChange} className="form-control" accept="image/*" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <h2 className="text-secondary">Employee List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>{emp.password}</td>
              <td>
                <img src={`http://localhost:8080/image/${emp.id}`} alt={emp.name} className="img-thumbnail" style={{ width: '80px', height: '80px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
