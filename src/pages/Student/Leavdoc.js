import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { jsPDF } from 'jspdf';
import './Bonadoc.css';

function Leavdoc({ handleSubmit, submitted, formData }) {
  const [numPages, setNumPages] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [schoolData, setSchoolData] = useState(null);
  const [udiseNumber, setUdiseNumber] = useState('');
  const [fillDetailsClicked, setFillDetailsClicked] = useState(false); // State to track if "Fill Details" button is clicked

  useEffect(() => {
    const schoolUdiseNumber = localStorage.getItem('udiseNumber');
    if (schoolUdiseNumber) {
      fetchSchoolData(schoolUdiseNumber);
    }
  }, []);

  useEffect(() => {
    if (udiseNumber) {
      fetchSchoolData();
    }
  }, [udiseNumber]);

  const fetchSchoolData = (udiseNumber) => {
    fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/schoolData.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('School data fetched successfully:', data);
        setSchoolData(data);
      })
      .catch((error) => {
        console.error('Error fetching school data:', error);
      });
  };

  
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

        doc.setFontSize(12);

        doc.setLineWidth(0.02);
        doc.rect(2.9, 1.92, 2.5, 0.4, 'S');

        // Calculate the width of the page dynamically
        const pagewidth = doc.internal.pageSize.getWidth();
        const startX = pagewidth / 3.5;
        console.log('startX', startX);

        const contentLines = [
          { text: `Date : ${new Date().toLocaleDateString()}`, x: 1, y: 10.2, fontStyle: 'bold' },
          { text: schoolData.schoolName, x: startX, y: 1, fontSize: 20 },
          { text: `Taluka :${schoolData.taluka} District :${schoolData.jilha}`, x: 3.1, y: 1.3 },
          { text: 'School No: 56446874,', x: 2.5, y: 1.6 },
          { text: `UDISE No: ${schoolData.udiseNumber}`, x: 4.5, y: 1.6 },
          { text: 'LEAVING CERTIFICATE', x: 3, y: 2.2, fontSize: 14, fontStyle: 'bold' },
          { text: `Register No:- ${formData.registerno}`, x: 1, y: 2.9, fontSize: 13, fontStyle: 'bold' },
          { text: `Student Id: ${formData.studentId}`, x: 1, y: 3.3, fontSize: 13, fontStyle: 'bold' },
          { text: 'Academic Year:', x: 5.2, y: 2.9, fontStyle: 'bold', fontSize: 13 },
          { text: formData.educationalYear, x: 6.6, y: 2.9, fontStyle: 'bold', fontSize: 13 },
          { text: `Adharcard No: ${formData.stdAdharNo}`, x: 5.2, y: 3.3, fontSize: 13, fontStyle: 'bold' },
          { text: 'Full Name Of Student:', x: 1, y: 3.8 },
          { text: `${formData.stdName} ${formData.stdFather} ${formData.stdSurname}`, x: 3.5, y: 3.8, fontStyle: 'bold' },
          { text: 'Mother\'s Name:', x: 1, y: 4.2 },
          { text: formData.stdMother, x: 3.5, y: 4.2, fontStyle: 'bold' },
          { text: 'Class:', x: 1, y: 4.6 },
          { text: `${formData.class}th`, x: 3.5, y: 4.6, fontStyle: 'bold' },
          { text: 'Religion And Caste:', x: 1, y: 5 },
          { text: `${formData.religion}(${formData.caste})`, x: 3.5, y: 5, fontStyle: 'bold' },
          { text: 'Reason Of Leaving :', x: 1, y: 8.6 },
          { text: formData.reason, x: 3.5, y: 8.6, fontStyle: 'bold' },
          { text: 'Date Of Birth:', x: 1, y: 5.8 },
          { text: formData.dob, x: 3.5, y: 5.8, fontStyle: 'bold' },
          { text: formData.dobInWords, x: 3.5, y: 6, fontStyle: 'bold' },
          { text: 'Birth Place:', x: 1, y: 6.45 },
          { text: formData.birthPlace, x: 3.5, y: 6.45, fontStyle: 'bold' },
          { text: 'previous school:', x: 1, y: 5.4 },
          { text: formData.prevSchool, x: 3.5, y: 5.4, fontStyle: 'bold' },
          { text: 'Date of Admission :', x: 1, y: 6.8 },
          { text: formData.dateOfAdmission, x: 3.5, y: 6.8, fontStyle: 'bold' },
          { text: 'Nationality:', x: 1, y: 7.25 },
          { text: formData.nationality, x: 3.5, y: 7.25, fontStyle: 'bold' },
          { text: 'Progress:', x: 1, y: 7.7 },
          { text: formData.progress, x: 3.5, y: 7.7, fontStyle: 'bold' },
          { text: 'Conduct:', x: 1, y: 8.2 },
          { text: formData.conduct, x: 3.5, y: 8.2, fontStyle: 'bold' },
          { text: 'This is to certify that the above information is accordance with the institute register.', x: 1, y: 9 },
          { text: 'Signature of Principal', x: 6, y: 10.2, fontStyle: 'bold' },
          { text: '(OFFICIAL SEAL)', x: 3.4, y: 10.3 },
          

        ];

        contentLines.forEach(({ text, x, y, fontSize, color, fontStyle }) => {
          doc.setFontSize(fontSize || 12);
          if (color) doc.setTextColor(color);
          if (fontStyle && fontStyle === 'bold') {
            doc.setFont('helvetica', 'bold');
            doc.text(text, x, y);
            doc.setFont('helvetica', 'normal'); // Reset font style to normal after the bold section
          } else {
            doc.text(text, x, y);
          }
        });

        // code of small boxes
        doc.setLineWidth(0.01);
        doc.rect(0.5, 3.9, 7.5, 0);
        doc.setLineWidth(0.01);
        doc.rect(0.5, 4.3, 7.5, 0.4);
        doc.setLineWidth(0.01);
        doc.rect(0.5, 5.1, 7.5, 0.4);
        doc.setLineWidth(0.01);
        doc.rect(0.5, 6.15, 7.5, 0.4);
        doc.setLineWidth(0.01);
        doc.rect(0.5, 7, 7.5, 0.4);
        doc.setLineWidth(0.01);
        doc.rect(0.5, 7.9, 7.5, 0.4);
        doc.setLineWidth(0.01);
        doc.rect(0.5, 8.7, 7.5, 0);

        // code of straight vertical line
        doc.setLineWidth(0.01);
        doc.rect(3, 3.5, 0, 5.2);

        // code of register no box
        doc.setLineWidth(0.01);
        doc.rect(0.5, 2.5, 7.5, 1);
        doc.setLineWidth(0.03);
        doc.rect(0.5, 0.5, 7.5, 10);

        // Get PDF data and set it to state
        setPdfData(doc.output('blob'));
      };
      


    
      const SaveAsPDFHandler = () => {
        generatePDF();
        setFillDetailsClicked(true); // Set fillDetailsClicked to true when "Fill Details" button is clicked
      };


      useEffect(() => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          const disableRightClick = (e) => {
            e.preventDefault();
          };
          iframe.contentWindow.document.addEventListener('contextmenu', disableRightClick);
          return () => {
            iframe.contentWindow.document.removeEventListener('contextmenu', disableRightClick);
          };
        }
      }, [pdfData]);

      return (
        <div>
          {submitted && (
            <div className="container">
              <div className="certificate-container">
                {/* Conditionally render iframe */}
                {pdfData && (
                  <iframe
                    title="Generated PDF"
                    src={URL.createObjectURL(pdfData)}
                    style={{ width: '100%', height: '810px' }}
                  />
                )}
                {/* Display PDF preview */}
                {!pdfData && (
                  <Document file="bonadoc.pdf" onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                )}
                {/* Render "Fill Details" button conditionally based on fillDetailsClicked state */}
                {!fillDetailsClicked && (
                  <button className="btn btn-primary mt-3" onClick={SaveAsPDFHandler}>
                    Fill Details
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
}
    
    export default Leavdoc;