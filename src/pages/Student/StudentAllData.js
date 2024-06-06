import React, { useState, useEffect } from 'react';
import { MdOutlineFilterList } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import './New.css';
import Sidebar from '../../components/Sidebar';

const CustomMenu = ({ checkboxes, isOpen }) => {
  return (
    <div className={`custom-menu1 ${isOpen ? 'open1' : ''}`}>
      <div className="row">
        <div className="col">
          <div className="collapse1 multi-collapse1" id="multiCollapseExample2">
            <div className="card card-body open-card1">
              {checkboxes.map((checkbox, index) => (
                <label key={index}>
                  <input className='mr-2'
                    type="checkbox"
                    checked={checkbox.checked}
                    onChange={checkbox.onChange}
                  />
                  {checkbox.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentAllData = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');
  const [students, setStudents] = useState([]);
  const [srNo, setSrNo] = useState(1);
  const [classOptions, setClassOptions] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdharNo, setShowAdharNo] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [registerOptions, setRegisterOptions] = useState([]);
  const [selectedRegister, setSelectedRegister] = useState('');
  const [filterByGender, setFilterByGender] = useState(false);
  const [filterByClass, setFilterByClass] = useState(false);
  const [filterByCaste, setFilterByCaste] = useState(false);
  const [expandCheckboxes, setExpandCheckboxes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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


  const handleEllipsisClick = () => {
    setExpandCheckboxes(!expandCheckboxes);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (udiseNumber) {
      fetchAllRegisters();
      fetchAllClasses();
      fetchAllCaste();
    }

  }, [udiseNumber]);

  useEffect(() => {
    fetchDataByFilters();
  }, [filterByGender, filterByCaste, filterByClass, selectedGender, selectedCaste, selectedClass, selectedRegister, udiseNumber]);

  const fetchAllRegisters = async () => {
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

  const fetchDataByFilters = async () => {
    try {
      const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === 'object') {
          let filteredData = Object.values(data)
            .filter(student => student !== null && typeof student === 'object');

          if (filterByGender && selectedGender !== '') {
            filteredData = filteredData.filter(student => student.gender === selectedGender);
          }
          if (filterByCaste && selectedCaste !== '') {
            filteredData = filteredData.filter(student => student.caste === selectedCaste);
          }
          if (selectedClass && selectedClass !== '') {
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
  };

  const handlePrint = () => {
    window.print();
  };

  // Function to remove the last column from the table on print
function removeLastColumnOnPrint() {
  var table = document.querySelector('.table');
  var lastHeader = table.querySelector('thead tr th:last-child');
  var lastCell;
  var rows = table.querySelectorAll('tbody tr');
  
  lastHeader.parentNode.removeChild(lastHeader);

  // Loop through each row and remove the last cell
  rows.forEach(function(row) {
    lastCell = row.querySelector('td:last-child');
    lastCell.parentNode.removeChild(lastCell);
  });
}

// Call the function when the page is being printed
window.onbeforeprint = function() {
  removeLastColumnOnPrint();
};

  const translations = {
    English: {
      gender: 'Gender',
      adharNo: 'Adhar No',
      country: 'Country',
      district: 'District',
      class: 'Class',
      caste: 'Caste',
    },
    Marathi: {
      gender: 'लिंग',
      adharNo: 'आधार क्र',
      country: 'देश',
      district: 'जिल्हा',
      class: 'वर्ग',
      caste: 'जात',



    },
  };
  const checkboxes = [

    {
      label: translations[language].gender,
      checked: filterByGender,
      onChange: () => setFilterByGender(!filterByGender),
    },
    {
      label: translations[language].caste,
      checked: filterByCaste,
      onChange: () => setFilterByCaste(!filterByCaste),
    },
    {
      label: translations[language].class,
      checked: filterByClass,
      onChange: () => setFilterByClass(!filterByClass),
    },
    {
      label: translations[language].adharNo,
      checked: showAdharNo,
      onChange: () => setShowAdharNo(!showAdharNo),
    },
    {
      label: translations[language].country,
      checked: showCountry,
      onChange: () => setShowCountry(!showCountry),
    },
    {
      label: translations[language].district,
      checked: showDistrict,
      onChange: () => setShowDistrict(!showDistrict),
    },
  ];

  return (
    <div>
    <Sidebar/>
    <div className='mb-5 main-content-of-page'>
      <div className="custom-heading">
        <h2 className="custom-heading-text"> {language === "English" ? "Student Report" : "विद्यार्थी अहवाल"}</h2>
        <hr className="custom-heading-hr" />
      </div>
      <div className="filter-container " style={{ position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "center", marginLeft: "10px", }}>
        <div onClick={handleEllipsisClick} style={{ position: "absolute", left: 0 }}>
          <button className="btn btn-primary filterbtn1" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"><FaFilter /></button>
        </div>
        {expandCheckboxes && <CustomMenu checkboxes={checkboxes} isOpen={isOpen} />}
        <div>
          <label htmlFor="classDropdown">{language === "English" ? "Select Class" : "वर्ग निवडा"}</label>
          <select id="classDropdown" value={selectedClass} onChange={handleClassChange} className="dropdown">
            <option value="" disabled>{language === "English" ? "Select" : "निवडा"}</option>
            {classOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="registerDropdown">{language === "Englisg" ? "Select Register" : "रजिस्टर क्र"}</label>
          <select id="registerDropdown" value={selectedRegister} onChange={handleRegisterChange} className="dropdown">
            <option value="" disabled>{language === "English" ? "Select" : "निवडा"}</option>
            {registerOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-icon" onClick={() => setShowFilters(!showFilters)}>
          <MdOutlineFilterList />
        </div>
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-options">
              <label htmlFor="gender">{language === "English" ? "Select Gender" : "लिंग निवडा"}</label>
              <select id="gender" value={selectedGender} onChange={handleGenderChange}>
                <option value="" disabled>{language === "English" ? "Select" : "निवडा"}</option>
                <option value="male">{language === "English" ? "Male" : "मुलगा"}</option>
                <option value="female">{language === "English" ? "Female" : "मुलगी"}</option>
              </select>
            </div>
            <div className="filter-options">
              <label htmlFor="Caste">{language === "English" ? "Select Caste" : "जात निवडा"}</label>
              <select id="Caste" value={selectedCaste} onChange={handleCasteChange}>
                <option value="" disabled>{language === "English" ? "Select" : "निवडा"}</option>
                {casteOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div style={{ position: "relative" }}>
          <button onClick={handlePrint} className="btn btn-primary">Print</button>
          <button onClick={handleClearData} className="clear-button">Clear Data</button>
        </div>
      </div>
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>{language === "Englisg" ? "Sr.No" : "अनु क्र."}</th>
              <th>{language === "Englisg" ? "Register No" : "रजिस्टर क्र."}</th>
              <th>{language === "Englisg" ? "Name" : "नाव"}</th>
              {filterByGender && <th>{language === "Englisg" ? "Gender" : "लिंग"}</th>}
              {showAdharNo && <th>{language === "Englisg" ? "Adhar No" : "आधार क्र."}</th>}
              {showCountry && <th>{language === "Englisg" ? "Country" : "देश"}</th>}
              {showDistrict && <th>{language === "Englisg" ? "District" : "जिल्हा"}</th>}
              {filterByClass && <th>{language === "Englisg" ? "Class" : "वर्ग"}</th>}
              {filterByCaste && <th>{language === "Englisg" ? "Caste" : "जात"}</th>}
              <th id='editcolumn1'>{language === "Englisg" ? "Edit" : "सुधारणे"}</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.registerNo}</td>
                <td>{student.stdName}  {student.stdFather}  {student.stdSurname}</td>
                {filterByGender && <td>{student.gender}</td>}
                {showAdharNo && <td>{student.stdAdharNo}</td>}
                {showCountry && <td>{student.country}</td>}
                {showDistrict && <td>{student.district}</td>}
                {filterByClass && <td>{student.currentClass}</td>}
                {filterByCaste && <td>{student.caste}</td>}
                <td id='editcolumn2'>
                  <Link to={`/student-register/?serialNo=${student.serialNo}`}>
                    <BiEdit className="edit-icon" />
                  </Link>
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

export default StudentAllData;
