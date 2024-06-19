import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PackageService from '../services/package.service';

const PackageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk menyimpan data paket
  const [packageData, setPackageData] = useState({
    senderName: '',
    senderAddress: '',
    receiverName: '',
    receiverAddress: '',
    ekspedisiId: '',
    status: '',
  });

  // State untuk menyimpan daftar ekspedisi
  const [ekspedisiList, setEkspedisiList] = useState([]);

  // Mengambil data paket dari backend berdasarkan id saat komponen dimuat
  useEffect(() => {
    PackageService.get(id)
      .then(response => {
        setPackageData(response.data);
      })
      .catch(error => {
        console.error('Error fetching package:', error);
      });
  }, [id]);

  // Meng-handle perubahan pada input form
  const handleChange = e => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  // Meng-handle submit form untuk memperbarui paket
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await PackageService.update(id, packageData);
      alert('Package updated successfully');
      navigate('/');
    } catch (error) {
      alert('Error updating package');
    }
  };

  return (
    
    <div className="body-wrapper mt-5">
    <div className="container col-8 align-items-center">
      <div className="mb-3 text-center">
      <h1 clas>Data Pengiriman Paket</h1>
      </div>
      <form onSubmit={handleSubmit} className='form-floating'>
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
          <label className="form-label">Status</label>
          <select className="form-control" name="status"  value={packageData.status} onChange={handleChange}>
            <option value="" disabled>Choose Status</option>
            <option value="pending" >Pending</option>
            <option value="in_transit" >Sedang Transit</option>
            <option value="delivered" >Telah Sampai</option>
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

export default PackageEdit;
