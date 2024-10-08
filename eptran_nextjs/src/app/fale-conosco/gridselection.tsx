import React from "react";

interface Section {
  title: string;
  items: string[];
}

interface GridSectionProps {
  sections: Section[];
}

const GridSection: React.FC<GridSectionProps> = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col items-start">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
            {section.title}
          </h2>
          {section.items.map((item, itemIndex) => (
            <button
              key={itemIndex}
              className="bg-neutral-100 text-black w-full h-12 mb-2 rounded-md shadow-sm hover:bg-neutral-200 transition-all duration-200 text-sm sm:text-base"
            >
              {item}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridSection;