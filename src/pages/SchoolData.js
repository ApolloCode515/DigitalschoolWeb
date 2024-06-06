import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Sidebar from "../components/Sidebar";
import  "../components/style.css";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeRzK6wzqfH5zO7icoCKwkaE7Du998dKw",
  authDomain: "digitalschool-6ba79.firebaseapp.com",
  databaseURL: "https://digitalschool-6ba79-default-rtdb.firebaseio.com",
  projectId: "digitalschool-6ba79",
  storageBucket: "digitalschool-6ba79.appspot.com",
  messagingSenderId: "407448102746",
  appId: "1:407448102746:web:22ed42062e3f32aa3cb563",
  measurementId: "G-ZV6YZNL451"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function SchoolData() {
  const [formData, setFormData] = useState({
    schoolName: "",
    udiseNumber: "",
    password: "",
    mobileNumber: "",
    language: "",
    telephoneNumber: "",
    address: "",
    taluka: "",
    jilha: "",
    email: "",
    generalRegisterNumber: "",
    boardName: "",
    indexNumber: "",
    sanlagnataKramank: "",
    manyataKramank: "",
    schoolLogo: ""
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'English';
    setLanguage(storedLanguage);
  }, []);
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    fetch("https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("All data fetched successfully:", data);
        const udiseNumber = localStorage.getItem("udiseNumber");
        const schoolData = data[udiseNumber]?.schoolData || {};
        setFormData({
          ...schoolData,
          udiseNumber: localStorage.getItem("udiseNumber")
        });
        setLogoURL(schoolData.schoolLogo); // Set the logo URL
      })
      .catch((error) => {
        console.error("Error fetching all data:", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Upload logo file to Firebase Storage
    const storageRef = firebase.storage().refFromURL("gs://digitalschool-6ba79.appspot.com");
    const uploadTask = storageRef.child(`logos/${logoFile.name}`).put(logoFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
      },
      (error) => {
        // Error function
        console.error(error);
      },
      () => {
        // Complete function
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // Save downloadURL to your Firestore database along with other form data
          saveFormData(downloadURL);
        });
      }
    );
  };
  

  const saveFormData = (logoURL) => {
    // Send updated school data to the database
    fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${formData.udiseNumber}/schoolData.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        schoolLogo: logoURL
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("School data saved successfully:", data);
        alert("Data Saved Successfully")
      })
      .catch((error) => {
        console.error("Error updating school data:", error);
      });
  };


  return (
    <div>
    <Sidebar/>
    <div className="main-content-of-page overflow-auto mt-5 pt-sm-5 mb-5" style={{ flex: "1" }}>
    <h1 className="mt-3 mb-4 text-center">{language === "English" ? "School Information Form" : "शाळा माहिती फॉर्म"}</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3 ">
        <label htmlFor="schoolName" className="form-label">{language === "English" ? "School Name" : "शाळेचे नाव"}:</label>
        <input
          type="text"
          className="form-control"
          id="schoolName"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="udiseNumber" className="form-label">{language === "English" ? "UDISE Number" : "UDISE क्र"}:</label>
        <input
          type="text"
          className="form-control"
          id="udiseNumber"
          name="udiseNumber"
          value={formData.udiseNumber}
          readOnly // Assuming UDISE number is not editable
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mobileNumber" className="form-label">{language === "English" ? "Mobile Number" : "मोबाईल नंबर"}:</label>
        <input
          type="text"
          className="form-control"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
        />
      </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">{language === "English" ? "Address" : "पत्ता"}:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taluka" className="form-label">{language === "English" ? "Taluka" : "तालुका"}:</label>
          <input
            type="text"
            className="form-control"
            id="taluka"
            name="taluka"
            value={formData.taluka}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jilha" className="form-label">{language === "English" ? "District" : "जिल्हा"}:</label>
          <input
            type="text"
            className="form-control"
            id="jilha"
            name="jilha"
            value={formData.jilha}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">{language === "English" ? "Email Id" : "ई - मेल आयडी"}:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telephoneNumber" className="form-label">{language === "English" ? "Telephone Number" : "दूरध्वनी क्र"}:</label>
          <input
            type="text"
            className="form-control"
            id="telephoneNumber"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="generalRegisterNumber" className="form-label">{language === "English" ? "General Register Number" : "जनरल रजिस्टर  क्र"}:</label>
          <input
            type="text"
            className="form-control"
            id="generalRegisterNumber"
            name="generalRegisterNumber"
            value={formData.generalRegisterNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="boardName" className="form-label">{language === "English" ? "Board Name" : "बोर्डचे नाव"}:</label>
          <input
            type="text"
            className="form-control"
            id="boardName"
            name="boardName"
            value={formData.boardName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="indexNumber" className="form-label">{language === "English" ? "Index Number" : "अनु क्र"}:</label>
          <input
            type="text"
            className="form-control"
            id="indexNumber"
            name="indexNumber"
            value={formData.indexNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sanlagnataKramank" className="form-label">{language === "English" ? "Affiliation no" : "संलग्नता क्र"}:</label>
          <input
            type="text"
            className="form-control"
            id="sanlagnataKramank"
            name="sanlagnataKramank"
            value={formData.sanlagnataKramank}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="manyataKramank" className="form-label">{language === "English" ? "Approval Number" : "मान्यता क्र"}:</label>
          <input
            type="text"
            className="form-control"
            id="manyataKramank"
            name="manyataKramank"
            value={formData.manyataKramank}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
            <label htmlFor="schoolLogo" className="form-label">{language === "English" ? "School Logo" : "शाळेचा लोगो"}:</label>
            {logoURL && <img src={logoURL} alt="School Logo" style={{ width: "100px", height: "100px" }} />}
            <input
              type="file"
              className="form-control"
              id="schoolLogo"
              name="schoolLogo"
              onChange={handleLogoChange}
            />
          </div>
    <button type="submit" className="btn btn-primary">{language === "English" ? "Save" : "जतन करा"}</button>
  </form>
  </div>
</div>
  );
}

export default SchoolData;
