import React from 'react'

interface ProgressBarProps {
  percentage: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full md:w-96 p-4">
      <div className="w-full h-8 md:h-12 bg-gray-300 rounded-2xl overflow-hidden">
        <div
          className="h-full bg-[#00BF63] text-white font-semibold text-lg md:text-2xl flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  )
}

export default ProgressBar