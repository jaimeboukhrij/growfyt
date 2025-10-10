'use client'

import { Stream } from '@cloudflare/stream-react'

interface Props {
  playbackId: string
  thumbnailUrl: string
}

export const ExerciseVideoClient = ({ playbackId }: Props) => {
  return (

    <Stream
      src={playbackId}
      loop
      controls
      responsive
      className="absolute inset-0 scale-[101%]"
    />
  )
}
