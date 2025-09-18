'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import STORIES_3 from './stories_3.json'
import STORIES_4 from './stories_4.json'
import STORIES_5 from './stories_5.json'

type Question = {
  id: number
  question: string
  options: string[]
  answer: string
}

type Story = {
  id: number
  grade: number
  title: string
  content: string
  questions: Question[]
}

type ConfettiParticle = {
  x: number
  y: number
  size: number
  color: string
  rotate: number
}

const STORIES_BY_GRADE: { [grade: number]: Story[] } = {
  3: STORIES_3,
  4: STORIES_4,
  5: STORIES_5,
}

const generateConfetti = (): ConfettiParticle[] =>
  Array.from({ length: 40 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -200,
    size: 6 + Math.random() * 8,
    color: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][
      Math.floor(Math.random() * 5)
    ],
    rotate: Math.random() * 360,
  }))

export default function StoryGame() {
  const [grade, setGrade] = useState<number | null>(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [reading, setReading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [scorePerLevel, setScorePerLevel] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiParticles, setConfettiParticles] = useState<
    ConfettiParticle[]
  >([])
  const [shake, setShake] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth < 768

  if (grade === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-yellow-100 to-pink-100 p-4">
        <h1 className="text-3xl font-extrabold text-orange-600 drop-shadow-md text-center">
          Хүүхдийн ангиа сонгоно уу
        </h1>
        <div className="flex gap-4 flex-wrap justify-center mt-4">
          {[3, 4, 5].map((g) => (
            <button
              key={g}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform"
              onClick={() => {
                setGrade(g)
                const stories = STORIES_BY_GRADE[g]
                setScorePerLevel(Array(stories[0].questions.length).fill(0))
              }}
            >
              {g}-р анги
            </button>
          ))}
        </div>
      </div>
    )
  }

  const stories = STORIES_BY_GRADE[grade!]
  const currentStory = stories[currentStoryIndex]
  const q = currentStory.questions[currentQuestionIndex]

  // Bubble coordinates responsive
  const LEVEL_POSITIONS = currentStory.questions.map((_, i) => ({
    x: 20 + ((screenWidth - 40) / currentStory.questions.length) * i,
    y: isMobile ? 100 + i * 50 : 120 + i * 60,
  }))

  const currentPos = LEVEL_POSITIONS[currentQuestionIndex] || { x: 0, y: 0 }
  const QUESTION_TOP = isMobile ? '70%' : '65%'

  const handleAnswer = (opt: string) => {
    if (!q) return
    if (opt === q.answer) {
      setConfettiParticles(generateConfetti())
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
      setScore((prev) => prev + 1)
      const newScorePerLevel = [...scorePerLevel]
      newScorePerLevel[currentQuestionIndex] = 1
      setScorePerLevel(newScorePerLevel)
      if (!completedLevels.includes(currentQuestionIndex))
        setCompletedLevels((prev) => [...prev, currentQuestionIndex])

      if (currentQuestionIndex + 1 < currentStory.questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        if (currentStoryIndex + 1 < stories.length) {
          setCurrentStoryIndex((prev) => prev + 1)
          setCurrentQuestionIndex(0)
          setReading(true)
          setCompletedLevels([])
          setScorePerLevel(
            Array(stories[currentStoryIndex + 1].questions.length).fill(0)
          )
        } else {
          setCompleted(true)
        }
      }
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  if (completed)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-pink-100 to-yellow-100 p-4">
        <h1 className="text-3xl font-extrabold text-orange-600 drop-shadow-lg">
          🎉 Бүх үлгэрийн бүх level дууслаа! 🎉
        </h1>
        <p className="text-xl font-semibold mt-4">Таны нийт оноо: {score}</p>
      </div>
    )

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-yellow-100 to-pink-50 relative overflow-hidden">
      {/* Score */}
      <div className="fixed top-4 right-4 font-bold text-lg bg-white/80 px-3 py-1 rounded-xl shadow z-50">
        Оноо: {score}
      </div>

      {/* Story title and content */}
      {reading && (
        <div className="bg-white p-6 rounded-3xl shadow-xl text-lg mb-6 z-40 relative">
          <h2 className="text-xl font-bold mb-3 text-orange-600">
            {currentStory.title}
          </h2>
          <p>{currentStory.content}</p>
          <button
            className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold rounded-2xl shadow hover:scale-105 transition-transform"
            onClick={() => setReading(false)}
          >
            Үлгэр уншиж дууслаа → Асуулт
          </button>
        </div>
      )}

      {!reading && (
        <>
          {/* Path */}
          <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-10">
            <path
              d={`M${LEVEL_POSITIONS.map((p) => `${p.x},${p.y}`).join(' C')}`}
              stroke="#F59E0B"
              strokeWidth={5}
              fill="none"
              strokeDasharray="6"
            />
          </svg>

          {/* Rabbit */}
          <motion.div
            className="w-16 h-16 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold shadow-2xl absolute z-20"
            animate={{ x: currentPos.x, y: currentPos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            🐰
          </motion.div>

          {/* Levels */}
          {LEVEL_POSITIONS.map((pos, idx) => (
            <div
              key={idx}
              className={`absolute w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center font-bold cursor-pointer shadow-lg text-lg z-20
                ${
                  completedLevels.includes(idx)
                    ? 'bg-green-400 text-white border-green-500'
                    : 'bg-white border-orange-400'
                }`}
              style={{ left: pos.x, top: pos.y }}
              onClick={() => setCurrentQuestionIndex(idx)}
            >
              {idx + 1}
              <div className="absolute -bottom-5 flex gap-1">
                {Array.from({ length: scorePerLevel[idx] }).map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full" />
                ))}
              </div>
            </div>
          ))}

          {/* Question box */}
          <AnimatePresence mode="wait">
            {q && (
              <motion.div
                key={q.id}
                style={{ top: QUESTION_TOP }}
                className={`p-5 bg-white rounded-3xl shadow-2xl w-[90%] max-w-md text-center absolute left-1/2 -translate-x-1/2 z-40 overflow-auto max-h-[35vh] md:max-h-[40vh] ${
                  shake ? 'animate-shake' : ''
                }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <p className="text-lg font-bold mb-4">{q.question}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {q.options.map((o) => (
                    <button
                      key={o}
                      className="px-5 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-2xl shadow hover:scale-105 transition-transform font-bold"
                      onClick={() => handleAnswer(o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti */}
          <AnimatePresence>
            {showConfetti &&
              confettiParticles.map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: c.x,
                    top: c.y,
                    width: c.size,
                    height: c.size,
                    backgroundColor: c.color,
                  }}
                  initial={{ y: c.y, rotate: c.rotate, opacity: 1 }}
                  animate={{
                    y: screenHeight + 50,
                    rotate: c.rotate + 360,
                    opacity: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 + Math.random() }}
                />
              ))}
          </AnimatePresence>
        </>
      )}

      <style jsx>{`
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          50% {
            transform: translateX(8px);
          }
          75% {
            transform: translateX(-8px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
