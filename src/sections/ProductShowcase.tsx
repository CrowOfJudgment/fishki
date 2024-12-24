"use client";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'

export const runtime = "edge";

export const ProductShowcase = ({ intl }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  if (!intl) return null;

  return (
      <section
          ref={sectionRef}
          className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
          id="showcase"
      >
        <div className="container">
          <div className="section-heading">
            <div className="flex justify-center">
              <div className="tag">{intl.formatMessage({ id: "showcase.message" })}</div>
            </div>
            <h2 className="section-title mt-5">
              {intl.formatMessage({ id: "showcase.title" })}
            </h2>
            <p className="section-description mt-5">
              {intl.formatMessage({ id: "showcase.subtitle" })}
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="space-y-16">
              <div className="transform translate-y-8">
                <Image
                    src={image2}
                    alt="Image 1"
                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <Image
                    src={image1}
                    alt="Image 2"
                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Image
                    src={image3}
                    alt="Image 3"
                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="transform">
                <Image
                    src={image4}
                    alt="Image 4"
                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <motion.img
                src={pizza.src}
                alt="Pizza Image"
                height={262}
                width={262}
                className="absolute md:right-[-9rem] md:top-[-5rem] right-[-12rem] top-10 sm:right-[-7rem] sm:top-[-50%]"
                style={{
                  translateY,
                }}
            />

            <motion.img
                src={burger.src}
                alt="Burger Image"
                height={248}
                width={248}
                className="absolute md:left-[-9rem] md:bottom-24 left-[-10rem] bottom-12 sm:left-[-7rem] sm:bottom-[-30%]"
                style={{
                  translateY,
                }}
            />
          </div>
        </div>
      </section>
  );
};