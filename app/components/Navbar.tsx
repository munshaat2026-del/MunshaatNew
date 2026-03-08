"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Globe, Phone } from 'lucide-react';
import LanguageSwitcher from './language-switcher';
import Logo from "@/public/logo.png"
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const primaryColor = "#0c479a";
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Offices', href: '/offices' },
    { name: 'Stores', href: '/stores' },
    { name: 'Depot', href: '/depot' },
    { name: 'Parkings', href: '/parkings' },
    
    //{ name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <nav className={`w-full fixed z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-white py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex justify-between items-center h-12">

            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-4 group transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image 
                    alt='Royal Manage Logo' 
                    width={60} 
                    height={60} 
                    src={Logo} 
                    className="object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

                <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

                <div className="flex flex-col justify-center">
                  <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter leading-none uppercase italic">
                    ROYAL <span style={{ color: primaryColor }}>MANAGE</span>
                  </h1>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8 border-r border-slate-100 pr-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300
                      ${pathname === link.href ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}
                    `}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span 
                        className="absolute -bottom-2 left-0 w-full h-[2px]" 
                        style={{ backgroundColor: primaryColor }} 
                      />
                    )}
                  </a>
                ))}
              </div>
<LanguageSwitcher />
              
            </div>

            {/* Mobile Button */}
            <div className="lg:hidden flex items-center gap-4">
              <LanguageSwitcher />
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-900"
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-[101] lg:hidden transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-10 overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-16">
            <Image alt='logo' width={100} height={30} src={Logo} />
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-12 h-12 border border-slate-900 flex items-center justify-center text-slate-900"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-4xl font-black uppercase tracking-tighter flex items-center justify-between group py-2
                  ${pathname === link.href ? 'text-[#0c479a]' : 'text-slate-900 hover:text-[#0c479a]'}
                  transition-colors duration-300
                `}
              >
                <span>{link.name}</span>
                <ChevronRight 
                  size={24} 
                  className="transition-transform group-hover:translate-x-2 opacity-40" 
                />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10 border-t border-slate-100 flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="tel:+"
                className="flex items-center justify-center gap-3 p-4 border border-slate-100 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-slate-50"
              >
                <Phone size={14} /> Contact
              </a>
              <a 
                href="#"
                className="flex items-center justify-center gap-3 p-4 border border-slate-100 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-slate-50"
              >
                <Globe size={14} /> Locations
              </a>
            </div>

           
          </div>

        </div>
      </div>
    </>
  );
}