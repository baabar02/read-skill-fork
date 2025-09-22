'use client'

import CorrectIncorrectPieChart from '@/app/graph/[id]/_components/correct-incorrect'
import {
  useGetUserProgressQuery,
  useGetUsersQuery,
} from '../../../../../graphql/generated'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export const UsersInfo = () => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersQuery()
  const router = useRouter()
  const { id } = useParams()
  const [selectedUserId, setSelectedUserId] = useState<string | null>()

  const {
    data: progressData,
    loading: progressLoading,
    error: progressError,
  } = useGetUserProgressQuery({
    variables: { userId: selectedUserId! },
    skip: !selectedUserId,
  })

  useEffect(() => {
    if (!selectedUserId && usersData?.getUsers.length) {
      setSelectedUserId(usersData.getUsers[0].id)
    }
  }, [usersData, selectedUserId])

  if (usersLoading || progressLoading)
    return <p>Loading users and progress...</p>
  if (usersError) return <p>Error loading users: {usersError.message}</p>
  if (progressError)
    return <p>Error loading progress: {progressError.message}</p>

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId)
    router.push(`/graph/${userId}`)
  }

  const userProgress = progressData?.getUserProgress || []

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        2I Students
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="py-3 px-4 text-left">Нэр</th>
              <th className="py-3 px-4 text-center">Нийт асуулт</th>
              <th className="py-3 px-4 text-center">Зөв хариулт</th>
              <th className="py-3 px-4 text-center">Хувь</th>
              <th className="py-3 px-4 text-center">Харагдац</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.getUsers.map((user) => {
              const isSelected = user.id === selectedUserId
              const thisUserProgress = isSelected ? userProgress : []
              const thisTotal = thisUserProgress.length
              const thisCorrect = thisUserProgress.filter(
                (p) => p?.isCorrect === true
              ).length
              const thisPercentage =
                thisTotal === 0
                  ? 0
                  : Math.round((thisCorrect / thisTotal) * 100)

              return (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className={`cursor-pointer transition ${
                    isSelected ? 'bg-purple-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {thisTotal > 0 ? thisTotal : '—'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {thisTotal > 0 ? thisCorrect : '—'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {thisTotal > 0 ? `${thisPercentage}%` : '—'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {thisTotal > 0 ? (
                      <div className="w-12 h-12 mx-auto">
                        <CorrectIncorrectPieChart
                          correct={thisCorrect}
                          incorrect={thisTotal - thisCorrect}
                        />
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Оноо байхгүй
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
