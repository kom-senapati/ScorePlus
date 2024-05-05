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
import Quiz from "@/components/ui/quiz";

export default function page({ params }) {

  const [message, setMessage] = useState("");
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
  // TO render markdown content
  const MarkdownRenderer = ({ content }) => {
    return (
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    );
  };

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
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
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
                <Quiz message={message} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
