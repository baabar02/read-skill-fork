'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "../../graphql/generated";
import { ReadingTestContainer } from "./_components/ReadingTest/ReadingTestContainer";

const Home = () => {
  const { data } = useGetUsersQuery();
  const [showReadingCard, setShowReadingCard] = useState(false);

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 text-gray-800">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold tracking-wide text-gray-800">
            ECHO MIND
          </div>
        </div>


        <div className="flex items-center gap-3">
          <Link href="/admin">
            <div className="px-4 py-2 bg-white text-pink-600 rounded-2xl font-medium shadow-sm">
              Багш
            </div>
          </Link>
          <Link href="/user">
            <div className="px-4 py-2 border border-white rounded-2xl bg-transparent text-pink-700 font-medium">
              Сурагч
            </div>
          </Link>
        </div>
      </header>


  return (
    <div className="">
      <Button variant="outline" onClick={() => setShowReadingCard(true)}>
        Add
      </Button>

      {showReadingCard && (
        <div
          className="fixed inset-0 bg-gray-50 bg-opacity-100 flex items-center justify-center z-50"
          onClick={() => setShowReadingCard(false)}
        >
          <ReadingTestContainer onClose={() => setShowReadingCard(false)} />
        </div>
      )}
    </div>
  );
};

      <section className="text-center py-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-lg"
        >
          📚 Эх хэлээ уншиж ойлгох чадвараа хөгжүүлье!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Хүүхэд бүрийн унших, ойлгох, илэрхийлэх чадварыг сонирхолтой сорил,
          дасгал, аудио бичлэгээр хөгжүүлэх вэб платформ.
        </motion.p>
      </section>

      {/* Features */}
      <section className="px-4 py-12 bg-white/80 backdrop-blur-md rounded-t-3xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
          Онцлог боломжууд
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: '📖',
              title: 'Сонирхолтой эхүүд',
              desc: 'Багш нар богино эх оруулж, сурагчдад уншуулж ойлголтыг шалгана.',
            },
            {
              icon: '🧑‍🏫',
              title: 'Challenge үүсгэх',
              desc: 'Багш нар сурагчдад сорил үүсгэж, архивлан хадгална.',
            },
            {
              icon: '🎧',
              title: 'Дуу бичлэг → Текст',
              desc: 'Сурагчдын дууг бичиж текст рүү хөрвүүлж үнэлгээ гаргана.',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="p-6 bg-gradient-to-br from-pink-200 to-blue-200 rounded-2xl shadow-lg text-center"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-pink-700">
                {f.title}
              </h3>
              <p>{f.desc}</p>
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
  )
}
