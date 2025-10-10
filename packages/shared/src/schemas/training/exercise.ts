import { z } from 'zod'

import { BodyPart } from '../../models/training'

export const ExercisesQueryParamsSchema = z.object({
  bodyPart: z.enum(BodyPart).optional(),
  q: z.string().optional(),
  limit: z.coerce.number().int().min(1).optional(),
  offset: z.coerce.number().int().min(0).optional()
})
