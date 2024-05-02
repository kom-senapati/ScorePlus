import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  function Notebook() {
    return (
      <Card className="h-[10rem] w-[20rem]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end items-center">
          <Button>View {"->"}</Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="flex flex-col h-screen w-full bg-slate-800 p-10 overflow-hidden">
      <div className="text-5xl text-white mb-5">Hi User 👋</div>
      <div className="h-full relative">
        <div className="h-full grid grid-cols-1 md:grid-cols-4 gap-5 py-10 px-2 overflow-scroll no-scrollbar">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <Notebook key={i} />
            ))}
        </div>
        <Button
          size="icon"
          className="absolute bottom-10 right-5 text-2xl rounded-full"
        >
          +
        </Button>
      </div>
    </div>
  );
};
export default page;
