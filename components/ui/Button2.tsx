import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button2({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        group relative px-6 py-2.5 text-sm font-bold uppercase tracking-widest
        rounded-sm border-2 border-slate-200
        bg-white text-slate-500
        overflow-hidden transition-all duration-500
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {/* 1. The Scanner Motion: A thin bar that sweeps across on hover */}
      <span className="absolute inset-0 w-0.5 h-full bg-slate-400 -left-1 transition-all duration-700 ease-in-out group-hover:left-full opacity-0 group-hover:opacity-100" />

      {/* 2. Subtle Background Fill: Fades in from the bottom */}
      <span className="absolute inset-0 translate-y-full bg-slate-50 transition-transform duration-300 ease-out group-hover:translate-y-0" />

      {/* 3. The Content: Elevates slightly and darkens */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-all duration-300 group-hover:text-slate-900">
        {children}
      </span>
    </button>
  );
}