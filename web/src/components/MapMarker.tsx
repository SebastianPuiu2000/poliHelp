'use client';

import { useState } from "react";

export default function MapMarker({ children, color, onClick }: any) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <button
      className={`-left-4 -top-4 w-8 h-8 rounded-full bg-${color} absolute`}
      onClick={onClick ? onClick : () => setShowTooltip(!showTooltip)}
    >
      <div
        className={`relative top-10 right-12 w-32 p-2 bg-slate-100 rounded-md border-2 border-${color}`}
        hidden={!showTooltip}
      >
        {children}
      </div>
    </button>
  )
}
