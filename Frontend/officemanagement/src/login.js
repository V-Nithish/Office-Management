import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:8080/Login', formData, { withCredentials: true });
       // Fix: get role from object
        const userRole  = res.data;
      if (userRole === "ADMIN") {
        navigate('/AdminHome');
      } else if (userRole === "MANAGER") {
        navigate('/ManagerHome');
      } else if (userRole === "EMPLOYEE" || userRole === "USER") {
        navigate('/EmployeeHome');
      } else {
        setMessage("Invalid role received");
      }
    } catch (error) {
      setMessage('Login failed');
      console.error("Backend error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            {message && <div className="alert alert-info mt-3">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
