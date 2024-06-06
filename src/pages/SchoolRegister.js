import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import schoolImage from "../assets/images/school.jpg";

function SchoolRegister() {
  const [schoolName, setSchoolName] = useState("");
  const [udiseNumber, setUdiseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [showEnterOtp, setShowEnterOtp] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [invalidMobileNumber, setInvalidMobileNumber] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [taluka, setTaluka] = useState("");
  const [jilha, setJilha] = useState("");
  const [email, setEmail] = useState("");
  const [generalRegisterNumber, setGeneralRegisterNumber] = useState("");
  const [boardName, setBoardName] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [sanlagnataKramank, setSanlagnataKramank] = useState("");
  const [manyataKramank, setManyataKramank] = useState("");
  const [schoolLogo, setSchoolLogo] = useState("");

  useEffect(() => {
    setIsFormFilled(!!schoolName && !!udiseNumber && !!password && !!mobileNumber);
  }, [schoolName, udiseNumber, password, mobileNumber]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "English";
    console.log("Language from localStorage:", storedLanguage);
    setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);


  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    window.location.reload();
  }

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!isPhoneNumberVerified) {
      alert(language === "English" ? "Please verify your phone number first." : "कृपया आपला मोबाइल नंबर सत्यापित करा.");
      return;
    }
    if (serverOtp.trim() !== sentOtp.toString()) {
      alert(language === "English" ? "Please verify your OTP." : "कृपया आपला OTP सत्यापित करा.");
      return;
    }

    const schoolData = {
      schoolName,
      password,
      mobileNumber,
      language,
      telephoneNumber,
      address,
      taluka,
      jilha,
      email,
      generalRegisterNumber,
      boardName,
      indexNumber,
      sanlagnataKramank,
      manyataKramank,
      schoolLogo
    };

    const schoolRegisterData = {
      schoolData,
      studentData: {},
    };

    fetch(
      `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schoolRegisterData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("School registered successfully:", data);
        alert(language === "English" ? "Registered successfully" : "यशस्वीरित्या नोंदणी केली");

        localStorage.setItem("udiseNumber", udiseNumber);

        window.location.href = "/home";
      })
      .catch((error) => {
        console.error("Error registering school:", error);
      });
  };

  function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const username = "Experts";
    const authkey = "ba9dcdcdfcXX";
    const mobiles = "+91" + mobileNumber.trim();
    const senderId = "EXTSKL";

    // Check if UDISE number already exists
    fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data !== null) {
          alert(language === "English" ? "UDISE number already registered." : `UDISE क्रमांक ${udiseNumber} आधीच नोंदणी केला गेला आहे.`);
          return;
        }

        // Proceed to send OTP if UDISE number is not already registered
        const otp = generateRandomCode();
        setSentOtp(otp);
        setShowEnterOtp(true);
        const message = `Your Verification Code is ${otp}. - Expertskill Technology.`;
        const accusage = "1";
        const encodedMessage = encodeURIComponent(message);

        // Send SMS API
        const mainUrl = "https://mobicomm.dove-sms.com/submitsms.jsp?";
        const url = `${mainUrl}user=${username}&key=${authkey}&mobile=${mobiles}&message=${encodedMessage}&accusage=${accusage}&senderid=${senderId}`;

        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text(); // Parse response as text
          })
          .then((data) => {
            console.log("Message sent successfully:", data);
            const responseArray = data.split(",");
            if (responseArray[1] === "InvalidMobileNumber") {
              setInvalidMobileNumber(true);
            } else {
              setInvalidMobileNumber(false);
            }
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      })
      .catch((error) => {
        console.error("Error checking UDISE number:", error);
      });
  };


  const verifyOtp = (e) => {
    e.preventDefault();
    if (serverOtp.trim() === sentOtp.toString()) {
      setVerificationStatus(language === "English" ? "Your OTP Verified Successfully." : "आपला OTP यशस्वीरित्या सत्यापित झाला आहे.");
      setIsPhoneNumberVerified(true);
    } else {
      setVerificationStatus(language === "English" ? "OTP did not match." : " OTP जुळला नाही.");
    }
  };

  return (
    <div>


      <div className="schoolRegisterForm col-md-5 col-sm-12 mb-4 p-md-4">
        <select className="language-drop" value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Marathi">मराठी</option>
        </select>
        <h1 className="my-2">
          {language === "English" ? "School Registration Form" : "स्कूल नोंदणी प्रपत्र"}
        </h1>

        <div className="row my-3 sc-form">
          <div className="col-md-4 col-sm-12 mt-md-5">
            <img className="img-fluid mt-5" src={schoolImage} alt="School" />
          </div>

          <div className="col-md-8 col-sm-12">
            <form className="h-100 text-start p-4 mb-4">
              <div>
                <label htmlFor="schoolName">
                  {language === "English" ? "School Name:" : "शाळेचे नाव:"}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="schoolName"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="udiseNumber">
                  {language === "English" ? "UDISE Code:" : "UDISE कोड:"}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="udiseNumber"
                  value={udiseNumber}
                  onChange={(e) => setUdiseNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">{language === "English" ? "Password:" : "पासवर्ड:"}</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mobileNumber">
                  {language === "English" ? "Mobile Number:" : "मोबाइल नंबर:"}
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  className="form-control mb-3"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                {invalidMobileNumber && (
                  <p style={{ color: "red" }}>
                    {language === "English"
                      ? "Invalid mobile number. Please enter a valid mobile number."
                      : "अवैध मोबाइल नंबर... कृपया वैध मोबाइल नंबर द्या."}
                  </p>
                )}
              </div>

              <button onClick={sendMessage} disabled={!isFormFilled}>
                {language === "English" ? "Send OTP" : "OTP पाठवा"}
              </button>
              {showEnterOtp && (
                <>
                  <input
                    type="text"
                    value={serverOtp}
                    onChange={(e) => setServerOtp(e.target.value)}
                    placeholder={language === "English" ? "Enter OTP" : "OTP प्रविष्ट करा"}
                    className="form-control my-2"
                  />
                  <button onClick={verifyOtp}>
                    {language === "English" ? "Verify OTP" : "OTP सत्यापित करा"}
                  </button>
                </>
              )}
              <p className="verificationStatus">{verificationStatus}</p>
              <button onClick={handleRegistration} disabled={!isPhoneNumberVerified}>
                {language === "English" ? "Register" : "नोंदणी करा"}
              </button>

              <span className="loginLink mt-5">
                {language === "English"
                  ? "Already Registered ?"
                  : "आधीच नोंदणी केली आहे?"}
                <Link className="text-decoration-none ms-1" to="/loginform">
                  {language === "English" ? "Just Login" : "लॉगिन करा"}
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolRegister;
