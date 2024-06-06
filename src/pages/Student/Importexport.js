import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./Importexport.css";
import Sidebar from "../../components/Sidebar";

function Importexport() {
  const [excelData, setExcelData] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [databaseData, setDatabaseData] = useState([]);

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "English";
    setLanguage(storedLanguage);
  }, []);

  const [udiseNumber, setUdiseNumber] = useState("");
  useEffect(() => {
    const schoolUdiseNumber = localStorage.getItem("udiseNumber");
    setUdiseNumber(schoolUdiseNumber);
  }, []);


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Get range of rows excluding the first row
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      range.s.r = 1; // start reading from the second row
      sheet["!ref"] = XLSX.utils.encode_range(range);

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
      }); // Ensure raw values
      const formattedData = jsonData.map((row) => {
        const formattedData = jsonData.map((row) => {
          // Extracting and formatting the Aadhar number
          const aadharIndex = row.findIndex((cell) => typeof cell === "string" && cell.trim().toLowerCase() === "student adhar no");
          if (aadharIndex !== -1 && row[aadharIndex + 1]) {
            let aadharNumber = row[aadharIndex + 1].trim();
            // Ensure Aadhar number is exactly 12 digits long
            if (aadharNumber.length !== 12 || !/^\d+$/.test(aadharNumber)) {
              console.error("Invalid Aadhar number detected:", aadharNumber);
              // Set Aadhar number to empty string if invalid
              aadharNumber = "";
            }
            row[aadharIndex + 1] = `'${aadharNumber}`; // Prefix with apostrophe to treat as text
          }
          return row;
        });
        
  


        // Extracting and formatting the date of birth (DOB)
        const dobIndex = row.findIndex(
          (cell) =>
            cell &&
            typeof cell === "string" &&
            cell.match(/^\d{2}-\d{2}-\d{4}$/)
        );
        if (dobIndex !== -1) {
          const dobParts = row[dobIndex].split("-");
          row[dobIndex] = dobParts[2] + "-" + dobParts[1] + "-" + dobParts[0]; // Format to 'yyyy-mm-dd'
        }
        return row;
      });
      setExcelData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const columns = [
    language === "English" ? "Admission Class" : "प्रवेश वर्ग",
    language === "English" ? "Register No" : "नोंदणी क्र",
    language === "English" ? "Student Id" : "विद्यार्थी क्रमांक",
    language === "English" ? "Book No" : "पुस्तक क्र.",
    language === "English" ? "Birth Place" : "जन्मस्थान",
    language === "English" ? "Caste" : "जात",
    language === "English" ? "Category" : "श्रेणी",
    language === "English" ? "Religion" : "धर्म",
    language === "English" ? "Country" : "देश",
    language === "English" ? "Current Class" : "सध्याचा वर्ग",
    language === "English" ? "Division" : "तुकडी",
    language === "English" ? "Date Of Admission" : "प्रवेशाची तारीख",
    language === "English" ? "District" : "जिल्हा",
    language === "English" ? "Taluka" : "तालुका",
    language === "English" ? "Date Of Birth" : "जन्मतारीख",
    language === "English" ? "DOB In Words" : "शब्दात जन्मतारीख",
    language === "English" ? "Educational Year" : "शैक्षणिक वर्ष",
    language === "English" ? "Gender" : "लिंग",
    language === "English" ? "Is Minority" : "अल्पसंख्याक",
    language === "English" ? "Mobile No" : "मोबाईल क्र.",
    language === "English" ? "Student Adhar No" : "विद्यार्थी आधार क्र",
    language === "English" ? "Mother Tongue" : "मातृभाषा",
    language === "English" ? "Nationality" : "राष्ट्रीयत्व",
    language === "English" ? "State" : "राज्य",
    language === "English" ? "Previous School" : "मागील शाळा",
    language === "English" ? "Student Name" : "विद्यार्थ्याचे नाव",
    language === "English" ? "Father Name" : "वडीलांचे नावं",
    language === "English" ? "Mother Name" : "आईचे नाव",
    language === "English" ? "Student Surname" : "विद्यार्थ्याचे आडनाव",
  ];
  const useTemplate = () => {
    const wb = XLSX.utils.book_new(); // Create a new workbook
    const ws = XLSX.utils.aoa_to_sheet([columns]); // Create a new worksheet with headers
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Add the worksheet to the workbook
    XLSX.writeFile(wb, "template.xlsx"); // Download the workbook as 'template.xlsx'
  };
