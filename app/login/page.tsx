"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   startTransition(async () => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.ok) {
    await Swal.fire({
      icon: "success",
      title: "Login Successful 🎉",
      text: "Welcome back!",
      confirmButtonColor: "#3085d6",
    });

    // Navigate after modal closes
    router.replace("/admin"); // replace avoids history stack issues
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text:  "Invalid credentials",
      confirmButtonColor: "#d33",
    });
  }
});

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/30 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
          Welcome Back
        </h2>
        <p className="text-center text-white/80 mb-8">
          Login to access your admin panel
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div>
            <Label className="text-white font-semibold">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 bg-white/30 text-white placeholder-gray-200 border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <Label className="text-white font-semibold">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 bg-white/30 text-white placeholder-gray-200 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 flex items-center w-full">
          <div className="flex-grow border-t border-white/40"></div>
          <span className="px-3 text-white/70 text-sm">or</span>
          <div className="flex-grow border-t border-white/40"></div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 py-3 cursor-pointer border-white/40 text-blue hover:bg-white/20 transition-all rounded-xl"
          onClick={() => router.push("/register")}
        >
          Register New Account
        </Button>
      </div>
    </div>
  );
}
