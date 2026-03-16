import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button1({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        group relative px-8 py-3 text-xs font-black uppercase tracking-[0.2em]
        rounded-sm bg-[#0c479a] text-white border-2 border-[#0c479a]
        overflow-hidden transition-all duration-300
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {/* The Motion Slide */}
      <span className="absolute inset-0 w-0 bg-[#062c61] transition-all duration-300 ease-out group-hover:w-full" />
      
      <span className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:tracking-[0.3em]">
        {children}
      </span>
    </button>
  );
}