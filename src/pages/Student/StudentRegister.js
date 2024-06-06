import { React, useState, useEffect } from "react";
import "../../components/style.css";
import { useLocation } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import CloseIcon from '@mui/icons-material/Close';

function StudentRegister() {
  const [stdData, setStdData] = useState({
    bookno: "",
    studentId: "",
    registerNo: "",
    educationalYear: "",
    stdSurname: "",
    stdName: "",
    stdFather: "",
    stdMother: "",
    stdAdharNo: "",
    religion: "",
    caste: "",
    nationality: "",
    motherTounge: "",
    dateOfAdmission: "",
    country: "",
    state: "",
    district: "",
    taluka: "",
    birthPlace: "",
    gender: "",
    dob: "",
    dobInWords: "",
    mobileNo: "",
    prevSchool: "",
    admissionClass: "",
    currentClass: "",
    division: "",
  });
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'English';
    setLanguage(storedLanguage);
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookno, setBookNumber] = useState("");
  const [bookNumbers, setBookNumbers] = useState([]);
  const [newBookNumber, setNewBookNumber] = useState("");
  const [showNewBookForm, setShowNewBookForm] = useState(false);

  const [religion, setReligion] = useState("");
  const [religions, setReligions] = useState([]);
  const [newReligion, setNewReligion] = useState("");
  const [showNewReligionForm, setShowNewReligionForm] = useState(false);

  const [nationality, setNationality] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [newNationality, setNewNationality] = useState("");
  const [showNewNationalityForm, setShowNewNationalityForm] = useState(false);

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [showNewCountryForm, setShowNewCountryForm] = useState(false);

  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState("");
  const [showNewStateForm, setShowNewStateForm] = useState(false);

  const [showCasteInput, setShowCasteInput] = useState(false);
  const [casteCategory, setCasteCategory] = useState("");
  const [isMinority, setIsMinority] = useState(false);

  const [educationalYear, setEducationalYear] = useState("");
  const [educationalYears, setEducationalYears] = useState([]);
  const [newEducationalYear, setNewEducationalYear] = useState("");
  const [showNewEducationalYearForm, setShowNewEducationalYearForm] =
    useState(false);

  const [admissionClass, setAdmissionClass] = useState("");
  const [admissionClasses, setAdmissionClasses] = useState([]);
  const [newAdmissionClass, setNewAdmissionClass] = useState("");
  const [showNewAdmissionClassForm, setShowNewAdmissionClassForm] = useState(false);

  const [currentClass, setCurrentClass] = useState("");
  const [currentClasses, setCurrentClasses] = useState([]);
  const [newCurrentClass, setNewCurrentClass] = useState("");
  const [showNewCurrentClassForm, setShowNewCurrentClassForm] = useState(false);

  const [gender, setGender] = useState("");

  const [registerNoExists, setRegisterNoExists] = useState(false);
  const [relatedData, setRelatedData] = useState(null);
  const location = useLocation();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [udiseNumber, setUdiseNumber] = useState("");
  useEffect(() => {
    const schoolUdiseNumber = localStorage.getItem("udiseNumber");
    setUdiseNumber(schoolUdiseNumber);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`
        );
        console.log("response1", response);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data new:', data);

        const bookNumbers = Object.values(data).map(student =>
          student.bookno
        ).filter(bookno => bookno);
console.log("bookNumbers",bookNumbers);
          
        const religions = Object.values(data).map(student =>
          student.religion
        ).filter(religion => religion);
console.log("religions",religions);

          const nationalities = Object.keys(data).flatMap(bookno =>
            Object.keys(data[bookno]).flatMap(registerNo =>
              data[bookno][registerNo].nationality
            )
          ).filter(nationality => nationality);

          const countries = Object.keys(data).flatMap(bookno =>
            Object.keys(data[bookno]).flatMap(registerNo =>
              data[bookno][registerNo].country
            )
          ).filter(country => country);

          const admissionClasses = Object.keys(data).flatMap(bookno =>
            Object.keys(data[bookno]).flatMap(registerNo =>
              data[bookno][registerNo].admissionClass
            )
          ).filter(admissionClass => admissionClass);

          const currentClasses = Object.keys(data).flatMap(bookno =>
            Object.keys(data[bookno]).flatMap(registerNo =>
              data[bookno][registerNo].currentClass
            )
          ).filter(currentClass => currentClass);

          const states = Object.keys(data).flatMap(bookno =>
            Object.keys(data[bookno]).flatMap(registerNo =>
              data[bookno][registerNo].state
            )
          ).filter(state => state);

          const educationalYears = Object.keys(data).flatMap(bookno =>
            Object.keys(data[bookno]).flatMap(registerNo =>
              data[bookno][registerNo].educationalYear
            )
          ).filter(educationalYear => educationalYear);

          setBookNumbers([...new Set(bookNumbers)]);
          setReligions([...new Set(religions)]);
          setNationalities([...new Set(nationalities)]);
          setCountries([...new Set(countries)]);
          setAdmissionClasses([...new Set(admissionClasses)]);
          setCurrentClasses([...new Set(currentClasses)]);
          setStates([...new Set(states)]);
          setEducationalYears([...new Set(educationalYears)]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const updatedData = {
      ...stdData,
      bookno: bookno,
      admissionClass: admissionClass,
      currentClass: currentClass,
      religion: religion,
      nationality: nationality,
      country: country,
      state: state,
      educationalYear: educationalYear,
      gender: gender
    };
    setStdData(updatedData);
    console.log("Updated student data:", updatedData);

    fetchData();
  }, [udiseNumber, bookno, admissionClass, currentClass, religion, nationality, country, state, educationalYear, gender]);

  const districtsData = {
    Maharashtra: [
      language === 'English' ? 'Ahmednagar' : 'अहमदनगर',
      language === 'English' ? 'Akola' : 'अकोला',
      language === 'English' ? 'Amravati' : 'अमरावती',
      language === 'English' ? 'Aurangabad' : 'औरंगाबाद',
      language === 'English' ? 'Beed' : 'बीड',
      language === 'English' ? 'Bhandara' : 'भंडारा',
      language === 'English' ? 'Buldhana' : 'बुलढाणा',
      language === 'English' ? 'Chandrapur' : 'चंद्रपूर',
      language === 'English' ? 'Dhule' : 'धुळे',
      language === 'English' ? 'Gadchiroli' : 'गडचिरोली',
      language === 'English' ? 'Gondia' : 'गोंदिया',
      language === 'English' ? 'Hingoli' : 'हिंगोली',
      language === 'English' ? 'Jalgaon' : 'जळगाव',
      language === 'English' ? 'Jalna' : 'जालना',
      language === 'English' ? 'Kolhapur' : 'कोल्हापूर',
      language === 'English' ? 'Latur' : 'लातूर',
      language === 'English' ? 'Mumbai City' : 'मुंबई शहर',
      language === 'English' ? 'Nagpur' : 'नागपूर',
      language === 'English' ? 'Nanded' : 'नांदेड',
      language === 'English' ? 'Nandurbar' : 'नंदुरबार',
      language === 'English' ? 'Nashik' : 'नाशिक',
      language === 'English' ? 'Osmanabad' : 'उस्मानाबाद',
      language === 'English' ? 'Palghar' : 'पालघर',
      language === 'English' ? 'Parbhani' : 'परभणी',
      language === 'English' ? 'Pune' : 'पुणे',
      language === 'English' ? 'Raigad' : 'रायगड',
      language === 'English' ? 'Ratnagiri' : 'रत्नागिरी',
      language === 'English' ? 'Sangli' : 'सांगली',
      language === 'English' ? 'Satara' : 'सातारा',
      language === 'English' ? 'Sindhudurg' : 'सिंधुदुर्ग',
      language === 'English' ? 'Solapur' : 'सोलापूर',
      language === 'English' ? 'Thane' : 'ठाणे',
      language === 'English' ? 'Wardha' : 'वर्धा',
      language === 'English' ? 'Washim' : 'वाशीम',
      language === 'English' ? 'Yavatmal' : 'यवतमाळ',
    ],
  };
  const talukasData = {
    English: {
      "Kolhapur": ["Karvir", "Panhala", "Shahuwadi", "Kagal", "Hatkanangale", "Shirol", "Radhanagari", "Gaganbawada", "Bhudargad", "Gadhinglaj", "Chandgad", "Ajra"],
      "Sangli": ["Miraj", "Kavathe-Mahankal", "Tasgaon", "Jat", "Walwa (Islampur)", "Shirala", "Khanapur-Vita", "Atpadi", "Palus", "Kadegaon"],
      "Satara": ["Satara", "Jaoli", "Koregaon", "Wai", "Mahabaleshwar", "Khandala", "Phaltan", "Maan (Dahiwadi)", "Khatav (Vaduj)", "Patan", "Karad"],
      "Pune": ["Pune City", "Haveli", "Khed (Rajgurunagar)", "Junnar", "Ambegaon (Ghodegaon)", "Maval (Vadgaon)", "Mulshi (Paud)", "Shirur", "Purandhar (Saswad)", "Velhe", "Bhor", "Baramati", "Indapur", "Daund"],
      "Ahmednagar": ["Nagar", "Shevgaon", "Pathardi", "Parner", "Sangamner", "Kopargaon", "Akole", "Shrirampur", "Nevasa", "Rahata", "Rahuri", "Shrigonda", "Karjat", "Jamkhed"],
      "Solapur": ["Solapur North", "Barshi", "Solapur South", "Akkalkot", "Madha", "Karmala", "Pandharpur", "Mohol", "Malshiras", "Sangole", "Mangalvedhe"],
      "Osmanabad": ["Osmanabad", "Tuljapur", "Bhum", "Paranda", "Washi", "Kalamb", "Lohara", "Umarga"],
      "Latur": ["Latur", "Renapur", "Ahmedpur", "Jalkot", "Chakur", "Shirur Anantpal", "Ausa", "Nilanga", "Deoni", "Udgir"],
      "Beed": ["Beed", "Ashti", "Patoda", "Shirur-Kasar", "Georai", "Majalgaon", "Wadwani", "Kaij", "Dharur", "Parli", "Ambejogai"],
      "Aurangabad": ["Aurangabad", "Kannad", "Soegaon", "Sillod", "Phulambri", "Khuldabad", "Vaijapur", "Gangapur", "Paithan"],
      "Jalna": ["Jalna", "Bhokardan", "Jafrabad", "Badnapur", "Ambad", "Ghansawangi", "Partur", "Mantha"],
      "Parbhani": ["Parbhani", "Sonpeth", "Gangakhed", "Palam", "Purna", "Sailu", "Jintur", "Manwath", "Pathri"],
      "Hingoli": ["Hingoli", "Sengaon", "Kalamnuri", "Basmath", "Aundha Nagnath"],
      "Nanded": ["Nanded", "Ardhapur", "Mudkhed", "Bhokar", "Umri", "Loha", "Kandhar", "Kinwat", "Himayatnagar", "Hadgaon", "Mahur", "Deglur", "Mukhed", "Dharmabad", "Biloli", "Naigaon (Khairgaon)"],
      "Yavatmal": ["Yavatmal", "Arni", "Babhulgaon", "Kalamb", "Darwha", "Digras", "Ner", "Pusad", "Umarkhed", "Mahagaon", "Kelapur (Pandharkawada)", "Ralegaon", "Ghatanji", "Wani", "Maregaon", "Zari Jamani"],
      "Chandrapur": ["Chandrapur", "Saoli", "Mul", "Ballarpur", "Pombhurna", "Gondpimpri", "Warora", "Chimur", "Bhadravati", "Bramhapuri", "Nagbhid", "Sindewahi", "Rajura", "Korpana", "Jivati"],
      "Gadchiroli": ["Gadchiroli", "Dhanora", "Chamorshi", "Mulchera", "Desaiganj (Vadasa)", "Armori", "Kurkheda", "Korchi", "Aheri", "Bhamragad", "Sironcha"],
      "Gondia": ["Gondia", "Tirora", "Goregaon", "Arjuni Morgaon", "Amgaon", "Salekasa", "Sadak Arjuni", "Deori"],
      "Bhandara": ["Bhandara", "Tumsar", "Pauni", "Mohadi", "Sakoli", "Lakhni", "Lakhandur"],
      "Nagpur": ["Nagpur (Urban)", "Nagpur (Rural)", "Kamptee", "Hingna", "Katol", "Narkhed", "Savner", "Kalameshwar", "Ramtek", "Mouda", "Parseoni", "Umred", "Kuhi", "Bhiwapur"],
      "Wardha": ["Wardha", "Deoli", "Seloo", "Arvi", "Ashti", "Karanja", "Hinganghat", "Samudrapur"],
      "Amravati": ["Amravati", "Bhatukali", "Nandgaon Khandeshwar", "Dharni (Amravati)", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Daryapur", "Anjangaon-Surji", "Chandur", "Dhamangaon", "Tiosa"],
      "Washim": ["Washim", "Malegaon", "Risod", "Mangrulpir", "Karanja", "Manora"],
      "Akola": ["Akola", "Akot", "Telhara", "Balapur", "Patur", "Murtajapur", "Barshitakli"],
      "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Jalgaon Jamod", "Sangrampur", "Malkapur", "Motala", "Nandura", "Khamgaon", "Shegaon", "Mehkar", "Sindkhed Raja", "Lonar"],
      "Jalgaon": ["Jalgaon", "Jamner", "Erandol", "Dharangaon", "Bhusawal", "Raver", "Muktainagar (Edalabad)", "Bodwad", "Yawal", "Amalner", "Parola", "Chopda", "Pachora", "Bhadgaon", "Chalisgaon"],
      "Dhule": ["Dhule", "Sakri", "Sindkheda", "Shirpur"],
      "Nandurbar": ["Nandurbar", "Navapur", "Shahada", "Taloda", "Akkalkuwa", "Akrani (Dhadgaon)"],
      "Nashik": ["Nashik", "Igatpuri", "Dindori", "Peth", "Trimbakeshwar", "Kalwan", "Deola", "Surgana", "Baglan (Satana)", "Malegaon", "Nandgaon", "Chandwad", "Niphad", "Sinnar", "Yeola"],
      "Palghar": ["Palghar", "Vasai", "Dahanu", "Talasari", "Jawhar", "Mokhada", "Vada", "Vikramgad"],
      "Thane": ["Thane", "Kalyan", "Murbad", "Bhiwandi", "Shahapur", "Ulhasnagar", "Ambarnath"],
      "Mumbai City": ["Kurla", "Andheri", "Borivali"],
      "Raigad": ["Pen", "Alibaug", "Murud", "Panvel", "Uran", "Karjat (Matheran)", "Khalapur", "Mangaon", "Tala", "Roha", "Sudhagad (Pali)", "Mahad", "Poladpur", "Shrivardhan", "Mhasla"],
      "Ratnagiri": ["Ratnagiri", "Sangameshwar (Deorukh)", "Lanja", "Rajapur", "Chiplun", "Guhagar", "Dapoli", "Mandangad", "Khed"],
      "Sindhudurg": ["Kankavli", "Vaibhavwadi", "Devgad", "Malwan", "Sawantwadi", "Kudal", "Vengurla", "Dodamarg (Kasal)"]
    },
    Marathi: {
      "कोल्हापूर": ["करवीर", "पन्हाळा", "शाहूवाडी", "कगळ", "हातकणंगळे", "शिरोळ", "राधानगरी", "गगनबावडा", "भुदरगड", "गढिंगलज", "चंदगड", "आजरा"],
      "सांगली": ["मिरज", "कवठे-महांकळ", "तासगाव", "जात", "वाळवा (इस्लामपुर)", "शिराळा", "खानापूर-विटा", "आटपाडी", "पळूस", "कडेगाव"],
      "सातारा": ["सातारा", "जावळी", "कोरेगाव", "वाई", "महाबळेश्वर", "खंडाळा", "फळटण", "माण (दहिवडी)", "खताव (वडुज)", "पाटण", "कराड"],
      "पुणे": ["पुणे शहर", "हवेली", "खेड (राजगुरुनगर)", "जुन्नर", "अंबेगाव (घोडेगाव)", "मावळ (वडगाव)", "मुळशी (पाऊड)", "शिरूर", "पुरंधर (सस्वद)", "वेल्हे", "भोर", "बारामती", "इंदापूर", "दौंड"],
      "अहमदनगर": ["नगर", "शेवगाव", "पाठार्डी", "परनेर", "संगमनेर", "कोपरगाव", "अकोले", "श्रीरामपुर", "नेवासा", "राहता", "राहुरी", "श्रीगोंडा", "कर्जत", "जामखेड"],
      "सोलापूर": ["सोलापूर उत्तर", "बारशी", "सोलापूर दक्षिण", "अक्कलकोट", "मधा", "करमाळा", "पंढरपूर", "मोहोळ", "माळशिरस", "सांगोळ", "मंगळवेढे"],
      "उस्मानाबाद": ["उस्मानाबाद", "तुळजापूर", "भूम", "परंदा", "वाशी", "कलंब", "लोहारा", "उमरगा"],
      "लातूर": ["लातूर", "रेणापूर", "अहमदपूर", "जळकोट", "चाकूर", "शिरूर अनंतपाळ", "औसा", "निळंगा", "देवनी", "उदगीर"],
      "बीड": ["बीड", "अश्ती", "पाटोदा", "शिरूर-कासर", "गेवराई", "मजलगाव", "वडवाणी", "कईज", "धरूर", "पारळी", "आंबेजोगाई"],
      "औरंगाबाद": ["औरंगाबाद", "कानंद", "सोईगाव", "सिल्लोड", "फुलंब्री", "खुलदाबाद", "वैजापूर", "गंगापूर", "पैठण"],
      "जालना": ["जालना", "भोकरदान", "जाफराबाद", "बडनापूर", "अंबाड", "घांसावंगी", "परटूर", "मंथा"],
      "परभणी": ["परभणी", "सोनपेठ", "गंगाखेड", "पाळम", "पूर्णा", "साईलू", "जिंतूर", "मनवठ", "पथरी"],
      "हिंगोली": ["हिंगोली", "सेंगाव", "कळमनुरी", "बासमत", "औंधा नागनाथ"],
      "नांदेड": ["नांदेड", "अर्धापूर", "मुदखेड", "भोकर", "उमरी", "लोहा", "कांधार", "किंवट", "हिमायतनगर", "हडगाव", "महूर", "देगळूर", "मुखेड", "धर्माबाद", "बिलोळी", "नागांव (खैरगांव)"],
      "यवतमाळ": ["यवतमाळ", "अर्णी", "बभुलगाव", "कळम्ब", "दारव्हा", "दिग्रास", "नेर", "पुसड", "उमरखेड", "महागाव", "केळापूर (पांढरकवाडा)", "राळेगाव", "घटांजी", "वाणी", "मारेगाव", "जारी जामानी"],
      "चंद्रपूर": ["चंद्रपूर", "सावली", "मुळ", "बल्लारपूर", "पोंभूर्णा", "गोंदपिंपरी", "वरोरा", "चिमूर", "भद्रावती", "ब्रह्मपूरी", "नागभिड", "सिंडेवाही", "राजूरा", "कोरपाणा", "जिवती"],
      "गडचिरोली": ["गडचिरोली", "धनोरा", "चामोर्शी", "मुलचेरा", "देसैगंज (वडसा)", "आरमोरी", "कुरखेडा", "कोरची", "आहेरी", "भामरगाव", "सिरोंचा"],
      "गोंदिया": ["गोंदिया", "तिरोरा", "गोरेगाव", "अर्जुनी मोरगाव", "अमगाव", "साळेकासा", "सडक अर्जुनी", "देओरी"],
      "भंडारा": ["भंडारा", "तुमसार", "पाऊनी", "मोहडी", "साकोळी", "लाखनी", "लाखांदुर"],
      "नागपुर": ["नागपूर (शहरी)", "नागपूर (ग्रामीण)", "कामठी", "हिंगणा", "कटोल", "नारखेड", "सावनेर", "काळामेश्वर", "रामटेक", "मौडा", "परसेवनी", "उमरेड", "कुही", "भिवापूर"],
      "वर्धा": ["वर्धा", "देवोली", "सेलू", "अरवी", "अश्ती", "कारंजा", "हिंगणघाट", "समुद्रापूर"],
      "अमरावती": ["अमरावती", "भाटुकली", "नंदगाव कांदेश्वर", "धरणी (अमरावती)", "चिखलदारा", "आचलपूर", "चंदूरबाजार", "मोरशी", "वारुड", "दर्यापूर", "अंजनगाव-सुर्जी", "चंदूर", "धामांगाव", "तिओसा"],
      "वाशिम": ["वाशिम", "माळेगाव", "रिसोड", "मांगरुलपीर", "करंजा", "मनोरा"],
      "अकोला": ["अकोला", "अकोट", "टेलहारा", "बालापूर", "पाटूर", "मुर्ताजापूर", "बर्शितकली"],
      "बुलढाणा": ["बुलढाणा", "चिखली", "देऊलगाव राजा", "जळगाव जामोद", "सांगरामपूर", "माळकापूर", "मोतला", "नांदुरा", "खामगाव", "शेगाव", "मेहकर", "सिंधखेड राजा", "लोणार"],
      "जळगाव": ["जळगाव", "जामनेर", "इरंडोल", "धारणगाव", "भुसावळ", "रावेर", "मुक्तैनगर (एडलाबाद)", "बोडवाड", "यावळ", "अमळनेर", "परोळा", "चोपडा", "पाचोरा", "भाडगाव", "चाळीसगाव"],
      "धुले": ["धुले", "साकरी", "सिंधखेडा", "शिरपूर"],
      "नंदुरबार": ["नंदुरबार", "नवापूर", "शहादा", "तालोदा", "अक्कलकुवा", "अकरणी (धडगाव)"],
      "नाशिक": ["नाशिक", "इगतपुरी", "दिंडोरी", "पेठ", "त्रिंबकेश्वर", "कलवाण", "देवळा", "सुरगाणा", "बागलाण (साताना)", "माळेगाव", "नांदगाव", "चांदवड", "निफड", "सिन्नार", "येवोळा"],
      "पालघर": ["पालघर", "वसई", "दहाणू", "तळसारी", "जावहर", "मोखाडा", "वडा", "विक्रमगड"],
      "ठाणे": ["ठाणे", "कल्याण", "मुरबाड", "भिवंडी", "शहापूर", "उल्हासनगर", "अंबरनाथ"],
      "मुंबई शहर": ["कुर्ला", "अंधेरी", "बोरिवली"],
      "रायगड": ["पेण", "आळीबाग", "मुरुड", "पनवेल", "उरण", "कर्जत (माथेराण)", "खालापूर", "मंगाव", "ताळा", "रोहा", "सुधागड (पाळी)", "महाड", "पोलडपूर", "श्रीवर्धन", "म्हासळा"],
      "रत्नागिरी": ["रत्नागिरी", "सांगमेश्वर (देवरुख)", "लांजा", "राजापूर", "चिपळूण", "गुहागर", "दापोळी", "माण्डंगड", "खेड"],
      "सिंधुदुर्ग": ["कणकवली", "वैभववाडी", "देवगड", "मालवण", "सावंतवाडी", "कुडाळ", "वेंगुर्ला", "दोडमर्ग (कसाळ)"]
    }
  };

  const handleBookNumChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewBook") {
      setShowNewBookForm(true);
    } else {
      setBookNumber(selectedValue);
      setShowNewBookForm(false);
    }
  };
  const handleNewBookSubmit = () => {
    if (newBookNumber.trim() !== "") {

      setBookNumbers(prevBookNumbers => [...prevBookNumbers, newBookNumber]);
      setBookNumber(newBookNumber);
      setShowNewBookForm(false);
    }
  };


  const handleAdmissionClassChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewAdmissionClass") {
      setShowNewAdmissionClassForm(true);
    } else {
      setAdmissionClass(selectedValue);
      setCurrentClass(selectedValue);
      setShowNewAdmissionClassForm(false);
    }
  };

  const handleNewAdmissionClassSubmit = () => {
    if (newAdmissionClass.trim() !== "") {
      setAdmissionClasses([...admissionClasses, newAdmissionClass]);
      setAdmissionClass(newAdmissionClass);
      setShowNewAdmissionClassForm(false);
    }
  };

  const handleCurrentClassChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewCurrentClass") {
      setShowNewCurrentClassForm(true);
    } else {
      setCurrentClass(selectedValue);
      setShowNewCurrentClassForm(false);
    }
  };

  const handleNewCurrentClassSubmit = () => {
    if (newCurrentClass.trim() !== "") {
      setCurrentClasses([...currentClasses, newCurrentClass]);
      setCurrentClass(newCurrentClass);
      setShowNewCurrentClassForm(false);
    }
  };

  const handleReligionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewRel") {
      setShowNewReligionForm(true);
    } else {
      setReligion(selectedValue);
      setShowNewReligionForm(false);
    }
  };
  const handleNewReligionSubmit = () => {
    if (newReligion.trim() !== "") {
      setReligions([...religions, newReligion]);
      setReligion(newReligion);
      setShowNewReligionForm(false);
    }
  };

  const handleNationalityChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewNat") {
      setShowNewNationalityForm(true);
    } else {
      setNationality(selectedValue);
      setShowNewNationalityForm(false);
    }
  };
  const handleNewNationalitySubmit = () => {
    if (newNationality.trim() !== "") {
      setNationalities([...nationalities, newNationality]);
      setNationality(newNationality);
      setShowNewNationalityForm(false);
    }
  };

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewCountry") {
      setShowNewCountryForm(true);
    } else {
      setCountry(selectedValue);
      setShowNewCountryForm(false);
    }
  };

  const handleNewCountrySubmit = () => {
    if (newCountry.trim() !== "") {
      setCountries([...countries, newCountry]);
      setCountry(newCountry);
      setShowNewCountryForm(false);
    }
  };

  const handleStateChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewState") {
      setShowNewStateForm(true);
    } else {
      setState(selectedValue);
      setShowNewStateForm(false);
    }
  };

  const handleNewStateSubmit = () => {
    if (newState.trim() !== "") {
      setStates([...states, newState]);
      setState(newState);
      setShowNewStateForm(false);
    }
  };

  const handleEduYearChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "addNewEducationalYear") {
      setShowNewEducationalYearForm(true);
    } else {
      setEducationalYear(selectedValue);
      setShowNewEducationalYearForm(false);
    }
  };

  const handleNewEducationalYearSubmit = () => {
    if (newEducationalYear.trim() !== "") {
      setEducationalYears([...educationalYears, newEducationalYear]);
      setEducationalYear(newEducationalYear);
      setShowNewEducationalYearForm(false);
    }
  };
  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setSelectedTaluka("");
    setStdData(prevData => ({
      ...prevData,
      district: district,
      taluka: "",
    }));
  };

  const handleTalukaChange = (event) => {
    const taluka = event.target.value;
    setSelectedTaluka(taluka);

    setStdData(prevData => ({
      ...prevData,
      taluka: taluka,
    }));
  };

  const talukaOptions = selectedDistrict ? (language === 'Marathi' ?
    talukasData['Marathi'][selectedDistrict].map((taluka, index) => (
      <option key={index} value={taluka}>{taluka}</option>
    )) :
    talukasData['English'][selectedDistrict].map((taluka, index) => (
      <option key={index} value={taluka}>{taluka}</option>
    ))
  ) : null;

  const handleCasteChange = (event) => {
    setStdData({ ...stdData, caste: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setCasteCategory(event.target.value);
  };

  const handleMinorityChange = (event) => {
    setIsMinority(event.target.checked);
  };

  const [showMinorityForm, setShowMinorityForm] = useState(false);

  const handleShowMinorityForm = (e) => {
    e.preventDefault();
    setShowMinorityForm(true);

  };

  const handleCloseMinorityForm = () => {
    setShowMinorityForm(false);
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    let updatedData = { ...stdData };

    updatedData[name] = value;

    if (name === "stdAdharNo") {
      const numericValue = value.replace(/\D/g, "");

      const formattedValue = numericValue
        .slice(0, 12)
        .replace(/(.{4})/g, "$1 ")
        .trim();
      updatedData[name] = formattedValue;
    }

    setStdData(updatedData);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior
    }
  }

  function convertDateToWords(date) {
    const dateObj = new Date(date);
    const dayValue = [
      { 1: "First" }, { 2: "Second" }, { 3: "Third" }, { 4: "Fourth" }, { 5: "Fifth" }, { 6: "Sixth" },
      { 7: "Seventh" }, { 8: "Eighth" }, { 9: "Ninth" }, { 10: "Tenth" }, { 11: "Eleventh" }, { 12: "Twelfth" },
      { 13: "Thirteenth" }, { 14: "Fourteenth" }, { 15: "Fifteenth" }, { 16: "Sixteenth" }, { 17: "Seventeenth" },
      { 18: "Eighteenth" }, { 19: "Nineteenth" }, { 20: "Twentieth" }, { 21: "Twenty-First" }, { 22: "Twenty-Second" },
      { 23: "Twenty-Third" }, { 24: "Twenty-Fourth" }, { 25: "Twenty-Fifth" }, { 26: "Twenty-Sixth" },
      { 27: "Twenty-Seventh" }, { 28: "Twenty-Eighth" }, { 29: "Twenty-Ninth" }, { 30: "Thirtieth" },
      { 31: "Thirty-First" }
    ];
    const dayValueInMarathi = [
      { 1: "एक" }, { 2: "दोन" }, { 3: "तीन" }, { 4: "चार" }, { 5: "पाचव" }, { 6: "सहा" },
      { 7: "सात" }, { 8: "आठ" }, { 9: "नऊ	" }, { 10: "दहा" }, { 11: "अकरा" }, { 12: "बारा" },
      { 13: "तेरा" }, { 14: "चौदा" }, { 15: "पंधरा" }, { 16: "सोळा" }, { 17: "सतरा" },
      { 18: "अठरा" }, { 19: "एकोणीस" }, { 20: "वीस" }, { 21: "एकवीस" }, { 22: "बावीस" },
      { 23: "तेवीस" }, { 24: "चोवीस" }, { 25: "पंचवीस" }, { 26: "सव्वीस" },
      { 27: "सत्तावीस" }, { 28: "अठ्ठावीस" }, { 29: "एकोणतीस" }, { 30: "तीस" },
      { 31: "एकतीस" }
    ];
    const monthNames = {
      1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
      7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
    };
    const monthNamesInMarathi = {
      1: "जानेवारी", 2: "फेब्रुवारी", 3: "मार्च", 4: "एप्रिल", 5: "मे", 6: "जून",
      7: "जुलै", 8: "ऑगस्ट", 9: "सप्टेंबर", 10: "ऑक्टोबर", 11: "नोव्हेंबर", 12: "डिसेंबर"
    };

    const yearValue = {
      1990: "nineteen ninety", 1991: "nineteen ninety one", 1992: "nineteen ninety two", 1993: "nineteen ninety three",
      1994: "nineteen ninety four", 1995: "nineteen ninety five", 1996: "nineteen ninety six", 1997: "nineteen ninety seven",
      1998: "nineteen ninety eight", 1999: "nineteen ninety nine", 2000: "two thousand", 2001: "two thousand one",
      2002: "two thousand two", 2003: "two thousand three", 2004: "two thousand four", 2005: "two thousand five",
      2006: "two thousand six", 2007: "two thousand seven", 2008: "two thousand eight", 2009: "two thousand nine",
      2010: "two thousand ten", 2011: "two thousand eleven", 2012: "two thousand twelve", 2013: "two thousand thirteen",
      2014: "two thousand fourteen", 2015: "two thousand fifteen", 2016: "two thousand sixteen", 2017: "two thousand seventeen",
      2018: "two thousand eighteen", 2019: "two thousand nineteen", 2020: "two thousand twenty", 2021: "two thousand twenty one",
      2022: "two thousand twenty two", 2023: "two thousand twenty three", 2024: "two thousand twenty four", 2025: "two thousand twenty five",
      2026: "two thousand twenty six", 2027: "two thousand twenty seven", 2028: "two thousand twenty eight", 2029: "two thousand twenty nine",
      2030: "two thousand thirty", 2031: "two thousand thirty one", 2032: "two thousand thirty two", 2033: "two thousand thirty three",
      2034: "two thousand thirty four", 2035: "two thousand thirty five", 2036: "two thousand thirty six", 2037: "two thousand thirty seven",
      2038: "two thousand thirty eight", 2039: "two thousand thirty nine", 2040: "two thousand forty", 2041: "two thousand forty one",
      2042: "two thousand forty two", 2043: "two thousand forty three", 2044: "two thousand forty four", 2045: "two thousand forty five",
      2046: "two thousand forty six", 2047: "two thousand forty seven", 2048: "two thousand forty eight", 2049: "two thousand forty nine",
      2050: "two thousand fifty", 2051: "two thousand fifty one", 2052: "two thousand fifty two", 2053: "two thousand fifty three",
      2054: "two thousand fifty four", 2055: "two thousand fifty five", 2056: "two thousand fifty six", 2057: "two thousand fifty seven",
      2058: "two thousand fifty eight", 2059: "two thousand fifty nine", 2060: "two thousand sixty", 2061: "two thousand sixty one",
      2062: "two thousand sixty two", 2063: "two thousand sixty three", 2064: "two thousand sixty four", 2065: "two thousand sixty five",
      2066: "two thousand sixty six", 2067: "two thousand sixty seven", 2068: "two thousand sixty eight", 2069: "two thousand sixty nine",
      2070: "two thousand seventy", 2071: "two thousand seventy one", 2072: "two thousand seventy two", 2073: "two thousand seventy three",
      2074: "two thousand seventy four", 2075: "two thousand seventy five", 2076: "two thousand seventy six", 2077: "two thousand seventy seven",
      2078: "two thousand seventy eight", 2079: "two thousand seventy nine", 2080: "two thousand eighty", 2081: "two thousand eighty one",
      2082: "two thousand eighty two", 2083: "two thousand eighty three", 2084: "two thousand eighty four", 2085: "two thousand eighty five",
      2086: "two thousand eighty six", 2087: "two thousand eighty seven", 2088: "two thousand eighty eight", 2089: "two thousand eighty nine",
      2090: "two thousand ninety", 2091: "two thousand ninety one", 2092: "two thousand ninety two", 2093: "two thousand ninety three",
      2094: "two thousand ninety four", 2095: "two thousand ninety five", 2096: "two thousand ninety six", 2097: "two thousand ninety seven",
      2098: "two thousand ninety eight", 2099: "two thousand ninety nine", 2100: "two thousand one hundred"
    };

    const yearValueInMarathi = {
      1991: "एकोणीशे एक्यान्नव", 1992: "एकोणीशे ब्यान्नव", 1993: "एकोणीशे त्र्यान्नव", 1994: "एकोणीशे चौर्यान्नव", 1995: "एकोणीशे पंच्यान्नव", 1996: "एकोणीशे शहान्नव", 1997: "एकोणीशे सत्त्यान्नव", 1998: "एकोणीशे अठ्यान्नव", 1999: "एकोणीशे नव्यान्नव", 2000: "दोन हजार",
      2001: "दोन हजार एक", 2002: "दोन हजार दोन", 2003: "दोन हजार तीन", 2004: "दोन हजार चार", 2005: "दोन हजार पाच", 2006: "दोन हजार सहा", 2007: "दोन हजार सात", 2008: "दोन हजार आठ", 2009: "दोन हजार नऊ", 2010: "दोन हजार दहा",
      2011: "दोन हजार अकरा", 2012: "दोन हजार बारा", 2013: "दोन हजार तेरा", 2014: "दोन हजार चौदा", 2015: "दोन हजार पंधरा", 2016: "दोन हजार सोळा", 2017: "दोन हजार सतरा", 2018: "दोन हजार अठरा", 2019: "दोन हजार एकोणीस",
      2020: "दोन हजार वीस", 2021: "दोन हजार एकवीस", 2022: "दोन हजार बावीस", 2023: "दोन हजार तेवीस", 2024: "दोन हजार चोवीस", 2025: "दोन हजार पंचवीस", 2026: "दोन हजार सव्वीस", 2027: "दोन हजार सत्तावीस", 2028: "दोन हजार अठ्ठावीस",
      2029: "दोन हजार एकोणतीस", 2030: "दोन हजार तीस", 2031: "दोन हजार एकतीस", 2032: "दोन हजार बत्तीस", 2033: "दोन हजार तेहतीस", 2034: "दोन हजार चौतीस", 2035: "दोन हजार पस्तीस", 2036: "दोन हजार छत्तीस", 2037: "दोन हजार सदतीस",
      2038: "दोन हजार अडतीस", 2039: "दोन हजार एकोणचाळीस", 2040: "दोन हजार चाळीस", 2041: "दोन हजार एक्केचाळीस", 2042: "दोन हजार बेचाळीस", 2043: "दोन हजार त्रेचाळीस", 2044: "दोन हजार चव्वेचाळीस", 2045: "दोन हजार पंचेचाळीस",
      2046: "दोन हजार सेहेचाळीस", 2047: "दोन हजार सत्तेचाळीस", 2048: "दोन हजार अठ्ठेचाळीस", 2049: "दोन हजार एकोणपन्नास", 2050: "दोन हजार पन्नास", 2051: "दोन हजार एक्कावन्न", 2052: "दोन हजार बावन्न", 2053: "दोन हजार त्रेपन्न",
      2054: "दोन हजार चोपन्न", 2055: "दोन हजार पंचावन्न", 2056: "दोन हजार छप्पन्न", 2057: "दोन हजार सत्तावन्न", 2058: "दोन हजार अठ्ठावन्न", 2059: "दोन हजार एकोणसाठ", 2060: "दोन हजार साठ", 2061: "दोन हजार एकसष्ठ", 2062: "दोन हजार बासष्ठ",
      2063: "दोन हजार त्रेसष्ठ", 2064: "दोन हजार चौसष्ठ", 2065: "दोन हजार पासष्ठ", 2066: "दोन हजार सहासष्ठ", 2067: "दोन हजार सदुसष्ठ", 2068: "दोन हजार अडुसष्ठ", 2069: "दोन हजार एकोणसत्तर", 2070: "दोन हजार सत्तर", 2071: "दोन हजार एक्काहत्तर",
      2072: "दोन हजार बाहत्तर", 2073: "दोन हजार त्र्याहत्तर", 2074: "दोन हजार चौर्‍याहत्तर", 2075: "दोन हजार पंच्याहत्तर", 2076: "दोन हजार शहात्तर", 2077: "दोन हजार सत्याहत्तर", 2078: "दोन हजार अठ्ठ्याहत्तर", 2079: "दोन हजार एकोण ऐंशी",
      2080: "दोन हजार ऐंशी", 2081: "दोन हजार एक्याऐंशी", 2082: "दोन हजार ब्याऐंशी", 2083: "दोन हजार त्र्याऐंशी", 2084: "दोन हजार चौऱ्याऐंशी", 2085: "दोन हजार पंच्याऐंशी", 2086: "दोन हजार शहाऐंशी", 2087: "दोन हजार सत्याऐंशी", 2088: "दोन हजार अठ्याऐंशी", 2089: "दोन हजार एकोणनव्वद", 2090: "दोन हजार नव्वद", 2091: "दोन हजार एक्याण्णव", 2092: "दोन हजार ब्याण्णव", 2093: "दोन हजार त्र्याण्णव", 2094: "दोन हजार चौऱ्याण्णव", 2095: "दोन हजार पंच्याण्णव", 2096: "दोन हजार शहाण्णव", 2097: "दोन हजार सत्त्याण्णव", 2098: "दोन हजार अठ्याण्णव", 2099: "दोन हजार नव्याण्णव", 2100: "एकवीसशे"
    };


    if (language === 'Marathi') {
      const day = dateObj.getDate().toString();
      const dayWord = dayValueInMarathi.find(obj => obj[day])[day];
      const monthIndex = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear().toString();
      if (year < 1990 || year > 2100) {
        return "तारीख उपलब्ध नाही";
      }
      const monthName = monthNamesInMarathi[monthIndex];
      const yearWords = yearValueInMarathi[year];

      return `${dayWord} ${monthName} ${yearWords}`;
    } else {
      const day = dateObj.getDate().toString();
      const dayWord = dayValue.find(obj => obj[day])[day];
      const monthIndex = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear().toString();
      if (year < 1990 || year > 2100) {
        return "Date is not available";
      }

      const monthName = monthNames[monthIndex];
      const yearWords = yearValue[year];

      return `${dayWord} ${monthName} ${yearWords}`;
    }

  }

  const handleDOBChange = (event) => {
    const dob = event.target.value;
    if (!dob) {
      setStdData({ ...stdData, dob: '', dobInWords: '' });
      return;
    }
    const dobInWords = convertDateToWords(dob);
    setStdData({ ...stdData, dob, dobInWords });
  };

  const hinduValue = language === 'English' ? 'Hindu' : 'हिंदू';
  const muslimsValue = language === 'English' ? 'Muslims' : 'मुस्लिम';
  const buddhistsValue = language === 'English' ? 'Buddhists' : 'बौद्ध';
  const jainsValue = language === 'English' ? 'Jains' : 'जैन';
  const christiansValue = language === 'English' ? 'Christians' : 'ख्रिश्चन';

  const params = new URLSearchParams(location.search);
  const serialNumberFromUrl = params.get("serialNo");
  const [matchingRecords, setMatchingRecords] = useState([]);
  const [showMatchingRecords, setShowMatchingRecords] = useState(true); // Initially show the table


  const updateFieldsAndState = (data) => {
    try {
      if (data) {
        // Update fields with data
        setGender(data.gender);
        setAdmissionClass(data.admissionClass);
        setCurrentClass(data.currentClass);
        setReligion(data.religion);
        setNationality(data.nationality);
        setCountry(data.country);
        setState(data.state);
        setEducationalYear(data.educationalYear);
        setSelectedDistrict(data.district);
        setSelectedTaluka(data.taluka);
        setBookNumber(data.bookno);

        setStdData((prevData) => ({
          ...prevData,
          ...data,
        }));
        // Additional fields can be updated in a similar way
      }
    } catch (error) {
      console.error("Error updating fields and state: ", error);
    }
  };
  const handleRecordSelection = (record) => {
    setRelatedData(record);
    updateFieldsAndState(record);
    setShowMatchingRecords(false);
  };
  useEffect(() => {
    const checkRegisterNoExists = async () => {
      try {
        if (serialNumberFromUrl) {
          // If a serial number is present in the URL, fetch data based on it
          const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData/${serialNumberFromUrl}.json`);

          if (response.ok) {
            const data = await response.json();
            console.log("Data fetched for serial number:", data);
            // Update fields with fetched data
            updateFieldsAndState(data);
            setRegisterNoExists(true);
          } else {
            console.log("Failed to fetch data for serial number.");
          }
        } else if (stdData.registerNo) {
          const { registerNo } = stdData;
          const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData.json`);

          if (response.ok) {
            const studentData = await response.json();
            const matchingRecords = [];

            // Iterate over each student data
            for (const serialNoKey in studentData) {
              const studentResponse = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData/${serialNoKey}.json`);
              if (studentResponse.ok) {
                const data = await studentResponse.json();
                if (data && data.registerNo === registerNo) {
                  matchingRecords.push(data);
                }
              }
            }

            if (matchingRecords.length > 0) {
              // Display list of matching records
              console.log("Matching records found:", matchingRecords);
              setMatchingRecords(matchingRecords);
              setRegisterNoExists(true);
            } else {
              console.log("No matching record found.");
              setRelatedData(null);
            }

          } else {
            console.log("Failed to fetch student data.");
          }
        } else {
          console.log("No register number provided.");
        }
      } catch (error) {
        console.error("Error checking register number: ", error);
      }
    };

    checkRegisterNoExists();

  }, [stdData.registerNo, udiseNumber, serialNumberFromUrl]);


  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData/${stdData.serialNo}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stdData),
        }
      );
      if (response.ok) {
        alert('Data updated successfully!');
      } else {
        console.error('Error updating data:', response.status);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }

  };
  const handleDelete = async () => {
    try {
      if (stdData.serialNo) {
        const { serialNo } = stdData;
        const response = await fetch(
          `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData/${serialNo}.json`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          console.log('Data deleted successfully!');
          alert('Data deleted successfully!');
        } else {
          console.error('Error deleting data:', response.status);
        }
      } else {
        console.log('No register number provided.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleReport = () => {
    window.location.href = `/student-report?registerNo=${stdData.registerNo}&udiseNumber=${udiseNumber}&bookno=${stdData.bookno}`;
    console.log("Report button clicked");
  };


  const handleRegister = async () => {
    setFormSubmitted(true);
    try {
      // Retrieve last added serial number from Firebase
      const response = await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/lastAddedSerialNo.json`);
      const lastAddedSerialNo = await response.json();

      let serialNo = lastAddedSerialNo || 0; // Initialize serialNo with the last added serial number or 0 if it's the first entry

      serialNo++; // Increment serialNo for each new student registration

      // Update last added serial number in Firebase
      await fetch(`https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/lastAddedSerialNo.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serialNo),
      });

      const {
        registerNo,
        bookno,
        studentId,
        educationalYear,
        stdSurname,
        stdName,
        stdFather,
        stdMother,
        stdAdharNo,
        religion,
        caste,
        nationality,
        motherTounge,
        dateOfAdmission,
        country,
        state,
        district,
        taluka,
        birthPlace,
        gender,
        dob,
        dobInWords,
        mobileNo,
        prevSchool,
        admissionClass,
        currentClass,
        division,
      } = stdData;

      const divisionUppercase = division.toUpperCase();

      const dataPayload = {
        serialNo,
        bookno,
        studentId,
        registerNo,
        educationalYear,
        stdSurname,
        stdName,
        stdFather,
        stdMother,
        stdAdharNo,
        religion,
        caste,
        nationality,
        motherTounge,
        dateOfAdmission,
        country,
        state,
        district,
        taluka,
        birthPlace,
        gender,
        dob,
        dobInWords,
        mobileNo,
        prevSchool,
        admissionClass,
        currentClass,
        division: divisionUppercase,
        isMinority,
        category: casteCategory,
      };

      const response2 = await fetch(
        `https://digischoolweb-default-rtdb.firebaseio.com/schoolRegister/${udiseNumber}/studentData/${serialNo}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPayload),
      }
      );

      if (response2.ok) {
        alert("Student data stored successfully");
        clearFormData(); // Clear form fields upon successful submission
      } else {
        alert("Failed to store student data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving student data");
    }
  };
  const closeButtonClick = () => {

    setShowNewBookForm(false);
    setShowCasteInput(false);
    setShowMatchingRecords(false);
    setShowNewAdmissionClassForm(false);
    setShowNewCountryForm(false);
    setShowNewCurrentClassForm(false);
    setShowNewEducationalYearForm(false);
    setShowNewNationalityForm(false);
    setShowNewReligionForm(false);
    setShowNewStateForm(false);
  };


  const clearFormData = () => {
    setStdData(prevState => ({
      ...prevState,
      studentId: "",
      educationalYear: "",
      stdSurname: "",
      stdName: "",
      stdFather: "",
      stdMother: "",
      stdAdharNo: "",
      religion: "",
      caste: "",
      nationality: "",
      motherTounge: "",
      dateOfAdmission: "",
      country: "",
      state: "",
      district: "",
      taluka: "",
      birthPlace: "",
      gender: "",
      dob: "",
      dobInWords: "",
      mobileNo: "",
      prevSchool: "",
      admissionClass: "",
      currentClass: "",
      division: "",
    }));
    setCasteCategory("");
    setIsMinority(false);
  };
  return (
    <div>
      <Sidebar />
      <div className="main-content-of-page">
        <div className="row">
          <div className="col-lg-10 col-xl-10 stduent-register">
            <div
              className="card text-black"
              style={{ borderRadius: "20px" }}
            >
              <p className="text-center h3 fw-bold mb-2 mx-1 mx-md-3 mt-2">{language === 'English' ? 'Register New Student' : 'नवीन विद्यार्थी नोंदणी'}</p>

              <div className="card-body">
                <div className="row justify-content-center">
                  <form className="mx-1 mx-md-3 row">


                    {/* -------------------------------------------------------------------------------------------------------------- */}
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Book No' : 'पुस्तक क्र.'}

                        </label>
                        <select
                          name="bookno"
                          className="form-select"
                          onChange={handleBookNumChange}
                          value={bookno}
                        >
                          <option value="">   {language === 'English' ? 'Select Book No' : 'पुस्तक क्र. निवडा'}</option>

                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          {bookNumbers.map((bNumber, index) => (
                            <option key={index} value={bNumber}>
                              {bNumber}
                            </option>
                          ))}
                          <option value="addNewBook">
                            {language === 'English' ? 'Add New Book Number' : 'नवीन पुस्तक क्रमांक जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>





                    {/* -------------------------------------------------------------------------------------------------------------- */}



                    {showNewBookForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newBookInput">
                              {language === 'English' ? 'Enter new book number:' : 'नवीन पुस्तक क्रमांक प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newBookInput"
                              value={newBookNumber}
                              onChange={(e) =>
                                setNewBookNumber(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button onClick={handleNewBookSubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {bookNumbers.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>
                                        {language === 'English' ? 'Book Numbers' : 'पुस्तक क्रमांक'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookNumbers.map((bNumber, index) => (
                                      <tr key={index}>
                                        <td>{bNumber}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Register NO' : 'रजिस्टर क्र.'}
                        </label>
                        <input
                          type="number"
                          name="registerNo"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.registerNo.trim()}
                          className="form-control"
                        />
                      </div>
                      <div className="centerReg">
                        {showMatchingRecords && registerNoExists && matchingRecords.length > 0 && (
                          <div className="overlay">

                            <table className="record-tableReg">
                              <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Class</th>
                                </tr>
                              </thead>
                              <tbody>
                                {matchingRecords.map((record, index) => (
                                  <tr key={index} onClick={() => handleRecordSelection(record)} className="record-rowReg">
                                    <td>{record.stdName} {record.stdFather} {record.stdSurname}</td>
                                    <td>{record.currentClass}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Student ID' : 'विद्यार्थी क्र.'}

                        </label>
                        <input
                          type="number"
                          name="studentId"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.studentId}
                          className="form-control"

                        />
                      </div>
                    </div>


                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Educational Year' : 'शैक्षणिक वर्ष'}
                        </label>
                        <select
                          name="educationalYear"
                          className={`form-select ${formSubmitted && educationalYear === "" ? "input-error" : ""}`}
                          onChange={handleEduYearChange}
                          value={educationalYear}
                        >
                          <option value="">{language === 'English' ? 'Select Education Year' : 'शैक्षणिक वर्ष निवडा'}
                          </option>
                          <option value="2023-24">2023-24</option>
                          <option value="2024-25">2024-25</option>
                          <option value="2025-26">2025-26</option>
                          <option value="2026-27">2026-27</option>
                          {educationalYears.map(
                            (educationalYear, index) => (
                              <option key={index} value={educationalYear}>
                                {educationalYear}
                              </option>
                            )
                          )}
                          <option value="addNewEducationalYear">
                            {language === 'English' ? 'Add New Education Year (eg. 2025-26) ' : 'नवीन शैक्षणिक वर्ष निवडा (eg. 2025-26) '}
                          </option>
                        </select>
                      </div>
                    </div>
                    {showNewEducationalYearForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newEducationalYearInput">
                              {language === 'English' ? ' Enter New EducationalYear: ' : 'नवीन शैक्षणिक वर्ष निवडा:'}

                            </label>
                            <input
                              type="text"
                              id="newEducationalYearInput"
                              value={newEducationalYear}
                              onChange={(e) =>
                                setNewEducationalYear(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button
                              onClick={handleNewEducationalYearSubmit}
                            >
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {educationalYears.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>  {language === 'English' ? 'Educational Year' : 'शैक्षणिक वर्ष'}</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    {educationalYears.map(
                                      (educationalYear, index) => (
                                        <tr key={index}>
                                          <td>{educationalYear}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Student Name' : 'विद्यार्थी नाव'}

                        </label>
                        <input
                          type="text"
                          name="stdName"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.stdName}
                          className={`form-control ${formSubmitted && stdData.stdName === "" ? "input-error" : ""}`}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Surname' : 'आडनाव'}
                        </label>
                        <input
                          type="text"
                          value={stdData.stdSurname}
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          className="form-control"
                          name="stdSurname"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Father Name' : 'वडीलांचे नाव'}
                        </label>
                        <input
                          type="text"
                          name="stdFather"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.stdFather}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Mother Name' : 'आईचे नाव'}
                        </label>
                        <input
                          type="text"
                          name="stdMother"
                          value={stdData.stdMother}
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          className="form-control"
                        />
                      </div>
                    </div>


                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Adhar Card No' : 'आधार कार्ड क्र.'}
                        </label>
                        <input
                          type="text"
                          name="stdAdharNo"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.stdAdharNo}
                          maxLength={14}
                          className={`form-control ${formSubmitted && stdData.stdAdharNo === "" ? "input-error" : ""}`}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0  mt-1">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Mobile No' : 'मोबाईल क्र'}
                        </label>
                        <input
                          type="number"
                          name="mobileNo"
                          maxLength={10}
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.mobileNo}
                          className={`form-control ${formSubmitted && stdData.mobileNo === "" ? "input-error" : ""}`}
                        />
                      </div>
                    </div>


                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Admission Class' : 'प्रवेश वर्ग'}
                        </label>
                        <select
                          name="admissionClass"
                          className={`form-select ${formSubmitted && admissionClass === "" ? "input-error" : ""}`}
                          onChange={handleAdmissionClassChange}
                          value={admissionClass}
                        >
                          <option value=""> {language === 'English' ? ' Select Admission Class ' : 'प्रवेश वर्ग निवडा'}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          {admissionClasses.map((adclass, index) => (
                            <option key={index} value={adclass}>
                              {adclass}
                            </option>
                          ))}
                          <option value="addNewAdmissionClass">
                            {language === 'English' ? '  Add New Admission Class' : 'नवीन प्रवेश वर्ग जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>

                    {showNewAdmissionClassForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newAdmissionClassInput">
                              {language === 'English' ? 'Enter new Admission Class: ' : 'नवीन प्रवेश वर्ग प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newAdmissionClassInput"
                              value={newAdmissionClass}
                              onChange={(e) =>
                                setNewAdmissionClass(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button onClick={handleNewAdmissionClassSubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {admissionClass.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>  {language === 'English' ? 'Admission Class' : 'प्रवेश वर्ग'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {admissionClasses.map((adclass, index) => (
                                      <tr key={index}>
                                        <td>{adclass}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Current Class' : 'वर्तमान वर्ग'}
                        </label>
                        <select
                          name="currentClass"
                          className='form-select'
                          onChange={handleCurrentClassChange}
                          value={currentClass || admissionClass}
                        >
                          <option value="">  {language === 'English' ? 'Select Current Class' : 'वर्तमान वर्ग निवडा'}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          {currentClasses.map((adclass, index) => (
                            <option key={index} value={adclass}>
                              {adclass}
                            </option>
                          ))}
                          <option value="addNewCurrentClass">
                            {language === 'English' ? 'Add New Current Class ' : 'नवीन वर्तमान वर्ग जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>

                    {showNewCurrentClassForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newCurrentClassInput">
                              {language === 'English' ? 'Enter new Current Class:' : 'नवीन वर्तमान वर्ग प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newCurrentClassInput"
                              value={newCurrentClass}
                              onChange={(e) =>
                                setNewCurrentClass(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button onClick={handleNewCurrentClassSubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {currentClasses.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>  {language === 'English' ? 'Current Class' : 'सध्याचा वर्ग'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {currentClasses.map((adclass, index) => (
                                      <tr key={index}>
                                        <td>{adclass}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0  mt-1">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Division' : 'तुकडी'}
                        </label>
                        <input
                          type="text"
                          name="division"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.division}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Nationality' : 'राष्ट्रीयत्व '}
                        </label>
                        <select
                          name="nationality"
                          className="form-select"
                          onChange={handleNationalityChange}
                          value={nationality}
                        >
                          <option value="">  {language === 'English' ? ' Select Nationality' : 'राष्ट्रीयत्व निवडा'}</option>
                          <option value="Indian">  {language === 'English' ? ' Indian' : 'भारतीय'}</option>
                          {nationalities.map((nat, index) => (
                            <option key={index} value={nat}>
                              {nat}
                            </option>
                          ))}
                          <option value="addNewNat">
                            {language === 'English' ? ' Add New Nationality ' : 'नवीन राष्ट्रीयत्व जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>
                    {showNewNationalityForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newRelegionInput">
                              {language === 'English' ? ' Enter New Nationality:' : 'नवीन राष्ट्रीयत्व प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newNationalityInput"
                              value={newNationality}
                              onChange={(e) =>
                                setNewNationality(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button onClick={handleNewNationalitySubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {nationalities.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>  {language === 'English' ? ' Nationality' : 'राष्ट्रीयत्व'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {nationalities.map(
                                      (nationality, index) => (
                                        <tr key={index}>
                                          <td>{nationality}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Country' : 'देश '}
                        </label>
                        <select
                          name="country"
                          className="form-select"
                          onChange={handleCountryChange}
                          value={country}
                        >
                          <option value=""> {language === 'English' ? ' Select Country' : 'देश निवडा'}</option>
                          <option value={language === 'English' ? 'India' : 'भारत'}>{language === 'English' ? 'India' : 'भारत'}</option>
                          <option value={language === 'English' ? 'Pakistan' : 'पाकिस्तान'}>{language === 'English' ? 'Pakistan' : 'पाकिस्तान'}</option>
                          <option value={language === 'English' ? 'Nepal' : 'नेपाल'}>{language === 'English' ? 'Nepal' : 'नेपाल'}</option>
                          <option value={language === 'English' ? 'Bhutan' : 'भूटान'}>{language === 'English' ? 'Bhutan' : 'भूटान'}</option>

                          {countries.map((cntry, index) => (
                            <option key={index} value={cntry}>
                              {cntry}
                            </option>
                          ))}
                          <option value="addNewCountry">
                            {language === 'English' ? ' Add New Country' : 'नवीन देश जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>
                    {showNewCountryForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newCountryInput">
                              {language === 'English' ? 'Enter New Country:' : 'नवीन देश प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newCountryInput"
                              value={newCountry}
                              onChange={(e) =>
                                setNewCountry(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button onClick={handleNewCountrySubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {countries.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>{language === 'English' ? ' Country  ' : 'देश'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {countries.map((country, index) => (
                                      <tr key={index}>
                                        <td>{country}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Religion' : 'धर्म '}
                        </label>
                        <select
                          name="religion"
                          className="form-select"
                          onChange={handleReligionChange}
                          value={religion}
                        >
                          <option value="">  {language === 'English' ? ' Select Religion' : 'धर्म निवडा'}</option>
                          <option value={hinduValue}>{hinduValue}</option>
                          <option value={muslimsValue}>{muslimsValue}</option>
                          <option value={buddhistsValue}>{buddhistsValue}</option>
                          <option value={jainsValue}>{jainsValue}</option>
                          <option value={christiansValue}>{christiansValue}</option>

                          {religions.map((religion, index) => (
                            <option key={index} value={religion}>
                              {religion}
                            </option>
                          ))}
                          <option value="addNewRel">
                            {language === 'English' ? ' Add New Religion ' : 'नवीन धर्म जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>
                    {showNewReligionForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newRelegionInput">
                              {language === 'English' ? '  Enter New Religion:' : 'नवीन धर्म      प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newReligionInput"
                              value={newReligion}
                              onChange={(e) =>
                                setNewReligion(e.target.value)
                              }
                            />
                            <button className="bg-danger ms-2 border border-white" onClick={closeButtonClick}><CloseIcon /></button>
                            <button onClick={handleNewReligionSubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {religions.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>  {language === 'English' ? ' Religion' : 'धर्म'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {religions.map((religion, index) => (
                                      <tr key={index}>
                                        <td>{religion}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'State' : 'राज्य '}
                        </label>
                        <select
                          name="state"
                          className='form-select'
                          onChange={handleStateChange}
                          value={state}
                        >
                          <option value=""> {language === 'English' ? ' Select State ' : 'राज्य निवडा'}</option>
                          <option value={language === 'English' ? 'Maharashtra' : 'महाराष्ट्र'}>{language === 'English' ? 'Maharashtra' : 'महाराष्ट्र'}</option>
                          <option value={language === 'English' ? 'Andhra Pradesh' : 'आंध्र प्रदेश'}>{language === 'English' ? 'Andhra Pradesh' : 'आंध्र प्रदेश'}</option>
                          <option value={language === 'English' ? 'Arunachal Pradesh' : 'अरुणाचल प्रदेश'}>{language === 'English' ? 'Arunachal Pradesh' : 'अरुणाचल प्रदेश'}</option>
                          <option value={language === 'English' ? 'Assam' : 'असम'}>{language === 'English' ? 'Assam' : 'असम'}</option>
                          <option value={language === 'English' ? 'Bihar' : 'बिहार'}>{language === 'English' ? 'Bihar' : 'बिहार'}</option>
                          <option value={language === 'English' ? 'Chhattisgarh' : 'छत्तीसगढ़'}>{language === 'English' ? 'Chhattisgarh' : 'छत्तीसगढ़'}</option>
                          <option value={language === 'English' ? 'Goa' : 'गोवा'}>{language === 'English' ? 'Goa' : 'गोवा'}</option>
                          <option value={language === 'English' ? 'Gujarat' : 'गुजरात'}>{language === 'English' ? 'Gujarat' : 'गुजरात'}</option>
                          <option value={language === 'English' ? 'Haryana' : 'हरियाणा'}>{language === 'English' ? 'Haryana' : 'हरियाणा'}</option>
                          <option value={language === 'English' ? 'Himachal Pradesh' : 'हिमाचल प्रदेश'}>{language === 'English' ? 'Himachal Pradesh' : 'हिमाचल प्रदेश'}</option>
                          <option value={language === 'English' ? 'Jharkhand' : 'झारखंड'}>{language === 'English' ? 'Jharkhand' : 'झारखंड'}</option>
                          <option value={language === 'English' ? 'Karnataka' : 'कर्नाटक'}>{language === 'English' ? 'Karnataka' : 'कर्नाटक'}</option>
                          <option value={language === 'English' ? 'Kerala' : 'केरल'}>{language === 'English' ? 'Kerala' : 'केरल'}</option>
                          <option value={language === 'English' ? 'Madhya Pradesh' : 'मध्य प्रदेश'}>{language === 'English' ? 'Madhya Pradesh' : 'मध्य प्रदेश'}</option>
                          <option value={language === 'English' ? 'Manipur' : 'मणिपुर'}>{language === 'English' ? 'Manipur' : 'मणिपुर'}</option>
                          <option value={language === 'English' ? 'Meghalaya' : 'मेघालय'}>{language === 'English' ? 'Meghalaya' : 'मेघालय'}</option>
                          <option value={language === 'English' ? 'Mizoram' : 'मिजोरम'}>{language === 'English' ? 'Mizoram' : 'मिजोरम'}</option>
                          <option value={language === 'English' ? 'Nagaland' : 'नागालैंड'}>{language === 'English' ? 'Nagaland' : 'नागालैंड'}</option>
                          <option value={language === 'English' ? 'Odisha' : 'उड़ीसा'}>{language === 'English' ? 'Odisha' : 'उड़ीसा'}</option>
                          <option value={language === 'English' ? 'Punjab' : 'पंजाब'}>{language === 'English' ? 'Punjab' : 'पंजाब'}</option>
                          <option value={language === 'English' ? 'Rajasthan' : 'राजस्थान'}>{language === 'English' ? 'Rajasthan' : 'राजस्थान'}</option>
                          <option value={language === 'English' ? 'Sikkim' : 'सिक्किम'}>{language === 'English' ? 'Sikkim' : 'सिक्किम'}</option>
                          <option value={language === 'English' ? 'Tamil Nadu' : 'तमिलनाडु'}>{language === 'English' ? 'Tamil Nadu' : 'तमिलनाडु'}</option>
                          <option value={language === 'English' ? 'Telangana' : 'तेलंगाना'}>{language === 'English' ? 'Telangana' : 'तेलंगाना'}</option>
                          <option value={language === 'English' ? 'Tripura' : 'त्रिपुरा'}>{language === 'English' ? 'Tripura' : 'त्रिपुरा'}</option>
                          <option value={language === 'English' ? 'Uttar Pradesh' : 'उत्तर प्रदेश'}>{language === 'English' ? 'Uttar Pradesh' : 'उत्तर प्रदेश'}</option>
                          <option value={language === 'English' ? 'Uttarakhand' : 'उत्तराखंड'}>{language === 'English' ? 'Uttarakhand' : 'उत्तराखंड'}</option>
                          <option value={language === 'English' ? 'West Bengal' : 'पश्चिम बंगाल'}>{language === 'English' ? 'West Bengal' : 'पश्चिम बंगाल'}</option>
                          <option value={language === 'English' ? 'Andaman and Nicobar Islands' : 'अंडमान और निकोबार द्वीप समूह'}>{language === 'English' ? 'Andaman and Nicobar Islands' : 'अंडमान और निकोबार द्वीप समूह'}</option>
                          <option value={language === 'English' ? 'Chandigarh' : 'चंडीगढ़'}>{language === 'English' ? 'Chandigarh' : 'चंडीगढ़'}</option>
                          <option value={language === 'English' ? 'Dadra and Nagar Haveli and Daman and Diu' : 'दादरा और नगर हवेली और दमन और दीव'}>{language === 'English' ? 'Dadra and Nagar Haveli and Daman and Diu' : 'दादरा और नगर हवेली और दमन और दीव'}</option>
                          <option value={language === 'English' ? 'Delhi' : 'दिल्ली'}>{language === 'English' ? 'Delhi' : 'दिल्ली'}</option>
                          <option value={language === 'English' ? 'Lakshadweep' : 'लक्षद्वीप'}>{language === 'English' ? 'Lakshadweep' : 'लक्षद्वीप'}</option>
                          <option value={language === 'English' ? 'Puducherry' : 'पुदुच्चेरी'}>{language === 'English' ? 'Puducherry' : 'पुदुच्चेरी'}</option>

                          {states.map((st, index) => (
                            <option key={index} value={st}>
                              {st}
                            </option>
                          ))}
                          <option value="addNewState">
                            {language === 'English' ? ' Add New State' : 'नवीन राज्य जोडा'}
                          </option>
                        </select>
                      </div>
                    </div>
                    {showNewStateForm && (
                      <div className="overlay">
                        <div className="center-form">
                          <div className="new-book-form">
                            <label htmlFor="newStateInput">
                              {language === 'English' ? ' Enter New State: ' : 'नवीन राज्य प्रविष्ट करा:'}
                            </label>
                            <input
                              type="text"
                              id="newStateInput"
                              value={newState}
                              onChange={(e) =>
                                setNewState(e.target.value)
                              }
                            />
                            <button onClick={handleNewStateSubmit}>
                              {language === 'English' ? 'Submit' : 'प्रविष्ट करा'}
                            </button>
                            {states.length > 0 && (
                              <div className="book-list table-responsive">
                                <table className="table table-striped">
                                  <thead>
                                    <tr>
                                      <th>  {language === 'English' ? ' State' : 'राज्य'}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {states.map((state, index) => (
                                      <tr key={index}>
                                        <td>{state}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="districtSelect">{language === 'English' ? ' District' : 'जिल्हा'}</label>
                        <select id="districtSelect" className={`form-select ${formSubmitted && selectedDistrict === "" ? "input-error" : ""}`} value={selectedDistrict} onChange={handleDistrictChange}>
                          <option value="">  {language === 'English' ? ' Select District' : 'जिल्हा निवडा'}</option>
                          {districtsData.Maharashtra.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="talukaSelect">{language === 'English' ? 'Taluka' : 'तालुका'}</label>
                        <select id="talukaSelect" className={`form-select ${formSubmitted && selectedTaluka === "" ? "input-error" : ""}`} value={selectedTaluka} onChange={handleTalukaChange}>
                          <option value="">  {language === 'English' ? ' Select Taluka' : 'तालुका निवडा'}</option>
                          {talukaOptions}
                        </select>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Mother Tounge' : 'मातृभाषा'}
                        </label>
                        <input
                          type="text"
                          name="motherTounge"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.motherTounge}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? ' Birth Place' : 'जन्मस्थान'}
                        </label>
                        <input
                          type="text"
                          name="birthPlace"
                          onChange={handleTextChange}
                          onKeyPress={handleEnterKey}
                          value={stdData.birthPlace}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 position-relative">
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example1c">
                          {language === 'English' ? ' Caste' : 'जात'}
                        </label>
                        <input
                          type="text"
                          value={stdData.caste}
                          onChange={handleCasteChange}
                          className={`form-control ${formSubmitted && stdData.caste === "" ? "input-error" : ""
                            }`}
                        />

                        <button
                          className="open-minority-form-btn"
                          onClick={handleShowMinorityForm}
                        >
                          +
                        </button>
                        {showMinorityForm && (

                          <div className="modal1">
                            <div className="modal-content minority-form">

                              <h4 className='my-2 mb-3'>{language === 'English' ? 'Enter Minority Information' : 'अल्पसंख्याक माहिती प्रविष्ट करा'}</h4>
                              <label>{language === 'English' ? 'Category' : 'श्रेणी'}</label>
                              <input
                                type="text"
                                value={casteCategory}
                                onChange={handleCategoryChange}
                                className="form-control mt-2"
                              />
                              <label>
                                <input
                                  type="checkbox"
                                  className="minoritycheck mt-3 mx-2"
                                  checked={isMinority}
                                  onChange={handleMinorityChange}
                                />
                                {language === "English" ? 'Minority' : 'अल्पसंख्याक'}
                              </label>
                              <span className="close" onClick={handleCloseMinorityForm}>
                                {language === "English" ? 'save and close' : 'जतन करा आणि बंद करा'} </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Date Of Admission ' : 'प्रवेशाची तारीख'}
                        </label>
                        <input
                          type="date"
                          name="dateOfAdmission"
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          value={stdData.dateOfAdmission}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3 ">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? 'Previous School ' : 'मागील शाळा'}
                        </label>
                        <input
                          type="text"
                          name="prevSchool"
                          value={stdData.prevSchool}
                          onChange={handleTextChange} onKeyPress={handleEnterKey}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-4 col-xl-3">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example1c"
                        >
                          {language === 'English' ? '  Date Of Birth' : 'जन्मतारीख'}
                        </label>
                        <input
                          type="date"
                          name='dob'
                          value={stdData.dob}
                          onChange={handleDOBChange} onKeyPress={handleEnterKey}
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-6 col-lg-8 col-xl-3">
                      <div className="form-outline flex-fill mb-0">
                        <label
                          className="form-label"
                          htmlFor="form3Example3c"
                        >
                          {language === 'English' ? 'Date Of Birth in words' : 'शब्दात जन्मतारीख'}
                        </label>
                        <input
                          type="text"
                          value={stdData.dobInWords} onKeyPress={handleEnterKey}
                          readOnly
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-3 col-md-4 col-lg-4 col-xl-3 gender-form">
                      <div className="form-outline flex-fill mb-1">
                        <label className="form-label mt-2">  {language === 'English' ? 'Gender' : 'लिंग'}</label>
                        <div className="">
                          <label className="form-check-label">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={gender === "male"}
                              onChange={handleGenderChange}
                              onKeyPress={handleEnterKey}
                              className="form-check-input me-1"
                            />
                            {language === 'English' ? 'Male' : 'मुलगा'}</label>
                          <label className="form-check-label ms-3">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={gender === "female"}
                              onChange={handleGenderChange} onKeyPress={handleEnterKey}
                              className="form-check-input me-1"
                            />
                            {language === 'English' ? ' Female' : 'मुलगी'}

                          </label>
                        </div>
                      </div>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-xl-2 col-sm-12 pt-md-5 mt-md-5 registerNoExists">
            {registerNoExists ? (
              // If register number exists, show related data and buttons
              <div>

                <div className="text-center mb-4 ">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg me-sm-2 col-md-12 m-4 w-50"
                    onClick={handleUpdate}
                  >
                    {language === 'English' ? ' Update' : 'अपडेट करा'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg me-sm-2 col-md-12 m-4 w-50"
                    onClick={handleDelete}
                  >
                    {language === 'English' ? 'Delete' : 'हटवा'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg me-sm-2 col-md-12 m-4 w-50"
                    onClick={handleReport}
                  >
                    {language === 'English' ? 'Report' : 'रिपोर्ट '}
                  </button>

                </div>
              </div>
            ) : (
              <div className="text-center mb-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleRegister}
                >
                  {language === 'English' ? 'Register' : ' रजिस्टर करा'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default StudentRegister;
