"use client";
import { FormEvent, useEffect, useState } from "react";
import { login } from "../libs/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {refreshUser} = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const data = await login(email, password);

      if (data?.error) {
        setErrorMessage(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setEmail("");
        setPassword("");
        toast.success(`Welcome ${data.user.fullname}`);
        await refreshUser()
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-gray-600 text-center">{errorMessage}</p>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[red] outline-none"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[red] outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-[red] hover:bg-[#dc0000] text-white font-semibold rounded-lg shadow-md transition ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          You don't have an account?
          <Link href="/register" className="text-indigo-600 font-semibold ml-1">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
