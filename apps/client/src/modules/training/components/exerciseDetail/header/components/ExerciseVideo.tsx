import Image from 'next/image'

import { ExerciseVideoClient } from './ExerciseVideo.client'

interface Props {
  imageUrl: string
  slug: string
  playbackId: string
}

export const ExerciseVideo = ({ imageUrl, slug, playbackId }: Props) => {
  return (
    <div className="relative aspect-video bg-muted group overflow-hidden rounded-xl">
      <Image
        src={imageUrl}
        alt={slug}
        fill
        priority
        className=" w-full h-full scale-[101%]"
      />

      <ExerciseVideoClient playbackId={playbackId} thumbnailUrl={imageUrl} />
    </div>
  )
}
