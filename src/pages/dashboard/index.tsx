// ****************** firebase imports

import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/auth";

// ****************** react imports

import { useEffect, useState } from "react";

// ****************** next imports

import { useRouter } from "next/router";

// ****************** components imports

import Loader from "@/components/loader/loader";

function Dashboard() {
  const router = useRouter();
  const [, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

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

  return <div>Dashboard Content</div>;
}

export default Dashboard;
