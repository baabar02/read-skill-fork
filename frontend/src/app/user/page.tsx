'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Smile } from 'lucide-react'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'

const activities = [
  {
    id: 1,
    title: 'Өдөр тутмын дасгал',
    desc: 'Биеийн хөдөлгөөн, энгийн үгсийг давтах хялбар дасгал.',
    icon: <Smile className="w-7 h-7" />,
    color: 'bg-gradient-to-br from-amber-200 to-amber-300',
    details: [
      'Биеийн хөдөлгөөнөөр хүүхдийн эрүүл мэндийг дэмжих',
      'Энгийн үгсийг давтсанаар хэлний мэдлэг нэмэгдэх',
    ],
  },
  {
    id: 2,
    title: 'Түүх сонсох',
    desc: 'Монгол үлгэр, богино түүхүүдтэй видео хичээл.',
    icon: <BookOpen className="w-7 h-7" />,
    color: 'bg-gradient-to-br from-sky-200 to-sky-300',
    details: [
      'Монгол ардын ёс заншил, үнэт зүйлсийг ойлгох',
      'Сонсголын чадвар, анхаарал төвлөрөлтийг сайжруулах',
    ],
  },
]

const UserPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<
    (typeof activities)[0] | null
  >(null)

  const openDialog = (activityId: number) => {
    const activity = activities.find((a) => a.id === activityId) || null
    setSelectedActivity(activity)
    setDialogOpen(true)
  }

  return (
    <section className="min-h-screen flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-pink-50 via-white to-sky-50 rounded-3xl shadow-inner">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-pink-600">
          Монгол хэл дээрх сургалтын контент
        </h1>
        <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Хүүхдүүдэд зориулсан хөгжилтэй, аюулгүй сургалтын орчин
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-6 bg-white shadow-xl flex flex-col gap-6 hover:shadow-2xl transition-shadow"
        >
          <div className="flex items-center gap-5 flex-wrap">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-amber-300 flex items-center justify-center text-white font-bold text-2xl shadow-md">
              A
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">Анхаа</h3>
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

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              className="flex-1 min-w-[120px] rounded-xl py-2 bg-sky-100 hover:bg-sky-200 border border-sky-300 text-sky-700 font-medium transition-colors"
              onClick={() => alert('Үргэлжлүүлэх логик нэмэх')}
            >
              Үргэлжлүүлэх
            </button>
            <Link href="/user/profile" className="flex-1 min-w-[120px]">
              <button className="w-full rounded-xl py-2 bg-white border hover:bg-gray-50 transition-colors">
                Профайл
              </button>
            </Link>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="rounded-3xl p-6 bg-gradient-to-br from-sky-100 to-white shadow-md flex flex-col sm:flex-row items-center gap-5 hover:shadow-xl transition-shadow"
        >
          <img
            src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=60"
            alt="storybook"
            className="w-full sm:w-28 sm:h-24 rounded-2xl object-cover shadow-sm"
          />
          <div>
            <h4 className="font-semibold text-lg text-sky-700">
              Өнөөдрийн түүх
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              "Цагаан морь" — ярилцлага, асуулт хариулттай богино түүх
            </p>
            <div className="mt-3">
              <Link href="/user/assignmentsSection">
                <button className="text-sm rounded-full px-4 py-2 bg-amber-300 hover:bg-amber-400 text-white transition-colors">
                  Үзэх
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-2">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center md:text-left">
          Үйл ажиллагаанууд
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, idx) => (
            <motion.article
              key={activity.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * (idx + 1) }}
              className="rounded-3xl p-6 flex gap-5 items-start shadow-md bg-white hover:shadow-xl transition-shadow"
            >
              <div
                className={`${activity.color} p-4 rounded-2xl shadow-sm flex-shrink-0`}
              >
                {activity.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-700">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{activity.desc}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/user/videoDetails/${activity.id}`}>
                    <button className="text-sm px-4 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 border text-sky-700 transition-colors">
                      {' '}
                      Эхлэх{' '}
                    </button>
                  </Link>
                  <button
                    onClick={() => openDialog(activity.id)}
                    className="text-sm px-4 py-1.5 rounded-full bg-white border hover:bg-gray-50 transition-colors"
                  >
                    Дэлгэрэнгүй
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" // Overlay-г энд хийж байна
        >
          <Dialog.Panel className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-lg z-10">
            <Dialog.Title className="text-xl font-bold text-pink-600 mb-4">
              {selectedActivity?.title} — Дэлгэрэнгүй
            </Dialog.Title>
            <Dialog.Description className="text-gray-700">
              {selectedActivity?.details && (
                <ul className="list-disc list-inside space-y-1">
                  {selectedActivity.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </Dialog.Description>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg"
              >
                Хаах
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Бага ангийн хүүхдэд зориулсан контент
      </footer>
    </section>
  )
}

export default UserPage
