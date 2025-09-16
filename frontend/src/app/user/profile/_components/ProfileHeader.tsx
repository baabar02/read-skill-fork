'use client'
import { Edit2, Save, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { nowFormatted } from './utils'

export default function ProfileHeader({
  profile,
  draft,
  isEditing,
  responseMessage,
  onEdit,
  onSave,
  onCancel,
  onImageChange,
  updateDraft,
}: any) {
  return (
    <div className="flex flex-col items-center pt-6 px-6">
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Profile image */}
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
                  onChange={onImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name + ID */}
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
              ID: <span className="font-mono text-gray-700">{profile.id}</span>{' '}
              · Last saved:{' '}
              <span className="font-medium text-gray-700">
                {nowFormatted(profile.lastSaved)}
              </span>
            </div>
          </div>
        </div>

        {/* Edit buttons */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          {!isEditing ? (
            <Button onClick={onEdit} className="flex items-center gap-2">
              <Edit2 className="w-4 h-4" /> Edit
            </Button>
          ) : (
            <>
              <Button
                onClick={onSave}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Save className="w-4 h-4" /> Save
              </Button>
              <Button
                variant="outline"
                onClick={onCancel}
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
    </div>
  )
}
