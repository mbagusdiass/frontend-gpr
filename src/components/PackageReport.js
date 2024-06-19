import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import PackageService from '../services/package.service';

const PackageReport = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    ekspedisiId: '',
    startDate: '',
    endDate: ''
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
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await PackageService.getReport(filters);
      setReportData(response.data || []);  
    } catch (error) {
      console.error('Error fetching report:', error);
      setReportData([]);  
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center mb-4 mt-4'>Package Report</h2>

      <div className="col-3 align-self-center">
        
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="form-label">Ekspedisi</label>
          <select className="form-control" name="ekspedisiId" value={filters.ekspedisiId} onChange={handleChange}>
          <option value="" disabled>Select Ekspedisi</option>
             {ekspedisiList.map(ekspedisi => (
               <option key={ekspedisi.id} value={ekspedisi.id}>
                 {ekspedisi.name}
               </option>
             ))}
          </select>
        </div>
        <div className="mb-1">
          <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
        </div>
        <div className="mb-1">
          <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
        </div>
       
        <div className="mb-1">
          <button type="submit" className="btn btn-success">
            Save
          </button>
      <button onClick={() => navigate(-1)} className="btn btn-danger ms-2"> Back </button>
        </div>
      </form>
      </div>
      
      {reportData.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {reportData.map((pkg, index) => (
              <tr key={pkg.id}>
                <td>{index + 1}</td>
                <td>{pkg.senderName}</td>
                <td>{pkg.senderAddress}</td>
                <td>{pkg.receiverName}</td>
                <td>{pkg.receiverAddress}</td>
                <td>{pkg.Ekspedisi.name}</td>
                <td>{pkg.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PackageReport;
