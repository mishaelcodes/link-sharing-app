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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");

  // ****************** Checks for changes in the email input field
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError("");
  };

  // ****************** Checks for changes in the password input field
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
  };

  // ****************** Checks for changes in the confirm pasword input field
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setConfirmPasswordError("");
  };

  // ****************** Function to create new user
  const createUser = (e: React.FormEvent) => {
    e.preventDefault();
    const emailFormat = /^\S+@\S+\.\S+$/;

    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailFormat.test(email)) {
      setEmailError("Email is invalid");
    }

    // ****************** validating password
    if (!password) {
      setPasswordError("Password is required");
      return;
    } else if (password.length < 8) {
      setPasswordError("8 characters minimum");
      return;
    }

    // ****************** validating confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password");
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
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
          setError("Email is already in use");
        } else if (errorCode === "auth/network-request-failed") {
          setError("Network error, please try again later");
        }
      });

    return false;
  };
  return (
    <main
      className={`flex min-h-screen flex-col flex-1 items-start self-stretch p-8 gap-16 font-instrument_sans 2xl:py-[138px] 2xl:px-10 sm:justify-center sm:items-center sm:bg-almostWhte sm:gap-[51px]`}
    >
      <Image src={logo} alt="devlinks logo" />
      <div className="flex flex-col items-start gap-10 sm:p-5 md:p-10 bg-white rounded-xl">
        <div className="flex flex-col items-start flex-1 gap-2">
          {error ? (
            <p className="text-sm self-center font-semibold text-red leading-normal">
              {error}
            </p>
          ) : (
            ""
          )}
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
          <div className="w-full flex flex-col items-start gap-1">
            <label
              htmlFor="email"
              className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
            >
              Email address
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
              Create password
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
                minLength={8}
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                className="w-full py-3 pl-10 pr-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal placeholder:opacity-50 focus:outline-none focus:border focus:border-purple focus:shadow-activeShadow"
                placeholder="At least 8 characters"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label
              htmlFor="password"
              className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
            >
              Confirm password
            </label>
            <div className="relative w-full">
              <Image
                src={lockKey}
                alt="lockKey_icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <p
                className={`${
                  confirmPasswordError
                    ? "text-right text-xs font-normal leading-normal text-red absolute right-3 top-1/2 transform -translate-y-1/2"
                    : "hidden"
                }`}
              >
                {confirmPasswordError}
              </p>
              <input
                type="password"
                id="confirm password"
                minLength={8}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="current-password"
                className="w-full py-3 pl-10 pr-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal placeholder:opacity-50 focus:outline-none focus:border focus:border-purple focus:shadow-activeShadow"
                placeholder="At least 8 characters"
              />
            </div>
          </div>
          <Button
            text="Login"
            textColor="text-white"
            backgroundColor="bg-purple hover:bg-lightPurple"
          />
          <p className="text-grey">
            Password must contain at least 8 characters
          </p>
          <section className="text-center w-full text-base font-normal leading-normal md:flex md:gap-1">
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
