// src/context/OsanoVisibilityContext.js
import React, { createContext, useState, useEffect,useRef } from 'react';
import { buildEventData,sendImpressions } from '@/utils/impression/impressionUtils';
import { useQuestionnaire } from './QuestionnaireContext';

const user_action_accept_cookies = import.meta.env.REACT_APP_USER_ACTION_CLICK_ACCEPT_COOKIES;
const user_action_deny_cookies = import.meta.env.REACT_APP_USER_ACTION_CLICK_DENY_COOKIES;
const user_event_name=import.meta.env.REACT_APP_USER_EVENT_NAME
const stream_step_name=import.meta.env.REACT_APP_STREAM_STEP_NAME
export const OsanoVisibilityContext = createContext({
  osanoShown: false,
  setOsanoShown: () => {}
});

export const OsanoVisibilityProvider = ({ children }) => {
  const [osanoShown, setOsanoShown] = useState(false);
  const  { currentQuestion,flowID,flowName } =useQuestionnaire(); 
  const currentQuestionRef = useRef(currentQuestion);

  useEffect(() => {
   currentQuestionRef.current = currentQuestion;
 }, [currentQuestion]);

 useEffect(() => {
   const checkOsanoExists = setInterval(() => {
     if (window.Osano) {
       setupOsanoListener();
       clearInterval(checkOsanoExists);
     }
   }, 100);

   const setupOsanoListener = () => {
     const osanoListener = (component, stateChange) => {
       if (component === "dialog") {
         setOsanoShown(stateChange === "show");
         if (stateChange === "show") {
           attachButtonListeners();
         }
       }
     };

     const attachButtonListeners = () => {
       const acceptButton = document.querySelector('.osano-cm-accept');
       const denyButton = document.querySelector('.osano-cm-deny');

       const handleAcceptClick = () => {
         sendImpressions(
           buildEventData(currentQuestionRef.current, flowID, flowName, user_action_accept_cookies),
           user_event_name,
           stream_step_name
         );
       };

       const handleDenyClick = () => {
         sendImpressions(
           buildEventData(currentQuestionRef.current, flowID, flowName, user_action_deny_cookies),
           user_event_name,
           stream_step_name
         );
       };

       acceptButton?.addEventListener('click', handleAcceptClick);
       denyButton?.addEventListener('click', handleDenyClick);

       const cleanupListeners = () => {
         acceptButton?.removeEventListener('click', handleAcceptClick);
         denyButton?.removeEventListener('click', handleDenyClick);
       };
       return cleanupListeners;
     };

     Osano("onUiChanged", osanoListener);
     return () => {
       Osano("offUiChanged", osanoListener);
     };
   };
   return () => {
     clearInterval(checkOsanoExists);
   };
 }, [flowID, flowName]);
  return (
    <OsanoVisibilityContext.Provider value={{ osanoShown, setOsanoShown }}>
      {children}
    </OsanoVisibilityContext.Provider>
  );
};

export default OsanoVisibilityContext;
