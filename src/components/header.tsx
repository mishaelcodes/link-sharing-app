// ****************** next imports

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// ****************** icon/images imports

import logoIcon from "@/images/logo-icon.svg";
import eye from "@/images/eye.svg";
import link from "@/images/link.svg";
import userCircle from "@/images/user-circle.svg";
import logo from "@/images/logo.svg"

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col items-start self-stretch py-4 pr-4 pl-6 gap-2">
        <div className="flex items-center justify-between self-stretch">
          <div>
            <Image src={logoIcon} alt="logo-Icon" className="md:hidden"/>
            <Image src={logo} alt="devlinks logo" className="hidden md:flex"/>
          </div>
          <div className="flex items-start">
            <div
              className={`flex items-center gap-2 rounded-lg py-[11px] px-[27px] ${
                pathname === "/dashboard" ? "bg-fadedPurple" : ""
              }`}
            >
              <Link href="/dashboard" className="flex">
                <Image
                  src={link}
                  alt="link icon"
                  className={`flex items-center gap-2 rounded-lg `}
                />
                <p className="hidden text-base font-semibold leading-normal text-purple md:block">
                  Links
                </p>
              </Link>
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg py-[11px] px-[27px] ${
                pathname === "/profile-settings" ? "bg-fadedPurple" : ""
              }`}
            >
              <Link href="/profile-settings" className="flex">
                <Image
                  src={userCircle}
                  alt="user circle icon"
                  className="flex items-center gap-2 rounded-lg"
                />
                <p className="hidden text-base font-semibold leading-normal text-purple md:block">
                  Profile Details
                </p>
              </Link>
            </div>
          </div>
          <Link
            href="/profile"
            className={`flex items-center gap-2 rounded-lg py-[11px] px-4 border border-purple `}
          >
            <Image
              src={eye}
              alt="preview-icon"
              className="flex flex-col items-start gap-2 md:hidden"
            />
            <p className="hidden text-base font-semibold leading-normal text-purple md:block">
              Preview
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
