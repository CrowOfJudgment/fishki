import React, { useState, useEffect } from "react";
import ArrowRight from "../assets/arrow-right.svg";
import MenuIcon from "../assets/menu.svg";
import { getIntl } from "../lib/intl";
import { useRouter } from "next/navigation";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/lib/firebaseConfig";

export const runtime = "edge";

export const Header = ({ locale, onLocaleChange, intl }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (currentUser.emailVerified) {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "pl" : "en";
    onLocaleChange(newLocale);
    router.refresh();
  };

  const handleDashboard = () => {
    if (user) {
      router.push('/dashboard')
    }
    else {
      router.push('/signup')
    }
  }

  if (!intl) return null;

  return (
      <>
        <header className="sticky top-0 backdrop-blur-sm z-20">
          {/* Announcement Bar */}
          <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
            <p className="text-white/60 hidden md:block">
              {intl.formatMessage({ id: "announcement.primary" })}
            </p>
            <div className="inline-flex gap-1 items-center">
              <p>{intl.formatMessage({ id: "announcement.secondary" })}</p>
              <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
            </div>
          </div>

          {/* Header Content */}
          <div className="py-5">
            <div className="container">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <p className="text-4xl font-extrabold text-black-600 uppercase tracking-wide hover:text-blue-800 transition-all duration-300 ease-in-out">
                  Table Scan
                </p>

                {/* Menu Icon for Mobile */}
                <MenuIcon
                    className="h-5 w-5 md:hidden cursor-pointer"
                    onClick={toggleMobileMenu}
                />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 text-black/60 items-center">
                  {/* Language Toggle */}
                  <button
                      onClick={toggleLanguage}
                      className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
                  >
                    {locale === "en" ? "PL" : "EN"}
                  </button>

                  {/* Navigation Links */}
                  <a href="#showcase">{intl.formatMessage({ id: "header.about" })}</a>
                  <a href="#pricing">{intl.formatMessage({ id: "header.pricing" })}</a>
                  <a href="#contact">{intl.formatMessage({ id: "header.help" })}</a>

                  {/* Get for Free Button */}
                  <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
                  onClick={handleDashboard}>
                    {intl.formatMessage({ id: "header.signup" })}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 text-white z-30">
              <div className="p-6">
                <button
                    className="text-white/60 text-lg mb-6"
                    onClick={toggleMobileMenu}
                >
                  Close
                </button>
                <nav className="flex flex-col gap-4">
                  <a href="#showcase">
                    {intl.formatMessage({ id: "header.about" })}
                  </a>
                  <a href="#pricing">
                    {intl.formatMessage({ id: "header.pricing" })}
                  </a>
                  <a href="#contact">
                    {intl.formatMessage({ id: "header.help" })}
                  </a>
                  <button
                      className="bg-white text-black px-4 py-2 rounded-lg font-medium"
                      onClick={handleDashboard}
                  >
                    {intl.formatMessage({ id: "header.signup" })}
                  </button>
                </nav>
              </div>
            </div>
        )}

        {/* Sticky Language Change Button for Mobile */}
        <div className="fixed bottom-4 left-4 md:hidden z-30">
          <button
              onClick={toggleLanguage}
              className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            {locale === "en" ? "PL" : "EN"}
          </button>
        </div>
      </>
  );
};
