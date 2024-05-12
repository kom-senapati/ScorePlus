import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] text-gray-900 dark:text-gray-50 dark:bg-gradient-to-br dark:from-[#1B5E20] dark:to-[#558B2F]">
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="#">
            <AppWindowIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Quiz App</span>
          </Link>
        </div>
        <ModeToggle />
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                Test your knowledge with our fun quizzes
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Engage your mind and challenge yourself with our diverse range
                of quizzes. From trivia to brain teasers, we've got something
                for everyone.
              </p>
              <div className="flex gap-4">
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">Go to Dashboard</Button>
                </Link>
              </div>
            </div>
            {/* div for video */}
            <div className="aspect-video rounded-lg overflow-hidden" />
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <PuzzleIcon className="w-12 h-12 text-[#4CAF50] dark:text-[#8BC34A]" />
              <h3 className="text-lg font-semibold">Diverse Quizzes</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Explore a wide range of quiz topics to challenge your knowledge.
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] dark:from-[#1B5E20] dark:to-[#558B2F] rounded-full" />
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <BoltIcon className="w-12 h-12 text-[#4CAF50] dark:text-[#8BC34A]" />
              <h3 className="text-lg font-semibold">Instant Feedback</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get immediate feedback on your answers to track your progress.
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] dark:from-[#1B5E20] dark:to-[#558B2F] rounded-full" />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with 💖 by <span className="text-primary">Hack Hustlers</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function AppWindowIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  );
}

function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MedalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  );
}

function PuzzleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
