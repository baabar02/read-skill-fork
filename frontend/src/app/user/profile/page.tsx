'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select'
import { Edit2, Save, X } from 'lucide-react'

const initialHistory = [40, 55, 50, 60, 45, 70, 50]

const formatDateOffset = (daysAgo: number) => {
  const d = new Date()
  d.setDate(d.getDate() - (6 - daysAgo))
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

const nowFormatted = (d = new Date()) =>
  d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const ProfileEditor = () => {
  const [profile, setProfile] = useState({
    id: 'user_001',
    image: '',
    name: 'Анхаа',
    age: 8,
    gender: 'Хүү',
    progress: 50,
    progressHistory: initialHistory,
    lastSaved: new Date(),
  })

  const [draft, setDraft] = useState({ ...profile })
  const [isEditing, setIsEditing] = useState(false)
  const [responseMessage, setResponseMessage] = useState<string>('')

  const handleEdit = () => {
    setDraft({ ...profile })
    setIsEditing(true)
    setResponseMessage('')
  }

  const handleCancel = () => {
    setDraft({ ...profile })
    setIsEditing(false)
    setResponseMessage('Засвар буцаагдлаа.')
    setTimeout(() => setResponseMessage(''), 2500)
  }

  const handleSave = () => {
    const newHistory = [...draft.progressHistory]
    const lastIndex = newHistory.length - 1
    newHistory[lastIndex] = draft.progress

    const updated = {
      ...draft,
      progressHistory: newHistory,
      lastSaved: new Date(),
    }

    setProfile(updated)
    setIsEditing(false)
    setResponseMessage(
      `Профайл амжилттай хадгалагдлаа — ${nowFormatted(updated.lastSaved)}`
    )

    setTimeout(() => setResponseMessage(''), 5000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setDraft((d) => ({ ...d, image: url }))
    }
  }

  const updateDraft = (patch: Partial<typeof draft>) =>
    setDraft((d) => ({ ...d, ...patch }))

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-amber-50 to-sky-100 overflow-hidden py-3">
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200 rounded-full opacity-30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="z-10 w-full max-w-3xl px-4 sm:px-6"
      >
        <Card className="rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
          <CardHeader className="flex flex-col items-center pt-6 px-6">
            <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative w-24 h-24">
                  <img
                    src={
                      (isEditing ? draft.image : profile.image) ||
                      'https://via.placeholder.com/150?text=Profile'
                    }
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white text-xs px-2 py-1 rounded-full cursor-pointer shadow hover:bg-gray-100">
                      Зураг
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex-1">
                  {!isEditing ? (
                    <h2 className="text-2xl font-extrabold text-pink-700">
                      {profile.name}
                    </h2>
                  ) : (
                    <Input
                      value={draft.name}
                      onChange={(e) => updateDraft({ name: e.target.value })}
                      className="text-2xl font-extrabold"
                    />
                  )}

                  <div className="text-xs text-gray-500 mt-1">
                    ID:{' '}
                    <span className="font-mono text-gray-700">
                      {profile.id}
                    </span>{' '}
                    · Last saved:{' '}
                    <span className="font-medium text-gray-700">
                      {nowFormatted(profile.lastSaved)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                {!isEditing ? (
                  <Button
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" /> Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <Save className="w-4 h-4" /> Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Badge className="mt-4 bg-amber-200 text-amber-800 rounded-full px-4 py-1 text-sm">
              {!isEditing
                ? `${profile.age} настай · ${profile.gender}`
                : `${draft.age} настай · ${draft.gender}`}
            </Badge>

            {responseMessage && (
              <div className="mt-4 w-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg text-sm text-center">
                {responseMessage}
              </div>
            )}
          </CardHeader>

          <CardContent className="px-4 sm:px-8 pt-4 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Нэр</Label>
                {!isEditing ? (
                  <div className="mt-2 text-gray-700">{profile.name}</div>
                ) : (
                  <Input
                    value={draft.name}
                    onChange={(e) => updateDraft({ name: e.target.value })}
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <Label>Нас</Label>
                {!isEditing ? (
                  <div className="mt-2 text-gray-700">{profile.age}</div>
                ) : (
                  <Input
                    type="number"
                    value={draft.age}
                    onChange={(e) =>
                      updateDraft({ age: Number(e.target.value) })
                    }
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <Label>Хүйс</Label>
                {!isEditing ? (
                  <div className="mt-2 text-gray-700">{profile.gender}</div>
                ) : (
                  <Select
                    value={draft.gender}
                    onValueChange={(val) => updateDraft({ gender: val })}
                  >
                    <SelectTrigger className="mt-2">
                      {draft.gender}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Хүү">Хүү</SelectItem>
                      <SelectItem value="Охин">Охин</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div>
                <Label>Өнөөдрийн гүйцэтгэл</Label>
                {!isEditing ? (
                  <div className="mt-2">
                    <Progress
                      value={profile.progress}
                      className="h-3 rounded-full bg-amber-100"
                    />
                    <div className="text-sm text-amber-600 font-semibold mt-1">
                      {profile.progress}%
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-3">
                    <Input
                      type="number"
                      value={draft.progress}
                      min={0}
                      max={100}
                      onChange={(e) =>
                        updateDraft({ progress: Number(e.target.value) })
                      }
                      className="w-28"
                    />
                    <div className="flex-1">
                      <Progress
                        value={draft.progress}
                        className="h-3 rounded-full bg-amber-100"
                      />
                      <div className="text-sm text-amber-600 font-semibold mt-1">
                        {draft.progress}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                7 хоногийн гүйцэтгэл
              </h3>

              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 700 220" className="w-full h-40">
                  {[0, 25, 50, 75, 100].map((g) => {
                    const y = 200 - (g / 100) * 160
                    return (
                      <line
                        key={g}
                        x1={40}
                        x2={660}
                        y1={y}
                        y2={y}
                        stroke="#eee"
                        strokeWidth={1}
                      />
                    )
                  })}

                  {[100, 75, 50, 25, 0].map((g, i) => {
                    const y = 40 + i * 40
                    return (
                      <text
                        key={g}
                        x={8}
                        y={y + 6}
                        fontSize="12"
                        fill="#9ca3af"
                      >
                        {g}%
                      </text>
                    )
                  })}

                  {(isEditing
                    ? draft.progressHistory
                    : profile.progressHistory
                  ).map((val, idx) => {
                    const barWidth = 72
                    const gap = 8
                    const x = 40 + idx * (barWidth + gap)
                    const height = (val / 100) * 160
                    const y = 200 - height
                    const isToday = idx === profile.progressHistory.length - 1
                    return (
                      <g key={idx}>
                        <title>{`${formatDateOffset(idx)} — ${val}%`}</title>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={height}
                          rx={10}
                          fill={isToday ? '#fb7185' : '#60a5fa'}
                        />
                        <text
                          x={x + barWidth / 2}
                          y={215}
                          fontSize="12"
                          fill="#374151"
                          textAnchor="middle"
                        >
                          {formatDateOffset(idx)}
                        </text>
                        <text
                          x={x + barWidth / 2}
                          y={y - 6}
                          fontSize="12"
                          fill="#111827"
                          textAnchor="middle"
                        >
                          {val}%
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>

              <p className="mt-3 text-sm text-gray-500 text-center">
                Хамгийн баруун талын өдөр нь өнөөдөр (хамгийн сүүлийн элемент).
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 items-center py-6">
            {isEditing && (
              <div className="w-full md:w-1/2 flex gap-3 flex-wrap">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-2"
                >
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>
            )}

            <div className="text-xs text-gray-400 mt-2 text-center md:text-left">
              ID: {profile.id} · LastSaved: {nowFormatted(profile.lastSaved)}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  )
}

export default ProfileEditor
