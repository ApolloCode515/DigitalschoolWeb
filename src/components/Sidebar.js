import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CakeIcon from '@mui/icons-material/Cake';
import GroupIcon from '@mui/icons-material/Group';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BarChartIcon from '@mui/icons-material/BarChart';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import Tooltip from "@mui/material/Tooltip";
import "../components/Sidebar.css";

const Sidebar = () => {

  
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'English';
    setLanguage(storedLanguage);
  }, []);

  const getLabel = (englishLabel, marathiLabel) => {
    return language === "English" ? englishLabel : marathiLabel;
  };

  return (
    <div className="sidebar">
      <Tooltip title={getLabel("Home", "होम")}>
        <Link to="/home">
          <HomeIcon />
          <span>{getLabel("Home", "होम")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("New students", "नवीन विद्यार्थी")}>
        <Link to="/student-register">
          <GroupIcon />
          <span>{getLabel("New students", "नवीन विद्यार्थी")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("Todays Birthday", "आजचा वाढदिवस")}>
        <Link to="/birthday-card">
          <CakeIcon />
          <span>{getLabel("Todays Birthday", "आजचा वाढदिवस")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("School Leaving Certificate", "शाळा सोडल्याचा दाखला")}>
        <Link to="/leaving-certificate">
          <ReceiptIcon />
          <span>{getLabel("School Leaving Certificate", "शाळा सोडल्याचा दाखला")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("Student Report", "विद्यार्थी अहवाल")}>
        <Link to="/all-student-report">
          <SummarizeIcon />
          <span>{getLabel("Student Report", "विद्यार्थी अहवाल")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("Caste Report", "जात अहवाल")}>
        <Link to="/caste-report">
          <AssessmentIcon />
          <span>{getLabel("Caste Report", "जात अहवाल")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("Minority Report", "अल्पसंख्याक अहवाल")}>
        <Link to="/minority-report">
          <BarChartIcon />
          <span>{getLabel("Minority Report", "अल्पसंख्याक अहवाल")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("Age Report", "वय अहवाल")}>
        <Link to="/agewisereport">
          <WaterfallChartIcon />
          <span>{getLabel("Age Report", "वय अहवाल")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("Import/Export Data", "डेटा आयात/निर्यात ")}>
        <Link to="/importexport">
          <WaterfallChartIcon />
          <span>{getLabel("Import/Export Data", "डेटा आयात/निर्यात डेटा")}</span>
        </Link>
      </Tooltip>

      <Tooltip title={getLabel("School Detail", "शाळेचा तपशील")}>
        <Link to="/school-data">
          <AccountBalanceIcon />
          <span>{getLabel("School Detail", "शाळेचा तपशील")}</span>
        </Link>
      </Tooltip>
      <Tooltip title={getLabel("School Registration", "शाळा नोंदणी")}>
        <Link to="/">
          <AccountBalanceIcon />
          <span>{getLabel("School Registration", "शाळा नोंदणी")}</span>
        </Link>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
