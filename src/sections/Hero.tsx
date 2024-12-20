"use client";
import ArrowIcon from "../assets/arrow-right.svg";
import heroCoffee from "../assets/heroCoffee.png";
import heroCookie from "../assets/heroCookie.png";
import heroDonuts from "../assets/heroDonuts.png";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export const runtime = "edge";

export const Hero = ({ intl }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  if (!intl) return null

  else return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">{intl.formatMessage({ id: "hero.version" })}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
                {intl.formatMessage({ id: "hero.title" })}
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              {intl.formatMessage({ id: "hero.subtitle" })}
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <Link href={'/signup'} className="btn btn-primary">{intl.formatMessage({ id: "hero.cta" })}</Link>
              <button className="btn btn-text gap-1">
                <Link href={'/contact'}>{intl.formatMessage({ id: "hero.learnMore" })}</Link>
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={heroCoffee.src}
              alt="Cog image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={heroCookie.src}
              width={220}
              height={220}
              alt="Cylinder image"
              className="hidden md:block -top-[150px] -left-32 md:absolute"
              style={{
                translateY: translateY,
              }}
            />
            <motion.img
              src={heroDonuts.src}
              width={220}
              alt="Noodle image"
              className="hidden lg:block absolute top-[400px] left-[448px] rotate-[30deg]"
              style={{
                rotate: 30,
                translateY: translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
