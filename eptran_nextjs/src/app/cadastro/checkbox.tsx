import { useState, ChangeEvent } from 'react';

interface CustomCheckboxProps {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomCheckbox = ({ label, onChange, className }: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className || ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-[#003966] rounded-md 
          peer-checked:bg-[#003966] peer-checked:border-[#003966] 
          transition-all duration-200 ease-in-out
          flex items-center justify-center">
          <svg
            className={`w-3 h-3 ${isChecked ? 'text-white' : 'hidden'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <span className="text-[#003966] text-sm md:text-base">{label}</span>
    </label>
  );
};

export default CustomCheckbox;