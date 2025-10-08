import { z } from 'zod'

import { TargetMuscles } from '../../models/training'

export const ExercisesQueryParamsSchema = z.object({
  targetMuscle: z.enum(TargetMuscles).optional(),
  q: z.string().optional()
})
