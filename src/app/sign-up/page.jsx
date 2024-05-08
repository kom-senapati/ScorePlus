"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", user);
      router.push("/sign-in");
    } catch (error) {
      console.log("Signup failed", error);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign up for an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            <Link className="font-medium text-primary" href="/sign-in">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="username"
            >
              Username
            </Label>
            <div className="mt-1">
              <Input
                autoComplete="username"
                className="block w-full px-3 py-2"
                id="username"
                placeholder="Enter your username"
                required
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email address
            </Label>
            <div className="mt-1">
              <Input
                autoComplete="email"
                className="block w-full px-3 py-2"
                id="email"
                placeholder="Enter your email address"
                required
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                autoComplete="current-password"
                className="block w-full px-3 py-2"
                id="password"
                placeholder="Enter your password"
                required
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Button className="w-full" type="submit" onClick={onSignup}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
