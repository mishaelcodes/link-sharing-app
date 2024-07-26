// ****************** firebase imports

import auth from "../firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// ****************** Next Imports

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// ****************** React Hooks

import { useEffect, useState } from "react";

// ****************** icon imports

import logo from "../images/logo.svg";
import envelope from "../images/envelope.png";
import lockKey from "../images/lock-key.svg";

// ****************** component imports

import Button from "@/components/button";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [, setLoggedIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // ****************** Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError("");
  };

  // ****************** Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
  };

  // ****************** login user
  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    const emailFormat = /^\S+@\S+\.\S+$/;

    // ****************** Validating email
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (emailFormat.test(email) === false) {
      setEmailError("Email is invalid");
      return false;
    }

    // ****************** Validating password
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }

    // ****************** If all checks proceed to sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/dashboard");
        user;
      })
      .catch((error) => {
        // ****************** Error Handling
        const errorCode = error.code;

        if (errorCode === "auth/invalid-credential") {
          setError("Invalid login credentials");
        } else if (errorCode === "auth/network-request-failed") {
          setError("Network error, please try again later");
        }
      });
  };

  return (
    <main
      className={`flex min-h-screen flex-col flex-1 items-start self-stretch p-8 gap-16 font-instrument_sans 2xl:py-72 2xl:px-36 sm:justify-center sm:items-center sm:bg-almostWhte sm:gap-[51px]`}
    >
      <Image src={logo} alt="devlinks logo" />
      <div className="flex flex-col items-start gap-10 sm:p-5 md:p-10 bg-white rounded-xl md:min-w-[400px]">
        <div className="flex flex-col items-start flex-1 gap-2">
          {error ? (
            <p className="text-sm self-center font-semibold text-red leading-normal">
              {error}
            </p>
          ) : (
            ""
          )}
          <h2 className="text-darkGrey text-2xl leading-normal font-bold md:text-3xl">
            Login
          </h2>
          <p className="text-grey text-base leading-normal font-normal">
            Add your details to get back into the app
          </p>
        </div>
        <form
          autoFocus
          className="w-full flex flex-col items-start gap-6"
          onSubmit={loginUser}
        >
          <div className="w-full flex flex-col items-start gap-1">
            <label
              htmlFor="email"
              className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
            >
              Email address{" "}
            </label>
            <div className="relative w-full">
              <Image
                src={envelope}
                alt="envelope_icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <p
                className={`${
                  emailError
                    ? "text-right text-xs font-normal leading-normal text-red absolute right-3 top-1/2 transform -translate-y-1/2"
                    : "hidden"
                }`}
              >
                {emailError}
              </p>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                className="w-full py-3 pl-10 pr-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal placeholder:opacity-50 focus:outline-none focus:border focus:border-purple focus:shadow-activeShadow"
                placeholder="e.g. alex@email.com"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label
              htmlFor="password"
              className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
            >
              Password{" "}
            </label>
            <div className="relative w-full">
              <Image
                src={lockKey}
                alt="lockKey_icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <p
                className={`${
                  passwordError
                    ? "text-right text-xs font-normal leading-normal text-red absolute right-3 top-1/2 transform -translate-y-1/2"
                    : "hidden"
                }`}
              >
                {passwordError}
              </p>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                className="w-full py-3 pl-10 pr-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal placeholder:opacity-50 focus:outline-none focus:border focus:border-purple focus:shadow-activeShadow"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <Button
            text="Login"
            textColor="text-white"
            backgroundColor="bg-purple hover:bg-lightPurple"
          />
          <section className="text-center w-full text-base font-normal leading-normal md:flex md:gap-1">
            <p className="text-grey">Don&apos;t have an account?</p>
            <Link href="/create-account" className="text-purple">
              Create account
            </Link>
          </section>
        </form>
      </div>
    </main>
  );
}
