"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/theme-toggle";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const Dashboard = ({ user }) => {

  const [topic, setTopic] = useState();
  const [notebooks, setNotebooks] = useState([{}]);

  user = JSON.parse(user.value);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };

  const createNotebook = async () => {
    try {
      const res = await axios.post("/api/notebook", {
        topic: topic,
        userId: user.id,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setTopic("");
    getNotebooks();
  };

  const getNotebooks = async () => {
    try {
      const res = await axios.get("/api/notebook", { userId: user.id });
      setNotebooks(res.data.notebooks);
      console.log(res.data.notebooks);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotebooks();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Header  */}
      <div className="flex justify-between items-center mb-5 rounded px-12 py-5 bg-secondary text-secondary-foreground">
        <h1 className="text-3xl">Hi, {user?.username}! 👋</h1>

        <p className="font-bold text-3xl">
          Score<span className="text-yellow-400 text-4xl">+</span>
        </p>

        <div className="flex gap-5 items-center">
          <AlertDialog>
            <AlertDialogTrigger
              size="lg"
              className="text-xl rounded-lg bg-primary text-primary-foreground px-4 p-2"
            >
              Create +
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create an Notebook?</AlertDialogTitle>
                <AlertDialogDescription>
                  <div>
                    <Input
                      className="w-full"
                      type="text"
                      placeholder="Enter Notebook topic.."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => { setTopic("") }}>Revert</AlertDialogCancel>
                <AlertDialogAction onClick={createNotebook}>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <ModeToggle />

          <Button variant="secondary" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>

      {/* Notebooks */}
      <div className="h-full grid grid-cols-1 md:grid-cols-4 gap-5 py-10 px-12 overflow-scroll no-scrollbar">
        {
          notebooks.map((notebook, index) => (
            <Card key={notebook._id} className="h-[10rem] w-[20rem]">
              <CardHeader>
                <CardTitle>{notebook.topic}</CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm">Created on</div>
                    {/* <div className="text-sm">{timeAgo.format(notebook.createdAt)}</div> */}
                  </div>
                  <Link href={`/notebook/${notebook._id}`}><Button >View {"->"}</Button></Link>
                </div>
                <div className="my-2">
                  <Badge variant="outline">Badge</Badge>
                  <Badge variant="outline">Badge</Badge>
                  <Badge variant="outline">Badge</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
};
export default Dashboard;
