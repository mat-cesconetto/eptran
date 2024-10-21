import React from 'react';

interface ProgressBarProps {
  percentage: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="p-10 m-2 mr-10 text-center">
      <div className="w-96 h-12 bg-gray-300 rounded-2xl overflow-hidden text-center">
        <div
          className="h-full bg-[#00BF63] text-white font-semibold text-2xl flex items-center justify-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
