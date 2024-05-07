"use client";

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

const page = () => {
  function Notebook() {
    return (
      <Card className="h-[10rem] w-[20rem]">
        <CardHeader>
          <CardTitle>What is DSA?</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm">Created on</div>
              <div className="text-sm">12th July 2021</div>
            </div>
            <Button>View {"->"}</Button>
          </div>
          <div className="my-2">
            <Badge variant="outline">Badge</Badge>
            <Badge variant="outline">Badge</Badge>
            <Badge variant="outline">Badge</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Header  */}
      <div className="flex justify-between items-center mb-5 rounded px-12 py-5 bg-secondary text-secondary-foreground">
        <h1 className="text-3xl">Hi, User! 👋</h1>

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
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Revert</AlertDialogCancel>
                <AlertDialogAction>Save</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <ModeToggle />
        </div>
      </div>

      {/* Notebooks */}
      <div className="h-full grid grid-cols-1 md:grid-cols-4 gap-5 py-10 px-12 overflow-scroll no-scrollbar">
        {Array(16)
          .fill(0)
          .map((_, i) => (
            <Notebook key={i} />
          ))}
      </div>
    </div>
  );
};
export default page;
