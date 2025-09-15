"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


export default function Header({title, text}: {title: string, text: string}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <header className="relative h-[25vh]">
      <div
        className="h-full bg-cover header-bg"
        style={{ backgroundImage: `url(/images/banner.jpg)`, backgroundSize: "cover"}}
      >
        <div className="flex h-full items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="mb-4 text-5xl font-bold header-heading">{title}</h1>
            <p className="text-2xl header-para">{text}</p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