// Define a mapping object for column headings to database field names
const headingToFieldName = {
  "Admission Class": "admissionClass",
  "Register No": "registerNo",
  'Student Id': 'studentId',
  "Book No": 'bookno',
"Birth Place" : 'birthPlace',
"Caste" : 'caste',
"Category" : 'category',
"Religion": 'religion',
"Country" : 'country',
"Current Class"  : 'currentClass',
"Division" : 'division',
"Date Of Admission" : 'dateOfAdmission',
"District" : 'district',
"Taluka"  : 'taluka',
"Date Of  Birth" : 'dob',
"DOB In Words": 'dobInWords',
"Educational Year": 'educationalYear',
"Gender" : 'gender',
"Is Minority" : 'isMinority',
"Mobile No" : 'mobileNo',
"Student Adhar No" : 'stdAdharNo',
"Mother Tongue" : 'motherTounge',
"Nationality" : 'nationality',
"Previous School" : 'prevSchool',
"State" : 'state',
"Student Name" : 'stdName',
"Father Name" : 'stdFather',
"Mother Name" :'stdMother',
"Student Surname" :'stdSurname',

"प्रवेश वर्ग" : 'admissionClass',
'नोंदणी क्र': 'registerNo',
'विद्यार्थी क्रमांक': 'studentId',
"पुस्तक क्र" : 'bookno',
"जन्मस्थान" : 'birthPlace',
'जात': 'caste',
'श्रेणी': 'category',
'धर्म': 'religion',
'देश': 'country',
'सध्याचा वर्ग': 'currentClass',
'तुकडी': 'division',
'प्रवेशाची तारीख': 'dateOfAdmission',
'जिल्हा': 'district',
'तालुका': 'taluka',
'जन्मतारीख': 'dob',
'शब्दात जन्मतारीख': 'dobInWords',
'शैक्षणिक वर्ष': 'educationalYear',
'लिंग': 'gender',
'अल्पसंख्याक': 'isMinority',
'मोबाईल क्र.': 'mobileNo',
'विद्यार्थी आधार क्र': 'stdAdharNo',
'मातृभाषा': 'motherTounge',
'राष्ट्रीयत्व': 'nationality',
'मागील शाळा': 'prevSchool',
'राज्य': 'state',
'विद्यार्थ्याचे नाव': 'stdName',
'वडीलांचे नावं': 'stdFather',
'आईचे नाव': 'stdMother',
'विद्यार्थ्याचे आडनाव': 'stdSurname'


};

