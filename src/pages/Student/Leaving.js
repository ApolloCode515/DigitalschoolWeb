import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './Bonafide.css';
import Leavdoc from './Leavdoc';
import Sidebar from '../../components/Sidebar';

const Leaving = () => {
  const [formData, setFormData] = useState({
    stdName: '',
    stdMother: '',
    religion: '',
    class: '',
    educationalYear: '',
    dob: '',
    birthPlace: '',
    registerno: '',
    reason: '',
    selectedBookNo: '',
    progress: '',
    conduct: '',
  });
      const [submitted, setSubmitted] = useState(false); 
      const [walletPoints, setWalletPoints] = useState(0); // State to store wallet points
      const [udiseNumber, setUdiseNumber]= useState('');

      useEffect(() => {
        const fetchWalletPoints = async () => {
          try {
            const response = await fetch(`https://digitalschool-6ba79-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/schoolData.json`);
            if (!response.ok) {
              throw new Error('Failed to fetch wallet points');
            }
            const data = await response.json();
            // Update wallet points state
            console.log("Wallet points data:", data);
            if (data && data.walletPoints !== undefined) {
              setWalletPoints(data.walletPoints);
            } else {
              console.error('Invalid wallet points data:', data);
            }
          } catch (error) {
            console.error('Error fetching wallet points:', error);
          }
        };
        fetchWalletPoints();
      }, [udiseNumber]); // Make useEffect re-run when udiseNumber changes
      
      

      useEffect(()=>{
        const schoolUdiseNumber = localStorage.getItem("udiseNumber");
        if(schoolUdiseNumber) {
          setUdiseNumber(schoolUdiseNumber)
        }
      }, [])

      useEffect(() => {
        console.log("formData:", formData); // Add logging here
      }, [formData]);
  
      

      const handleWalletUpdate = async (updatedPoints) => {
        try {
          // Update only the walletPoints field in the database
          const updateResponse = await fetch(`https://digitalschool-6ba79-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/schoolData/walletPoints.json`, {
            method: 'PUT', // Use PUT method to replace existing data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPoints),
          });
          if (!updateResponse.ok) {
            throw new Error('Failed to update wallet points');
          }
          // Update local state with new points
          console.log("Updated wallet points in state:", updatedPoints);
          setWalletPoints(updatedPoints);
        
        } catch (error) {
          console.error('Error updating wallet points:', error);
        }
      };
      
      
     
      
      
      

      const handleSubmit = async (event) => {
        event.preventDefault();
        // Deduct points from wallet
        const updatedPoints = walletPoints - 2; // Assuming 2 points deduction
        if (updatedPoints < 0) {
          alert('Insufficient points! Please recharge your wallet.');
          return;
        }
        // Update wallet points in Firebase
        await handleWalletUpdate(updatedPoints);
        setSubmitted(true);
        // Update local state with new points
       
      };



      const handleChange = async (event) => { 
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    
        if (name === 'registerno') {
            try {
                const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
    
                // Check if data is not null and is an object
                if (data && typeof data === 'object') {
                    let studentData = null;
                    
                    // Iterate over each serial number
                    Object.values(data).forEach(async (serialData) => {
                        // Check if the register number matches
                        if (serialData && serialData.registerNo === value) {
                            studentData = serialData;
                        }
                    });
    
                    if (studentData) {
                        setFormData((prevData) => ({
                            ...prevData,
                            stdName: studentData.stdName || '',
                            stdMother: studentData.stdMother || '',
                            religion: studentData.religion || '',
                            class: studentData.currentClass || '',
                            educationalYear: studentData.educationalYear || '', 
                            dob: studentData.dob || '',
                            birthPlace: studentData.birthPlace || '',
                            dobInWords: studentData.dobInWords || '',
                            studentId: studentData.studentId  || '',
                            stdSurname: studentData.stdSurname || '',
                            stdFather: studentData.stdFather || '',
                            stdAdharNo: studentData.stdAdharNo || '',
                            caste: studentData.caste || '',
                            prevSchool: studentData.prevSchool || '',
                            dateOfAdmission: studentData.dateOfAdmission || '',
                            nationality: studentData.nationality || '',
                        }));
                    } else {
                        // If no matching student data found, reset form data
                        setFormData((prevData) => ({
                            ...prevData,
                            stdName: '',
                            stdMother: '',
                            religion: '',
                            class: '',
                            educationalYear: '',
                            dob: '',
                            birthPlace: '',
                            dobInWords: '',
                            studentId: '',
                            stdSurname: '',
                            stdFather: '',
                            stdAdharNo: '',
                            caste: '',
                            prevSchool: '',
                            dateOfAdmission: '',
                            nationality: '',
                        }));
                    }
                } else {
                    console.error('Data fetched is not valid:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    
    
    
    
      const handleReset = () => {
      setFormData({
        stdName: '',
        stdMother: '',
        religion: '',
        class: '',
        educationalYear: '',
        dob: '',
        birthPlace: '',
        registerno: '',
        reason: '',
        selectedBookNo: '',
        progress: '',
        conduct: '',

      });
      setSubmitted(false);
      };
      
  const handlePrint = () => {
    window.print();
    };
  
    const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Bonafide Certificate", 20, 20);
    doc.text(`Name: ${formData.stdName}`, 20, 30);
    doc.text(`Mother's Name: ${formData.stdMother}`, 20, 40);
    doc.text(`Religion: ${formData.religion}`, 20, 50);
    doc.text(`Class: ${formData.class}`, 20, 60);
    doc.text(`Academic Year: ${formData.educationalYear}`, 20, 70);
    doc.text(`DOB: ${formData.dob}`, 20, 80);
    doc.text(`Birth Place: ${formData.birthPlace}`, 20, 90);
    doc.text(`Register No: ${formData.registerno}`, 20, 100);
    doc.text(`Reason: ${formData.reason}`, 20, 110);
    doc.save("bonafide_certificate.pdf");
  
    };
  
    return (
      <div className="home">
        <Sidebar />
        <div className="container mt-5">
          <h2 className="title">Leaving Certificate</h2>
          <div className="form-output">
            <form onSubmit={handleSubmit}>              
              <br/>    
              <div className="form-group">
                <label>Register No:</label>
                <input className="input-field" type="text" name="registerno" value={formData.registerno} onChange={handleChange} required />
              </div>
              <br/>
              <div className="form-group">
                <label>Name:</label>
                <input className="input-field" type="text" name="stdName" value={formData.stdName} onChange={handleChange} required />
              </div>
              <br/>
    
              <div className="form-group">
                <label>Class:</label>
                <input className="input-field" type="text" name="class" value={formData.class} onChange={handleChange} required />
              </div>
              <br/> 
    
              <div className="form-group">
                <label>Progress :</label>
                <select className="input-field" name="progress" value={formData.progress} onChange={handleChange} required>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Satisfactory">Satisfactory</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
              <br/>
    
              <div className="form-group">
                <label>Conduct :</label>
                <select className="input-field" name="conduct" value={formData.conduct} onChange={handleChange} required>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Satisfactory">Satisfactory</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
              <br/>
    
              <div className="form-group">
                <label>Reason :</label>
                <select className="input-field" name="reason" value={formData.reason} onChange={handleChange} required>
                  <option value="Graduated">Graduated</option>
                  <option value="Transferred">Transferred</option>
                  <option value="Expelled">Expelled</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <br/>
              {/* Show wallet points */}
            <div className="wallet-points">
              Wallet Points: {walletPoints}
            </div>
    
              <div className="form-buttons">
                <button className="submit-btn" type="submit">Submit</button>
                <button className="reset-btn" type="button" onClick={handleReset} style={{ marginLeft: '30px' }}>Reset</button>
              </div>
    
            </form>       
          </div>  
        </div>
        <Leavdoc
        handleSubmit={handleSubmit}
        submitted={submitted}
        formData={formData}
      />
      </div>
    );
        };
    
export default Leaving; 



