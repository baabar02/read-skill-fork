'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function ProfileDetails({
  profile,
  draft,
  isEditing,
  updateDraft,
}: any) {
  return (
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
            onChange={(e) => updateDraft({ age: Number(e.target.value) })}
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
            <SelectTrigger className="mt-2">{draft.gender}</SelectTrigger>
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
  )
}
