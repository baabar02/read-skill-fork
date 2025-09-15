'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Smile } from 'lucide-react'

const activities = [
  {
    id: 1,
    title: 'Өдөр тутмын дасгал',
    desc: 'Биеийн хөдөлгөөн, энгийн үгсийг давтах хялбар дасгал.',
    icon: <Smile className="w-7 h-7" />,
    color: 'bg-gradient-to-br from-amber-200 to-amber-300',
  },
  {
    id: 2,
    title: 'Түүх сонсох',
    desc: 'Монгол үлгэр, богино түүхүүдтэй видео хичээл.',
    icon: <BookOpen className="w-7 h-7" />,
    color: 'bg-gradient-to-br from-sky-200 to-sky-300',
  },
]

const UserPage = () => {
  return (
    <section className="min-h-screen flex flex-col max-w-6xl mx-auto px-6 py-0 bg-gradient-to-b from-pink-50 via-white to-sky-50 rounded-3xl shadow-inner">
      <div className="flex-1 min-h-0 py-12">
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-pink-600">
              Монгол хэл дээрх сургалтын контент
            </h1>
            <p className="mt-3 text-gray-600 text-lg">
              Хүүхдүүдэд зориулсан хөгжилтэй, аюулгүй сургалтын орчин
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 auto-rows-min">
          <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl p-8 bg-white shadow-xl flex flex-col gap-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-amber-300 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                A
              </div>
              <div>
                <h3 className="font-bold text-lg">Анхаа</h3>
                <p className="text-sm text-gray-500">
                  8 нас · Сургалтын түвшин: Эхлэл
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Хичээл дууссан: 6/12
              </label>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
                <div
                  className="h-4 rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: '50%' }}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="flex-1 rounded-xl py-2 bg-sky-100 hover:bg-sky-200 border border-sky-300 text-sky-700 font-medium transition-colors">
                Үргэлжлүүлэх
              </button>
              <button className="rounded-xl py-2 px-4 bg-white border hover:bg-gray-50 transition-colors">
                Профайл
              </button>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl p-6 bg-gradient-to-br from-sky-100 to-white shadow-md flex items-center gap-5 hover:shadow-xl transition-shadow"
          >
            <img
              src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=60"
              alt="storybook"
              className="w-28 h-24 rounded-2xl object-cover shadow-sm"
            />
            <div>
              <h4 className="font-semibold text-lg text-sky-700">
                Өнөөдрийн түүх
              </h4>
              <p className="text-sm text-gray-600">
                "Цагаан морь" — ярилцлага, асуулт хариулттай богино түүх
              </p>
              <div className="mt-3">
                <button className="text-sm rounded-full px-4 py-2 bg-amber-300 hover:bg-amber-400 text-white transition-colors">
                  Үзэх
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-6 py-8 -mt-20 overflow-auto">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">
          Үйл ажиллагаанууд
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
          {activities.map((a, idx) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * idx }}
              className="rounded-3xl p-6 flex gap-5 items-start shadow-md bg-white hover:shadow-xl transition-shadow min-h-[160px]"
            >
              <div
                className={`${a.color} p-4 rounded-2xl shadow-sm flex-shrink-0`}
              >
                {a.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-700">{a.title}</h3>
                <p className="text-sm text-gray-500">{a.desc}</p>
                <div className="mt-4 flex gap-3">
                  <button className="text-sm px-4 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 border text-sky-700 transition-colors">
                    Эхлэх
                  </button>
                  <button className="text-sm px-4 py-1.5 rounded-full bg-white border hover:bg-gray-50 transition-colors">
                    Дэлгэрэнгүй
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <footer className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Бага ангийн хүүхдэд зориулсан контент
      </footer>
    </section>
  )
}

export default UserPage