const saveDataToFirebase = async () => {
  try {
    if (!excelData.length) {
      throw new Error("No data available to save.");
    }



   // Fetch existing data from Firebase
    const existingDataResponse = await fetch(
      `https://testschool-3bcbf-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`
    );

    if (!existingDataResponse.ok) {
      throw new Error("Failed to fetch existing data from Firebase.");
    }

    const existingData = await existingDataResponse.json();

    // Merge existing data with new data from Excel sheet
    const newData = {};
    let lastUpdatedSerialNo = 0;

    // If existing data exists, calculate the last updated serial number
    if (existingData) {
      const serialNumbers = Object.keys(existingData).map(Number);
      lastUpdatedSerialNo = Math.max(...serialNumbers);
      Object.assign(newData, existingData);
    }

    // Process new data from Excel sheet
    excelData.forEach((row, index) => {
      const serialNo = lastUpdatedSerialNo + index + 1;
      const formattedRow = {};

      // Map column headings to database field names
      columns.forEach((heading, columnIndex) => {
        const fieldName = headingToFieldName[heading];
        if (fieldName) {
          formattedRow[fieldName] = row[columnIndex];
        }
      });

      newData[serialNo] = {
        serialNo,
        ...formattedRow,
      };
    });

    // Save merged data back to Firebase
    const response = await fetch(
      `https://testschool-3bcbf-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to store data in the database");
    }

    // Update lastUpdatedSerialNo
    lastUpdatedSerialNo += excelData.length;
    const updateSerialNoResponse = await fetch(
      `https://testschool-3bcbf-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/lastUpdatedSerialNo.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lastUpdatedSerialNo),
      }
    );

    if (!updateSerialNoResponse.ok) {
      throw new Error("Failed to update lastUpdatedSerialNo");
    }
    setDatabaseData(Object.values(newData));
    setExcelData([]);
    setSaveMessage(
      language === "English"
        ? "Data Saved Successfully"
        : "डेटा यशस्वीरित्या सेव्ह झाला"
    );
  } catch (error) {
    console.error("Error saving data to Firebase:", error);
  }
};

  const customColumnNames = [
    
    language === "English" ? "Book No" : "पुस्तक क्र.",
    language === "English" ? "Register No" : "नोंदणी क्र",
    language === "English" ? "Student Id" : "विद्यार्थी क्रमांक",
    language === "English" ? "Student Name" : "विद्यार्थ्याचे नाव",
    language === "English" ? "Father Name" : "वडीलांचे नावं",
    language === "English" ? "Mother Name" : "आईचे नाव",
    language === "English" ? "Student Surname" : "विद्यार्थ्याचे आडनाव",
    language === "English" ? "Gender" : "लिंग",
    language === "English" ? "Mobile No" : "मोबाईल क्र.",
    language === "English" ? "Student Adhar No" : "विद्यार्थी आधार क्र",
    language === "English" ? "Date Of Birth" : "जन्मतारीख",
    language === "English" ? "DOB In Words" : "शब्दात जन्मतारीख",
    language === "English" ? "Caste" : "जात",
    language === "English" ? "Category" : "श्रेणी",
    language === "English" ? "Is Minority" : "अल्पसंख्याक",
    language === "English" ? "Religion" : "धर्म",
    language === "English" ? "Taluka" : "तालुका",
    language === "English" ? "District" : "जिल्हा",
    language === "English" ? "Birth Place" : "जन्मस्थान",
    language === "English" ? "State" : "राज्य",
    language === "English" ? "Country" : "देश",
    language === "English" ? "Nationality" : "राष्ट्रीयत्व",
    language === "English" ? "Mother Tongue" : "मातृभाषा",
    language === "English" ? "Admission Class" : "प्रवेश वर्ग",
    language === "English" ? "Current Class" : "सध्याचा वर्ग",
    language === "English" ? "Division" : "तुकडी",
    language === "English" ? "Educational Year" : "शैक्षणिक वर्ष",
    language === "English" ? "Date Of Admission" : "प्रवेशाची तारीख",
    language === "English" ? "Previous School" : "मागील शाळा",
  ];
  // Fetch data from the database when the component mounts
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);
  let data 
  const bookno = data?.bookno


  if (bookno !== null && bookno !== undefined) {
    // Your code that uses bookno
    console.log("Book Number:", bookno);
  } else {
    // Handle the case where bookno is null or undefined
    console.error("Book number is null or undefined");
  }
  
  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch(
        `https://testschool-3bcbf-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`
      );
      const data = await response.json();
       console.log("Fetched data:", data); // Log fetched data to the console
      if (data !== null) {
        // Convert the object of objects into an array of objects
        const dataArray = Object.keys(data)
          .map((key) => data[key])
          .filter((item) => item !== null); // Filter out null items
        setDatabaseData(dataArray);
        console.log("dataArray", dataArray);
        
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
    let data; // Define data as undefined initially

try {
  // Code that might throw the error
  const bookno = data.bookno; // Assuming 'data' is the object that might be null
  // Other code using 'bookno'
} catch (error) {
  // Handle the error here
  console.error("Error occurred while accessing 'bookno':", error);
  // Optionally, set a default value for 'bookno' or handle the error in another way
}
  };
  
  
  const exportReportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]); // Create an empty worksheet
  
    // Add headers to the worksheet
    XLSX.utils.sheet_add_aoa(ws, [customColumnNames], { origin: "A1" });
  
    // Add data rows to the worksheet
    const dataRows = databaseData.map((student) => {
      return customColumnNames.map((columnName) => student[headingToFieldName[columnName]]);
    });
    XLSX.utils.sheet_add_aoa(ws, dataRows, { origin: "A2" });
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Report Data");
  
    // Save the workbook to a file
    XLSX.writeFile(wb, "report_data.xlsx");
  };

  
  return (
    <div>
    <Sidebar/>
    <div  className="main-content-of-page">
      {/* Upload Excel Sheet */}
      <div className="box" style={{ marginBottom: "20px" }}>
        <h2>
          {language === "English"
            ? "Upload Excel Sheet"
            : "एक्सेल शीट अपलोड करा"}
        </h2>
        <div className="file-upload" style={{ textAlign: "center" }}>
          <label htmlFor="file-input">
            {" "}
            {language === "English" ? "Choose File" : "फाईल निवडा"}
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
          <button
            onClick={useTemplate}
            style={{ textAlign: "center", display: "block", margin: "0 auto" }}
          >
            <FontAwesomeIcon icon={faDownload} color="black" />{" "}
            {language === "English"
              ? "Download Template"
              : "टेम्पलेट डाउनलोड करा"}
          </button>
        </div>
        {saveMessage && <p>{saveMessage}</p>}
      </div>

      {/* Excel Data */}
      {excelData.length > 0 && (
        <div className="box" style={{ marginBottom: "100px" }}>
          <div
            className="table-container"
            style={{ overflow: "auto", maxHeight: "300px" }}
          >
            <h3>{language === "English" ? "Excel Data" : "एक्सेल डेटा"} </h3>
            <table style={{ border: "3px solid black" }}>
              <thead>
                <tr>
                  {columns.map((column, columnIndex) => (
                    <th key={columnIndex}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "100px" }}>
              <button
                onClick={saveDataToFirebase}
                style={{
                  textAlign: "center",
                  display: "block",
                  margin: "0 auto",
                  backgroundColor: "blue",
                  color: "white",
                  fontSize: "larger",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                {language === "English" ? " Save" : "जतन करा"}
              </button>
              {saveMessage && <p>{saveMessage}</p>} {/* Display success message */}
            </div>
          </div>
        </div>
      )}
      {databaseData && databaseData.length > 0 && (
        <div className="table-container" style={{ overflow: "auto", maxHeight: "300px" }}>
  <div className="box" style={{ marginBottom: "100px" }}>
    <div
      className="table-container"
      style={{ overflow: "auto", maxHeight: "300px" }}
    >
      <div
        className="export-label-container"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        <h3 style={{ fontSize: "24px" }}>
          {language === "English" ? "Report" : "अहवाल "}
        </h3>
      </div>
      <table style={{ border: "3px solid black" }}>
        <thead>
          <tr>
            {customColumnNames.map((columnName, columnIndex) => (
              <th key={columnIndex}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {databaseData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                  
                    <td>{row.bookno}</td>
                    <td>{row.registerNo}</td>
                    <td>{row.studentId}</td>
                    <td>{row.stdName}</td>
                    <td>{row.stdFather}</td>
                    <td>{row.stdMother}</td>
                    <td>{row.stdSurname}</td>
                    <td>{row.gender}</td>
                    <td>{row.mobileNo}</td>
                    <td>{row.stdAdharNo}</td>
                    <td>{row.dob}</td>
                    <td>{row.dobInWords}</td>
                    <td>{row.caste}</td>
                    <td>{row.category}</td>
                    <td>{row.isMinority}</td>
                    <td>{row.religion}</td>
                    <td>{row.taluka}</td>
                    <td>{row.district}</td>
                    <td>{row.birthPlace}</td>
                    <td>{row.state}</td>
                    <td>{row.country}</td>
                    <td>{row.nationality}</td>
                    <td>{row.motherTounge}</td>
                    <td>{row.admissionClass}</td>
                    <td>{row.currentClass}</td>
                    <td>{row.division}</td>
                    <td>{row.educationalYear}</td>
                    <td>{row.dateOfAdmission}</td>
                    <td>{row.prevSchool}</td>

                   
                  </tr>
                ))}

</tbody>

      </table>
      <div className="export-button-container">
        <button className="export-button" onClick={exportReportToExcel}>
          <FontAwesomeIcon icon={faDownload} color="black" />
          {language === "English" ? " Export Data " : "डेटा निर्यात करा"}
        </button>
      </div>
    </div>
  </div>
  </div>
)}
</div>
</div>
  );
}

export default Importexport;

 