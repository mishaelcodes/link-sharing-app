// ****************** firebase imports

import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/auth";

// ****************** react imports

import { useEffect, useState } from "react";

// ****************** next imports

import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import Image from "next/image";

// ****************** components imports

import Loader from "@/components/loader/loader";
import Button from "@/components/button";

// ****************** icon/images imports

import logoIcon from "@/images/logo-icon.svg";
import eye from "@/images/eye.svg";
import link from "@/images/link.svg";
import userCircle from "@/images/user-circle.svg";
import getStarted from "@/images/get-started.svg";

function Dashboard() {
  const router = useRouter();
  const [, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Loader />; // Render a loading state until authentication is confirmed
  }

  return (
    <main>
      <div className="flex flex-col items-start self-stretch py-4 pr-4 pl-6 gap-2">
        <div className="flex items-center justify-between self-stretch">
          <Image src={logoIcon} alt="logo-Icon" />
          <div className="flex items-start">
            <Image
              src={link}
              alt="link icon"
              className={`flex items-center gap-2 py-[11px] px-[27px] rounded-lg w-[80px] ${
                pathname === "/dashboard" ? "bg-lightPurple" : ""
              }`}
            />
            <Image
              src={userCircle}
              alt="user circle icon"
              className="flex items-center gap-2 py-[11px] px-[27px] rounded-lg w-[80px]"
            />
          </div>
          <Image
            src={eye}
            alt="preview-icon"
            className="flex flex-col items-start gap-2 py-[11px] px-4 border border-purple rounded-lg w-[50px]"
          />
        </div>
      </div>
      <div className="flex items-start self-stretch flex-1 gap-6 p-4">
        <div className="flex flex-col items-start self-stretch flex-1 gap-10 p-6 border-b border-lightGrey">
          <div className="flex flex-col items-start self-stretch gap-2">
            <h2 className="text-darkGrey text-2xl font-bold self-stretch leading-normal">
              Customize your links
            </h2>
            <p className="text-grey text-base font-normal leading-normal">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <div className="flex flex-col items-start self-stretch flex-1 gap-6">
            <Button
              text="+ Add new link"
              textColor="text-purple"
              backgroundColor="bg-white"
              border="border border-purple"
            />
            <div className="flex flex-col items-center justify-center gap-3 flex-1 self-stretch p-5 rounded-xl bg-almostWhite">
              <div className="flex flex-col items-center self-stretch gap-6">
                <Image src={getStarted} alt="illustration" />
                <h3 className="text-darkGrey text-center text-2xl font-bold leading-normal">
                  Let&apos;s get you started
                </h3>
                <p className="text-grey text-center text-base font-normal leading-normal">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We&apos;re
                  here to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end self-stretch p-4 gap-2">
        <Button
          text="Save"
          textColor="text-white"
          backgroundColor="bg-lightPurple"
        />
      </div>
    </main>
  );
}

export default Dashboard;
