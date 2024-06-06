import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import './NewMinority.css'

const Minority = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');
  const [selectedRegister, setSelectedRegister] = useState('');
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);
  const [registerOptions, setRegisterOptions] = useState([]);

  const [udiseNumber, setUdiseNumber] = useState("");

  useEffect(() => {
    const schoolUdiseNumber = localStorage.getItem("udiseNumber");
    if (schoolUdiseNumber) {
      setUdiseNumber(schoolUdiseNumber);
    }
  }, []);

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'English';
    setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    const fetchAllCaste = async () => {
      try {
        const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
        if (response.ok) {
          const data = await response.json();

          if (data && typeof data === 'object') {
            const castesSet = new Set(
              Object.values(data)
                .filter(student => student !== null && typeof student === 'object')
                .map(student => student.caste)
            );
            setCasteOptions(Array.from(castesSet));
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching castes:', error);
      }
    };
    fetchAllCaste();
  }, [udiseNumber]);

  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);

          if (data && typeof data === 'object') {
            const classesSet = new Set(
              Object.values(data)
                .filter(student => student !== null && typeof student === 'object')
                .map(student => student.currentClass)
            );

            setClassOptions(Array.from(classesSet));
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchAllClasses();
  }, [udiseNumber]);

  const fetchDataByFilters = async () => {
    try {
      const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === 'object') {
          let filteredData = Object.values(data)
            .filter(student => student !== null && typeof student === 'object');

          if (selectedGender !== '') {
            filteredData = filteredData.filter(student => student.gender === selectedGender);
          }
          if (selectedCaste !== '') {
            filteredData = filteredData.filter(student => student.caste === selectedCaste);
          }
          if (selectedClass !== '') {
            filteredData = filteredData.filter(student => student.currentClass === selectedClass);
          }
          if (selectedRegister !== '') {
            filteredData = filteredData.filter(student => student.registerNo === selectedRegister);
          }

          setStudents(filteredData);
        } else {
          throw new Error('Invalid data format');
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataByFilters();
  }, [selectedGender, selectedCaste, selectedClass, selectedRegister, udiseNumber]);

  useEffect(() => {
    const fetchRegisterOptions = async () => {
      try {
        const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);

          if (data && typeof data === 'object') {
            const filteredData = Object.values(data).filter(student => student !== null);
            const registers = filteredData.map(student => student.registerNo);
            setRegisterOptions(registers);
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching registers:', error);
      }
    };

    fetchRegisterOptions();
  }, [udiseNumber]);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleCasteChange = (event) => {
    setSelectedCaste(event.target.value);
  };

  const handleRegisterChange = (event) => {
    setSelectedRegister(event.target.value);
  };

  const handleClearData = () => {
    window.location.reload();
    setSelectedGender('');
    setSelectedClass('');
    setSelectedCaste('');
    setSelectedRegister('');
    setStudents([]);
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div >
      <Sidebar />
      <div className='main-content-of-page'>
        <center>
          <h2 className="minority-report"> {language === "English" ? "Minority Report" : "अल्पसंख्यांक अहवाल"}</h2>
          <hr />
        </center>
        <div>
          <center>
            <label className='genderOption' htmlFor="gender" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '15px', marginRight: '10px' }}>{language === "English" ? "Select Gender" : "लिंग निवडा"}</label>
            <select id="gender" value={selectedGender} onChange={handleGenderChange} className="brown-dropdown" style={{ marginRight: '10px' }}>
              <option value="">{language === "English" ? "Select" : "निवडा"}</option>
              <option value="male">{language === "English" ? "Male" : "मुलगा"}</option>
              <option value="female">{language === "English" ? "Female" : "मुलगी"}</option>
            </select>
            <label htmlFor="casteDropdown" className="dropdown-label" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '15px' }}>{language === "English" ? "Select Caste" : "जात निवडा"}</label>
            <select style={{ marginRight: '10px' }} id="casteDropdown" value={selectedCaste} onChange={handleCasteChange} className="brown-dropdown dropdown">
              <option value="">{language === "English" ? "Select" : "निवडा"}</option>
              {casteOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label htmlFor="classDropdown" className="dropdown-label" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '15px' }}>{language === "English" ? "Select Class" : "वर्ग निवडा"}</label>
            <select id="classDropdown" value={selectedClass} onChange={handleClassChange} className="brown-dropdown dropdown">
              <option value="">{language === "English" ? "Select" : "निवडा"}</option>
              {classOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <label htmlFor="registerDropdown" className="dropdown-label" style={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '15px' }}>{language === "English" ? "Select Register No" : "नोंदणी क्रमांक निवडा"}</label>
            <select id="registerDropdown" value={selectedRegister} onChange={handleRegisterChange} className="brown-dropdown dropdown">
              <option value="">{language === "English" ? "Select" : "निवडा"}</option>
              {registerOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </center>
          <div>
            <button className='btn btn-primary' onClick={handleClearData} style={{ marginLeft: '10px' }}>{language === "English" ? "Clear" : "साफ"}</button>
            <button onClick={handlePrint} className="btn btn-primary float-end">Print</button>
          </div>
        </div>

        <br />

        <div className='table-responsive'>
          <table className="table table-bordered mb-5 ">
            <thead className="thead-dark">
              <tr>
                <th>{language === "English" ? "Sr. No" : "अनु क्रमांक "}</th>
                <th>{language === "English" ? "Student ID" : "विद्यार्थी क्रमांक"}</th>
                <th>{language === "English" ? "Name" : "नाव"}</th>
                <th>{language === "English" ? "Adhar No" : "आधार क्रमांक"}</th>
                <th>{language === "English" ? "Is Minority" : "अल्पसंख्याक"}</th>
                <th>{language === "English" ? "Gender" : "लिंग"}</th>
                <th>{language === "English" ? "Country" : "देश"}</th>
                <th>{language === "English" ? "Caste" : "जात"}</th>
                <th>{language === "English" ? "Class" : "वर्ग"}</th>
                <th>{language === "English" ? "District" : "जिल्हा"}</th>
                <th>{language === "English" ? "RegisterNo" : "रजिस्टर क्र."}</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) && students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.studentId}</td>
                    <td>{student.stdName}</td>
                    <td>{student.stdAdharNo}</td>
                    <td>{student.isMinority ? 'Yes' : 'No'}</td>
                    <td>{student.gender}</td>
                    <td>{student.country}</td>
                    <td>{student.caste}</td>
                    <td>{student.currentClass}</td>
                    <td>{student.district}</td>
                    <td>{student.registerNo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">{language === "English" ? "No data available" : " माहिती उपलब्ध नाही "}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Minority;