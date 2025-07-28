import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminHome() {
  const [username,setUsername] = useState("");
  useEffect(() => {
    axios.get('http://localhost:8080/username',{withCredentials: true})
      .then(response => {
        setUsername(response.data);
      })
      .catch(error => {
        console.error('Error fetching username:', error.response?.data || error.message);
      });
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">Admin Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <Link to={'/Addmanager'}><a className="nav-link text-white" href="#">Addmanager</a></Link>
          </li>
          <li className="nav-item">
            <Link to={"/Manager"}><a className="nav-link text-white" href="#">Managers</a></Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <nav className="navbar navbar-light bg-light px-4">
          <span className="navbar-brand mb-0 h1">Welcome, {username}</span>
        </nav>

        {/* Dashboard Content */}
        <div className="p-4">
          <h2>Dashboard</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">ADD MANAGER</h5>
                <Link to={'/Register'}><button>ADD</button></Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                <h5 className="card-title">Employee List</h5>
                <h5 className="card-title">Show Employee</h5>
                <Link to={'/Employee'}><button>Show</button></Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                <h5 className="card-title">Add Salary</h5>
                <Link to={'/'}><button>Add</button></Link>
                </div>
              </div>
            </div>
          </div>

          {/* You can render Manager and Employee list components below */}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
