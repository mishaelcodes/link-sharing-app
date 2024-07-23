import Image from "next/image";
import logo from "../../images/logo.svg";
import envelope from "../../images/envelope.png";
import lockKey from "../../images/lock-key.svg";
import Button from "@/components/button";

export default function Home() {
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
        <form autoFocus className="w-full flex flex-col items-start gap-6">
          <label
            htmlFor="email"
            className="text-darkGrey text-xs font-normal leading-normal flex flex-col items-start gap-1 self-stretch"
          >
            Email address
            <Image src={envelope} alt="envelope_icon" />
            <input
              type="email"
              id="email"
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
              id="password"
              minLength={8}
              className="flex py-3 px-4 gap-3 self-stretch border border-lightGrey rounded-lg bg-white text-darkGrey text-base font-normal opacity-50"
              placeholder="At least 8 characters"
            />
          </label>
          <Button
            text="Login"
            textColor="text-white"
            backgroundColor="bg-purple"
          />
          <p className="text-grey">Password must contain at least 8 characters</p>
          <section className="text-center w-full text-base font-normal leading-normal">
            <p className="text-grey">Already have an account?</p>
            <a href="#" className="text-purple">
              Login
            </a>
          </section>
        </form>
      </div>
    </main>
  );
}
