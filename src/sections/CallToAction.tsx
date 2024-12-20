"use client";
import ArrowRight from "../assets/arrow-right.svg";
import chefLeft from "../assets/chefLeft.png";
import chefRight from "../assets/chefRight.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export const runtime = "edge";

export const CallToAction = ({ intl }) => {
  const sectionRef = useRef(null);
  const router = useRouter()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  if (!intl) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">{intl.formatMessage({ id: "cta.title" })}</h2>
          <p className="section-description mt-5">
            {intl.formatMessage({ id: "cta.subtitle" })}
          </p>
          <motion.img
            src={chefLeft.src}
            alt="Star Image"
            width={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={chefRight.src}
            alt="Spring Image"
            width={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{
              translateY,
            }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary" onClick={() => router.push('/signup')}>{intl.formatMessage({ id: "cta.getNow" })}</button>
          <button className="btn btn-text gap-1">
            <Link href={'/contact'}>{intl.formatMessage({ id: "cta.learnMore" })}</Link>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
