import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../components/style.css';
import schoolImage from "../assets/images/school.jpg";

function LoginForm() {
  const [udiseNumber, setUdiseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'English';
    setLanguage(storedLanguage);
  }, []);
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    window.location.reload();
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/schoolData.json`);
      const data = await response.json();
  
      if (!response.ok || !data) {
        setErrorMessage(language === "English" ? 'UDISE number is not registered.' : 'यूडीआयएसई नंबर नोंदणीकृत नाही.');
        return;
      }
      if (data.password !== password) {
        setErrorMessage(language === "English" ? 'Incorrect password.' : 'अयोग्य पासवर्ड.');
        return;
      }
  
      // After successful login
      localStorage.setItem('udiseNumber', udiseNumber);
      localStorage.setItem('language', data.language); 
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(language === "English" ? 'An error occurred while logging in. Please try again later.' : 'लॉगिन करताना त्रुटी आली. कृपया नंतर पुन्हा प्रयत्न करा.');
    }
  };
  

  return (
    <div className='p-4'>
    
      <div className="container-fluid mt-5 schoolRegisterForm col-md-5 col-sm-12 mb-4 p-md-4">
      <select className="language-drop" value={language} onChange={handleLanguageChange}>
            <option value="English">English</option>
            <option value="Marathi">मराठी</option>
          </select>
        <section className="register mt-4">

          <h1 className="mb-5">{language === 'English' ? 'School Login' : 'स्कूल लॉगिन'}</h1>
          <div className="row my-3 sc-form">
            <div className="col-md-4 col-sm-12">
              <img className="img-fluid" src={schoolImage} alt="School" />
            </div>
           
            <div className="col-md-8 col-sm-12">
              <form className="h-100 text-start p-4 mb-4">

                <div>
                  <label htmlFor="udiseNumber" className="form-label">{language === 'English' ? 'UDISE Code:' : 'UDISE कोड:'}</label>
                  <input className="form-control" type="text" id="udiseNumber" value={udiseNumber} onChange={e => setUdiseNumber(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="password" className="form-label">{language === 'English' ? 'Password:' : 'पासवर्ड:'}</label>
                  <input className="form-control" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button className="verificationStatus mt-3" onClick={handleLogin}>{language === 'English' ? 'Login' : 'लॉगिन'}</button> 
                <span className="loginLink mt-5">
                  {language === 'English' ? 'Not Registered Yet?' : 'अद्याप नोंदणी झाली नाही?'}
                  <Link className="text-decoration-none ms-1" to="/school-register">
                    {language === 'English' ? 'Register' : 'नोंदणी करा'}
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginForm;
