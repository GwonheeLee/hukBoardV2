"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

enum LoginStep {
  STEP1,
  STEP2,
}

export default function EmailCheckForm() {
  const [step, setStep] = useState(LoginStep.STEP1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loginCode, setLoginCode] = useState("");

  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);

    if (step === LoginStep.STEP1) {
      fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then((res) => {
        setLoading(false);
        res.ok && setStep(LoginStep.STEP2);
      });
    } else if (step === LoginStep.STEP2) {
      signIn("credentials", { redirect: false, email, code: loginCode }).then(
        (res) => {
          setLoading(false);
          if (!res?.error) {
            router.replace("/");
          } else {
            window.alert(res?.error);
          }
        }
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-main-color"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            readOnly={step === LoginStep.STEP2}
            className="block w-full appearance-none rounded-md border border-main-color px-3 py-2 placeholder-gray-400 shadow-sm focus:border-main-color focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {step === LoginStep.STEP2 && (
        <div>
          <label
            htmlFor="loginCode"
            className="block text-sm font-medium text-main-color"
          >
            Login Code
          </label>
          <div className="mt-1">
            <input
              value={loginCode}
              onChange={(e) => {
                setLoginCode(e.target.value);
              }}
              id="loginCode"
              name="loginCode"
              type="text"
              autoComplete="loginCode"
              required
              className="block w-full appearance-none rounded-md border border-main-color px-3 py-2 placeholder-gray-400 shadow-sm focus:border-main-color focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      )}
      <div>
        <button
          onClick={handleClick}
          type="button"
          className="flex w-full justify-center rounded-md border border-transparent bg-main-color py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-main-color focus:outline-none focus:ring-2 focus:ring-main-color focus:ring-offset-2"
        >
          {step === LoginStep.STEP1 && "Send Code"}
          {step === LoginStep.STEP2 && "Log In"}
        </button>
      </div>
    </div>
  );
}
