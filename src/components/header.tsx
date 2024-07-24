// ****************** components imports

import { usePathname } from "next/navigation";
import Image from "next/image";

// ****************** icon/images imports

import logoIcon from "@/images/logo-icon.svg";
import eye from "@/images/eye.svg";
import link from "@/images/link.svg";
import userCircle from "@/images/user-circle.svg";

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col items-start self-stretch py-4 pr-4 pl-6 gap-2">
        <div className="flex items-center justify-between self-stretch">
          <Image src={logoIcon} alt="logo-Icon" />
          <div className="flex items-start">
            <div
              className={`flex items-center gap-2 rounded-lg py-[11px] px-[27px] ${
                pathname === "/dashboard" ? "bg-lightPurple" : ""
              }`}
            >
              <Image
                src={link}
                alt="link icon"
                className={`flex items-center gap-2 rounded-lg `}
              />
              <p className="hidden text-base font-semibold leading-normal text-purple md:block">
                Links
              </p>
            </div>
            <div
              className={`flex items-center gap-2 rounded-lg py-[11px] px-[27px] ${
                pathname === "/profile" ? "bg-lightPurple" : ""
              }`}
            >
              <Image
                src={userCircle}
                alt="user circle icon"
                className="flex items-center gap-2 rounded-lg"
              />
              <p className="hidden text-base font-semibold leading-normal text-purple md:block">
                Profile Details
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 rounded-lg py-[11px] px-4 border border-purple ${
              pathname === "/profile" ? "bg-lightPurple" : ""
            }`}
          >
            <Image
              src={eye}
              alt="preview-icon"
              className="flex flex-col items-start gap-2"
            />
            <p className="hidden text-base font-semibold leading-normal text-purple md:block">
              Preview
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header