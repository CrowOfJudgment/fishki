"use client";
import productImage from "../assets/product-image.png";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
          <div className="relative">
            {/* Main product image */}
            <Image src={productImage} alt="Product Image" className="mt-10" />

            {/* Pizza image */}
            <motion.img
                src={pizza.src}
                alt="Pizza Image"
                height={262}
                width={262}
                className="absolute md:right-[-9rem] md:top-[-5rem] right-[-12rem] top-10 sm:right-[-7rem] sm:top-[-90%]"
                style={{
                  translateY,
                }}
            />

            {/* Burger image */}
            <motion.img
                src={burger.src}
                alt="Burger Image"
                height={248}
                width={248}
                className="absolute md:left-[-9rem] md:bottom-24 left-[-10rem] bottom-12 sm:left-[-7rem] sm:bottom-[-50%]"
                style={{
                  translateY,
                }}
            />
          </div>
        </div>
      </section>
  );
};
