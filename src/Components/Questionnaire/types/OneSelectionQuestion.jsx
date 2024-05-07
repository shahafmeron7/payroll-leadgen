import React, { useState, useEffect, useRef } from "react";
// import { useQuestionnaire } from "../../../context/QuestionnaireContext";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import styles from "./AnswersContent.module.css";
import  UnselectedCheckboxSVG  from "@/images/unselectedCircleCheckbox.svg";
import  SelectedCheckboxSVG  from "@/images/selectedCircleCheckbox.svg";
// import selectedCheckboxSVG from 'https://assets.sonary.com/wp-content/uploads/2024/05/05094126/selectedCircleCheckbox.svg"
// import unselectedCheckboxSVG from 'https://assets.sonary.com/wp-content/uploads/2024/05/05094130/unselectedCircleCheckbox.svg"
import InputWithValidation from "../../UI/Form/InputWithValidation.jsx";

const OneSelectionQuestion = () => {
  const {
    currentQuestion,
    responses,
    handleAnswerSelection,
    isAnimatingOut,
    changeNextBtnState,
    currentQuestionCode,
  } = useQuestionnaire();
  const otherInputRef = useRef(null);
  const [localSelectedIndex, setLocalSelectedIndex] = useState(
    responses[currentQuestionCode]?.answerIndexes?.[0] || undefined
  );

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");

  const isDisplayDirectionCol =
    currentQuestion.display_list_direction === "col";

  useEffect(() => {
    const response = responses[currentQuestionCode];
    if (!response) {
      setIsOtherSelected(false);
      setLocalSelectedIndex(undefined);
      setOtherInputValue("");
      return;
    }

    if (response.hasOwnProperty("other_text")) {
      setIsOtherSelected(true);
      // changeNextBtnState(true);
      setOtherInputValue(response.other_text);
      // focusAndScrollIntoView();
    } else {
      setIsOtherSelected(false);
      setOtherInputValue("");
    }
    setLocalSelectedIndex(response.answerIndexes[0]);
  }, [currentQuestionCode, responses]);

  const focusAndScrollIntoView = () => {
    setTimeout(() => {
      if (otherInputRef.current) {
        otherInputRef.current.focus();

          var targetTop = otherInputRef.offsetTop;
          var targetHeight = otherInputRef.clientHeight;
          var windowHeight = window.innerHeight;

          // Calculate the scroll position to center the target element
          var scrollPosition = targetTop - (windowHeight - targetHeight) / 2;
        console.log("scrollPosition",scrollPosition)
        console.log("targetTop",targetTop)
        console.log("targetHeight",targetHeight);
        console.log("windowHeight",windowHeight);


          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
    }, 500);
  };
  const handleClick = (index) => {
    if (isAnimatingOut) return;
    const selectedAnswer = currentQuestion.answers[index];
    if (!selectedAnswer.isOther) {
      setLocalSelectedIndex(index);
      setIsOtherSelected(false);

      handleAnswerSelection(currentQuestionCode, index);
    } else {
      // focusAndScrollIntoView();
      changeNextBtnState(false);
      setLocalSelectedIndex(index);
      setIsOtherSelected(true);
    }
  };

  return (
    <>
      <div
        key={currentQuestionCode}
        className={`animateFadeOut ${styles.answersContainer} ${
          isDisplayDirectionCol ? styles.listCol : styles.listRow
        }`}
      >
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={`${currentQuestion.code}-${index}`}
            className={`animateStaggerItem ${styles.answerItem} ${
              index === localSelectedIndex ? styles.selected : ""
            } ${
              isDisplayDirectionCol
                ? styles.answerRowItem
                : styles.answerCardItem
            }  `}
            onClick={() => handleClick(index)}
          >
            <span>{answer.text}</span>
            {index === localSelectedIndex ? (
              // <img src={selectedCheckboxSVG} alt="selected checkbox"/>
              <SelectedCheckboxSVG />
            ) : (
              // <img src={unselectedCheckboxSVG} alt="unselected checkbox"/>

              <UnselectedCheckboxSVG />
            )}
          </div>
        ))}
      </div>
      {isOtherSelected && (
        <InputWithValidation
          ref={otherInputRef}
          type="text"
          name={currentQuestion.code}
          value={otherInputValue}
          placeholder="Please specify"
          isOther={true}
        />
      )}
    </>
  );
};
export default OneSelectionQuestion;
