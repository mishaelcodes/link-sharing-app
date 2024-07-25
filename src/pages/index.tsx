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
  /* const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); */
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
    /* setEmailError("");
    setErrorModal(false); */
  };

  // ****************** Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    /*  setPasswordError("");
    setErrorModal(false); */
  };

  // ****************** login user
  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    const emailFormat = /^\S+@\S+\.\S+$/;

    // ****************** Validating email
    if (!email) {
      alert("Email is required");
      return false;
    } else if (!emailFormat.test(email)) {
      alert("Email is invalid");
      return false;
    }

    // ****************** Validating password
    if (!password) {
      alert("Password is required");
      return false;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
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
          alert("Invalid login credentials");
        } else if (errorCode === "auth/network-request-failed") {
          alert("Network error, please try again later");
        }
      });
  };

  return (
    <main
      className={`flex min-h-screen flex-col flex-1 items-start self-stretch p-8 gap-16 font-instrument_sans md:py-72 md:px-36 md:justify-center md:items-center md:bg-almostWhte md:gap-[51px]`}
    >
      <Image src={logo} alt="devlinks logo" />
      <div className="flex flex-col items-start gap-10 md:p-10 bg-white rounded-xl">
        <div className="flex flex-col items-start flex-1 gap-2">
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
