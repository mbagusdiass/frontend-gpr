import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EksService from '../services/ekspedisi.service';

const PackageList = () => {
  const navigate = useNavigate();
  const [ekspedisi, setEks] = useState([]);

  useEffect(() => {
    EksService.getExp().then(response => {
      setEks(response.data);
    }).catch(error => {
      console.error('Error fetching ekspedisi:', error);
    });
  }, []);
  const removeExp = async (id) => {
    try {
      EksService.removeExp(id)
      EksService.getExp().then(response => {
        setEks(response.data);
      }).catch(error => {
        console.error('Error delete ekspedisi:', error);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center mb-5'>Ekspedisi List</h2>
      <div className='row justify-content-center  '>
        <div className='col-5'>
      <div className="d-flex justify-content-end">
        <Link to={`addexp`} className="btn btn-success">
          Add New
        </Link>
        <button onClick={() => navigate(-1)} className="btn btn-danger ms-3"> Back </button> 
      </div>
        
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ekspedisi Name</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {ekspedisi.map((pkg, index) => (
            <tr key={pkg.id}>
              <td>{index + 1}</td>
              <td>{pkg.name}</td>
              <td>
                  <button
                    onClick={() => removeExp(pkg.id)}
                    className="btn btn-sm btn-danger ms-3"
                  >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  ); 
};

export default PackageList;
