'use client'

import React from 'react'
import Header from './_components/Header'
import HomeWork from './_components/HomeWork'
import LevelUpGame from './_components/LevelUpGame'

const UserPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/user-bg.jpg')" }}
    >
      <div className="fixed top-0 left-0 w-full z-50 ">
        <Header />
      </div>
      <div className="flex-1 pt-20 sm:pt-50 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <HomeWork />
          <LevelUpGame />
        </div>
      </div>

      <footer className="text-center text-sm text-gray-700 py-2">
        © {new Date().getFullYear()} Бага ангийн хүүхдэд зориулсан контент
      </footer>
    </div>
  )
}

export default UserPage
