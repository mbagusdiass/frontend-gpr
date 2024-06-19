import React, { useState, useEffect } from 'react';
import PackageService from '../services/package.service';
import { useParams, useNavigate } from 'react-router-dom';

const PackageForm = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    senderName: '',
    senderAddress: '',
    receiverName: '',
    receiverAddress: '',
    ekspedisiId: '',
    status: 'pending',
  });

  const [ekspedisiList, setEkspedisiList] = useState([]);
  // Mengambil data paket dari backend berdasarkan id saat komponen dimuat
  useEffect(() => {

    // Mengambil daftar ekspedisi dari backend
    PackageService.getAllEkspedisi()
      .then(response => {
        setEkspedisiList(response.data);
      })
      .catch(error => {
        console.error('Error fetching ekspedisi list:', error);
      });
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await PackageService.create(packageData);
      alert('Package added successfully');
      navigate("/");
    } catch (error) {
      alert('Error adding package');
    }
  };

  return (

    <div className="body-wrapper mt-5">
<div className="container col-8 align-items-center">
  <div className="mb-3 text-center">
  <h1>Data Pengiriman Paket</h1>
  </div>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Nama Pengirim</label>
        <input
          type="text"
          className="form-control"
          name="senderName"
          value={packageData.senderName}
          onChange={handleChange}
          placeholder="Nama Pengirim"
        />
    </div>
    <div className="mb-3">
      <label className="form-label">Alamat Pengirim</label>
        <input
          type="text"
          className="form-control"
          name="senderAddress"
          value={packageData.senderAddress}
          onChange={handleChange}
          placeholder="Alamat Pengirim"
        />
    </div>
    <div className="mb-3">
      <label className="form-label">Nama Penerima</label>
        <input
          type="text"
          className="form-control"
          name="receiverName"
          value={packageData.receiverName}
          onChange={handleChange}
          placeholder="Nama Penerima"
        />
    </div>
    <div className="mb-3">
      <label className="form-label">Alamat Penerima</label>
        <input
          type="text"
          className="form-control"
          name="receiverAddress"
          value={packageData.receiverAddress}
          onChange={handleChange}
          placeholder="Alamat Penerima"
        />
    </div>
    <div className="mb-3">
      <label className="form-label">Ekspedisi</label>
      <select className="form-control" name="ekspedisiId" value={packageData.ekspedisiId} onChange={handleChange}>
      <option value="" disabled>Select Ekspedisi</option>
         {ekspedisiList.map(ekspedisi => (
           <option key={ekspedisi.id} value={ekspedisi.id}>
             {ekspedisi.name}
           </option>
         ))}
      </select>
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

export default PackageForm;
