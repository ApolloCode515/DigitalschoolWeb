import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
function CasteWiseReport() {
  const [classData, setClassData] = useState([]);
  const [casteData, setCasteData] = useState([]);
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
      if (udiseNumber) {
        try {
          const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
          const data = await response.json();
          if (data) {
            const classList = Object.values(data)
              .filter(student => student && student.currentClass)
              .map(student => student.currentClass);
            const sortedClasses = [...new Set(classList)].sort();
            setClassData(sortedClasses);
          }
        } catch (error) {
          console.error('Error fetching class data:', error);
        }
      }
    };

    fetchData();
  }, [udiseNumber]);

  useEffect(() => {
    const fetchCasteCounts = async () => {
      if (udiseNumber) {
        try {
          const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
          const data = await response.json();
          if (data) {
            const allCastes = {};
            Object.values(data).forEach(student => {
              if (student && student.caste && student.currentClass && student.gender) {
                const caste = student.caste.toLowerCase();
                const classKey = student.currentClass;
                const genderKey = student.gender.toLowerCase();

                if (!allCastes[caste]) {
                  allCastes[caste] = { name: caste, classes: {} };
                }

                if (!allCastes[caste].classes[classKey]) {
                  allCastes[caste].classes[classKey] = { male: 0, female: 0 };
                }

                allCastes[caste].classes[classKey][genderKey] += 1;
              }
            });

            const casteArray = Object.values(allCastes);
            setCasteData(casteArray);
          }
        } catch (error) {
          console.error('Error fetching caste data:', error);
        }
      }
    };

    fetchCasteCounts();
  }, [udiseNumber]);

  const getClassTotal = (caste, className, gender) => {
    if (caste && caste.classes && caste.classes[className]) {
      return caste.classes[className][gender] || 0;
    } else {
      return 0;
    }
  };

  const getClassTotalOverall = (className, gender) => {
    return casteData.reduce((total, caste) => total + getClassTotal(caste, className, gender), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="table-container">
      <Sidebar />
      
      <div className='main-content-of-page'>
      <center>
        <div className="custom-heading">
          <h2 className="custom-heading-text text-center">{language === "English" ? "Caste Wise Report" : "जातनिहाय अहवाल"}</h2>
          <hr className="custom-heading-hr" />
        </div>
      </center>
      <div>
      <button onClick={handlePrint} className="print-button btn btn-primary" style={{ position: 'absolute', right: 20, top: 90 }}>Print</button>
      </div>
      <div className='table-responsive'>
        <table className="table mb-5">
          <thead>
            <tr>
              <th>{language === "English" ? "Caste" : "जात"}</th>
              {classData.map((className, index) => (
                <React.Fragment key={index}>
                  <th colSpan={2}>{className}</th>
                </React.Fragment>
              ))}
              <th colSpan={2}>{language === "English" ? "Total" : "एकूण"}</th>
              <th>{language === "English" ? "Sum" : "बेरीज"}</th>
            </tr>
            <tr>
              <th></th>
              {classData.map((_, index) => (
                <React.Fragment key={index}>
                  <th>{language === "English" ? "Boy" : "मुलगा"}</th>
                  <th>{language === "English" ? "Girl" : "मुलगी"}</th>
                </React.Fragment>
              ))}
              <th>{language === "English" ? "Boy" : "मुलगा"}</th>
              <th>{language === "English" ? "Girl" : "मुलगी"}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {casteData.map((caste, index) => (
              <tr key={index}>
                <td>{caste.name}</td>
                {classData.map(className => (
                  <React.Fragment key={className}>
                    <td>{getClassTotal(caste, className, 'male')}</td>
                    <td>{getClassTotal(caste, className, 'female')}</td>
                  </React.Fragment>
                ))}
                <td>
                  {Object.values(caste.classes).reduce((total, classCounts) => total + (classCounts.male || 0), 0)}
                </td>
                <td>
                  {Object.values(caste.classes).reduce((total, classCounts) => total + (classCounts.female || 0), 0)}
                </td>
                <td>
                  {Object.values(caste.classes).reduce((total, classCounts) => total + (classCounts.male || 0) + (classCounts.female || 0), 0)}
                </td>
              </tr>
            ))}
            <tr>
              <td>{language === "English" ? "Total" : "एकूण"}</td>
              {classData.map((className, index) => (
                <React.Fragment key={index}>
                  <td>{getClassTotalOverall(className, 'male')}</td>
                  <td>{getClassTotalOverall(className, 'female')}</td>
                </React.Fragment>
              ))}
              <td>
                {classData.reduce((total, className) => total + getClassTotalOverall(className, 'male'), 0)}
              </td>
              <td>
                {classData.reduce((total, className) => total + getClassTotalOverall(className, 'female'), 0)}
              </td>
              <td>
                {classData.reduce((total, className) => total + getClassTotalOverall(className, 'male') + getClassTotalOverall(className, 'female'), 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default CasteWiseReport;