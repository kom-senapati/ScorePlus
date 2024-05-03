"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function page({params}) {
  const [value, setValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(30);

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
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Qusestions timer
  useEffect(() => {
    if (timeRemaining > 0) {
      // Start a timer to decrement time remaining
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1100); // 1000 ms = 1 second

      // Clear the timer when the component unmounts or when time runs out
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);


  return (
    <div>
      <div className="flex flex-col h-full w-full text-white bg-slate-800 p-10">
        <div className="h-screen p-5">
          <h1 className="text-5xl text-white mb-5 font-semibold">
            {params.id}
          </h1>

          <div className="flex gap-10 text-black py-5 px-10 ">
            <div className="w-[90rem]">
              <Input className="w-full" value={value} onChange={handleChange} />
            </div>

            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Tabs defaultValue="account" className="w-[400px] py-5 px-10">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              {/* Content tab here */}
              <TabsContent value="content" className=" w-[70vw] p-3">
                <div className="space-y-3">
                  <div>
                    <h1 className="text-3xl font-bold my-3">
                      Understanding the Fundamentals
                    </h1>
                    <p className="pl-3">
                      Embark on your journey into the world of web development
                      by grasping the fundamental concepts. Learn about HTML,
                      CSS, and JavaScript—the building blocks of the web.
                      Discover how these languages work together to create
                      stunning and interactive websites.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold my-3">
                      Designing for the User Experience
                    </h2>
                    <p className="pl-3">
                      Delve into the art of crafting user-centric designs.
                      Explore the principles of responsive web design to ensure
                      seamless accessibility across devices of all sizes. Dive
                      into user interface (UI) and user experience (UX) design
                      to create captivating interfaces that engage and delight
                      visitors.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Quiz tab here */}
              <TabsContent value="quiz" className="flex w-[85vw] gap-10 p-3">
                <div className="w-[70vw] mt-5">
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
                      className="bg-gray-100 text-gray-600 dark:bg-gray-800 hover:bg-emerald-300 hover:text-white rounded-md p-4 flex items-center justify-center"
                    >
                      <span className=" dark:text-gray-400 font-medium">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
