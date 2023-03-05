'use client';

import { useState } from "react";

export default function MapMarker({ children, color, onClick }: any) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`-left-4 -top-4 w-8 h-8 rounded-full bg-${color} absolute shadow-sm`}>
      <button
        className='inset-0 h-full w-full'
        onClick={onClick ? onClick : () => setShowTooltip(!showTooltip)}
      />
      <div
        className={`relative top-2 right-28 w-64 p-2 bg-slate-100 rounded-md border-2 border-${color} max-h-96 overflow-y-auto`}
        hidden={!showTooltip}
      >
        {children}
      </div>
    </div>
  )
}
