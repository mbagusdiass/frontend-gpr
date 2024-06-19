import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PackageService from '../services/package.service';

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    PackageService.getAll().then(response => {
      setPackages(response.data);
    }).catch(error => {
      console.error('Error fetching packages:', error);
    });
  }, []);
  const deletePackage = async (id) => {
    try {
      PackageService.delete(id)
      PackageService.getAll().then(response => {
        setPackages(response.data);
      }).catch(error => {
        console.error('Error fetching packages:', error);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='text-center mb-5'>Package List</h2>
      <div className="d-flex justify-content-end">
        <Link to={`add`} className="btn btn-success">
          Add New
        </Link>
        <Link to={`ekspedisi`} className="btn btn-primary ms-2">
          Ekspedisi List
        </Link>
        <Link to={`report`} className="btn btn-primary ms-2">
          Reports
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender Name</th>
            <th>Sender Address</th>
            <th>Receiver Name</th>
            <th>Receiver Address</th>
            <th>Ekspedisi</th>
            <th>Status</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg.id}>
              <td>{index + 1}</td>
              <td>{pkg.senderName}</td>
              <td>{pkg.senderAddress}</td>
              <td>{pkg.receiverName}</td>
              <td>{pkg.receiverAddress}</td>
              <td>{pkg.Ekspedisi.name}</td>
              <td>{pkg.status}</td>
              <td>

                <Link
                    to={`/edit/${pkg.id}`}
                    className="btn btn-sm btn-info"
                  >Edit</Link>
                  <button
                    onClick={() => deletePackage(pkg.id)}
                    className="btn btn-sm btn-danger ms-3"
                  >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); 
};

export default PackageList;
