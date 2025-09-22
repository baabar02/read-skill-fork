'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const HomeWork = () => {
  const weekDays = [
    { day: 'Даваа', task: 'Даалгавар: Уншиж ойлгох' },
    { day: 'Мягмар', task: null },
    { day: 'Лхагва', task: null },
    { day: 'Пүрэв', task: null },
    { day: 'Баасан', task: null },
    { day: 'Бямба', task: null },
    { day: 'Ням', task: null },
  ]

  const [selectedDay, setSelectedDay] = useState<string | null>('Даваа')

  return (
    <Card className="w-full max-w-xl h-[32rem] mx-auto bg-white/40 backdrop-blur-md border border-gray-200 shadow-lg flex flex-col justify-between p-6">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-center">
          Гэрийн даалгавар
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 flex-1">
        <div className="flex flex-wrap justify-center gap-2">
          {weekDays.map((day) => (
            <Button
              key={day.day}
              size="sm"
              variant={selectedDay === day.day ? 'default' : 'outline'}
              onClick={() => setSelectedDay(day.day)}
            >
              {day.day}
            </Button>
          ))}
        </div>
        <div className="mt-4 text-center text-gray-700 text-lg md:text-xl lg:text-2xl flex-1 flex items-center justify-center">
          {weekDays.find((d) => d.day === selectedDay)?.task ||
            'Өнөөдөр даалгавар байхгүй'}
        </div>
        <div className="mt-4 w-full">
          <Button size="lg" variant="default" className="w-full">
            Даалгавар хийх
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default HomeWork
