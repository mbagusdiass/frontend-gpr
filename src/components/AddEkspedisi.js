import React, { useState } from 'react';
import PackageService from '../services/ekspedisi.service';
import { useNavigate } from 'react-router-dom';

const AddEkspedisi = () => {
  const navigate = useNavigate();
  const [eksData, setEksData] = useState({
    name: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setEksData({ ...eksData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await PackageService.createExp(eksData);
      alert('Ekspedisi added successfully');
      navigate("/ekspedisi");
    } catch (error) {
      alert('Error adding ekspedisi');
    }
  };

  return (

    <div className="body-wrapper mt-5">
<div className="container col-8 align-items-center">
  <div className="mb-3 text-center">
  <h1>Add new Ekspedisi</h1>
  </div>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Ekspedisi Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={eksData.senderName}
          onChange={handleChange}
          placeholder="Ekspedisi Name"
        />
    </div>
    <div className="mb-3">
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </div>
  </form>
      <button onClick={() => navigate(-1)} className="btn btn-danger ms-3"> Back </button> 
</div>
</div>
  );
};

export default AddEkspedisi;
