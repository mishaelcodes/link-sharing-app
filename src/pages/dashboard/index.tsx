// ****************** firebase imports

import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/auth";
import db from "@/firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

// ****************** react imports

import { useCallback, useEffect, useState } from "react";

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
import github from "@/images/github.svg";
import { nanoid } from "nanoid";
import { linkSync } from "fs";

function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const [, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("github");
  const [platformLink, setPlatformLink] = useState("");
  const [linktNotEmpty, setLinkNotEmpty] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userLinks, setUserLinks] = useState<
    Array<{ id: string; platform: string; link: string }>
  >([]);

  const user = auth.currentUser;
  const userId = user?.uid;
  const userDocRef = userId
    ? collection(db, "user-links", userId, "links")
    : "";

  const addLink = () => {
    setIsEditing(true);
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    setPlatform(value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setPlatformLink(value);
  };

  // fetch user links from firestore
  const fetchUserLinks = useCallback(async () => {
    if (userDocRef) {
      try {
        const querySnapshot = await getDocs(userDocRef);
        const userLinks: Array<{ id: string; link: string; platform: string }> =
          [];
        querySnapshot.docs.forEach((doc) => {
          const { platform, link } = doc.data();
          userLinks.push({
            id: doc.id,
            link,
            platform,
            ...doc.data(),
          });
        });
        setUserLinks(userLinks);
        setLinkNotEmpty(userLinks.length === 0);
      } catch (error) {
        console.error("Uh oh: ", error);
      }
    }
  }, [userDocRef]);

  // check for signed in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        fetchUserLinks();
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserLinks, router]);

  // save social link to firestore
  const saveLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (platform === "GitHub" &&
        platformLink.startsWith("https://github.com")) ||
      (platform === "Twitter" &&
        platformLink.startsWith("https://twitter.com/")) ||
      platformLink.startsWith("https://x.com/") ||
      (platform === "LinkedIn" &&
        platformLink.startsWith("https://linkedin.com")) ||
      (platform === "Frontend Mentor" &&
        platformLink.startsWith("https://frontendmentor.io")) ||
      (platform === "Facebook" &&
        platformLink.startsWith("https://facebook.com")) ||
      (platform === "Twitch" && platformLink.startsWith("https://twitch.tv")) ||
      (platform === "Dev.to" && platformLink.startsWith("https://dev.to")) ||
      (platform === "Codewars" &&
        platformLink.startsWith("https://codewars.com")) ||
      (platform === "Codepen" &&
        platformLink.startsWith("https://codepen.io")) ||
      (platform === "freeCodeCamp" &&
        platformLink.startsWith("https://freecodecamp.org")) ||
      (platform === "GitLab" &&
        platformLink.startsWith("https://gitlab.com")) ||
      (platform === "Hashnode" &&
        platformLink.startsWith("https://hashnode.com")) ||
      (platform === "Stack Overflow" &&
        platformLink.startsWith("https://stackoverflow.com")) ||
      (platform === "YouTube" &&
        platformLink.startsWith("https://www.youtube.com/"))
    ) {
      if (userDocRef) {
        const docId = nanoid(12);
        const docRef = doc(userDocRef, docId);

        try {
          await setDoc(docRef, {
            platform: platform,
            link: platformLink,
          });
          fetchUserLinks();
        } catch (error) {
          console.error(error);
        } finally {
          setIsEditing(false);
        }
      }
    } else if (platformLink === "") {
      alert("Please enter a link");
    } else if (
      !platformLink.startsWith("https://") ||
      !platformLink.startsWith("https://")
    ) {
      alert("Invalid link");
    } else alert("The link you entered does not match the platform of choice");
  };

  //********************************* delete created urls
  const handleRemoveLink = async (id: string) => {
    const docRef = userId
      ? doc(db, "user-links", userId, "links", id)
      : null;

    if (docRef) {
      await deleteDoc(docRef);
    }

    setUserLinks((prevUserLinks) => {
      return prevUserLinks.map((item) => {
        if (item.id === id) {
          return { ...item };
        }

        return item;
      });
    });
  };

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
      <div className="flex items-start self-stretch flex-1 gap-6 p-4 bg-almostWhte">
        <div className="flex flex-col items-start self-stretch flex-1 gap-10 p-6 border-b bg-white border-lightGrey">
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
              event={addLink}
            />
            {/* show user links if there are any or default screen if there are none */}
            {!linktNotEmpty ? (
              userLinks.map((userLink, index) => (
                <div
                  key={userLink.id}
                  className="flex flex-col items-center justify-center gap-3 self-stretch p-5 rounded-xl bg-almostWhite"
                >
                  <div className="flex items-center justify-between self-stretch">
                    <p className="text-grey text-base font-bold leading-normal">
                      Link #{index + 1}
                    </p>
                    <p className="text-grey text-base font-bold leading-normal" onClick={() => handleRemoveLink(userLink.id)}>
                      Remove
                    </p>
                  </div>
                  <div className="w-full self-stretch gap-2">
                    <label
                      htmlFor="platform"
                      className="text-xs font-normal leading-normal text-darkGrey"
                    >
                      Platform
                    </label>
                    <select
                      name="platform"
                      onChange={handlePlatformChange}
                      value={userLink.platform}
                      className="w-full flex items-center self-stretch py-3 px-4 gap-3 rounded-lg border border-lightGrey bg-white"
                    >
                      <option value={userLink.platform}>
                        {userLink.platform}
                      </option>
                      <option value="Frontend Mentor">Frontend Mentor</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitch">Twitch</option>
                      <option value="Dev.to">Dev.to</option>
                      <option value="Codewars">Codewars</option>
                      <option value="Codepen">Codepen</option>
                      <option value="freeCodeCamp">freeCodeCamp</option>
                      <option value="GitLab">GitLab</option>
                      <option value="Hashnode">Hashnode</option>
                      <option value="Stack Overflow">Stack Overflow</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="platform-link"
                      className="text-xs font-normal leading-normal text-darkGrey"
                    >
                      Link
                    </label>
                    <input
                      type="url"
                      name="platform-link"
                      placeholder={userLink.link}
                      value={userLink.link}
                      onChange={handleLinkChange}
                      className="w-full flex items-center self-stretch py-3 px-4 gap-3 rounded-lg border border-lightGrey bg-white"
                    />
                  </div>
                </div>
              ))
            ) : (
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
            )}
            {isEditing ? (
              <div className="flex items-center justify-center self-stretch gap-3 flex-col p-5 rounded-xl bg-almostWhte">
                <div className="flex items-start justify-between self-stretch">
                  <p className="text-grey text-base font-bold leading-normal">
                    Link #1
                  </p>
                  <p className="text-grey text-base font-bold leading-normal">
                    Remove
                  </p>
                </div>
                <div className="w-full">
                  <p>Platform</p>
                  <select
                    id="platform"
                    onChange={handlePlatformChange}
                    value={platform}
                    className="w-full flex items-center self-stretch py-3 px-4 gap-3 rounded-lg border border-lightGrey bg-white"
                  >
                    <option value="GitHub">GitHub</option>
                    <option value="Frontend Mentor">Frontend Mentor</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitch">Twitch</option>
                    <option value="Dev.to">Dev.to</option>
                    <option value="Codewars">Codewars</option>
                    <option value="Codepen">Codepen</option>
                    <option value="freeCodeCamp">freeCodeCamp</option>
                    <option value="GitLab">GitLab</option>
                    <option value="Hashnode">Hashnode</option>
                    <option value="Stack Overflow">Stack Overflow</option>
                  </select>
                </div>
                <div className="w-full">
                  <p>Link</p>
                  <input
                    type="url"
                    id="platform-link"
                    placeholder="e.g https://www.github.com/"
                    onChange={handleLinkChange}
                    className="w-full flex items-center self-stretch py-3 px-4 gap-3 rounded-lg border border-lightGrey bg-white"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end self-stretch p-4 gap-2">
        <Button
          text="Save"
          textColor="text-white"
          backgroundColor={`${isEditing ? "bg-purple" : "bg-lightPurple"}`}
          event={saveLink}
        />
      </div>
    </main>
  );
}

export default Dashboard;
