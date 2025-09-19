'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LevelUpGame = () => {
  const level = 1
  const heroName = 'Уншдаг Баатар'

  return (
    <Card className="w-full max-w-xl h-[32rem] mx-auto bg-white/40 backdrop-blur-md border border-gray-200 shadow-lg flex flex-col justify-between p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl">{heroName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 flex-1">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800">
          Level: {level}
        </div>

        <p className="text-center text-gray-700 text-lg md:text-xl lg:text-2xl mt-2">
          Тоглож, түвшин ахиулцгаая!
        </p>
      </CardContent>
      <div className="mt-4 w-full">
        <Link href="/storyGame">
          <Button size="lg" variant="default" className="w-full">
            Тоголцгооё
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default LevelUpGame
