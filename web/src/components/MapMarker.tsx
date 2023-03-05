'use client';

import { useState } from "react";

export default function MapMarker({ children, color, onClick }: any) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const callback = onClick ? onClick : () => setShowTooltip(!showTooltip);
    callback();
  }

  return (
    <div className={`-left-4 -top-4 w-8 h-8 rounded-full ${color} absolute shadow-lg shadow-black`}>
      <button
        className='inset-0 h-full w-full'
        onClick={handleClick}
      />
      <div
        className={`relative top-2 right-28 w-64 p-2 bg-mantis-50 rounded-md border-2 border-mantis-300 max-h-96 overflow-y-auto z-40`}
        hidden={!showTooltip}
      >
        {children}
      </div>
    </div>
  )
}
