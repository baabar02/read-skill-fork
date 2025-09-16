'use client'

import { formatDateOffset } from "./utils"

export default function ProgressChart({ history }: any) {
  return (
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
            <text key={g} x={8} y={y + 6} fontSize="12" fill="#9ca3af">
              {g}%
            </text>
          )
        })}
        {history.map((val: number, idx: number) => {
          const barWidth = 72
          const gap = 8
          const x = 40 + idx * (barWidth + gap)
          const height = (val / 100) * 160
          const y = 200 - height
          const isToday = idx === history.length - 1
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
  )
}
