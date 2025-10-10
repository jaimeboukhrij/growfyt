import React from 'react'

export const GridExercisesLoader = () => {
  return (
    <div className="absolute inset-0 h-[100dvh] bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Cargando ejercicios...</p>
      </div>
    </div>
  )
}
