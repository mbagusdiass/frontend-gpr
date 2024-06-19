import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PackageForm from './components/PackageForm';
import PackageList from './components/PackageList';
import PackageReport from './components/PackageReport';
import PackageEdit from './components/PackageEdit'; 
import AddEkspedisi from './components/AddEkspedisi';
import EkspedisiList from './components/EkspedisiList';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<PackageList />} />
          <Route path="/add" element={<PackageForm />} />
          <Route path="/report" element={<PackageReport />} />
          <Route path="/edit/:id" element={<PackageEdit />} />
          <Route path="/ekspedisi" element={<EkspedisiList />} />
          <Route path="/ekspedisi/addexp" element={<AddEkspedisi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
