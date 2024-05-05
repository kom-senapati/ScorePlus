"use client";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";


function Quiz(message) {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const [questionData, setQuestionData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [value, setValue] = useState("");

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

    useEffect(() => {
        getQuestions();
        console.log(message.message);
    }, [message])



    // Question indexes
    const nextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

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
        <div><div className="flex gap-10 text-black">
            <div className="w-[65vw]">
                <Input
                    className="w-full"
                    value={value}
                    onChange={() => { setValue(e.target.value) }}
                />
            </div>

            <div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="No of Question's" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

            <div className="flex gap-5 justify-between">
                <div className="w-[65vw] p-3">
                    <div className="flex justify-between font-semibold">
                        <h1 className="text-2xl font-semibold">
                            {/* {messgae} */}
                            Quiz
                        </h1>
                        <div className="my-auto">
                            Timer: <span>{timeRemaining} sec</span>
                        </div>
                    </div>

                    <div className="m-3 p-5 bg-slate-700 rounded-lg">
                        <h1>Q{currentQuestionIndex}. Temporary Qusetions </h1>

                        {
                            questionData?.map((question, index) => {
                                return (
                                    <div key={index}>
                                        <h1>{question.question}</h1>
                                    </div>
                                );
                            })
                        }
                        <div className="space-y-3 m-3">
                            <div className="flex items-center space-x-3">
                                <Input type="radio" id="terms1" name="options" />
                                <label
                                    htmlFor="terms1"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Option 1
                                </label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Input type="radio" id="terms2" name="options" />
                                <label
                                    htmlFor="terms2"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Option 2
                                </label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Input type="radio" id="terms3" name="options" />
                                <label
                                    htmlFor="terms3"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Option 3
                                </label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Input type="radio" id="terms4" name="options" />
                                <label
                                    htmlFor="terms4"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Option 4
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="m-3 flex justify-between">
                        <div className="space-x-3">
                            <Button onClick={previousQuestion}>Previous</Button>
                            <Button onClick={nextQuestion}>Next</Button>
                        </div>

                        <div>
                            <Button className="bg-emerald-400 hover:bg-emerald-500">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                    {Array.from({ length: 22 }, (_, index) => (
                        <div
                            key={index}
                            onClick={getQuestionNumber}
                            className="bg-gray-100 text-gray-600 dark:bg-gray-800 cursor-pointer hover:bg-emerald-300 hover:text-white rounded-md p-4 flex items-center justify-center"
                        >
                            <span className=" dark:text-gray-400 font-medium">
                                {index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div></div>
    )
}

export default Quiz