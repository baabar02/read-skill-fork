"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Lottie from "lottie-react";

import RobotAnim from "@/assets/illustrations/Robot-Bot-3D.json";
import StarsAnim from "@/assets/illustrations/Stars.json";
import BookAnim from "@/assets/illustrations/Book.json";
import ChallengesAnim from "@/assets/illustrations/Challenges.json";
import VoiceAnim from "@/assets/illustrations/voice.json";

export default function LandingPage() {
  const features = [
    {
      icon: "📖",
      title: "Сонирхолтой эхүүд",
      desc: "Багш нар богино эх оруулж, сурагчдад уншуулж ойлголтыг шалгана.",
    },
    {
      icon: "🧑‍🏫",
      title: "Challenge үүсгэх",
      desc: "Багш нар сурагчдад сорил үүсгэж, архивлан хадгална.",
    },
    {
      icon: "🎧",
      title: "Дуу бичлэг → Текст",
      desc: "Сурагчдын дууг бичиж текст рүү хөрвүүлж үнэлгээ гаргана.",
    },
  ];

  return (
    <div className="bg-white relative">
      
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-wide text-indigo-700">
            ECHO MIND
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin">
            <div className="px-4 py-2 bg-white text-indigo-600 rounded-2xl font-medium shadow-sm cursor-pointer">
              Багш
            </div>
          </Link>
          <Link href="/user">
            <div className="px-4 py-2 border border-white rounded-2xl bg-transparent text-indigo-700 font-medium cursor-pointer">
              Сурагч
            </div>
          </Link>
        </div>
      </header>

     
      <section className="relative text-center py-32 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-80 h-80 md:w-96 md:h-96"
        >
          <Lottie animationData={RobotAnim} loop />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl md:text-5xl font-extrabold text-indigo-700 drop-shadow-lg leading-snug"
        >
          Сайн уу? Эх хэлээ уншиж <br /> ойлгох чадвараа хөгжүүл!
        </motion.h1>
      </section>

      
      <section className="px-4 py-24 bg-white/80 backdrop-blur-md rounded-t-3xl relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-indigo-700">
            Онцлох боломжууд
          </h2>
          <div className="w-20 h-20 md:w-24 md:h-24">
            <Lottie animationData={StarsAnim} loop />
          </div>
        </div>

        <div className="flex flex-col items-center gap-24 max-w-3xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col md:flex-row items-center gap-24"
            >
              <div className="w-56 h-56 md:w-72 md:h-72">
                {f.title === "Сонирхолтой эхүүд" && <Lottie animationData={BookAnim} loop />}
                {f.title === "Challenge үүсгэх" && <Lottie animationData={ChallengesAnim} loop />}
                {f.title === "Дуу бичлэг → Текст" && <Lottie animationData={VoiceAnim} loop />}
              </div>
              <div className="text-center md:text-left mt-4 md:mt-0">
                <h3 className="text-3xl md:text-4xl font-semibold text-indigo-700">{f.title}</h3>
                <p className="text-lg md:text-xl text-gray-700 mt-2">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    
      <footer className="py-12 text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p>
            © {new Date().getFullYear()} Эх хэл - Уншиж ойлгох төсөл. Бүх эрх
            хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">
              Холбоо барих
            </a>
            <a href="#" className="hover:underline">
              Мэдээллийн бодлого
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
