import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employee, setEmployee] = useState([]);
  const [selectemployee, setselectEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchemployee();
  }, []);

  const fetchemployee = async () => {
    try {
      const res = await axios.get('http://localhost:8080/finbyEmployee');
      setEmployee(res.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      setEmployee(employee.filter(manager => manager.id !== id));
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  const updateEployee = (employee) => {
    setselectEmployee(employee);
    setSelectedImage(null); // Reset file
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setselectEmployee({ ...selectemployee, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const submitUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', selectemployee.name);
      formData.append('email', selectemployee.email);
      formData.append('role', selectemployee.role);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const res = await axios.put(`http://localhost:8080/update/${selectemployee.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Update successful:', res.data);
      setShowModal(false);
      fetchemployee(); // Refresh list
    } catch (error) {
      console.error('Error updating manager:', error);
    }
  };

  const getImageUrl = (id) => `http://localhost:8080/image/${id}`;

  return (
    <div className="container mt-4">
      <h3>Employee List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <img
                  src={getImageUrl(employee.id)}
                  alt="Employee"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => updateEployee(employee)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectemployee && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Manager</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" value={selectemployee.name} onChange={handleUpdateChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" value={selectemployee.email} onChange={handleUpdateChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input type="text" name="role" value={selectemployee.role} onChange={handleUpdateChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input type="file" className="form-control" onChange={handleImageChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={submitUpdate}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
