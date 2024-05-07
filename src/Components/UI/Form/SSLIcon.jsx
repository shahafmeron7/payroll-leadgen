import React from "react";

import SSLLogo  from "@/images/ssl_lock.svg"
// import SSLLogo from 'https://assets.sonary.com/wp-content/uploads/2024/05/05094127/ssl_lock.svg"
import { useQuestionnaire } from "@/context/QuestionnaireContext";
const SSLIcon = () => {
    const stylesslWrapper = {
        display: "flex",
        gap: "4px",
        justifyContent: "center",
        alignItems: "center",
      
      }
      const psslWrapper = {
        color: "var(--border-border-100)",
        fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "22px",
        textDecoration: "underline",
      }
    const {currentQuestionCode} = useQuestionnaire
    return (
      <div
      className="animateStaggerItem animateFadeOut"
          key={currentQuestionCode} 
          style={stylesslWrapper}
        >
          <SSLLogo/>
          {/* <img src={SSLLogo} alt="SSL Icon" loading="lazy" /> */}
          <p style={psslWrapper}>SSL Encrypted</p>
        </div>
     
    );
  };

  export default SSLIcon;