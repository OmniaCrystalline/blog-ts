/** @format */
"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GoogleIcon = FcGoogle as React.ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GithubIcon = FaGithub as React.ComponentType<any>;

  return (
    <div>
      <div className='grid lg:flex w-fit ml-auto mr-auto justify-center gap-4 px-10 py-5 place-items-center'>
        <button
          className='flex gap-2 justify-center place-items-center px-5 py-2 w-36 bg-transparent border-2 rounded-lg hover:bg-inherit hover:shadow-md '
          onClick={() => signIn("google")}>
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button
          onClick={()=> signIn('github')}
          className='flex gap-2 justify-center place-items-center px-5 py-2 w-36 bg-transparent border-2 rounded-lg hover:bg-inherit hover:shadow-md '>
          <GithubIcon />
          <span>Github</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
