'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const initialStories = [
  {
    id: 1,
    title: 'Цагаан морь',
    date: '2025-09-16',
    assignments: [
      { id: 1, title: 'Асуулт хариулт', completed: true },
      { id: 2, title: 'Үгийн сангийн дасгал', completed: false },
      { id: 3, title: 'Богино эссэ бичих', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Хөх чоно',
    date: '2025-09-15',
    assignments: [
      { id: 1, title: 'Дүгнэлт гаргах', completed: true },
      { id: 2, title: 'Зураг тайлбарлах', completed: true },
    ],
  },
  {
    id: 3,
    title: 'Бага хааны түүх',
    date: '2025-09-14',
    assignments: [
      { id: 1, title: 'Гол санааг бичих', completed: false },
      { id: 2, title: 'Шинэ үгсийг тайлбарлах', completed: false },
      { id: 3, title: 'Асуултад хариулах', completed: false },
    ],
  },
]

export default function AssignmentsSection() {
  const [stories] = useState(initialStories)

  return (
    <section className="min-h-screen flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-pink-50 via-white to-sky-50 rounded-3xl shadow-inner">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-pink-600">
          Өдөр бүрийн өгүүллэг ба даалгавар
        </h1>
        <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Өнөөдөр болон өмнөх өдрүүдийн өгүүллэгүүдийн даалгаврын явцыг эндээс
          шалгана уу.
        </p>
      </header>

      <div className="space-y-6">
        {stories.map((story, idx) => {
          const total = story.assignments.length
          const completed = story.assignments.filter((a) => a.completed).length
          const progress = Math.round((completed / total) * 100)

          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-pink-600">
                    {story.title}
                  </h2>
                  <p className="text-gray-500 text-sm">{story.date}</p>
                </div>
                <Link href={`/user/story/${story.id}`}>
                  <button className="px-4 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 border border-sky-300 text-sky-700 font-medium transition-colors">
                    Дэлгэрэнгүй
                  </button>
                </Link>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-600 font-medium">
                  Даалгаврын явц: {completed}/{total}
                </label>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
                  <div
                    className="h-4 rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {story.assignments.map((a) => (
                    <li key={a.id} className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          a.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      ></span>
                      {a.title}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/user">
          <button className="px-5 py-2 rounded-xl bg-white border hover:bg-gray-50 transition-colors shadow">
            Буцах
          </button>
        </Link>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Бага ангийн хүүхдэд зориулсан контент
      </footer>
    </section>
  )
}
