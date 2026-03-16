"use client";
import { useRouter, usePathname } from "next/navigation";

interface SortMemberButtonProps {
  routeName: string;
  value: string;
}

export default function SortMemberButton({ routeName, value }: SortMemberButtonProps) {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleClick = () => {
    const normalizedRoute =
      routeName.startsWith("/")
        ? `${pathname}${routeName}`
        : `${pathname}/${routeName}`;

    router.push(normalizedRoute);
  };

  return (
    <button
      onClick={handleClick}
      className={` px-6 py-3 rounded-md font-bold text-white 
        bg-[#0c479a] border-2 border-[#0c479a] relative overflow-hidden
        before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:bg-white/10 before:transition-all before:duration-300 hover:before:w-full
        transition-all duration-300 hover:text-white
        shadow-md hover:shadow-xl`}
    >
      {value}
    </button>
  );
}
