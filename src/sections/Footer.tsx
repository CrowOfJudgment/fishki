import SocialX from "../assets/social-x.svg";
import SocialLinkedIn from "../assets/social-linkedin.svg";
import React from "react";
import Link from "next/link";

export const runtime = "edge";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative">
          <div
              className="absolute inset-0 blur bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] z-0"></div>
          <p className="relative z-10 text-4xl font-extrabold text-black-600 uppercase tracking-wide hover:text-blue-800 transition-all duration-300 ease-in-out">
            Table Scan
          </p>
        </div>

        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#showcase">About</a>
          <a href="#pricing">Pricing</a>
          <Link href="/contact">Help</Link>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://x.com/Yussuf_Nergiz" target="_blank" rel="noopener noreferrer">
            <SocialX/>
          </a>

          <a href="https://x.com/MatteuszB" target="_blank" rel="noopener noreferrer">
            <SocialX/>
          </a>

          <a href="https://www.linkedin.com/in/yussuf-nergiz/" target="_blank" rel="noopener noreferrer">
            <SocialLinkedIn/>
          </a>

          <a href="https://www.linkedin.com/in/mateusz-buczak-421866285/" target="_blank" rel="noopener noreferrer">
            <SocialLinkedIn/>
          </a>
        </div>
        <p className="mt-6">
          &copy; 2024 Table Scan, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
