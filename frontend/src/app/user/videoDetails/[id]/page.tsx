'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const activities = [
  {
    id: 1,
    title: 'Өдөр тутмын дасгал',
    desc: 'Биеийн хөдөлгөөн, энгийн үгсийг давтах хялбар дасгал.',
    videos: [
      { id: 'dQw4w9WgXcQ', name: 'Дасгал 1' },
      { id: 'kJQP7kiw5Fk', name: 'Дасгал 2' },
    ],
  },
  {
    id: 2,
    title: 'Түүх сонсох',
    desc: 'Монгол үлгэр, богино түүхүүдтэй видео хичээл.',
    videos: [
      { id: 'nhGKhg0KRfs', name: 'Могжоохон даагатай Жогжоохон хүү' },
      { id: 'QmBuRONePnM', name: 'Арсландай мэргэн хаан' },
      { id: 'N-Vy4llFpuw', name: 'Алтан мөнгөн аргай' },
      { id: 'ee0sFPG05rI', name: 'Азар, Базар, Тазар 3' },
      { id: '2_8rjKqF8DY', name: 'Алтан гадас ба Долоон бурхан' },
    ],
  },
]

const VideoDetailPage = () => {
  const params = useParams()
  const activityId = Number(params.id)
  const activity = activities.find((a) => a.id === activityId)

  const [currentVideo, setCurrentVideo] = useState<string | null>(
    activity?.videos[0].id || null
  )

  if (!activity)
    return <div className="p-6 text-red-500">Activity олдсонгүй</div>

  const currentVideoName =
    activity.videos.find((v) => v.id === currentVideo)?.name || ''

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-pink-50 via-white to-sky-50">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <Link href="/user" className="text-sm text-pink-600 hover:underline">
          ← Буцах
        </Link>

        <h1 className="text-3xl font-bold text-center">{activity.title}</h1>
        <p className="text-gray-600 text-center mb-6">{activity.desc}</p>

        {currentVideo && (
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-2">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&controls=1&modestbranding=1`}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {currentVideo && (
          <p className="text-center text-gray-700 font-extrabold text-3xl mb-4">
            {currentVideoName}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {activity.videos.map((vid) => (
            <div
              key={vid.id}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition ${
                currentVideo === vid.id ? 'ring-4 ring-amber-400' : ''
              }`}
              onClick={() => setCurrentVideo(vid.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                alt={vid.name}
                className="w-full aspect-video object-cover"
              />
              <p className="text-center text-sm text-gray-700 mt-1 px-1">
                {vid.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoDetailPage
