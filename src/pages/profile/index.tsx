// ****************** next imports

import { useRouter } from "next/router";

// ****************** react imports

import { useEffect, useState } from "react";

// ****************** components imports

import Loader from "@/components/loader/loader";
import Button from "@/components/button";
import Header from "@/components/header";
import ImageUploadForm from "@/components/imageUpload";

// ****************** firebase imports

import auth from "@/firebase/auth";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function Dashboard() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [, setLoggedIn] = useState(true)

  const user = auth.currentUser;

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const value = e.target.value;
    setLastName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const value = e.target.value;
    setEmail(value);
  };

  const updateUser = () => {
    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    } else alert("please fill in all values");

    if (user && fullName) {
      updateProfile(user, {
        displayName: fullName,
      })
        .then(() => {
          alert("Profile Updated");
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(user);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    if (user) {
      setFirstName(user.displayName?.split(" ")[0] || "");
      setLastName(user.displayName?.split(" ")[1] || "");
      setEmail(user.email || "");
      setLoading(false);
      console.log(user);
    } 
    
    return () => unsubscribe();
  }, [router, user]);

  if (loading) {
    return <Loader />; // Render a loading state until authentication is confirmed
  }

  return (
    <main>
      <Header />
      <div className="flex items-start self-stretch flex-1 gap-6 p-4 bg-almostWhte">
        <div className="flex flex-col items-start self-stretch flex-1 gap-10 p-6 border-b border-lightGrey  bg-white">
          <div className="flex flex-col items-start gap-2 slef-stretch">
            <h1 className="text-darkGrey text-2xl font-bold leading-normal">
              Profile Details
            </h1>
            <p className="text-grey leading-normal text-base font-normal">
              Add your details to create a personal touch to your profile.
            </p>
          </div>
          <div className="flex p-5 flex-col items-start justify-center gap-3 self-stretch rounded-xl bg-almostWhte">
            <p className="text-grey text-base font-normal leading-normal">
              Profile Picture
            </p>
            <ImageUploadForm />
          </div>
          <form className="flex p-5 flex-col justify-center items-center gap-3 self-stretch rounded-xl bg-almostWhte">
            <div className="flex flex-col justify-center items-start gap-1 self-stretch">
              <label
                htmlFor="first-name"
                className="text-darkGrey text-xs font-normal leading-normal"
              >
                First name*
              </label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={handleFirstNameChange}
                className="flex py-3 px-4 gap-3 self-stretch rounded-lg border border-lightGrey bg-white"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1 self-stretch">
              <label
                htmlFor="last-name"
                className="text-darkGrey text-xs font-normal leading-normal"
              >
                Last name*
              </label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={handleLastNameChange}
                className="flex py-3 px-4 gap-3 self-stretch rounded-lg border border-lightGrey bg-white"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1 self-stretch">
              <label
                htmlFor="email"
                className="text-darkGrey text-xs font-normal leading-normal"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                onChange={handleEmailChange}
                value={email}
                className="flex py-3 px-4 gap-3 self-stretch rounded-lg border border-lightGrey bg-white"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full flex flex-col items-end self-stretch p-4 md:py-6 md:px-10 gap-2">
        <Button
          text="Save"
          textColor="text-white"
          backgroundColor={`${isEditing ? "bg-purple" : "bg-lightPurple"}`}
          placement="md:self-end"
          event={updateUser}
        />
      </div>
    </main>
  );
}

export default Dashboard;
