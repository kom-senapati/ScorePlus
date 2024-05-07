import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"



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
              <div className="text-sm text-gray-400">Created on</div>
              <div className="text-sm text-gray-400">12th July 2021</div>
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
    <div className="flex flex-col h-screen w-full bg-slate-800 p-10 overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl text-white">Hi User 👋</h1>

        <p className="text-white font-bold text-3xl">Score<spna className="text-yellow-400 text-4xl">+</spna></p>

        <AlertDialog>
          <AlertDialogTrigger
            size="icon"
            className=" text-xl rounded-lg bg-slate-900 text-white px-4 p-2"
          >
            Create +
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create an Notebook?</AlertDialogTitle>
              <AlertDialogDescription>
                <div>
                  <Input className="w-full" type="text" placeholder="Enter Notbook title or topic.." />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Revert</AlertDialogCancel>
              <AlertDialogAction>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="h-full relative">
        <div className="h-full grid grid-cols-1 md:grid-cols-4 gap-5 py-10 px-2 overflow-scroll no-scrollbar">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <Notebook key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default page;
