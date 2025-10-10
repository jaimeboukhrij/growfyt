import { z } from 'zod'

import { BodyParts } from '../../models/training'

export const ExercisesQueryParamsSchema = z.object({
  bodyPart: z.enum(BodyParts).optional(),
  q: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional()
})
