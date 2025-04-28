import React from "react";

interface PlateProps {
  distance: number;
  label: string;
  className?: string;
}

const Plate: React.FC<PlateProps> = ({ distance, label }) => {
  return (
    <div
      className={`absolute bottom-2 sm:bottom-4 flex flex-col items-center`}
      style={{ left: `${distance}px` }}
    >
      <div className="bg-amber-900 px-2 py-1 text-[9px] h-5 sm:h-auto md:text-sm font-silkscreen font-bold text-amber-200 shadow">
        {label} m
      </div>
      <div className="h-6 sm:h-9 w-1 bg-amber-900"></div>
    </div>
  );
};

export default Plate;
