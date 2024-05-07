"use client";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

function Quiz(message) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [value, setValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(
    Array.from({ length: 10 + 1 }, () => "not Selected") // change it with question number
  );

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);

  async function getQuestions() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate JSON data for ${message.message} quiz of 10 questions withot '''json mark in it`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = await response.text(); // Ensure text is awaited
    let quizData = JSON.parse(text);
    setQuestionData(quizData.questions);
    console.log(quizData.questions);
  }

  // fetch questions from API
  useEffect(() => {
    if (message.message.length > 1) {
      getQuestions();
      console.log(message.message);
    }
  }, [message]);

  // Handle option change
  const handleOptionChange = (index, optionIndex, optionLabel) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = optionLabel;
    setSelectedOptions(newSelectedOptions);
  };

  // Score and Quiz Result
  function userScore() {
    let userScore = 0;
    for (let i = 1; i < selectedOptions.length; i++) {
      if (selectedOptions[i] === correctAnswers[i - 1]) {
        userScore += 2;
      }
    }
    return userScore;
  }

  function showResult() {
    if (questionData.length > 0) {
      setCorrectAnswers(questionData.map((question) => question.answer));
      const userScoreValue = userScore();
      setScore(userScoreValue);
    }
  }

  // Question indexes
  const nextQuestion = () => {
    if (currentQuestionIndex <= questionData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset the timer
      setTimeRemaining(30);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Reset the timer
      setTimeRemaining(30);
    }
  };

  // Handle Timer
  useEffect(() => {
    if (timeRemaining === 0) {
      if (currentQuestionIndex == questionData.length && timeRemaining === 0) {
        <AlertDialogContent></AlertDialogContent>;
      } else {
        nextQuestion();
      }
    }
  }, [timeRemaining, questionData]);

  // Qusestions timer
  useEffect(() => {
    if (timeRemaining > 0) {
      // Start a timer to decrement time remaining
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1100); // 1000 ms = 1 second

      // Clear the timer when the component unmounts or when time getContents out
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  // Select specific question
  const getQuestionNumber = (e) => {
    console.log(e.target.innerText);
  };

  return (
    <div>
      <div className="flex gap-5 w-[90vw] mx-auto justify-between my-3 p-3">
        <div className="w-full">
          {questionData && questionData.length > 0 ? (
            <div>
              <div className="flex justify-between font-semibold my-4">
                <h1 className="text-2xl font-semibold">
                  {/* {message} */}
                  Quiz
                </h1>
                <div className="my-auto">
                  Timer: <span>{timeRemaining} sec</span>
                </div>
              </div>
              <div className="my-3 p-5 bg-slate-700 rounded-lg">
                <div className="space-x-3 flex float-end">
                  <button
                    className="hover:bg-slate-800 p-2 rounded-full"
                    onClick={previousQuestion}
                  >
                    <FaArrowLeftLong size="1.3em" />
                  </button>

                  <div className="my-auto">
                    <h1>{currentQuestionIndex} / 10</h1>
                  </div>

                  <button
                    className="hover:bg-slate-800 p-2 rounded-full"
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questionData.length}
                  >
                    <FaArrowRight size="1.3em" />
                  </button>
                </div>

                <h1 className="font-bold ">
                  Q{currentQuestionIndex}.{" "}
                  {questionData[currentQuestionIndex - 1].question}
                </h1>

                <div className="space-y-7 m-5">
                  {questionData.length > 0 &&
                    questionData[currentQuestionIndex - 1].options.map(
                      (option, index) => (
                        <div
                          className="flex items-center space-x-3"
                          key={index}
                        >
                          <input
                            type="radio"
                            id={`option-${currentQuestionIndex}-${index}`}
                            name={`option-${currentQuestionIndex}`}
                            checked={
                              selectedOptions[currentQuestionIndex] === option
                            }
                            onChange={() =>
                              handleOptionChange(
                                currentQuestionIndex,
                                index,
                                option
                              )
                            }
                          />
                          <label
                            htmlFor={`option-${currentQuestionIndex}-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option}
                          </label>
                        </div>
                      )
                    )}
                </div>

                <div className="m-3 flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger
                      size="icon"
                      onClick={showResult}
                      className=" text-lg font-semibold rounded-lg bg-emerald-400 hover:bg-emerald-500 text-white px-4 p-2"
                      disabled={currentQuestionIndex !== questionData.length}
                    >
                      View Result
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Quiz Result's</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div>
                            <div className="flex justify-evenly">
                              <h1>Your Score: {score}</h1>
                              <h1>Total Score: {questionData.length * 2}</h1>
                            </div>

                            <div className="flex justify-around my-3 px-3 font-semibold ">
                              {/* user Selected Answer */}
                              <div className="space-y-2 w-[15vw] h-[50vh] overflow-scroll no-scrollbar overflow-x-hidden">
                                <h1>Your Answers</h1>
                                {selectedOptions
                                  .slice(1)
                                  .map((option, index) => (
                                    <div key={index} className="">
                                      <h1 className="space-x-2">
                                        Q{index + 1}.
                                        {option == correctAnswers[index]
                                          ? `✅`
                                          : "❌"}{" "}
                                        {option}
                                      </h1>
                                    </div>
                                  ))}
                              </div>

                              {/* Correct Answers */}
                              <div className="space-y-2 w-[15vw] h-[50vh] overflow-scroll no-scrollbar overflow-x-hidden">
                                <h1>Correct Answers</h1>
                                {correctAnswers.map((option, index) => (
                                  <div key={index}>
                                    <h1>
                                      Q{index + 1}. {option}
                                    </h1>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Back</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ) : (
            message.message.length > 1 ? (
              <h1 className="text-center">loading..</h1>
            ) : (
              <h1 className="text-center"> Provide some Message</h1>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
