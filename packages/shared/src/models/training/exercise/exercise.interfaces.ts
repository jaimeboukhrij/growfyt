import { type Difficulty, type BodyPart, type Equipment, type Muscle, type Category } from './exercise.enum'

export interface Exercise {
  id?: string
  bodyPart: BodyPart
  category: Category
  createdAt?: Date
  description: string
  difficulty: Difficulty
  equipment: Equipment
  imageUrl: string
  instructions: string[]
  name: string
  playbackId: string
  primaryMuscle: Muscle
  secondaryMuscles: Muscle[]
  muscleImageUrl: string
  slug: string
  updatedAt?: Date
  videoUrl: string
}
