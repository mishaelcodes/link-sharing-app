// ****************** react imports

import {  useEffect, useState } from "react";

// ****************** next imports

import Image from "next/image";

// ****************** components imports

import Loader from "@/components/loader/loader";
import Button from "@/components/button";

// ****************** icon/images imports

import Header from "@/components/header";
import auth from "@/firebase/auth";
import ImageUploadForm from "@/components/imageUpload";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  
  const user = auth.currentUser

  useEffect(() => {
    if(user){
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return <Loader />; // Render a loading state until authentication is confirmed
  }


  return (
    <main>
      <Header />
      <div className="flex items-start self-stretch flex-1 gap-6 p-4 bg-almostWhte">
        <div className="flex flex-col items-start self-stretch flex-1 gap-10 p-6 border-b bg-white">
          <div className="flex flex-col items-start gap-2 slef-stretch">
            <h1 className="text-darkGrey text-2xl font-bold leading-normal">Profile Details</h1>
            <p className="text-grey leading-normal text-base font-normal">Add your details to create a personal touch to your profile.</p>
          </div>
          <div className="flex p-5 flex-col items-start justify-center gap-3 self-stretch rounded-xl bg-almostWhte">
            <p className="text-grey text-base font-normal leading-normal">Profile Picture</p>
            <ImageUploadForm />
          </div>
        </div>
      </div>
    </main>
  );
} 

export default Dashboard;
