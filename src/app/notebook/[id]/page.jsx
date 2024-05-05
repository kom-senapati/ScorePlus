"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { marked } from 'marked'; // This is the usual syntax for importing a default export
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function page({ params }) {
  const [value, setValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [questionData, setQuestionData] = useState([]);

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [ContentData, setContentData] = useState("");

  // Handling API call of Content

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  // Function to get Content Data
  async function getContent() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = message;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setContentData(marked(text));
  }
  async function getQuestions() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate JSON data for ${message} quiz of 10 questions withot '''json mark in it`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = await response.text(); // Ensure text is awaited
    let quizData = JSON.parse(text);
    setQuestionData(quizData.questions);
    console.log(quizData.questions);
  }

  // TO render markdown content
  const MarkdownRenderer = ({ content }) => {
    return (
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    );
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);
  };

  // Select specific question
  const getQuestionNumber = (e) => {
    console.log(e.target.innerText);
  };

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

  return (
    <div>
      <div className="flex flex-col min-h-screen w-full text-white bg-slate-800 p-10">
        <div className="p-5">
          <h1 className="text-5xl text-white mb-5 font-semibold">
            {params.id}
          </h1>

          <div className="flex mx-auto">
            <Tabs defaultValue="content" className="w-[400px] py-5 px-10">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger onClick={getQuestions} value="quiz">Quiz</TabsTrigger>
              </TabsList>

              {/* Content tab here */}
              <TabsContent value="content" className=" w-[70vw] p-3">
                <div className="space-y-3">
                  <MarkdownRenderer content={ContentData} />
                </div>

                <div className="flex flex-row">
                  <Input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" id="toggle" className="text-black" />
                  <Button onClick={getContent}>Send</Button>
                </div>
              </TabsContent>

              {/* Quiz tab here */}
              <TabsContent
                value="quiz"
                className="flex flex-col w-[85vw] gap-10 p-3"
              >
                <div className="flex gap-10 text-black">
                  <div className="w-[65vw]">
                    <Input
                      className="w-full"
                      value={value}
                      onChange={handleChange}
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
                        {params.id} Quiz
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
                            <div>
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
