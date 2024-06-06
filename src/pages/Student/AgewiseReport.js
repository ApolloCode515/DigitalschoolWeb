import React, { useState, useEffect } from 'react';
import './Age.css'; // Ensure this file is properly linked
import Sidebar from '../../components/Sidebar';

function AgewiseReport() {
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [ageCountsByClass, setAgeCountsByClass] = useState({});
  const [selectedCell, setSelectedCell] = useState({ ageGroup: '', className: '', students: [], position: { x: 0, y: 0 } });

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
    const fetchData = async () => {
      if (!udiseNumber) {
        console.error('UDISE number is not set');
        return;
      }

      try {
        const url = `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`;
        console.log("url", url);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data === 'object') {
            const allStudents = [];
            const classSet = new Set();

            Object.values(data).forEach(student => {
              if (student) {
                allStudents.push(student);
                classSet.add(student.currentClass);
              }
            });

            const sortedClassOptions = Array.from(classSet).sort((a, b) => a - b);
            setStudents(allStudents);
            setClassOptions(sortedClassOptions);
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [udiseNumber]);

  useEffect(() => {
    if (students.length > 0) {
      const ageCountsObj = {};

      students.forEach(student => {
        const age = calculateAge(student.dob);
        const studentClass = student.currentClass;
        const ageGroup = `${age}-${age + 1}`;

        if (!ageCountsObj[ageGroup]) {
          ageCountsObj[ageGroup] = {};
        }

        if (!ageCountsObj[ageGroup][studentClass]) {
          ageCountsObj[ageGroup][studentClass] = 0;
        }

        ageCountsObj[ageGroup][studentClass]++;
      });

      setAgeCountsByClass(ageCountsObj);
    }
  }, [students]);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleCellClick = (ageGroup, className, event) => {
    const selectedStudents = students.filter(student => {
      const age = calculateAge(student.dob);
      const studentAgeGroup = `${age}-${age + 1}`;
      return studentAgeGroup === ageGroup && student.currentClass === className;
    });

    const rect = event.target.getBoundingClientRect();
    const xPos = rect.left;
    const yPos = rect.top + rect.height;

    setSelectedCell({ ageGroup, className, students: selectedStudents, position: { x: xPos, y: yPos } });
  };

  const getClassRepresentation = (classNumber) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const lastDigit = classNumber % 10;
    const suffix = suffixes[(lastDigit <= 3 && classNumber !== 11 && classNumber !== 12 && classNumber !== 13) ? lastDigit : 0];
    return (
      <>
        {classNumber}<span className="class-suffix">{suffix}</span>
      </>
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
    <Sidebar/>
    <div className='main-content-of-page'>

      <button onClick={handlePrint} className="print-button btn btn-primary" style={{ position: "absolute", right: 20, top: 90 }}>Print</button>
      <center>
        <h3>{language === "English" ? "Age Wise Report" : "वयानुसार अहवाल"}</h3>
      </center>
      <div className="styled-table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th className="age-group-header"><center>{language === "English" ? "Age Group" : "वयोगट"}</center></th>
              <th colSpan={classOptions.length}><center>{language === "English" ? "Class" : "वर्ग"}</center></th>
            </tr>
            <tr>
              <th></th>
              {classOptions.map((classNumber, index) => (
                <th key={index} className="class-column">{getClassRepresentation(classNumber)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(ageCountsByClass).map((ageGroup, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="age-group-header">{ageGroup}</td>
                  {classOptions.map((className, idx) => {
                    const count = ageCountsByClass[ageGroup] && ageCountsByClass[ageGroup][className]
                      ? ageCountsByClass[ageGroup][className]
                      : 0;
                    return (
                      <td
                        key={idx}
                        className="class-column"
                        onClick={(event) => handleCellClick(ageGroup, className, event)}
                        style={{ color: count === 0 ? 'black' : 'green', position: 'relative' }}
                      >
                        {count}
                      </td>
                    );
                  })}
                </tr>
                {selectedCell.ageGroup === ageGroup && selectedCell.className === classOptions.find(cls => cls === selectedCell.className) && selectedCell.students.length > 0 && (
                  <tr className="student-detail-row" style={{ left: selectedCell.position.x, top: selectedCell.position.y + 10 }}>
                    <td colSpan={classOptions.length + 1}>
                      <table className="student-info-table">
                        <thead>
                          <tr>
                            <th className='text-center'>{language === "English" ? "Name" : "नाव"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCell.students.map((student, idx) => (
                            <tr key={idx}>
                              <td>{student.stdName} {student.stdFather} {student.stdSurname}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default AgewiseReport;