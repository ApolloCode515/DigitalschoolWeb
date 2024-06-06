import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SchoolRegister from './pages/SchoolRegister';
import LoginForm from './pages/LoginForm';
import StudentRegister from './pages/Student/StudentRegister';
import StudentAllData from './pages/Student/StudentAllData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CastewiseReport from './pages/Student/CastewiseReport';
import Minority from './pages/Student/Minority';
import AgewiseReport from './pages/Student/AgewiseReport';
import SchoolData from './pages/SchoolData';
import Sidebar from './components/Sidebar';
import BirthdayCard from './pages/Student/BirthdayCard';
import Leaving from './pages/Student/Leaving';
import Importexport from './pages/Student/Importexport';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<SchoolRegister/>} />
        <Route path="/school-data" element={<SchoolData/>} />
        <Route path="/home" element={<Home />} />
        <Route path='/student-register' element={<StudentRegister/>} />
        <Route path='/student-register/?serialNo=${student.serialNo}' element={<StudentRegister/>} />
        <Route path='/loginform' element={<LoginForm/>} />
        <Route path='/all-student-report' element={<StudentAllData/>} />
        <Route path='/caste-report' element={<CastewiseReport/>} />
        <Route path='/minority-report' element={<Minority/>} />
        <Route path='/agewisereport' element={<AgewiseReport/>} />
        <Route path='/sid' element={<Sidebar/>} />
        <Route path='/birthday-card' element={<BirthdayCard/>} />
        <Route path='/leaving-certificate' element={<Leaving/>} />
        <Route path='/importexport' element={<Importexport/>} />
        
      </Routes>
    </BrowserRouter>
    <Footer/>
  </>
);

