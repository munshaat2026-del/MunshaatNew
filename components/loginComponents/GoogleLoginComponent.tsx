"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface AuthOptionsProps {
  showRegister?: boolean;
  showForgotPassword?: boolean;
  showGoogle?: boolean;
}

export const GoogleLogin = ({
  showRegister = true,
  showForgotPassword = true,
  showGoogle = true,
}: AuthOptionsProps) => {
  const [loading, setLoading] = useState(false);
  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="space-y-6 pt-4">
      {/* Navigation Links */}
      <div className="flex items-center justify-between">
        {showForgotPassword && (
          <Link
            href="/forgot-password"
            className="text-[10px] font-black uppercase text-slate-400 hover:text-[#0c479a] transition-colors   tracking-widest"
          >
            Forgot Password?
          </Link>
        )}

        {showRegister && (
          <Link
            href="/register"
            className="text-[10px] font-black uppercase text-[#0c479a] hover:underline transition-colors flex items-center gap-1   tracking-widest"
          >
            <UserPlus size={12} />
            Create Account
          </Link>
        )}
      </div>

      {showGoogle && (
        <>
          {/* Divider */}
          <div className="relative flex items-center">
            <div className="grow border-t border-slate-100"></div>
            <span className="shrink mx-4 text-[9px] font-black text-slate-300 uppercase tracking-widest  ">
              or
            </span>
            <div className="grow border-t border-slate-100"></div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group w-full py-4 border border-slate-200 flex justify-center items-center gap-3 bg-white hover:bg-slate-50 transition-all duration-300 active:scale-[0.98]"
          >
            <FcGoogle
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-black text-slate-700 uppercase ">
              {loading ? "Redirecting..." : "Login with Google"}
            </span>
          </button>
        </>
      )}
    </div>
  );
};
