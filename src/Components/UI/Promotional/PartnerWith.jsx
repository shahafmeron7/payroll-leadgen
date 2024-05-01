import React from "react";
import { useQuestionnaire } from "context/QuestionnaireContext.jsx";
import styles from './PartnerWith.module.css';
import useIsWideScreen from "hooks/useIsWideScreen";

const PartnerWith = () => {
  const logos = [
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/148/2020/12/13094314/paychex_l_medium-01.svg", alt: "Paychex Logo" },
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/148/2020/12/10120959/Adp_l_medium.svg", alt: "ADP Logo" },
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/148/2021/09/21100649/paycor_l_mobile.svg", alt: "Paycor Logo" },
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/148/2021/08/16141343/gusto_l_large-01.svg", alt: "Gusto Logo" },
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/6/2021/07/21103809/Oracle-NetSuite_l-2.svg", alt: "Netsuite Logo" },
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/148/2020/12/10120256/onpay_l_medium.svg", alt: "Onpay Logo" },
    { src: "https://assets.trafficpointltd.com/app/uploads/sites/6/2024/03/17135228/justworks_l.svg", alt: "Justworks Logo" }
  ];

  const { questionnaireCompleted } = useQuestionnaire();
  const isWideScreen = useIsWideScreen();

  const finalStyle = {
    padding: "80px 0px 0px 0px",
  };
  const finalMobileStyle = {
    padding: "24px 16px 0px",
  };

  return (
    <div className={styles.partnerWithWrapper} style={questionnaireCompleted && !isWideScreen ? finalMobileStyle : questionnaireCompleted && isWideScreen ? finalStyle : {}}>
      <div className={styles.partnerWithContainer}>
        <h2 className={styles.partnerWithTitle}>We proudly partner with</h2>
        <div className={styles.partnerWithDivider}></div>
        <div className={styles.partnerWithBrandsContainer}>
          {logos.map((logo, index) => (
            // <div key={index} className={styles.partnerWithLogo}>
              <img key={index} className={styles.partnerWithLogo} src={logo.src} alt={logo.alt} />
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerWith;
