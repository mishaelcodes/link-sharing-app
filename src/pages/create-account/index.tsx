// ****************** firebase imports

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import auth from "../../firebase/auth";

// ****************** React Hook

import { useState } from "react";

// ****************** Next import

import Image from "next/image";
import Link from "next/link";

// ****************** Icons import

import logo from "../../images/logo.svg";
import envelope from "../../images/envelope.png";
import lockKey from "../../images/lock-key.svg";
import Button from "@/components/button";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ****************** Checks for changes in the email input field
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // setEmailError("");
    // setErrorModal(false);
  };

  // ****************** Checks for changes in the password input field
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // setPasswordError("");
  };

  // ****************** Checks for changes in the confirm pasword input field
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    // setConfirmPasswordError("");
  };

  // ****************** Function to create new user
  const createUser = (e: React.FormEvent) => {
    e.preventDefault();
    const emailFormat = /^\S+@\S+\.\S+$/;

    if (!email) {
      alert("No email");
      return false;
    } else if (!emailFormat.test(email)) {
      alert("email not valid");
    }

    // ****************** validating password
    if (!password) {
      alert("Password is required");
      return;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // ****************** validating confirm password
    if (!confirmPassword) {
      alert("Confirm Password  is required");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ****************** If all checks, create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        user;

        // ****************** Sends the user a verification email when the user's account is created
        if (auth.currentUser) {
          sendEmailVerification(auth.currentUser).then(() => {
            // ****************** After email verification sent!
            alert("logged in");
          });
        }
      })
      .catch((error) => {
        // ****************** Checks for any error
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("Email is already in use");
        } else if (errorCode === "auth/network-request-failed") {
          alert("Network error, please try again later");
        }
      });

    return false;
  };
  return (
    <main
      className={`flex min-h-screen flex-col flex-1 items-start self-stretch p-8 gap-16 font-instrument_sans`}
    >
      <Image src={logo} alt="devlinks logo" />
      <div className="flex flex-col items-start gap-10">
        <div className="flex flex-col items-start flex-1 gap-2">
          <h2 className="text-darkGrey text-2xl leading-normal font-bold">
            Create account
          </h2>
          <p className="text-grey text-base leading-normal font-normal">
            Let&apos; get you started sharing your links!
          </p>
        </div>
        <form
          autoFocus
          className="w-full flex flex-col items-start gap-6"
          onSubmit={createUser}
        >
          <label
            htmlFor="email"
            className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
          >
            Email address
            <Image src={envelope} alt="envelope_icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              className="w-full flex py-3 px-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal opacity-50"
              placeholder="e.g. alex@email.com"
            />
          </label>
          <label
            htmlFor="password"
            className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
          >
            Create password
            <Image src={lockKey} alt="lockKey_icon" />
            <input
              type="password"
              id="password"
              minLength={8}
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              className="flex py-3 px-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal opacity-50"
              placeholder="At least 8 characters"
            />
          </label>
          <label
            htmlFor="password"
            className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
          >
            Confirm password
            <Image src={lockKey} alt="lockKey_icon" />
            <input
              type="password"
              id="confirm password"
              minLength={8}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              autoComplete="current-password"
              className="flex py-3 px-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal opacity-50"
              placeholder="At least 8 characters"
            />
          </label>
          <Button
            text="Login"
            textColor="text-white"
            backgroundColor="bg-purple"
          />
          <p className="text-grey">
            Password must contain at least 8 characters
          </p>
          <section className="text-center w-full text-base font-normal leading-normal">
            <p className="text-grey">Already have an account?</p>
            <Link href="/" className="text-purple">
              Login
            </Link>
          </section>
        </form>
      </div>
    </main>
  );
};

export default CreateAccount;
