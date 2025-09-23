'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import Link from 'next/link'

import Task from '@/assets/illustrations/task.json'

const HomeWork = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto p-4"
    >
      <Card className="w-full max-w-xl h-[32rem] mx-auto bg-white/40 backdrop-blur-md border border-gray-200 shadow-lg flex flex-col justify-between p-6">
        <CardHeader className="flex flex-col items-center">
          <div className="text-black px-6 py-2 ">
            <CardTitle
              className="text-2xl md:text-3xl lg:text-4xl text-center 
  bg-gradient-to-r 
  from-red-500 
  via-blue-400 
  to-purple-500 
  bg-clip-text text-transparent"
            >
              Багшаас ирсэн даалгавар
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 flex-1 items-center justify-center">
          <div className="mt-4 text-center text-gray-700 text-lg md:text-xl lg:text-2xl flex flex-col items-center gap-4">
            <Lottie
              animationData={Task}
              loop
              autoplay
              style={{ width: 250, height: 250 }}
            />
          </div>

          <div className="-mt-4 sm:-mt-3 w-full flex justify-center">
            <Link href="/homework">
              <Button
                size="lg"
                variant="default"
                className="w-full py-8 text-m sm:text-xl font-semibold rounded-full shadow-lg 
             bg-gradient-to-r from-red-500 via-blue-400 to-purple-500 
             text-white hover:scale-105 transition-transform"
              >
                Даалгавар хийх
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default HomeWork
