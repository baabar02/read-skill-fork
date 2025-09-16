'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProfileHeader from './_components/ProfileHeader'
import ProfileDetails from './_components/ProfileDetails'
import ProgressChart from './_components/ProgressChart'
import { nowFormatted } from './_components/utils'

const initialHistory = [40, 55, 50, 60, 45, 70, 50]

export default function ProfileEditor() {
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
  const [responseMessage, setResponseMessage] = useState('')

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
    newHistory[newHistory.length - 1] = draft.progress
    const updated = {
      ...draft,
      progressHistory: newHistory,
      lastSaved: new Date(),
    }
    setProfile(updated)
    setIsEditing(false)
    setResponseMessage(
      `Профайл хадгалагдлаа — ${nowFormatted(updated.lastSaved)}`
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-3xl px-4 sm:px-6"
      >
        <Card className="rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
          <ProfileHeader
            profile={profile}
            draft={draft}
            isEditing={isEditing}
            responseMessage={responseMessage}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onImageChange={handleImageChange}
            updateDraft={updateDraft}
          />
          <CardContent className="px-4 sm:px-8 pt-4 pb-2">
            <ProfileDetails
              profile={profile}
              draft={draft}
              isEditing={isEditing}
              updateDraft={updateDraft}
            />
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                7 хоногийн гүйцэтгэл
              </h3>
              <ProgressChart
                history={
                  isEditing ? draft.progressHistory : profile.progressHistory
                }
              />
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
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  )
}
