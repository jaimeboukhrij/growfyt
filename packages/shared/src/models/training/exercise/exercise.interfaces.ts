export interface Exercise {
  id?: string
  name: string
  slug: string
  description: string
  instructions: string[]
  bodyPart: string
  equipment: string
  target: string
  secondaryMuscles: string[]
  difficulty: string
  category: string
  playbackId: string
  createdAt?: Date
  updatedAt?: Date
}
