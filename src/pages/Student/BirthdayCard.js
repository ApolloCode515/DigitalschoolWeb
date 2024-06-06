import { WhatsappIcon } from "react-share";
import React, { useState, useEffect } from "react";
import "./BirthdayCard.css";
import img from  "../../assets/images/b1.jpeg";
import imgA from "../../assets/images/b2.jpeg";
import imgB from "../../assets/images/b3.jpeg";
import imgC from "../../assets/images/b4.jpeg";
import imgD from "../../assets/images/b5.jpeg";
import imgE from "../../assets/images/b6.jpeg";
import imgF from "../../assets/images/b7.jpeg";
import imgG from "../../assets/images/b8.jpeg";
import imgH from "../../assets/images/b9.jpeg";
import imgI from "../../assets/images/b10.jpeg";
import spinner from "../../assets/images/loading-spinner.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar";


function Sclbirthcard() {
  const [formData, setFormData] = useState({ selectedDate: new Date() });
  const [birthdayData, setBirthdayData] = useState([]);
  const [showTodayBirthdays, setShowTodayBirthdays] = useState(false);
  const [selectedDateBirthdays, setSelectedDateBirthdays] = useState([]);
  const [todaysBirthdayNameList, setTodaysBirthdayNameList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [imageIndex, setImageIndex] = useState(0); // State to keep track of the image index
  const [selectedStudentImages, setSelectedStudentImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Define isLoading state

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`;
        const response = await fetch(url);
        console.log("response",response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data) {
          const students = [];
          for (const serialNoKey in data) {
            const studentData = data[serialNoKey];
            if (studentData) {
              const { dob, stdName } = studentData;
              students.push({ stdName, dob });
            }
          }
          setBirthdayData(students);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [udiseNumber]);

  const handleShowTodayBirthdays = () => {
    setIsLoading(true); // Set isLoading to true when starting to share via WhatsApp

console.log("isLoading",isLoading);
    const todayDateString = formData.selectedDate.toLocaleDateString("en-CA", {
      timeZone: "UTC",
    });
    const todayBirthdays = birthdayData.filter((student) => {
      const studentDobString = new Date(student.dob).toLocaleDateString(
        "en-CA",
        { timeZone: "UTC" }
      );
      
      
      return studentDobString === todayDateString;
    });
    
    setSelectedDateBirthdays(todayBirthdays);
    setShowTodayBirthdays(true);

    const todaysBirthdayNames = todayBirthdays.map(
      (student) => student.stdName
    );
    setTodaysBirthdayNameList(todaysBirthdayNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleStudentClick = (studentName) => {
    if (selectedStudent === studentName) {
      setImageIndex(0);
    } else {
      setSelectedStudent(studentName);
      setImageIndex(0);
      const studentImages = [
        img,
        imgA,
        imgB,
        imgC,
        imgD,
        imgE,
        imgF,
        imgG,
        imgH,
        imgI,
      ];
      // Set the images array
      Promise.all(
        studentImages.map((image) => getBase64Image(image, studentName))
      )
        .then((imagesWithNames) => {
          setSelectedStudentImages(imagesWithNames);
        })
        .catch((error) => {
          console.error("Error generating images with names:", error);
        });
    }
  };

  const handleNextImage = () => {
    setImageIndex((imageIndex + 1) % selectedStudentImages.length);
  };

  const handlePrevImage = () => {
    setImageIndex(
      (imageIndex - 1 + selectedStudentImages.length) %
        selectedStudentImages.length
    );
  };

  const handleShareWhatsApp = async () => {
    try {
      const imageUrl = selectedStudentImages[imageIndex];
      const studentName = selectedStudent;
      const base64Image = await getBase64Image(imageUrl, studentName);
      const blob = await fetch(base64Image).then((response) => response.blob());
      const filesArray = [
        new File([blob], "birthday_image.jpg", { type: blob.type }),
      ];
      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator
          .share({
            files: filesArray,
            text: "Birthday image",
            title: "Birthday Image",
          })
          .then(() => {
            console.log("Image shared successfully");
          })
          .catch((error) => {
            console.error("Error sharing image:", error);
          });
      } else {
        console.error("Sharing not supported");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to convert image to base64
  const getBase64Image = async (url, studentName, udiseNo) => {
    return new Promise(async (resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = async function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to match image
        canvas.width = this.width;
        canvas.height = this.height;

        // Draw the image on the canvas
        ctx.drawImage(this, 0, 0);

        try {
          // Fetch school name from Firebase
          const schoolDataUrl = `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/125/schoolData.json`;
          const response = await fetch(schoolDataUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch school data");
          }
          const data = await response.json();
          console.log("data",data);
          if (data && data.schoolName) {
            // Draw school name on the canvas
            const schoolName = data.schoolName;
            ctx.font = "bold 50px Arial"; // Adjust font size and style for school name
            ctx.fillStyle = "white"; // Adjust text color
            ctx.fillText(schoolName, 300, 1080); // Adjust position as needed
          }
        } catch (error) {
          console.error("Error fetching school data:", error);
        }

        // Draw student name on the canvas
        ctx.font = "bold 80px Arial"; // Adjust font size and style for student name
        ctx.fillStyle = "white"; // Adjust text color
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textX = canvas.width / 2;
        ctx.fillText(studentName, textX, 320);

        // Convert the canvas to base64 image
        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
      };
      img.onerror = function () {
        reject(new Error("Could not load image"));
      };
      img.src = url;
    });
  };
  return (
    <div>
    <Sidebar/>
    <div
      className="school-birthday-card main-content-of-page template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "lightyellow" }}
    >
      {!showTodayBirthdays && (
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">
              {" "}
              {language === "English" ? "Today's Birthday" : "आजचा वाढदिवस"}
            </h3>

            <div className="mb-2">
              <label htmlFor="dob">
                {language === "English" ? "Date of Birth" : "जन्मतारीख"}
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.selectedDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({ selectedDate: new Date(e.target.value) })
                }
                className="form-control"
              />
            </div>
            <button
              type="button"
              onClick={handleShowTodayBirthdays}
              className="btn btn-primary"
            >
              {language === "English"
                ? " Show Today's Birthdays"
                : "आजचे वाढदिवस दाखवा"}
            </button>
          </form>
        </div>
      )}
      {showTodayBirthdays && (
        <div className="birthday-container text-center">
          <h3 className="text-center">
            {" "}
            {language === "English" ? "Today's Birthdays " : "आजचा वाढदिवस"}
          </h3>
          <p>{todaysBirthdayNameList.join(", ")}</p>
          {selectedDateBirthdays.map((student, index) => (
            <div key={index} className="birthday-card">
              <div>
                <p
                  onClick={() => handleStudentClick(student.stdName)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {student.stdName}
                </p>
              </div>
              {selectedStudent === student.stdName && (
                <div>
                  <p>
                    {language === "English" ? "Date of Birth" : "जन्मतारीख"}{" "}
                    {student.dob}
                  </p>

                  <div className="image-container">
                    <div className="image-wrapper">
                      {/* Image */}
                      <img
                        src={selectedStudentImages[imageIndex]}
                        className="student-image"
                        style={{
                          maxWidth: "500px",
                          maxHeight: "500px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="loading-animation">
                      {/* Spinner */}
                      {isLoading && (
                        <img src={spinner} alt="Loading animation" />
                      )}
                    </div>
                    <div className="button-container">
                      {/* Navigation buttons */}
                      <button
                        onClick={handlePrevImage}
                        className="arrow-button left-arrow"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="arrow-button right-arrow"
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleShareWhatsApp}
                    className="whatsapp-button bg-primary"
                  >
                    <WhatsappIcon size={32} round className="whatsapp-icon" />{" "}
                    {language === "English"
                      ? "Share via WhatsApp "
                      : "WhatsApp द्वारे पाठवा"}
                  </button>
                </div>
              )}
            </div>
          ))}
          {selectedDateBirthdays.length === 0 && <p>No birthdays today.</p>}
        </div>
      )}
    </div>
    </div>
  );
}

export default Sclbirthcard;
