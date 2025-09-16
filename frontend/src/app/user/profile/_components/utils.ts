export const formatDateOffset = (daysAgo: number) => {
  const d = new Date()
  d.setDate(d.getDate() - (6 - daysAgo))
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export const nowFormatted = (d = new Date()) =>
  d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
